<script>
  import axios from 'axios';
  import config from '@/assets/config';

  export default {
    name: 'APEcoles',
    data() {
    return {
      ecoles: [],
      selectedEcole: null
    };
  },
  mounted() {
    this.fetchEcoles();
  },
  methods: {
    fetchEcoles() {
      axios.get(config.apiUrl + 'ecoles', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        this.ecoles = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    },
    clickEcole(id){
      this.selectedEcole = id;
    }
  }
  }
</script>

<template>
 <q-card flat  
  ordered 
  class="card-module">
  <div class="text-h6 text-weight-bold">Ecoles : </div>
  <q-card-section class="row wrap">
    <div class="col-6 q-px-sm" v-for="ecole in ecoles" :key="ecole.id">
      <q-btn push class="q-ma-sm q-pa-md full-width" color="primary" :label="ecole.nom" @click="clickEcole(ecole.id)" />
    </div>
  </q-card-section>
</q-card>
    
  
</template>