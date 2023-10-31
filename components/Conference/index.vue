<template>
  <div class="w-full h-full flex flex-col bg-[#05070e]">
    <div class="h-16 flex items-center justify-between px-6">
      <img
        src="https://aladia.it/wp-content/uploads/2022/12/cropped-Logo_Aladia-copia.png"
        class="max-h-10"
        alt=""
      />
      <el-popover
        width="256"
        :value="recordPopover"
        placement="bottom-end"
        :visible-arrow="false"
        popper-class="!p-0 !bg-[#11131b] !border-0 !rounded-md overflow-hidden"
        trigger="click"
      >
        <div class="p-3 rounded-xl">
          <p class="text-base font-[500] text-[#c5c6d1]">
            Are you sure you want to end the recording?
          </p>
          <div class="flex justify-end">
            <el-button type="danger">Stop</el-button>
          </div>
        </div>

        <div
          slot="reference"
          class="border border-[#2e3038] text-[#f0f0fb] bg-[#2e3038] text-base rounded-lg font-[500] flex items-center justify-center gap-2 py-2 px-4 cursor-pointer"
          :class="isRecording ? 'border-[#C74E5B] hover:border-[#FFB2B6]' : ''"
          @click="recordPopover = true"
        >
          <SvgLoading v-if="recordLoading" />
          <SvgRecordStart v-else />
          {{ getRecordingName }}
        </div>
        <!-- <div class="w-[256px] p-3 rounded-xl bg-[#0B0E15] absolute right-6 top-16 transition-all" v-if="recordStopShow">
          <p class="text-base font-[500] text-[#c5c6d1]">
            Are you sure you want to end the recording?
          </p>
          <div class="flex justify-end">
            <el-button type="danger">Stop</el-button>
          </div>
        </div> -->
      </el-popover>
    </div>
    <div class="flex-1 px-6">
      <div class="relative w-full h-full flex gap-2">
        <div
          ref="content"
          class="flex-1 flex-wrap place-content-center flex items-center justify-center gap-2"
        >
          <div
            v-for="peer in allPeers"
            :key="peer.id"
            class="relative flex-1 flex items-center justify-center bg-[#0B0E15] rounded-xl"
          >
            <video
              autoplay
              :muted="peer.isLocal"
              playsinline
              class="object-contain flex items-center justify-center scale-x-[-1] bg-[#0B0E15] rounded-xl"
              :class="allPeers.length > 1 ? 'w-full' : ''"
              :ref="
                (el) => {
                  if (el) videoRefs[peer.id] = el;
                }
              "
            ></video>
            <div
              class="absolute right-2 top-2 rounded-full w-9 h-9 bg-[#191e27] flex items-center justify-center"
            >
              <div
                class="flex items-center gap-1"
                v-if="
                  (peer.isLocal && isAudioEnabled) ||
                  (!peer.isLocal &&
                    remotePeerProps?.[peer.id]?.[MediaState.isAudioEnabled])
                "
              >
                <div
                  class="w-1 h-1 rounded transition-all duration-500 bg-white"
                  :style="{
                    height: `${(7 / 100) * audioLevelObj[peer.id] + 4}px`,
                  }"
                ></div>
                <div
                  class="w-1 h-1 rounded transition-all bg-white"
                  :style="{
                    height: `${(12 / 100) * audioLevelObj[peer.id] + 4}px`,
                  }"
                ></div>
                <div
                  class="w-1 h-1 rounded transition-all duration-500 bg-white"
                  :style="{
                    height: `${(7 / 100) * audioLevelObj[peer.id] + 4}px`,
                  }"
                ></div>
              </div>
              <i
                v-else
                class="text-xl el-icon-turn-off-microphone text-white"
              ></i>
            </div>
            <p
              class="flex justify-center items-center py-1 px-2 text-sm font-medium bg-black bg-opacity-80 text-white pointer-events-none absolute left-1 bottom-1 rounded-lg left-0"
            >
              <span class="inline-block">
                {{ peer.isLocal ? `You (${peer.name})` : peer.name }}</span
              >
            </p>

            <p
              class="text-white text-center absolute top-1/2 right-0 left-0"
              v-show="
                (peer.isLocal && !isVideoEnabled) ||
                (!peer.isLocal &&
                  !remotePeerProps?.[peer.id]?.[MediaState.isVideoEnabled])
              "
            >
              Camera Off
            </p>

            <el-popover
              width="240"
              :visible-arrow="false"
              placement="top-end"
              popper-class="!px-0 !bg-[#11131b] !border-0 !rounded-md overflow-hidden"
              trigger="click"
            >
              <div class="max-h-[24rem] overflow-y hide-scrollbar rounded-md">
                <div
                  v-if="!peer.isLocal"
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-2 first:border-transparent hover:bg-[#272932] cursor-pointer"
                  @click="onVideoMute(peer)"
                >
                  <div
                    v-if="
                      remotePeerProps?.[peer.id]?.[MediaState.isVideoEnabled]
                    "
                    class="flex items-center gap-2"
                  >
                    <SvgVideo />
                    Mute
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <SvgUnVideo />
                    Request Unmute
                  </div>
                </div>

                <div
                  v-if="!peer.isLocal"
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-2 first:border-transparent hover:bg-[#272932] cursor-pointer"
                  @click="onAudioMute(peer)"
                >
                  <div
                    v-if="
                      remotePeerProps?.[peer.id]?.[MediaState.isAudioEnabled]
                    "
                    class="flex items-center gap-2"
                  >
                    <SvgAudio />
                    Mute
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <SvgUnAudio />
                    Request Unmute
                  </div>
                </div>
                <div
                  v-if="!peer.isLocal"
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-2 flex items-center gap-2 first:border-transparent hover:bg-[#272932] cursor-pointer"
                  @click="onRomove(peer)"
                >
                  <SvgSpeaker />
                  Volume ({{ volumeObj[peer.id] }})
                </div>
                <div class="px-4 pb-2" v-if="!peer.isLocal">
                  <el-slider
                    v-model="volumeObj[peer.id]"
                    @change="onChangeVolume($event, peer)"
                  ></el-slider>
                </div>

                <div
                  v-if="!peer.isLocal"
                  class="bg-[#11131b] font-semibold text-[#C74E5B] text-sm p-2 flex gap-2 first:border-transparent hover:bg-[#272932] cursor-pointer"
                  @click="onRomove(peer)"
                >
                  <SvgUserClose />
                  Remove Participant
                </div>
                

                <div
                  v-if="peer.isLocal"
                  class="bg-[#11131b] font-semibold text-[#f0f0fb] text-sm p-2 flex gap-2 first:border-transparent hover:bg-[#272932] cursor-pointer"
                  @click="nameVisible = true"
                >
                  <SvgPen />
                  Change Name
                </div>
              </div>

              <div
                class="absolute right-1 bottom-1 bg-[#05070e]/60 text-white w-7 h-7 rounded-3xl flex items-center justify-center cursor-pointer"
                slot="reference"
              >
                <i class="el-icon-more rotate-90 text-lg"></i>
              </div>
            </el-popover>
          </div>
        </div>
        <div
          v-if="isChat || isList"
          class="w-[25rem] p-5 relative h-[50rem] flex flex-col bg-[#11131A] rounded"
        >
          <div class="flex mb-5 items-center gap-3">
            <div class="flex-1 p-1 flex text-[#8F9099] bg-[#191B23] rounded">
              <div
                class="w-1/2 h-9 flex items-center justify-center cursor-pointer rounded"
                @click="
                  isChat = true;
                  isList = false;
                "
                :class="isChat ? 'bg-[#2E3038] text-white font-bold' : ''"
              >
                Chat
              </div>
              <div
                class="w-1/2 h-9 flex items-center justify-center cursor-pointer rounded"
                @click="
                  isList = true;
                  isChat = false;
                "
                :class="isList ? 'bg-[#2E3038] text-white font-bold' : ''"
              >
                Participants
              </div>
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center hover:bg-white/60 rounded cursor-pointer"
              @click="
                isChat = false;
                isList = false;
              "
            >
              <i class="el-icon-close text-white"></i>
            </div>
          </div>
          <div v-if="isChat" class="flex-1 flex flex-col">
            <div
              ref="messagescroll"
              class="flex-1 overflow-y-auto hide-scrollbar p-2"
            >
              <div class="mb-2" v-for="item in messageList" :key="item.id">
                <div
                  class="flex items-center justify-between text-[rgba(230,236,244,.9)]"
                >
                  <div class="text-sm">{{ item.senderName }}</div>
                  <div class="text-xs">{{ dateTimeFormat(item.time) }}</div>
                </div>
                <div class="text-white text-base">{{ item.message }}</div>
              </div>
            </div>
            <div class="h-10 flex p-2 bg-[#191B23] rounded">
              <input
                type="text"
                v-model="sendValue"
                placeholder="send a message..."
                class="h-full flex-1 outline-none bg-transparent text-white placeholder-[#565656] group-hover/item:placeholder-[#f1f1f1]"
              />
              <div
                class="w-10 flex items-center justify-center cursor-pointer rounded bg-[#ccc]"
                @click="onSendBroadcastMessage"
              >
                send
              </div>
            </div>
          </div>
          <div v-if="isList" class="flex-1 overflow-y-auto hide-scrollbar">
            <div
              class="border border-[#1D1F27] rounded p-4 mb-2 flex justify-between"
              v-for="peer in allPeers"
              :key="peer.id"
            >
              <div class="text-white">
                {{ peer.isLocal ? `${peer.name} (You)` : peer.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-14 py-2 flex items-center justify-between px-6">
      <div class="flex gap-4">
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
      <div class="flex gap-4">
        <div
          class="rounded-md border border-[#272a31] text-white w-10 h-10 cursor-pointer flex items-center justify-center overflow-hidden hover:bg-[#8F9099]"
          :class="isScreenShareEnabled ? 'bg-[#293042]' : ''"
          @click="toggleScreenShare"
        >
          <i class="el-icon-s-platform"></i>
        </div>
        <div
          class="rounded-md text-white w-10 h-10 cursor-pointer flex items-center justify-center overflow-hidden bg-[rgb(199,78,91)] hover:bg-[rgb(255,178,182)]"
          @click="leaveMeeting"
        >
          <i class="el-icon-switch-button"></i>
        </div>
      </div>
      <div class="flex gap-4">
        <div
          class="rounded-md border border-[#272a31] text-white gap-2 px-3 h-10 cursor-pointer flex items-center justify-center overflow-hidden hover:bg-[#8F9099]"
          @click="
            isChat = !isChat;
            isList = false;
          "
          :class="isChat ? 'bg-[#293042]' : ''"
        >
          <i class="el-icon-chat-square"></i>
        </div>
        <div
          class="rounded-md border border-[#272a31] text-white gap-2 px-3 h-10 cursor-pointer flex items-center justify-center overflow-hidden hover:bg-[#8F9099]"
          @click="
            isList = !isList;
            isChat = false;
          "
          :class="isList ? 'bg-[#293042]' : ''"
        >
          <i class="el-icon-s-custom"></i>
          {{ allPeers.length }}
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="nameVisible"
      width="400px"
      :show-close="false"
      custom-class="rounded-xl !bg-transparent"
    >
      <div class="bg-[#11131b] p-5 rounded-xl">
        <div class="flex items-center justify-between mb-3">
          <div class="font-semibold text-white text-base">Change Name</div>
          <i
            class="el-icon-close text-2xl font-semibold hover:opacity-80"
            @click="nameVisible = false"
          ></i>
        </div>
        <div class="text-white/80 mb-6 text-sm">
          Your name will be visible to other participants in the session.
        </div>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          required
          v-model="name"
          class="appearance-none border border-transparent bg-[#191B23] text-[#f0f0fb] w-full py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#538eff] text-base"
        />
        <div class="flex gap-4 mt-4">
          <!-- <div class="">Change</div> -->
          <el-button plain class="flex-1" @click="nameVisible = false"
            >Cancel</el-button
          >
          <el-button type="primary" class="flex-1" @click="onChangeName"
            >Change</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { HMSVirtualBackgroundPlugin } from "@100mslive/hms-virtual-background";
import dayjs from "dayjs";
import {
  selectPeers,
  HMSPeer,
  HMSTrackID,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectHMSMessages,
  selectBroadcastMessages,
  selectIsLocalScreenShared,
  selectPeerScreenSharing,
  selectIsSomeoneScreenSharing,
  selectScreenShareByPeerID,
  selectPeerSharingAudio,
  selectScreenShareAudioByPeerID,
  selectRecordingState,
  selectRTMPState,
  selectHLSState,
  selectIsLocalVideoPluginPresent,
  selectPeerAudioByID,
} from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
import { watch } from "vue";
export default {
  data() {
    return {
      recordLoading: false,
      isRecording: false,
      recordPopover: false,

      allPeers: [],
      videoRefs: {},
      remotePeerProps: {},
      isAudioEnabled: hmsStore.getState(selectIsLocalAudioEnabled),
      isVideoEnabled: hmsStore.getState(selectIsLocalVideoEnabled),
      MediaState: {
        isAudioEnabled: "isAudioEnabled",
        isVideoEnabled: "isVideoEnabled",
        audioLevel: "audioLevel",
      },
      audioLevelObj: {},
      volumeObj: {},

      sendValue: "",
      messageList: [],
      isScreenShareEnabled: hmsStore.getState(selectIsLocalScreenShared),
      isRecording: false,
      isLive: false,

      virtualBackground: null,
      isVirtualBackgroundEnabled: false,
      isSomeoneScreenSharing: false,

      isChat: false,
      isList: false,

      domStyle: {},

      nameVisible: false,
      name: "",
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    getRecordingName() {
      return this.recordLoading
        ? "Starting Recording"
        : this.isRecording
        ? "Stop Recording"
        : "Start Recording";
    },
    // videoStyle() {
    //   const Len = this.allPeers.length;
    //   let style = {};
    //   switch (Len) {
    //     case 1:
    //       style = {
    //         width: this.domStyle.width + "px",
    //         height: this.domStyle.height + "px",
    //       };
    //       break;
    //     case 2:
    //       style = {
    //         width: this.domStyle.width / 2 - 8 + "px",
    //         height: this.domStyle.width / 2 - 8 + "px",
    //       };
    //       break;
    //     default:
    //       style = {
    //         width: this.domStyle.width / 2 - 8 + "px",
    //         height: (this.domStyle.width / 2 - 8) / Math.round(Len / 2) + "px",
    //       };
    //       break;
    //   }
    //   return style;
    // },
  },
  mounted() {
    this.virtualBackground = new HMSVirtualBackgroundPlugin("blur");
    this.virtualBackground.init();
    // this.onInit();
    hmsStore.subscribe(this.renderPeers, selectPeers);
    hmsStore.subscribe(this.onAudioChange, selectIsLocalAudioEnabled);
    hmsStore.subscribe(this.onVideoChange, selectIsLocalVideoEnabled);
    hmsStore.subscribe(this.onScreenShareChange, selectIsLocalScreenShared);
    hmsStore.subscribe(this.onIsScreenShare, selectIsSomeoneScreenSharing);

    hmsStore.subscribe(this.renderMessages, selectHMSMessages); // get all messages
    hmsStore.subscribe(this.updateHLSState, selectHLSState);
    hmsStore.subscribe(this.recordingState, selectRecordingState);
    // this.onResize();
    // window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    if (this.allPeers.length) this.leaveMeeting();
    // window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      const Dom = this.$refs.content.getBoundingClientRect();
      this.domStyle = {
        width: Dom.width,
        height: Dom.height,
      };
    },
    renderMessages(messages) {
      if (!this.isChat) return;
      this.messageList = messages;
      if (this.allPeers.length) {
        this.$nextTick(() => {
          const El = this.$refs.messagescroll;
          El.scrollTo({ top: El.scrollHeight, behavior: "smooth" });
        });
      }
    },
    async onSendBroadcastMessage() {
      if (!this.sendValue) return;
      await hmsActions.sendBroadcastMessage(this.sendValue);
      this.sendValue = "";
    },

    updateHLSState(hlsState) {
      // console.log(hlsState);
      this.isLive = hlsState.running;
    },

    recordingState(recordingState) {
      // console.log(recordingState);
      this.isRecording = recordingState.browser.running;
    },

    async toggleLive() {
      if (this.isLive) {
        await hmsActions.stopHLSStreaming();
        this.isLive = false;
      } else {
        const params = {
          variants: [
            {
              meetingURL:
                "https://hongqiang12-videoconf-1038.app.100ms.live/meeting",
              metadata: "landscape",
            },
          ],
        };
        params.recording = { singleFilePerLayer: true, hlsVod: false }; // to enable recording
        try {
          await hmsActions.startHLSStreaming(params);
          this.isLive = true;
        } catch (err) {
          console.error("failed to start hls", err);
        }
      }
    },

    async toggleRTMPOrRecording() {
      if (this.isRecording) {
        await hmsActions.stopRTMPAndRecording();
        this.isRecording = false;
      } else {
        const params = {
          meetingURL:
            "https://hongqiang12-videoconf-1038.app.100ms.live/meeting",
          rtmpURLs: [],
          // resolution: {width:720,height:400},
          record: true,
        };
        await hmsActions.startRTMPOrRecording(params);
        this.isRecording = true;
      }
      const recordingState = hmsStore.getState(selectRecordingState);
      // console.log(recordingState);
    },

    async toggleScreenShare() {
      const enabled = hmsStore.getState(selectIsLocalScreenShared);
      await hmsActions.setScreenShareEnabled(!enabled);
    },

    async toggleAudio() {
      const enabled = hmsStore.getState(selectIsLocalAudioEnabled);
      await hmsActions.setLocalAudioEnabled(!enabled);
    },
    async toggleVideo() {
      const enabled = hmsStore.getState(selectIsLocalVideoEnabled);
      await hmsActions.setLocalVideoEnabled(!enabled);
      // rendering again is required for the local video to show after turning off
      // this.renderPeers(hmsStore.getState(selectPeers));
    },
    async renderPeers(peers) {
      this.allPeers = peers;
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log(peers);
      this.$nextTick(() => {
        this.allPeers.forEach((peer) => {
          if (this.videoRefs[peer.id]) {
            hmsActions.attachVideo(peer.videoTrack, this.videoRefs[peer.id]);

            // If the peer is a remote peer, attach a listener to get video and audio states
            if (!peer.isLocal) {
              // Set up a property to track the audio and video states of remote peer so that
              if (!this.remotePeerProps[peer.id]) {
                this.remotePeerProps[peer.id] = {};
              }
              this.remotePeerProps[peer.id][this.MediaState.isAudioEnabled] =
                hmsStore.getState(selectIsPeerAudioEnabled(peer.id));
              this.remotePeerProps[peer.id][this.MediaState.isVideoEnabled] =
                hmsStore.getState(selectIsPeerVideoEnabled(peer.id));
              // this.remotePeerProps[peer.id][this.MediaState.audioLevel] = 0;
              // Subscribe to the audio and video changes of the remote peer
              hmsStore.subscribe(
                (isEnabled) => this.onPeerAudioChange(isEnabled, peer.id),
                selectIsPeerAudioEnabled(peer.id)
              );
              hmsStore.subscribe(
                (isEnabled) => this.onPeerVideoChange(isEnabled, peer.id),
                selectIsPeerVideoEnabled(peer.id)
              );
            }

            if (peer.isLocal) {
              this.name = peer.name;
            }

            this.$set(this.volumeObj, peer.id, 100);
            this.$set(this.audioLevelObj, peer.id, 0);
            hmsStore.subscribe(
              (audioLevel) => this.onPeerAudioLevelChange(audioLevel, peer.id),
              selectPeerAudioByID(peer.id)
            );
          }
        });
      });
    },
    onPeerAudioChange(isEnabled, peerId) {
      if (this.videoRefs[peerId]) {
        this.remotePeerProps[peerId][this.MediaState.isAudioEnabled] =
          isEnabled;
      }
    },
    onPeerVideoChange(isEnabled, peerId) {
      if (this.videoRefs[peerId]) {
        this.remotePeerProps[peerId][this.MediaState.isVideoEnabled] =
          isEnabled;
      }
    },
    onPeerAudioLevelChange(audioLevel, peerId) {
      this.$set(this.audioLevelObj, peerId, audioLevel);
    },
    onAudioChange(newAudioState) {
      this.isAudioEnabled = newAudioState;
    },
    onVideoChange(newVideoState) {
      this.isVideoEnabled = newVideoState;
    },
    onScreenShareChange(newScreenShareState) {
      this.isScreenShareEnabled = newScreenShareState;
    },
    onIsScreenShare(state) {
      this.isSomeoneScreenSharing = state;
      if (state) {
        this.$nextTick(() => {
          const presenter = hmsStore.getState(selectPeerScreenSharing);
          const screenshareVideoTrack = hmsStore.getState(
            selectScreenShareByPeerID(presenter.id)
          );

          const element = this.$refs.screenSharing;
          if (presenter) {
            hmsActions.attachVideo(screenshareVideoTrack.id, element);
          }
        });
      }
    },
    leaveMeeting() {
      hmsActions.leave();
    },
    dateTimeFormat(date) {
      try {
        return dayjs(date).format("h:m");
      } catch (error) {
        return "";
      }
    },
    async toggleVB() {
      const isVirtualBackgroundEnabled = hmsStore.getState(
        selectIsLocalVideoPluginPresent(this.virtualBackground.getName())
      );
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
    async onChangeName() {
      await hmsActions.changeName(this.name);
      this.nameVisible = false;
    },
    onVideoMute(peer) {
      if (this.remotePeerProps?.[peer.id]?.[this.MediaState.isVideoEnabled]) {
        hmsActions.setRemoteTrackEnabled(peer.videoTrack, false);
      }
    },
    onAudioMute(peer) {
      if (this.remotePeerProps?.[peer.id]?.[this.MediaState.isAudioEnabled]) {
        hmsActions.setRemoteTrackEnabled(peer.audioTrack, false);
      }
    },
    onRomove(peer) {
      const reason = "Good Bye";
      hmsActions.removePeer(peer.id, reason);
    },
    onChangeVolume(value, peer) {
      hmsActions.setVolume(value, peer.audioTrack);
      this.$set(this.volumeObj, peer.id, value);
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
}
</style>