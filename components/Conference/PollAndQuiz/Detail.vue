<template>
  <div class="p-6">
    <div
      class="p-4 bg-[#191B23] rounded-lg mb-3"
      v-for="(question, m) in questions"
      :key="m"
    >
      <p class="text-[#8f909a] text-xs">
        QUESTION {{ m + 1 }} OF {{ questions.length }}
        <span v-if="question.isSave"
          >: {{ selectLabel(question.saveObj.typeId) }}</span
        >
      </p>
      <div v-if="question.isSave" class="text-sm font-[500]">
        <p class="text-white pt-2 pb-4">{{ question.saveObj.question }}</p>
        <p
          class="py-2 text-white/80"
          v-for="(item, index) in question.saveObj.options"
          :key="index"
        >
          {{ item }}
        </p>
      </div>
      <div v-else>
        <p class="mt-2 mb-4 text-sm font-[500] text-white">Question Type</p>
        <el-popover
          width="320"
          v-model="question.popoverShow"
          :visible-arrow="false"
          popper-class="!px-0 !bg-[#11131b] !border-0 !rounded-md overflow-hidden"
          trigger="click"
        >
          <div class="max-h-[24rem] overflow-y hide-scrollbar rounded-md">
            <div
              class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-4 border-t border-[#1D1F27] first:border-transparent hover:bg-[#272932] cursor-pointer"
              v-for="item in selectList"
              :key="item.id"
              :class="question.typeId == item.id ? 'bg-[#272932]' : ''"
              @click="onSelect(item.id, question)"
            >
              {{ item.label }}
            </div>
          </div>
          <div
            slot="reference"
            class="py-3 px-5 flex items-center justify-between cursor-pointer bg-[#272932] rounded-lg text-[#f0f0fb]"
          >
            <p class="text-base truncate">
              {{ selectLabel(question.typeId) }}
            </p>
            <i
              class="el-icon-arrow-down text-xl"
              :class="question.popoverShow ? 'rotate-180' : ''"
            ></i>
          </div>
        </el-popover>
        <div class="mt-4">
          <input
            type="text"
            placeholder="Ask a question"
            v-model="question.question"
            class="appearance-none border border-transparent bg-[#272932] text-[#f0f0fb] w-full h-full py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#538eff] text-base"
          />
        </div>
        <p class="my-3 text-sm font-[500] text-white/70">Options</p>
        <div class="flex flex-col gap-4 mb-4">
          <div
            class="flex items-center gap-2"
            v-for="(item, index) in question.options"
            :key="index"
          >
            <input
              type="text"
              :placeholder="`Option ${index + 1}`"
              v-model="item.value"
              class="appearance-none border border-[#272932] bg-[#191B23] text-[#f0f0fb] w-full h-full py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#538eff] text-base"
            />
            <div
              class="w-10 h-10 text-white rounded-xl flex items-center justify-center hover:bg-[#8f909a] cursor-pointer"
              @click="question.options.splice(index, 1)"
            >
              <SvgDelete />
            </div>
          </div>
        </div>
        <div
          class="flex gap-2 text-white/70 hover:text-white/90 cursor-pointer"
          @click="question.options.push({ value: '' })"
        >
          <SvgAdd />
          <p class="text-base font-[500]">Add an option</p>
        </div>
      </div>

      <div class="flex items-center justify-between" :class="questions.isSave?'':'mt-8'">
        <div @click="questions.splice(m, 1)">
          <SvgDelete class="text-white/70 hover:text-white cursor-pointer" />
        </div>
        <div
          class="py-2 px-4 rounded-lg text-base font-[500] text-[#8f909a] bg-[#11131b] flex items-center justify-center transition-all"
          :class="
            isSave(question)
              ? 'bg-[#2e3038] text-[#f0f0fb] cursor-pointer hover:bg-[#272932]'
              : 'cursor-not-allowed'
          "
          @click="onSave(question)"
        >
          {{ question.isSave ? "Edit" : "Save" }}
        </div>
      </div>
    </div>

    <div
      class="flex gap-4 text-white/70 hover:text-white/90 my-3 cursor-pointer"
      @click="onAddQuestion"
    >
      <SvgAdd />
      <p class="text-base font-[500]">Add another question</p>
    </div>
    <div class="flex justify-end">
      <div
        class="py-2 px-4 rounded-lg text-base font-[500] text-[#84aaff] bg-[#004399] flex items-center justify-center transition-all"
        :class="
          isLaunch
            ? 'bg-[#2572ED] text-[#ffffff] cursor-pointer hover:bg-[#538eff]'
            : 'cursor-not-allowed'
        "
      >
        Launch {{ typeName }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailed: false,

      selectList: [
        { id: 1, label: "Single Choice" },
        { id: 2, label: "Multiple Choice" },
      ],
      questions: [
        {
          question: "",
          typeId: 1,
          popoverShow: false,
          options: [
            {
              value: "",
            },
            {
              value: "",
            },
          ],
          isSave: false,
          saveObj: {
            question: "",
            options: [],
            typeId: 1,
          },
        },
      ],
    };
  },
  props: {
    typeName: String,
    reset: Object,
  },
  computed: {
    isLaunch() {
      const allLen = this.questions.length;
      const filterLen = this.questions.filter((r) => r.isSave).length;
      return allLen > 0 && allLen == filterLen;
    },
  },
  mounted() {},
  methods: {
    onAddQuestion() {
      this.questions.push({
        question: "",
        typeId: 1,
        popoverShow: false,
        options: [
          {
            value: "",
          },
          {
            value: "",
          },
        ],
        isSave: false,
        saveObj: {
          question: "",
          options: [],
          typeId: 1,
        },
      });
    },
    onSave(question) {
      if (this.isSave(question)) {
        question.saveObj = {
          question: question.question,
          options: question.options.map((r) => r.value),
          typeId: question.typeId,
        };
        question.isSave = true;
      }
    },
    onSelect(id, question) {
      question.typeId = id;
      question.popoverShow = false;
    },
    selectLabel(typeId) {
      return this.selectList.filter((r) => r.id == typeId)[0]?.label;
    },
    isSave(question) {
      const allLen = question.options.length;
      const filterLen = question.options.filter((r) => r.value).length;
      return question.question && allLen > 0 && allLen == filterLen;
    },
  },
};
</script>
<style scoped>
</style>