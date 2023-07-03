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
          <q-tab name="tableau" label="Tableau blanc" />
          <q-tab name="liste" label="Liste" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-moduleBackgroundColor">
          <q-tab-panel name="tableau">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="liste">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
    </div>
  <router-view></router-view>
</template>
 


<script>
    import { ref } from 'vue'
    export default {
      name: 'AppelProf',

        setup () {
            return {
              tab: ref('tableau')
            }
  
        }
    }
 
</script>

<style>
    .card{
      background: var(--cardColor);
      width: 100%;
      height: 100%;
      padding: 30px;
      border-radius: 15px;
    }
</style>