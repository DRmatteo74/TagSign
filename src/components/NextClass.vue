<script>
import { ref } from 'vue'
  export default {
  name: 'LayoutDefault',

  setup () {
    return {
      validation: ref(false)
    }
  }
}
</script>

<template>
 <q-card flat 
  ordered
  style="background: #fff; border-radius: 3%;">
  <q-card-section>
    <b>Cour a venir :</b>
    <q-card
      class="my-card" 
      style="background: #009eF7">
      <div>
      <q-badge v-if="validation === true" floating color="green" rounded />
      <q-badge v-else floating color="red" rounded />
    </div>
      <q-card-section>
        <div class="text-h6 center">Jeudi 11 mai 2023 11h15</div>
        <div class="text-h4 center">Anglais</div>
        <div class="text-h6 center">Salle : 512</div>
      </q-card-section>
    </q-card>
  </q-card-section>
</q-card>
    
  
  </template>
  <style>
  .center{
  text-align: center;
}
</style>