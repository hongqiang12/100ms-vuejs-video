<template>
  <div class="p-6 h-full w-full flex flex-col items-center justify-center">
    <JoinHeader />
    <div
      class="relative w-[640px] h-[360px] rounded-xl overflow-hidden mt-10 bg-[#191B23]"
    >
      <video
        autoplay
        playsinline
        class="h-full w-full object-cover scale-x-[-1]"
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
            <el-popover
              width="256"
              :visible-arrow="false"
              popper-class="!p-0 !border-0 !rounded-md overflow-hidden !bg-transparent"
              trigger="click"
            >
              <div class="max-h-[24rem] overflow-y hide-scrollbar rounded-md">
                <div
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-4 border-t border-[#1D1F27] first:border-transparent hover:bg-[#272932] cursor-pointer"
                  v-for="item in videoList"
                  :key="item.deviceId"
                  :class="
                    deviceSelect.videoInputDeviceId == item.deviceId
                      ? 'bg-[#272932]'
                      : ''
                  "
                  @click="setVideoDevice(item.deviceId)"
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
            @click="onSetting"
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
    <el-dialog
      :visible.sync="settingVisible"
      width="800px"
      :show-close="false"
      custom-class="border border-[#272932] rounded-xl !bg-transparent"
    >
      <div class="py-10 px-6 bg-[#0B0E15] w-[300px] text-[#f0f0fb]">
        <p class="text-2xl font-semibold">Settings</p>
        <div class="pt-6">
          <div
            class="flex gap-4 p-4 rounded-lg cursor-pointer"
            :class="tabIndex == 0 ? 'bg-[#2e3038]' : ''"
            @click="onTab(0)"
          >
            <i class="el-icon-setting text-xl"></i>
            Device Settings
          </div>
          <div
            class="flex gap-4 p-4 rounded-lg cursor-pointer"
            :class="tabIndex == 1 ? 'bg-[#2e3038]' : ''"
            @click="tabIndex = 1"
          >
            <i class="el-icon-bell text-xl"></i>
            Notifications
          </div>
          <div
            class="flex gap-4 p-4 rounded-lg cursor-pointer"
            :class="tabIndex == 2 ? 'bg-[#2e3038]' : ''"
            @click="tabIndex = 2"
          >
            <i class="el-icon-menu text-xl"></i>
            Layout
          </div>
        </div>
      </div>
      <div class="bg-[#191B23] p-6 relative flex-1">
        <div
          class="w-8 h-8 absolute top-6 right-6 rounded hover:bg-[#8f909a] flex items-center justify-center text-white cursor-pointer"
          @click="settingVisible = false"
        >
          <i class="el-icon-close text-2xl font-bold"></i>
        </div>
        <p class="text-xl font-semibold text-[#f0f0fb] mb-8">
          {{ dialogTitle }}
        </p>
        <div class="overflow-y h-[550px] hide-scrollbar" v-if="tabIndex == 0">
          <div class="my-6 px-6">
            <video
              autoplay
              playsinline
              class="h-full w-full object-cover scale-x-[-1] rounded-xl"
              ref="dialogVideo"
            ></video>
          </div>
          <div class="mb-6">
            <p class="text-base mb-2 text-[#f0f0fb]">Video</p>
            <el-popover
              width="450"
              v-model="videoDialogShow"
              :visible-arrow="false"
              popper-class="!px-0 !bg-[#11131b] !border-0 !rounded-md overflow-hidden"
              trigger="click"
            >
              <div class="max-h-[24rem] overflow-y hide-scrollbar rounded-md">
                <div
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-4 border-t border-[#1D1F27] first:border-transparent hover:bg-[#272932] cursor-pointer"
                  v-for="item in videoList"
                  :key="item.deviceId"
                  :class="
                    deviceSelect.videoInputDeviceId == item.deviceId
                      ? 'bg-[#272932]'
                      : ''
                  "
                  @click="setVideoDevice(item.deviceId)"
                >
                  {{ item.label }}
                </div>
              </div>
              <div
                slot="reference"
                class="py-3 px-5 flex items-center cursor-pointer bg-[#272932] rounded-lg text-[#f0f0fb]"
              >
                <i class="el-icon-video-camera text-xl"></i>
                <p class="flex-1 w-[324px] mx-3 text-base truncate">
                  {{ videoName }}
                </p>
                <i
                  class="el-icon-arrow-down text-xl"
                  :class="videoDialogShow ? 'rotate-180' : ''"
                ></i>
              </div>
            </el-popover>
          </div>
          <div class="mb-6">
            <p class="text-base mb-2 text-[#f0f0fb]">Microphone</p>
            <el-popover
              width="450"
              v-model="microphoneDialogShow"
              :visible-arrow="false"
              popper-class="!px-0 !bg-[#11131b] !border-0 !rounded-md overflow-hidden"
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
                class="py-3 px-5 flex items-center cursor-pointer bg-[#272932] rounded-lg text-[#f0f0fb]"
              >
                <i class="el-icon-microphone text-xl"></i>
                <p class="flex-1 w-[324px] mx-3 text-base truncate">
                  {{ microphoneName }}
                </p>
                <i
                  class="el-icon-arrow-down text-xl"
                  :class="microphoneDialogShow ? 'rotate-180' : ''"
                ></i>
              </div>
            </el-popover>
          </div>
          <div class="mb-6">
            <p class="text-base mb-2 text-[#f0f0fb]">Speaker</p>
            <div class="flex gap-2">
              <el-popover
                width="340"
                v-model="speakerDialogShow"
                :visible-arrow="false"
                popper-class="!px-0 !bg-[#11131b] !border-0 !rounded-md overflow-hidden"
                trigger="click"
              >
                <div class="max-h-[24rem] overflow-y hide-scrollbar rounded-md">
                  <div
                    class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-4 border-t border-[#1D1F27] first:border-transparent hover:bg-[#272932] cursor-pointer"
                    v-for="item in speakerList"
                    :key="item.deviceId"
                    :class="
                      deviceSelect.audioOutputDeviceId == item.deviceId
                        ? 'bg-[#272932]'
                        : ''
                    "
                    @click="setAudioOutputDevice(item.deviceId)"
                  >
                    {{ item.label }}
                  </div>
                </div>
                <div
                  slot="reference"
                  class="py-3 px-5 w-full flex items-center cursor-pointer bg-[#272932] rounded-lg text-[#f0f0fb]"
                >
                  <SvgSpeaker />
                  <p class="flex-1 w-[232px] mx-3 text-base truncate">
                    {{ speakerName }}
                  </p>
                  <i
                    class="el-icon-arrow-down text-xl"
                    :class="speakerDialogShow ? 'rotate-180' : ''"
                  ></i>
                </div>
              </el-popover>
              <div
                class="bg-[#2e3038] text-[#f0f0fb] py-3 px-5 flex-1 flex items-center gap-1 rounded-lg cursor-pointer hover:bg-[#272932]"
              >
                <SvgSpeaker />
                Test
              </div>
            </div>
          </div>
        </div>
        <div class="text-base" v-if="tabIndex == 1">
          <div
            class="my-1 py-4 border-b border-[#1D1F27] flex items-center justify-between cursor-pointer"
            @click="peerJoined = !peerJoined"
          >
            <div
              class="flex items-center gap-4 text-white"
              :class="peerJoined ? '' : 'opacity-50'"
            >
              <SvgUserAdd />
              Peer Joined
            </div>
            <el-switch
              :value="peerJoined"
              inactive-color="#191b23"
              active-color="#2572ED"
            >
            </el-switch>
          </div>
          <div
            class="my-1 py-4 border-b border-[#1D1F27] flex items-center justify-between cursor-pointer"
            @click="peerLeave = !peerLeave"
          >
            <div
              class="flex items-center gap-4 text-white"
              :class="peerLeave ? '' : 'opacity-50'"
            >
              <SvgUserRemove />
              Peer Leave
            </div>
            <el-switch
              :value="peerLeave"
              inactive-color="#191b23"
              active-color="#2572ED"
            >
            </el-switch>
          </div>
          <div
            class="my-1 py-4 border-b border-[#1D1F27] flex items-center justify-between cursor-pointer"
            @click="handRaised = !handRaised"
          >
            <div
              class="flex items-center gap-4 text-white"
              :class="handRaised ? '' : 'opacity-50'"
            >
              <SvgHand />
              Hand Raised
            </div>
            <el-switch
              :value="handRaised"
              inactive-color="#191b23"
              active-color="#2572ED"
            >
            </el-switch>
          </div>
          <div
            class="my-1 py-4 border-b border-[#1D1F27] flex items-center justify-between cursor-pointer"
            @click="errored = !errored"
          >
            <div
              class="flex items-center gap-4 text-white"
              :class="errored ? '' : 'opacity-50'"
            >
              <SvgWarning />
              Error
            </div>
            <el-switch
              :value="errored"
              inactive-color="#191b23"
              active-color="#2572ED"
            >
            </el-switch>
          </div>
        </div>
        <div class="text-base" v-if="tabIndex == 2">
          <div
            class="my-1 py-4 border-b border-[#1D1F27] flex items-center justify-between cursor-pointer"
            @click="audioed = !audioed"
          >
            <div
              class="flex items-center gap-4 text-white"
              :class="audioed ? '' : 'opacity-50'"
            >
              Audio Only Mode
            </div>
            <el-switch
              :value="audioed"
              inactive-color="#191b23"
              active-color="#2572ED"
            >
            </el-switch>
          </div>
          <div
            class="my-1 py-4 border-b border-[#1D1F27] flex items-center justify-between cursor-pointer"
            @click="videoed = !videoed"
          >
            <div
              class="flex items-center gap-4 text-white"
              :class="videoed ? '' : 'opacity-50'"
            >
              Mirror Local Video
            </div>
            <el-switch
              :value="videoed"
              inactive-color="#191b23"
              active-color="#2572ED"
            >
            </el-switch>
          </div>
          <div class="my-1 py-4 flex items-center justify-between">
            <div class="flex items-center gap-4 text-white">
              Tiles In View({{ volume }})
            </div>
            <div class="w-[226px]">
              <el-slider v-model="volume" @change="onChangeVolume"></el-slider>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
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
  HMSNotificationTypes,
  selectAudioTrackVolume,
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
      settingVisible: false,

      videoDialogShow: false,
      microphoneDialogShow: false,
      speakerDialogShow: false,

      tabIndex: 0,

      peerJoined: false,
      peerLeave: false,
      handRaised: true,
      errored: true,
      audioed: false,
      videoed: true,
      volume: 100,
    };
  },
  computed: {
    videoName() {
      return this.videoList.filter(
        (r) => r.deviceId == this.deviceSelect.videoInputDeviceId
      )[0]?.label;
    },
    microphoneName() {
      return this.microphoneList.filter(
        (r) => r.deviceId == this.deviceSelect.audioInputDeviceId
      )[0]?.label;
    },
    speakerName() {
      return this.speakerList.filter(
        (r) => r.deviceId == this.deviceSelect.audioOutputDeviceId
      )[0]?.label;
    },
    dialogTitle() {
      const names = ["Device Settings", "Notifications", "Layout"];
      return names[this.tabIndex];
    },
  },
  mounted() {
    this.onInit();
    // console.log(HMSNotificationTypes);
    this.onNotification();
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
    async renderPeers(peer) {
      const element = this.$refs.video;
      if (peer) {
        if (!this.peer) {
          hmsStore.subscribe(
            this.updateAudioLevel,
            selectPeerAudioByID(peer.id)
          );
          this.peer = peer;
          this.volume = hmsStore.getState(selectAudioTrackVolume(peer.audioTrack)) || 100;
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
      console.log(this.deviceSelect);
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
    async onSetting() {
      this.settingVisible = true;
      this.tabIndex = 0;
      this.$nextTick(() => {
        const element = this.$refs.dialogVideo;
        if (this.peer) {
          hmsActions.attachVideo(this.peer.videoTrack, element);
        }
      });
    },
    onTab(index) {
      this.tabIndex = index;
      this.$nextTick(() => {
        const element = this.$refs.dialogVideo;
        if (this.peer) {
          hmsActions.attachVideo(this.peer.videoTrack, element);
        }
      });
    },
    onNotification() {
      const unsubscribe = hmsNotifications.onNotification((notification) => {
        console.log("notification type", notification.type);
        console.log("data", notification.data);

        // you can use the following to show appropriate toast notifications for eg.
        switch (notification.type) {
          case HMSNotificationTypes.PEER_LIST:
            console.log(`${notification.data} are the peers in the room`); // received right after join
            break;
          case HMSNotificationTypes.PEER_JOINED:
            console.log(`${notification.data.name} joined`);
            break;
          case HMSNotificationTypes.PEER_LEFT:
            console.log(`${notification.data.name} left`);
            break;
          case HMSNotificationTypes.NEW_MESSAGE:
            console.log(
              `${notification.data.message} received from ${notification.data.senderName}`
            );
            break;
          case HMSNotificationTypes.ERROR:
            console.log("[Error]", notification.data);
            console.log("[Error Code]", notfication.data.code);
            break;
          case HMSNotificationTypes.RECONNECTING:
            console.log("[Reconnecting]", notification.data);
            break;
          case HMSNotificationTypes.RECONNECTED:
            console.log("[Reconnected]");
            break;
          case HMSNotificationTypes.NAME_UPDATED:
          case HMSNotificationTypes.METADATA_UPDATED:
          case HMSNotificationTypes.ROLE_UPDATED:
            console.log(
              `peer updated(${notification.type}), new peer=`,
              notification.data
            );
            break;
          case HMSNotificationTypes.TRACK_DEGRADED:
            console.log(
              `track - ${notification.data} degraded due to poor network`
            );
            break;
          case HMSNotificationTypes.TRACK_RESTORED:
            console.log(`track - ${notification.data} recovered`);
            break;
          case HMSNotificationTypes.ROOM_ENDED:
            console.log(`room ended, reason - ${notification.data.reason}`);
            break;
          case HMSNotificationTypes.REMOVED_FROM_ROOM:
            console.log(
              `removed from room, reason - ${notification.data.reason}`
            );
            break;
          case HMSNotificationTypes.DEVICE_CHANGE_UPDATE:
            console.log(`device changed - ${notification.data}`);
            break;
          default:
            break;
        }
      });
    },
    onChangeVolume(value) {
      hmsActions.setVolume(value, this.peer.audioTrack);
    },
  },
};
</script>
<style scoped>
:deep(.el-dialog__header) {
  padding: 0;
}
:deep(.el-dialog__body) {
  padding: 0;
  display: flex;
  min-height: 656px;
}
:deep(.el-popover) {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px !important;
}
:deep(.el-switch__core) {
  border-color: #444954 !important;
}
:deep(.el-switch.is-checked .el-switch__core) {
  border-color: #2572ed !important;
}
</style>
