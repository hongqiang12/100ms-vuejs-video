<template>
  <div
    class="min-h-[100vh] bg-[#0e1115] flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <Header />
    <Conference v-if="isConnected" />
    <Join v-else />
  </div>
</template>

<script>
import { selectRoomStarted } from "@100mslive/hms-video-store";
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
  },
  methods: {
    onConnection(connectionState) {
      this.isConnected = Boolean(connectionState);
    },
  },
};
</script>
