<template>
  <div class="el"></div>
  <q-layout>
      <q-page-container class="container">
        <div class="card">
          
          <router-view></router-view>
        </div>
      </q-page-container>
  </q-layout>

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

.container{
  width: 100vw;
  height: 100vh;
  padding: 60px 100px 60px 100px;
}

.card{
  background: #F6F6F6;
  width: 100%;
  height: 100%;
  padding: 30px;
  border-radius: 15px;
}


</style>