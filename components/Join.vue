<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-10 px-5 shadow sm:rounded-lg sm:px-10">
      <div class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-2xl text-gray-700">
            Name
          </label>
          <div class="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              v-model="formData.name"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="room" class="block text-sm font-medium text-gray-700">
            Room
          </label>
          <div class="flex mt-1 gap-2">
            <input
              id="room"
              name="room"
              type="text"
              required
              disabled
              v-model="formData.room"
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:cursor-not-allowed"
            />
            <button
              @click="formData.room = 'ebx-uuco-utc'"
              class="w-20 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Host
            </button>
            <button
              @click="formData.room = 'cmk-ieal-qoe'"
              class="w-20 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guest
            </button>
          </div>
        </div>

        <div>
          <button
            @click="onJoin"
            :disabled="
              formData.name === '' || formData.room === '' || isLoading
            "
            :class="{ 'cursor-not-allowed': isLoading }"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              class="animate-spin mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              v-if="isLoading"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            {{ isLoading ? "Joining..." : "Join" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  name: "Join",
  data() {
    return {
      isLoading: false,
      formData: {
        name: "",
        room: "",
      },
    };
  },
  mounted() {
    // this.onInit();
  },
  methods: {
    async onInit() {
      const config = {
        userName: "Daniel",
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NTM3MmM4ZjY4MTExZjZmZTRiNTdhN2QiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NTM3MmUyNDY5YjhhNzM5YmUwOGJmMTkiLCJ1c2VyX2lkIjoiZWExZTU4ZGUtY2E3NC00MWEyLTljZWItZTNiNDUxNGY4Y2E0IiwiZXhwIjoxNjk4MjIxNDMwLCJqdGkiOiJkMWU5ZmI1YS1hZjkyLTRhNWQtODg4OS1jNTY4ZjMzNTEyY2MiLCJpYXQiOjE2OTgxMzUwMzAsImlzcyI6IjY1MzcyYzhmNjgxMTFmNmZlNGI1N2E3YiIsIm5iZiI6MTY5ODEzNTAzMCwic3ViIjoiYXBpIn0.8w3XMeC7851-D2pVR-6mT0XKnrkluxX27y0_x5-hZx8", // client-side token generated from your token service
        settings: {
          // initial states
          isAudioMuted: true,
          isVideoMuted: false,
        },
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: false, // whether to measure network score in preview
      };
      await hmsActions.preview(config);
    },
    async onJoin() {
      this.isLoading = true;
      const authToken = await this.getAuthTokenByRoomCode(this.formData.room);
      const config = {
        userName: this.formData.name,
        authToken: authToken,
        settings: {
          // initial states
          isAudioMuted: true,
          isVideoMuted: false,
        },
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: false, // whether to measure network score in preview
      };
      await hmsActions.join(config);
      this.isLoading = false;
    },
    async getAuthTokenByRoomCode(roomCode) {
      return await hmsActions.getAuthTokenByRoomCode({roomCode});
    },
  },
};
</script>
