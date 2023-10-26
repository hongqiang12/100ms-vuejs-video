<template>
  <div
    class="flex justify-center text-white absolute top-0 left-0 w-full gap-4 text-white/60"
  >
    <div
      class="w-34 h-10 flex items-center justify-center cursor-pointer hover:text-white"
      :class="path == '/' ? 'text-white' : ''"
      @click="$router.push('/')"
    >
      Home
    </div>
    <div
      class="w-34 h-10 flex items-center justify-center cursor-pointer hover:text-white"
      :class="path == '/live' ? 'text-white' : ''"
      @click="$router.push('/live')"
    >
      Live List
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  mounted() {
  },
  methods: {},
};
</script>
