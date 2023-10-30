<template>
  <div class="p-6 h-full w-full flex flex-col items-center justify-center">
    <JoinHeader />
    <div
      class="relative w-[640px] h-[360px] rounded-xl overflow-hidden mt-10 bg-[#191B23]"
    >
      <video
        autoplay
        playsinline
        class="h-full w-full object-cover"
        ref="video"
      ></video>
      <div
        class="absolute right-2 top-2 rounded-full w-9 h-9 bg-[#191e27] flex items-center justify-center"
      >
        <div class="flex items-center gap-1" v-if="isAudioEnabled">
          <div
            class="w-1 h-1 rounded transition-all duration-500 bg-white"
            :style="{ height: `${(7 / 100) * audioLevel + 4}px` }"
          ></div>
          <div
            class="w-1 h-1 rounded transition-all bg-white"
            :style="{ height: `${(12 / 100) * audioLevel + 4}px` }"
          ></div>
          <div
            class="w-1 h-1 rounded transition-all duration-500 bg-white"
            :style="{ height: `${(7 / 100) * audioLevel + 4}px` }"
          ></div>
        </div>
        <i v-else class="text-xl el-icon-turn-off-microphone text-white"></i>
      </div>
    </div>
    <div class="max-w-[640px] w-full">
      <div class="mt-4 w-full flex justify-between">
        <div class="flex gap-2">
          <div
            class="rounded-md border border-[#272a31] text-white flex overflow-hidden"
            :class="!isAudioEnabled ? 'bg-[#293042]' : ''"
          >
            <div
              class="w-10 h-10 border-r border-[#272a31] flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
              @click="toggleAudio"
            >
              <i
                class="text-xl"
                :class="
                  isAudioEnabled
                    ? 'el-icon-microphone'
                    : 'el-icon-turn-off-microphone'
                "
              ></i>
            </div>
            <el-popover
              width="256"
              :visible-arrow="false"
              popper-class="!p-0 !border-0 !rounded-md overflow-hidden !bg-transparent"
              trigger="click"
            >
              <div class="max-h-[24rem] overflow-y hide-scrollbar rounded-md">
                <div
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-4 border-t border-[#1D1F27] first:border-transparent hover:bg-[#272932] cursor-pointer"
                  v-for="item in microphoneList"
                  :key="item.deviceId"
                  :class="
                    deviceSelect.audioInputDeviceId == item.deviceId
                      ? 'bg-[#272932]'
                      : ''
                  "
                  @click="setAudioDevice(item.deviceId)"
                >
                  {{ item.label }}
                </div>
              </div>
              <div
                slot="reference"
                class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
              >
                <i class="el-icon-more rotate-90 text-xl"></i>
              </div>
            </el-popover>
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
                class="text-xl"
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
              <i class="el-icon-more rotate-90 text-xl"></i>
            </div>
          </div>

          <div
            v-if="isVideoEnabled"
            class="rounded-md border border-[#272a31] text-white flex overflow-hidden"
            :class="isVirtualBackgroundEnabled ? 'bg-[#293042]' : ''"
          >
            <div
              class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
              @click="toggleVB"
            >
              <i class="el-icon-picture text-xl"></i>
            </div>
          </div>
        </div>
        <div
          class="rounded-md border border-[#272a31] text-white flex overflow-hidden"
        >
          <div
            class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[#8F9099]"
          >
            <i class="el-icon-setting text-xl"></i>
          </div>
        </div>
      </div>
      <div class="my-6 flex gap-4">
        <div class="flex items-center w-full">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            required
            v-model="formData.name"
            class="appearance-none border border-transparent bg-[#191B23] text-[#f0f0fb] w-full h-full py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#538eff] text-base"
          />
        </div>
        <el-button
          type="primary"
          :disabled="!formData.name || isLoading"
          @click="onJoin"
        >
          Join Now
        </el-button>
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
  selectDominantSpeaker,
  selectPeerAudioByID,
  selectDevices,
  selectLocalMediaSettings,
} from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  name: "Join",
  data() {
    return {
      isLoading: false,
      formData: {
        name: "",
        room: "ebx-uuco-utc",
      },
      isAudioEnabled: hmsStore.getState(selectIsLocalAudioEnabled),
      isVideoEnabled: hmsStore.getState(selectIsLocalVideoEnabled),
      virtualBackground: null,
      isVirtualBackgroundEnabled: false,

      peer: null,
      audioLevel: 0,
      videoList: [],
      microphoneList: [],
      speakerList: [],
      deviceSelect: {},
    };
  },
  mounted() {
    this.onInit();
    this.virtualBackground = new HMSVirtualBackgroundPlugin("blur");
    this.virtualBackground.init();
    // this.changeBackground();
    hmsStore.subscribe(this.renderPeers, selectLocalPeer);
    hmsStore.subscribe(this.onAudioChange, selectIsLocalAudioEnabled);
    hmsStore.subscribe(this.onVideoChange, selectIsLocalVideoEnabled);
    // hmsStore.subscribe(this.activeSpeaker, selectPeerAudioByID(this.peer.id));
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
        captureNetworkQualityInPreview: false, // whether to measure network score in preview
      };
      await hmsActions.preview(config);
    },
    renderPeers(peer) {
      const element = this.$refs.video;
      if (peer) {
        if (!this.peer) {
          hmsStore.subscribe(
            this.updateAudioLevel,
            selectPeerAudioByID(peer.id)
          );
          this.peer;
        }

        hmsActions.attachVideo(peer.videoTrack, element);
        this.getDevices();
      }
    },
    async onJoin() {
      if (!this.formData.name) return;
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
    updateAudioLevel(audioLevel) {
      this.audioLevel = audioLevel;
    },
    async getDevices() {
      await new Promise((resolve) => setTimeout(resolve, 300));
      // {audioInput, audioOutput, videoInput}
      const devices = hmsStore.getState(selectDevices);

      // {audioInputDeviceId, audioOutputDeviceId, videoInputDeviceId}
      this.deviceSelect = hmsStore.getState(selectLocalMediaSettings);

      this.microphoneList = devices.audioInput;
      this.speakerList = devices.audioOutput;
      this.videoList = devices.videoInput;
    },
    async setAudioDevice(selectedAudioDeviceID) {
      // Update AudioInput device by calling
      hmsActions.setAudioSettings({ deviceId: selectedAudioDeviceID });
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.deviceSelect = hmsStore.getState(selectLocalMediaSettings);
    },
    async setVideoDevice(selecedVideoDeviceID) {
      // Update VideoInput device by calling
      hmsActions.setVideoSettings({ deviceId: selecedVideoDeviceID });
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.deviceSelect = hmsStore.getState(selectLocalMediaSettings);
    },
    async setAudioOutputDevice(selectedAudioOutputDeviceID) {
      // Update AudioOutput device by calling
      hmsActions.setAudioOutputDevice(selectedAudioOutputDeviceID);
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.deviceSelect = hmsStore.getState(selectLocalMediaSettings);
    },
  },
};
</script>
