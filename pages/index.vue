<template>
  <div
    class="h-[100vh] bg-[#000000]"
  >
    <!-- <Header /> -->
    <!-- <Conference /> -->
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
<style >
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
}
::-webkit-scrollbar-thumb {
    background-color: rgb(101, 112, 128);
    border-radius: 5px;
}
::-webkit-scrollbar-track {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 6px inset;
    background-color: transparent;
}
</style>
