<template>
  <div>
    <el-dialog
      :visible.sync="pdfVisible"
      width="420px"
      :show-close="false"
      custom-class="rounded-xl !bg-transparent"
    >
      <div class="bg-[#11131b] p-6 rounded-xl">
        <p class="text-xl font-semibold text-white">Share PDF</p>
        <div class="text-white/80 mb-3 text-sm">
          Choose PDF you want to annotate and share
        </div>
        <div
          class="my-3 relative py-8 h-11 rounded-lg border border-dotted border-[#272932] flex flex-col items-center justify-center cursor-pointer"
        >
          <SvgUpload />
          <p class="text-base text-white underline">Click to upload</p>
        </div>
        <div class="flex gap-4 mt-4">
          <div
            class="py-2 px-4 rounded-lg text-base font-[500] border border-[#444954] hover:border-[#5c616c] text-white bg-transparent flex items-center justify-center transition-all"
          >
            Cancel
          </div>
          <div
            class="py-2 px-4 rounded-lg text-base font-[500] text-[#84aaff] bg-[#004399] flex items-center justify-center transition-all"
            @click="onShare"
            :class="
              isFile
                ? 'bg-[#2572ED] text-[#ffffff] cursor-pointer hover:bg-[#538eff]'
                : 'cursor-not-allowed'
            "
          >
            Start Sharing
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfVisible: false,
      isFile: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onShare() {},
  },
};
</script>
