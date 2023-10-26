<template>
  <div
    class="rounded p-4 w-[25rem] max-h-[40rem] grid grid-cols-2 bg-[#212121] gap-4 overfllow-y-auto hidden-scrollbar"
  >
    <div
      class="h-[12rem] bg-white rounded"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <video
        autoplay
        playsinline
        class="h-full w-full object-cover"
        :ref="
          (el) => {
            if (el) videoRefs[index] = el;
          }
        "
      ></video>
    </div>
    <!-- <div class="h-[12rem] bg-white rounded"></div>
    <div class="h-[12rem] bg-white rounded"></div> -->
  </div>
</template>
<script>
// import { liveList } from "~/api/v1";
import Hls from "hls.js";
import { selectHLSState, HMSHLS } from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  data() {
    return {
      dataList: [],
      videoRefs: [],
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  mounted() {
    console.log(selectHLSState)
    this.renderHLS(hmsStore.getState(selectHLSState));
    hmsStore.subscribe(this.renderHLS, selectHLSState);
  },
  methods: {
    async renderHLS(hlsState) {
      // const list = await liveList();
      this.dataList = hlsState.variants;
      // console.log(this.dataList)
      hlsState.variants.map((r, index)=> {
        const hlsUrl = r.url;
        const video = this.videoRefs[index];
        const browserHasNativeHLSSupport = video.canPlayType(
          "application/vnd.apple.mpegurl"
        );
        if (Hls.isSupported()) {
          let hls = new Hls();
          hls.loadSource(hlsUrl);
          hls.attachMedia(video);
        }
        // hls.js is not supported on iOS Safari, but as the browser has native support for playing HLS,
        // we can use the video element directly.
        else if (browserHasNativeHLSSupport) {
          video.src = hlsUrl;
        }
      })
    },
  },
};
</script>