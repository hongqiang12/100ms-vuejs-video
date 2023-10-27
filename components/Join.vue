<template>
  <div class="mt-8 mx-auto w-full flex flex-col items-center justify-center">
    <div class="">
      <div
        class="w-[640px] h-[360px] rounded-xl overflow-hidden mb-4 bg-[#191B23]"
      >
        <video
          autoplay
          playsinline
          class="h-full w-full object-cover"
          ref="video"
        ></video>
      </div>
      <div class="my-4 flex gap-3">
        <div
          class="rounded-md border border-[#272a31] text-white flex overflow-hidden"
          :class="!isAudioEnabled ? 'bg-[#293042]' : ''"
        >
          <div
            class="w-10 h-10 border-r border-[#272a31] flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
            @click="toggleAudio"
          >
            <i
              :class="
                isAudioEnabled
                  ? 'el-icon-microphone'
                  : 'el-icon-turn-off-microphone'
              "
            ></i>
          </div>
          <div
            class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
          >
            <i class="el-icon-more rotate-90"></i>
          </div>
        </div>
        <div
          class="rounded-md border border-[#272a31] text-white flex overflow-hidden"
          :class="!isVideoEnabled ? 'bg-[#293042]' : ''"
        >
          <div
            class="w-10 h-10 border-r border-[#272a31] flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
            @click="toggleVideo"
          >
            <i
              :class="
                isVideoEnabled
                  ? 'el-icon-video-camera-solid'
                  : 'el-icon-video-camera'
              "
            ></i>
          </div>
          <div
            class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
          >
            <i class="el-icon-more rotate-90"></i>
          </div>
        </div>

        <div
          class="rounded-md border border-[#272a31] text-white flex overflow-hidden"
          :class="isVirtualBackgroundEnabled ? 'bg-[#293042]' : ''"
        >
          <div
            class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
            @click="toggleVB"
          >
            <i class="el-icon-picture"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white w-[448px] py-10 px-5 shadow sm:rounded-lg sm:px-10">
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
import {
  HMSVBPlugin,
  HMSVirtualBackgroundPlugin,
  HMSVirtualBackgroundTypes,
} from "@100mslive/hms-virtual-background";

import {
  selectLocalPeer,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsLocalVideoPluginPresent,
} from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  name: "Join",
  data() {
    return {
      isLoading: false,
      formData: {
        name: "admin",
        room: "ebx-uuco-utc",
      },
      isAudioEnabled: hmsStore.getState(selectIsLocalAudioEnabled),
      isVideoEnabled: hmsStore.getState(selectIsLocalVideoEnabled),
      virtualBackground: null,
      isVirtualBackgroundEnabled: false,
    };
  },
  mounted() {
    this.onInit();
    this.virtualBackground = new HMSVirtualBackgroundPlugin('blur');
    console.log(this.virtualBackground);
    this.virtualBackground.init();
    // this.changeBackground();
    hmsStore.subscribe(this.renderPeers, selectLocalPeer);
    hmsStore.subscribe(this.onAudioChange, selectIsLocalAudioEnabled);
    hmsStore.subscribe(this.onVideoChange, selectIsLocalVideoEnabled);
  },
  methods: {
    async onInit() {
      const authToken = await this.getAuthTokenByRoomCode(this.formData.room);
      const config = {
        userName: this.formData.name,
        authToken: authToken, // client-side token generated from your token service
        settings: {
          // initial states
          isAudioMuted: false,
          isVideoMuted: false,
        },
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: true, // whether to measure network score in preview
      };
      await hmsActions.preview(config);
    },
    renderPeers(peer) {
      const element = this.$refs.video;
      if (peer) {
        hmsActions.attachVideo(peer.videoTrack, element);
      }
    },
    async onJoin() {
      this.isLoading = true;
      const authToken = await this.getAuthTokenByRoomCode(this.formData.room);
      const config = {
        userName: this.formData.name,
        authToken: authToken,
        metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
        rememberDeviceSelection: true, // remember manual device change
        captureNetworkQualityInPreview: false, // whether to measure network score in preview
      };
      await hmsActions.join(config);
      this.isLoading = false;
    },
    async getAuthTokenByRoomCode(roomCode) {
      return await hmsActions.getAuthTokenByRoomCode({ roomCode });
    },
    onAudioChange(newAudioState) {
      this.isAudioEnabled = newAudioState;
    },
    onVideoChange(newVideoState) {
      this.isVideoEnabled = newVideoState;
    },
    async toggleAudio() {
      const enabled = hmsStore.getState(selectIsLocalAudioEnabled);
      await hmsActions.setLocalAudioEnabled(!enabled);
    },
    async toggleVideo() {
      const enabled = hmsStore.getState(selectIsLocalVideoEnabled);
      await hmsActions.setLocalVideoEnabled(!enabled);
    },

    // hms-virtual-background
    async changeBackground() {
      if (!this.virtualBackground.checkSupport()) return;
      // for blurring the background
      // await this.virtualBackground.current.setBackground(
      //   HMSVirtualBackgroundTypes.BLUR,
      //   HMSVirtualBackgroundTypes.BLUR
      // );
      // for setting an image
      const image = document.createElement("img");
      image.src = "./Thumbnail.png";
      await this.virtualBackground.setBackground(
        image,
        HMSVirtualBackgroundTypes.IMAGE
      );
    },
    async toggleVB() {
      const isVirtualBackgroundEnabled = hmsStore.getState(
        selectIsLocalVideoPluginPresent(this.virtualBackground.getName())
      );
      this.isVirtualBackgroundEnabled = isVirtualBackgroundEnabled;
      try {
        if (!isVirtualBackgroundEnabled) {
          // Recommended value
          const pluginFrameRate = 15;
          // add virtual background
          await hmsActions.addPluginToVideoTrack(
            this.virtualBackground,
            pluginFrameRate
          );
        } else {
          // remove virtual background
          await hmsActions.removePluginFromVideoTrack(this.virtualBackground);
        }
        this.isVirtualBackgroundEnabled = !isVirtualBackgroundEnabled;
      } catch (error) {
        console.log("failed to set virtual background -", error);
      }
    },
  },
};
</script>
