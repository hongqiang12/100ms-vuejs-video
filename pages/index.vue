<template>
  <div
    class="min-h-[100vh] bg-[#000000] flex flex-col justify-center"
  >
    <!-- <Header /> -->
    <Conference v-if="isConnected" />
    <Join v-else />
  </div>
</template>

<script>
import { selectRoomStarted,selectRoomState } from "@100mslive/hms-video-store";
import { hmsActions, hmsStore, hmsNotifications } from "~/utils";
export default {
  name: "IndexPage",
  data() {
    return {
      isConnected: false,
    }
  },
  mounted() {
    hmsStore.subscribe(this.onConnection, selectRoomStarted);
    hmsStore.subscribe(this.selectRoomState, selectRoomState);
  },
  methods: {
    onConnection(connectionState) {
      // this.isConnected = Boolean(connectionState);
    },
    selectRoomState(state) {
      if (state == "Connected") {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    }
  },
};
</script>
