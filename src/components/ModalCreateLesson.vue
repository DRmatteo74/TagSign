<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Add Lesson" color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nouvelle Lesson</div>
        </q-card-section>
        <q-toggle v-model="distanciel" label="Distanciel" />
        <q-card-section class="q-pt-none">
          
          <q-input dense v-model="address" autofocus label="Nom du cours" @keyup.enter="prompt = false" />
    <q-input class="top" filled v-model="date" label="date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-time>""
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-select v-if="distanciel===false" v-model="salle" :options="salles" label="Salle" />
    <q-select v-model="classe" :options="classes" label="Classe" />
  </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Annuler" v-close-popup />
          <q-btn flat label="Ajouter" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import config from '@/assets/config.js';
import axios from 'axios';

export default {
  setup () {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      date: ref(''),
      classes: ref([]),
      classe: ref(),
      idClasses: ref([]),
      salles: ref([]),      
      salle: ref(),
      idSalles: ref([]),
      address: ref(''),
      distanciel: ref(false),
    }
  },
  methods: {
    async fetchSalles() {
      await axios.get(config.apiUrl + 'salles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.salles.push(response.data[i].salle)
          this.idSalles.push(response.data[i].id)
          
        }
      })
    },
    async fetchClasses() {
      await axios.get(config.apiUrl + 'classes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
          this.classes.push(response.data[i].ecole.nom + " " + response.data[i].nom)
          this.idClasses.push(response.data[i].id)
          
        }
      })
    }
  },
  mounted(){
            this.fetchSalles();
            this.fetchClasses();
        },
}
</script>
<style>
.top{
  margin-top: 5%;
}
</style>
