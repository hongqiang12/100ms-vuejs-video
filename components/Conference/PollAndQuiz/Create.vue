<template>
  <div class="pb-6 px-6">
    <p class="mb-4 text-xs text-[#c5c6d1]">
      Select the type you want to continue with
    </p>
    <div class="flex gap-6 mb-4">
      <div
        class="flex-1 text-white border border-[#272932] p-2 rounded-xl cursor-pointer flex items-center"
        :class="typeName == 'poll' ? 'border-[#538eff]' : ''"
        @click="typeName = 'poll'"
      >
        <div
          class="p-2 rounded border border-[#272932] bg-[#272932]"
          :class="typeName == 'poll' ? 'border-[#538eff]' : ''"
        >
          <SvgPoll />
        </div>
        <p class="ml-4 text-base text-white">Poll</p>
      </div>
      <div
        class="flex-1 text-white border border-[#272932] p-2 rounded-xl cursor-pointer flex items-center"
        :class="typeName == 'quiz' ? 'border-[#538eff]' : ''"
        @click="typeName = 'quiz'"
      >
        <div
          class="p-2 rounded border border-[#272932] bg-[#272932]"
          :class="typeName == 'quiz' ? 'border-[#538eff]' : ''"
        >
          <SvgQuiz />
        </div>
        <p class="ml-4 text-base text-white">Quiz</p>
      </div>
    </div>
    <div>
      <p class="text-sm text-white mb-2">Name this {{ typeName }}</p>
      <input
        type="text"
        v-model="name"
        class="appearance-none border border-transparent bg-[#191B23] text-[#f0f0fb] w-full h-full py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#538eff] text-base"
      />
      <div class="mt-6 flex gap-3">
        <el-switch
          v-model="countChecked"
          inactive-color="#191b23"
          active-color="#2572ED"
        >
        </el-switch>
        <p class="text-sm text-white/80 font-[500]">Hide Vote Count</p>
      </div>
      <div class="mt-6 flex gap-3">
        <el-switch
          v-model="anonymousChecked"
          inactive-color="#191b23"
          active-color="#2572ED"
        >
        </el-switch>
        <p class="text-sm text-white/80 font-[500]">Make Results Anonymous</p>
      </div>

      <div
        class="py-2 px-4 mt-6 rounded-lg text-base font-[500] text-[#84aaff] bg-[#004399] flex items-center justify-center transition-all"
        @click="onCreate"
        :class="
          name
            ? 'bg-[#2572ED] text-[#ffffff] cursor-pointer hover:bg-[#538eff]'
            : 'cursor-not-allowed'
        "
      >
        Create {{ typeName }}
      </div>
    </div>
  </div>
</template>
<script>
import { selectLocalPeerRoleName } from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  data() {
    return {
      name: "",
      countChecked: false,
      anonymousChecked: false,
      typeName: "poll",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async onCreate() {
      if (!this.name) return;
      const LocalPeerRoleName = hmsStore.getState(selectLocalPeerRoleName);
      const id = Date.now().toString();
      await hmsActions.interactivityCenter.createPoll({
        id,
        title: this.name,
        anonymous: this.anonymousChecked,
        rolesThatCanViewResponses:
          this.countChecked && LocalPeerRoleName
            ? [LocalPeerRoleName]
            : undefined,
        type: this.typeName, // or "quiz"
      });
      this.$emit("onCreate", this.typeName, id);
    },
  },
};
</script>
<style scoped>
:deep(.el-switch__core) {
  border-color: #444954 !important;
}
:deep(.el-switch.is-checked .el-switch__core) {
  border-color: #2572ed !important;
}
</style>