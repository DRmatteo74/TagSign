<template>
  <div class="el"></div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',

  components: {

  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
<style>
body{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.el{
  position: absolute;
  width: 200%;
  height: 100%;
  left: -50%;
  top: 30%;

  background: linear-gradient(to bottom, rgba(15, 63, 187, 0.79), rgba(52, 150, 235, 0.79));
  border-radius: 50%;
}
</style>