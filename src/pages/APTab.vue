<template>
    <div class="card">
      <q-tabs
        v-model="tab"
        dense
        class="bg-moduleBackgroundColor"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="absences" label="absences" 
        @click="changeMenu" v-bind:disable="isDistanciel"/>
        <q-tab name="eleves" label="élèves" 
        @click="changeMenu"/>
        <q-tab name="planning" label="planning" 
        @click="changeMenu"/>
      </q-tabs>
      <q-separator />
  
      <q-tab-panels v-model="tab" animated class="bg-moduleBackgroundColor" style="height: 95%;">
        <q-tab-panel name="absences">
          <Absences/>
        </q-tab-panel>
  
        <q-tab-panel v-model="tab" name="eleves">
        <Eleves/>
        </q-tab-panel>
        <q-tab-panel name="planning">
          <Planning/>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </template>
  
<script>
import Planning from '@/components/Planning.vue'
import Absences from '@/components/APStudentTable.vue'
import Eleves from '@/components/APListEleves.vue'

  export default {
    components: {
  Planning,
  Absences,
  Eleves,
},
    data() {
      return {
        tab: 'absences',
      };
    },
};
</script>
  
<style>
    .card {
        background: var(--cardColor);
        width: 100%;
        height: 100%;
        padding: 30px;
        border-radius: 15px;
    }

    .random_container {
        height: 100%;
    }

    .random_element{
        padding: 5px 10px 5px 10px;
        font-size: medium;
        font-weight: bolder;
        border-radius: 50px;
    }
</style>
  