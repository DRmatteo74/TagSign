<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="+" rounded color="primary" @click="prompt = true" />
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Nouvel Eleve</div>
          <q-input dense v-model="nom" autofocus label="Nom"/>
          <q-input dense v-model="prenom" autofocus label="Prénom"/>
          <q-input dense v-model="login" autofocus label="Login"/>
          <q-input dense v-model="password" autofocus label="Mot de passe"/>
          <q-input dense v-model="badge" autofocus label="Badge"/>
          <q-select  v-model="classe" :options="classes" label="classes" />
  </q-card-section>


        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Annuler" v-close-popup />
          <q-btn 
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
      nom: ref(''),
      prenom: ref(''),
      login: ref(''),
      password: ref(''),
      badge: ref(''),
      role: ref('["ROLE_ELEVE"]'),
      classes: ref([]),
      classe: ref(''),
      idClasse: ref([]),
      data: ref(null),
    }
  },
  methods: {
    async fetchSalles() {
      await axios.get(config.apiUrl + 'classes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.classes.push(response.data[i].ecole.nom + ' ' + response.data[i].nom)
          this.idClasse.push(response.data[i].id)
          
        }
      })
    },
    async fetchProfs() {
      // await axios.get(config.apiUrl + 'users/profs', {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`
      //   }
      // })
      // .then(response => {
      //   for (let i = 0; i < response.data.length; i++) {
      //     this.intervenants.push(response.data[i].nom)
      //     this.idIntervenant.push(response.data[i].id)
          
      //   }
      // })
    },
    async nouveauCour() {
      // this.data = {
      //   idSalle: this.idSalles[this.salles.indexOf(this.salle)],
      //   idClasse: this.selectedClasse,
      //   idIntervenant: this.idIntervenant[this.intervenants.indexOf(this.intervenant)],
      //   nom: this.nomCour,
      //   date: this.date.substr(0, this.date.indexOf(" ")),
      //   heure: this.date.substr(this.date.indexOf(" ")+1),
      //   distanciel: this.distanciel
      // }
      // console.log(this.data);
      // await axios.post(config.apiUrl + "cours/", this.data, {
      //           headers: {
      //               Authorization: `Bearer ${localStorage.getItem("token")}`
      //           }
      //       })
      //         .then(response => {
      //           console.log(response.data);
      //         })
      //         .catch(error => {
      //           console.error(error);
      //         });
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
