<template>
  <div class="el"></div>
  <q-layout>
      <q-page-container class="container">
        <div class="card">
          <div class="q-pa-md example-row-equal-width">

<div class="row">
  <div class="col-4">
    <NextClass/>
  </div>
  <div class="col-7 q-ml-lg">
     <!-- <NextClass/> -->
     <PlanningSmall />
  </div>
</div>
</div>
          
          <router-view></router-view>
        </div>
      </q-page-container>
  </q-layout>

</template>

<script>
import { ref } from 'vue'
import NextClass from './components/NextClass.vue'
import PlanningSmall from './components/planning.vue'

export default {
  name: 'LayoutDefault',

  components: {
    NextClass,
    PlanningSmall
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