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
      class="rounded-lg bg-[#272932] mt-4 p-4 border"
      :class="isCorrectLocalStyle(item)"
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
          v-if="item.type == 'single-choice'"
          class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
          :class="[
            isLocalPeer(item)
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
              isLocalPeer(item)
                ? getOptionIndex(item.responses) == option.index
                : optionObj[item.index] == option.index
            "
          ></div>
        </div>
        <div
          v-else
          class="w-[18px] h-[18px] rounded bg-white overflow-hidden"
          :class="[
            isLocalPeer(item)
              ? 'cursor-not-allowed'
              : state == 'stopped'
              ? 'cursor-not-allowed'
              : 'cursor-pointer',
          ]"
          @click="onChecked(item, option.index)"
        >
          <div
            class="bg-[#2572ED] text-white w-full h-full flex items-center justify-center"
            v-if="
              isLocalPeer(item)
                ? getOptionIndexs(item.responses).includes(option.index)
                : (optionObj[item.index] || []).includes(option.index)
            "
          >
            <SvgCheckboxChecked />
          </div>
        </div>
        <div class="flex-1">
          <div class="flex justify-between">
            <p class="text-white/80 text-base">{{ option.text }}</p>
            <div
              class="text-white/60 text-sm flex items-center"
              v-if="isLocalPeer(item) || state == 'stopped'"
            >
              <div
                class="p-1 mr-1 rounded-lg border text-xs"
                v-if="typeName == 'quiz'"
                :class="
                  isCorrectStyle(item, option.index)
                    ? 'text-[#36B37E] border-[#36B37E]'
                    : 'text-[#C74E5B] border-[#C74E5B]'
                "
              >
                {{
                  isCorrectStyle(item, option.index) ? "Correct" : "Incorrect"
                }}
              </div>
              {{ option.voteCount }} votes
            </div>
          </div>
          <div
            class="h-2 rounded-lg overflow-hidden bg-[#191e27]"
            v-if="isLocalPeer(item)"
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
      <div class="flex justify-end gap-2" v-if="state !== 'stopped'">
        <div
          v-if="item.skippable && !isLocalPeer(item)"
          class="py-2 px-6 rounded-lg text-base font-[500] text-[#ffffff] bg-[#2e3038] cursor-pointer hover:bg-[#272932] flex items-center justify-center transition-all"
          @click="onSkipped(item)"
        >
          Skip
        </div>
        <div
          v-if="!isLocalPeer(item)"
          class="py-2 px-6 rounded-lg text-base font-[500] text-[#84aaff] bg-[#004399] flex items-center justify-center transition-all"
          :class="
            onIsVote(item)
              ? 'bg-[#2572ED] text-[#ffffff] cursor-pointer hover:bg-[#538eff]'
              : 'cursor-not-allowed'
          "
          @click="onVote(item)"
        >
          Vote
        </div>
        <p class="text-base font-bold text-[#c5c6d1]" v-else>
          {{ isAnswerType(item) ? "Voted" : "Skipped" }}
        </p>
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
    hmsStore.subscribe(this.onSelectPoll, selectPollByID(this.id));
  },
  methods: {
    onSelectPoll(poll) {
      this.isLocal = poll.startedBy == this.localPeerId;
      this.typeName = poll.type;
      this.title = poll.title;
      this.state = poll.state;
      this.questions = poll.questions;
    },
    onChecked(item, index) {
      if (this.isLocalPeer(item)) return;
      if (this.state == "stopped") return;
      if (item.type == "single-choice") {
        this.$set(this.optionObj, item.index, index);
      } else {
        const List = this.optionObj[item.index] || [];
        const _index = List.indexOf(index);
        if (_index == -1) {
          List.push(index);
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
        return (this.optionObj[item.index] || []).length;
      }
    },
    async onSkipped(item) {
      await hmsActions.interactivityCenter.addResponsesToPoll(this.id, [
        {
          questionIndex: item.index, // index of the question
          skippable: true,
        },
      ]);
    },
    async onVote(item) {
      if (item.type == "single-choice") {
        if (!this.optionObj[item.index]) return;
      } else {
        if (!(this.optionObj[item.index] || []).length) return;
      }
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
    getOptionIndexs(responses) {
      return (
        responses.filter((r) => r?.peer?.peerid == this.localPeerId)[0]
          ?.options || []
      );
    },
    isAnswerType(item) {
      if (!item.responses) return false;
      const LocalPeer = item.responses.filter(
        (r) => r.peer.peerid == this.localPeerId
      )[0];
      if (item.type == "single-choice") {
        let option = LocalPeer.option;
        return option > 0;
      } else {
        let options = LocalPeer.options;
        return !!options && options.length > 0;
      }
    },
    isLocalPeer(item) {
      if (!item.responses) return false;
      const LocalPeer = item.responses.filter(
        (r) => r.peer.peerid == this.localPeerId
      )[0];
      return !!LocalPeer;
    },
    isCorrectStyle(item, index) {
      if (item.type == "single-choice") {
        return item.answer.option == index;
      } else {
        return item.answer.options.includes(index);
      }
    },
    isCorrectLocalStyle(item) {
      if (!item.responses) return "border-transparent";
      const LocalPeer = item.responses.filter(
        (r) => r.peer.peerid == this.localPeerId
      )[0];
      if (!LocalPeer) return "border-transparent";
      if (item.type == "single-choice") {
        let option = LocalPeer.option;
        if (option == -1) return "border-transparent";
        return option == item.answer.option
          ? "border-[#36B37E]"
          : "border-[#C74E5B]";
      } else {
        let options = LocalPeer.options || [];
        if (!options.length) return "border-transparent";
        let lock = true;
        item.answer.options.map((r) => {
          if (!options.includes(r)) {
            lock = false;
          }
        });

        return lock && options.length == item.answer.options.length
          ? "border-[#36B37E]"
          : "border-[#C74E5B]";
      }
    },
  },
};
</script>
<style scoped>
</style>