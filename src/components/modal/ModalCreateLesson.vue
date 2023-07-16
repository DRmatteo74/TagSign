<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="+" rounded color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nouveau cour</div>
        </q-card-section>
        <q-toggle v-model="distanciel" label="Distanciel" />
        <q-card-section class="q-pt-none">
          
          <q-input dense v-model="nomCour" autofocus label="Nom du cours"/>
          <q-select v-model="intervenant" :options="intervenants" label="Intervenant" />
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
  </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Annuler" v-close-popup />
          <q-btn :disabled="nomCour === '' ||  date === '' || intervenant === '' || salle === '' && distanciel === false" 
          @click="nouveauCour" flat label="Ajouter" v-close-popup />
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
  props: ['selectedEcole', 'selectedClasse'],
  setup () {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      date: ref(''),
      nomCour: ref(''),
      salles: ref([]),      
      salle: ref(''),
      idSalles: ref([]),
      distanciel: ref(false),
      intervenants: ref([]),
      intervenant: ref(''),
      idIntervenant: ref([]),
      data: ref(null),
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
    async fetchProfs() {
      await axios.get(config.apiUrl + 'users/profs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.intervenants.push(response.data[i].nom)
          this.idIntervenant.push(response.data[i].id)
          
        }
      })
    },
    async nouveauCour() {
      this.data = {
        idSalle: this.idSalles[this.salles.indexOf(this.salle)],
        idClasse: this.selectedClasse,
        idIntervenant: this.idIntervenant[this.intervenants.indexOf(this.intervenant)],
        nom: this.nomCour,
        date: this.date.substr(0, this.date.indexOf(" ")),
        heure: this.date.substr(this.date.indexOf(" ")+1),
        distanciel: this.distanciel
      }
      console.log(this.data);
      await axios.post(config.apiUrl + "cours/create", this.data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.error(error);
              });
    },
  },
  mounted(){
            this.fetchSalles();
            this.fetchProfs();
        },
}
</script>
<style>
.top{
  margin-top: 5%;
}
</style>
