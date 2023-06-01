<template>
  <div class="el"></div>
<div class="row">
  <div class="col-lg-1"></div>
  <div class="col-lg-10 fully">
    <h1>coucou</h1>
    <br>
    <h1>coucou</h1>
    <br>
    <h1>coucou</h1>
    <br>
    <h1>coucou</h1>
    <br>
  </div>
  <div class="col-lg-1"></div>
</div>
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
.fully{
  background: rgb(65, 51, 51);
  z-index: 0;
}
</style>