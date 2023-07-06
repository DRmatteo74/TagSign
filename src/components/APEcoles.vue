<script>
import { ref } from 'vue'
  export default {
  name: 'LayoutDefault',

  setup () {
    return {
      validation: ref(true)
    }
  }
}
</script>

<template>
 <q-card flat  
  ordered
  style="background: var(--moduleBackgroundColor); border-radius: 10px; padding: 10px;">
  <q-card-section>
    <div class="text-weight-bold">Ecoles :</div>
    <q-btn push style="width: 100%;height: 60px;margin-bottom: 2%;" color="primary" label="ESGI" />
    <q-btn push style="width: 100%;height: 60px;margin-bottom: 2%" color="primary" label="ENGDRE" />
    <q-btn push style="width: 100%;height: 60px;margin-bottom: 2%" color="primary" label="Maestriss BTS" />
  </q-card-section>
</q-card>
    
  
</template>

<style>
  .center{
    text-align: center;
  }
</style>