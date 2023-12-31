<template>
  <div class="p-6">
    <div
      class="p-4 bg-[#191B23] rounded-lg mb-3"
      v-for="(question, m) in questions"
      :key="m"
    >
      <p class="text-[#8f909a] text-xs uppercase">
        QUESTION {{ m + 1 }} OF {{ questions.length }}
        <span v-if="question.isSave">: {{ question.saveObj.type }}</span>
      </p>
      <div v-if="question.isSave" class="text-sm font-[500]">
        <p class="text-white pt-2 pb-4">{{ question.saveObj.question }}</p>
        <div
          class="py-2 text-white/80 flex items-center gap-2"
          v-for="(item, index) in question.saveObj.options"
          :key="index"
        >
          {{ item.text }}
          <div class="text-[#36B37E] flex items-center justify-center" v-if="item.isCorrectAnswer">
            <SvgOptionChecked />
          </div>
        </div>
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
              :key="item"
              :class="question.type == item ? 'bg-[#272932]' : ''"
              @click="onSelect(item, question)"
            >
              {{ item }}
            </div>
          </div>
          <div
            slot="reference"
            class="py-3 px-5 flex items-center justify-between cursor-pointer bg-[#272932] rounded-lg text-[#f0f0fb]"
          >
            <p class="text-base truncate">
              {{ question.type }}
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
            <div v-if="typeName == 'quiz'">
              <div
                v-if="question.type == 'Single Choice'"
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="[
                  question.index == index
                    ? 'border-[#538eff] cursor-pointer'
                    : 'border-white cursor-pointer',
                ]"
                @click="onChecked(question, index)"
              >
                <div
                  class="w-[10px] h-[10px] rounded-full bg-[#538eff]"
                  v-if="question.index == index"
                ></div>
              </div>
              <div
                v-else
                class="w-[18px] h-[18px] cursor-pointer rounded bg-white overflow-hidden"
                @click="onChecked(question, index)"
              >
                <div
                  class="bg-[#2572ED] text-white w-full h-full flex items-center justify-center"
                  v-if="(question.indexs || []).includes(index)"
                >
                  <SvgCheckboxChecked />
                </div>
              </div>
            </div>
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
        <div v-if="typeName == 'quiz'" class="flex gap-2 text-white/70 mt-4">
          <el-switch
            v-model="question.skippable"
            inactive-color="#191b23"
            active-color="#2572ED"
          >
          </el-switch>
          <p class="text-sm">Not required to answer</p>
        </div>
      </div>

      <div
        class="flex items-center justify-between"
        :class="question.isSave ? '' : 'mt-8'"
      >
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
        @click="onLaunch"
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
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  data() {
    return {
      detailed: false,

      selectList: ["Single Choice", "Multiple Choice"],
      questions: [
        {
          question: "",
          type: "Single Choice",
          popoverShow: false,
          skippable: false,
          index: null,
          indexs: [],
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
            skippable: false,
            type: "Single Choice",
          },
        },
      ],
    };
  },
  props: {
    typeName: String,
    id: String,
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
    async onLaunch() {
      if (!this.isLaunch) return;
      console.log(this.questions);
      await hmsActions.interactivityCenter.addQuestionsToPoll(
        this.id,
        this.questions.map((r) => {
          return {
            type: r.saveObj.type.toLowerCase().split(" ").join("-"),
            text: r.saveObj.question,
            skippable: r.saveObj.skippable,
            options: r.saveObj.options,
          };
        })
        // [
        //   {
        //     type: "single-choice",
        //     text: "How is the weather today?",
        //     options: [
        //       {
        //         text: "hot",
        //         isCorrectAnswer: true, // in case of quiz
        //       },
        //       { text: "warm" },
        //       { text: "cold" },
        //     ],
        //   },
        // ]
      );
      await hmsActions.interactivityCenter.startPoll(this.id);
      this.$emit("onLaunch", this.typeName, this.id);
    },
    onAddQuestion() {
      this.questions.push({
        question: "",
        type: "Single Choice",
        popoverShow: false,
        skippable: false,
        index: null,
        indexs: [],
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
          type: "Single Choice",
          skippable: false,
        },
      });
    },
    onSave(question) {
      if (question.isSave) {
        question.isSave = false;
      } else if (this.isSave(question)) {
        question.saveObj = {
          question: question.question,
          options: question.options.map((r, index) => {
            if (this.typeName == "quiz") {
              if (question.type == "Single Choice") {
                if (question.index == index) {
                  return {
                    text: r.value,
                    isCorrectAnswer: true,
                  };
                } else {
                  return {
                    text: r.value,
                  };
                }
              } else {
                if (question.indexs.includes(index)) {
                  return {
                    text: r.value,
                    isCorrectAnswer: true,
                  };
                } else {
                  return {
                    text: r.value,
                  };
                }
              }
            } else {
              return {
                text: r.value,
              };
            }
          }),
          type: question.type,
          skippable: question.skippable,
        };
        question.isSave = true;
      }
    },
    onChecked(item, index) {
      if (item.type == "Single Choice") {
        item.index = index;
      } else {
        const List = item.indexs || [];
        const _index = List.indexOf(index);
        if (_index == -1) {
          List.push(index);
        } else {
          List.splice(_index, 1);
        }
        item.indexs = List;
      }
    },
    onSelect(type, question) {
      question.type = type;
      question.popoverShow = false;
    },
    isSave(question) {
      const allLen = question.options.length;
      const filterLen = question.options.filter((r) => r.value).length;
      let lock = true;
      if (this.typeName == "quiz") {
        if (question.type == "Single Choice") {
          lock = question.index !== null;
        } else {
          lock = question.indexs.length > 0;
        }
      }

      return question.question && allLen > 0 && allLen == filterLen && lock;
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