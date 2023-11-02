<template>
  <div class="w-[25rem] relative flex flex-col bg-[#11131A] rounded-lg">
    <div class="py-4 px-6 mb-4 flex justify-between border-b border-[#272932]">
      <div class="text-white text-xl">
        <div class="flex gap-4" v-if="typeName">
          <SvgBack @click="typeName = ''" /> {{ typeName }}
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
    <ConferencePollAndQuizCreate @onCreate="onCreate" v-if="!typeName" />
    <ConferencePollAndQuizDetail v-else :typeName="typeName" :reset="reset" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailed: false,
      typeName: "",
      reset: null,
    };
  },
  computed: {
    path() {},
  },
  mounted() {},
  methods: {
    onCreate(typeName, reset) {
      this.typeName = typeName;
      this.reset = reset;
    },
  },
};
</script>
<style scoped>
</style>