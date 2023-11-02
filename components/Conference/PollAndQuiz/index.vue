<template>
  <div
    class="relative w-[25rem] h-full relative flex flex-col bg-[#11131A] rounded-lg"
  >
    <div class="absolute top-0 left-0 w-full h-full flex flex-col">
      <div
        class="py-4 px-6 mb-4 flex items-center justify-between border-b border-[#272932]"
      >
        <div class="text-white text-xl font-bold">
          <div class="flex gap-4" v-if="typeName">
            <div
              class="cursor-pointer"
              @click="
                typeName = '';
                isLive = 'false';
              "
            >
              <SvgBack />
            </div>
            {{ typeName }}
            <div
              class="py-1 px-2 rounded bg-[#C74E5B] text-white text-xs flex items-center"
              v-if="isLive"
            >
              LIVE
            </div>
          </div>
          <p v-else>Polls and Quizzes</p>
        </div>
        <div
          class="w-6 h-6 flex items-center justify-center hover:bg-white/60 rounded cursor-pointer"
          @click="$emit('onClose')"
        >
          <i class="el-icon-close text-white"></i>
        </div>
      </div>
      <div class="overflow-y-auto flex flex-col">
        <ConferencePollAndQuizLive
          v-if="isLive"
          :typeName="typeName"
          :id="id"
        />
        <div v-else>
          <div v-if="!typeName">
            <ConferencePollAndQuizCreate @onCreate="onCreate" />
            <div class="mt-6 pt-6 px-6 border-t border-[#272932]">
              <p class="text-white text-xl font-bold">
                Previous Polls and Quizzes
              </p>
              <div class="mt-4 flex gap-6 flex-col">
                <div
                  class="p-4 rounded-lg bg-[#272932]"
                  v-for="item in polls"
                  :key="item.id"
                >
                  <div class="flex items-center justify-between mb-3">
                    <p class="text-white text-base font-bold">
                      {{ item.title }}
                    </p>
                    <div
                      class="py-1 px-2 rounded bg-[#C74E5B] text-white text-xs flex items-center"
                    >
                      LIVE
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <div
                      class="py-2 px-4 rounded-lg text-base font-[500] bg-[#2572ED] text-[#ffffff] cursor-pointer hover:bg-[#538eff] flex items-center justify-center transition-all"
                      @click="onView(item)"
                    >
                      View
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConferencePollAndQuizDetail
            v-else
            :typeName="typeName"
            :id="id"
            @onLaunch="onLaunch"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { selectPolls } from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  data() {
    return {
      detailed: false,
      typeName: "",
      id: null,
      isLive: false,
      polls: [],
    };
  },
  computed: {
    path() {},
  },
  mounted() {
    hmsStore.subscribe(this.onSelectPolls, selectPolls);
  },
  methods: {
    onCreate(typeName, id) {
      this.typeName = typeName;
      this.id = id;
    },
    onLaunch(typeName, id) {
      this.isLive = true;
      this.typeName = typeName;
      this.id = id;
    },
    onSelectPolls(polls) {
      this.polls = polls;
      console.log(polls);
    },
    onView(item) {
      this.isLive = true;
      this.id = item.id;
      this.typeName = item.type;
    },
  },
};
</script>
<style scoped>
</style>