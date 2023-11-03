<template>
  <div class="py-4 px-6">
    <div class="flex justify-between items-center">
      <p class="text-white/70 text-base font-bold">
        {{ title }} started a {{ typeName }}
      </p>
      <div
        v-if="isLocal && state == 'started'"
        class="py-[6px] px-3 rounded-lg text-base font-[500] text-white bg-[#C74E5B] flex items-center justify-center transition-all cursor-pointer hover:bg-[#FFB2B6]"
        @click="onStopPoll"
      >
        End poll
      </div>
    </div>

    <div
      class="rounded-lg bg-[#272932] mt-4 p-4"
      v-for="item in questions"
      :key="item.index"
    >
      <p class="text-[#8f909a] text-xs uppercase">
        QUESTION {{ item.index }} OF {{ questions.length }}: {{ item.type }}
      </p>
      <div class="my-4 text-base text-white">{{ item.text }}</div>
      <div
        class="flex items-center gap-[10px] mb-4"
        v-for="option in item.options"
        :key="option.index"
      >
        <div
          class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
          :class="[
            item.responses
              ? getOptionIndex(item.responses) == option.index
                ? 'border-[#538eff] cursor-not-allowed'
                : 'cursor-not-allowed'
              : state == 'stopped'
              ? 'cursor-not-allowed'
              : optionObj[item.index] == option.index
              ? 'border-[#538eff] cursor-pointer'
              : 'border-white cursor-pointer',
          ]"
          @click="onChecked(item, option.index)"
        >
          <div
            class="w-[10px] h-[10px] rounded-full bg-[#538eff]"
            v-if="
              item.responses
                ? getOptionIndex(item.responses) == option.index
                : optionObj[item.index] == option.index
            "
          ></div>
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <p class="text-white/80 text-base">{{ option.text }}</p>
            <p class="text-white/60 text-sm" v-if="item.responses || state == 'stopped'">
              {{ option.voteCount }} votes
            </p>
          </div>
          <div
            class="h-2 rounded-lg overflow-hidden bg-[#191e27]"
            v-if="item.responses"
          >
            <div
              class="bg-[#2572ED] h-2"
              :style="{
                transform: `translateX(${
                  -100 + (option.voteCount / item.responses.length) * 100
                }%)`,
              }"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex justify-end" v-if="state !== 'stopped'">
        <div
          v-if="!item.responses"
          class="py-2 px-6 rounded-lg text-base font-[500] text-[#84aaff] bg-[#004399] flex items-center justify-center transition-all"
          :class="
            onIsVote(item)
              ? 'bg-[#2572ED] text-[#ffffff] cursor-pointer hover:bg-[#538eff]'
              : 'cursor-not-allowed'
          "
          @click="onVote(item)"
        >
          vote
        </div>
        <p class="text-base font-bold text-[#c5c6d1]" v-else>Voted</p>
      </div>
    </div>
  </div>
</template>
<script>
import { selectPollByID, selectLocalPeerID } from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  data() {
    return {
      optionObj: {},
      typeName: "",
      title: "",
      questions: [],
      state: "",
      localPeerId: hmsStore.getState(selectLocalPeerID),
      isLocal: false,
    };
  },
  props: {
    id: String,
  },
  computed: {
    path() {},
  },
  mounted() {
    console.log(this.localPeerId);
    hmsStore.subscribe(this.onSelectPoll, selectPollByID(this.id));
  },
  methods: {
    onSelectPoll(poll) {
      console.log(poll);
      this.isLocal = poll.startedBy == this.localPeerId;
      this.typeName = poll.type;
      this.title = poll.title;
      this.state = poll.state;
      this.questions = poll.questions;
      console.log(this.questions);
    },
    onChecked(item, index) {
      if (item.responses) return;
      if (this.state == "stopped") return;
      if (item.type == "single-choice") {
        this.$set(this.optionObj, item.index, index);
      } else {
        const List = this.optionObj[item.index] || [];
        const _index = List.indexOf(index);
        if (_index == -1) {
          List.push(_index);
        } else {
          List.splice(_index, 1);
        }
        this.$set(this.optionObj, item.index, List);
      }
    },
    onIsVote(item) {
      if (item.type == "single-choice") {
        return this.optionObj[item.index];
      } else {
        return this.optionObj[item.index].length;
      }
    },
    async onVote(item) {
      if (item.type == "single-choice") {
        if (!this.optionObj[item.index]) return;
      } else {
        if (!this.optionObj[item.index].length) return;
      }
      console.log(item);
      await hmsActions.interactivityCenter.addResponsesToPoll(this.id, [
        item.type == "single-choice"
          ? {
              questionIndex: item.index, // index of the question
              option: this.optionObj[item.index], // index of the option if it's a single-choice question
              // options: [1, 2], // array of indices if it's a multiple-choice question
            }
          : {
              questionIndex: item.index, // index of the question
              options: this.optionObj[item.index],
            },
      ]);
    },
    async onStopPoll() {
      await hmsActions.interactivityCenter.stopPoll(this.id);
      this.$emit("onStop");
    },
    getOptionIndex(responses) {
      return responses.filter((r) => r?.peer?.peerid == this.localPeerId)[0]
        ?.option;
    },
  },
};
</script>
<style scoped>
</style>