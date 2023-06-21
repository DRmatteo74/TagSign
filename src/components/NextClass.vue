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
  style="background: var(--moduleBackgroundColor); border-radius: 10px; padding: 10px;">
  <q-card-section>
    <div class="text-h6 text-weight-bold">Cours à venir</div>
    <q-card
      class="my-card q-mx-md q-my-sm" 
      style="background: #009eF7">
      <div>
        <q-badge v-if="validation === true" floating color="green" rounded>
          <q-icon name="done" color="white" />
        </q-badge>
        <q-badge v-else floating color="red" rounded>
          <q-icon name="close" color="white" />
        </q-badge>
      </div>
      <q-card-section>
        <div class="text-h6 center text-white">Jeudi 11 mai 2023 11h15</div>
        <div class="text-h4 center text-white text-weight-bold">Anglais</div>
        <div class="text-h6 center text-white">Salle : 512</div>
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