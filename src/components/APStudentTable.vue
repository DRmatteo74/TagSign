<template>
  <div>
    <q-table
    flat
      title="Absence"
      :rows="rows"
      :columns="columns"
      row-key="nom"
      card-class="bg-galette"
    />
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/assets/config.js';
import { ref } from 'vue'


export default {
  props: ['selectedEcole', 'selectedClasse'],
  setup () {
    return {
      columns: ref([
  {
    name: 'nom',
    required: true,
    label: 'Nom',
    align: 'center',
    field: row => row.nom,
    sortable: true

  },
  { name: 'Prenom', align: 'center', label: 'Prenom', field: 'prenom', sortable: true },
  { name: 'date', align: 'center', label: 'Date',field: row => row.absences[0].date.date.substr(0, 10) + row.absences[0].heure.date.substr(10,10), sortable: true },
  { name: 'cours', align: 'center', label: 'Cours',field: row => row.absences[0].cours, sortable: true},
  { name: 'justificatif', align: 'center', label: 'Justificatif', field: row => row.justificatif, sortable: true },
  ]),
  rows: ref([])
    }
  },
  methods: {
    async fetchStudent() {
      await axios.get(config.apiUrl + 'absences/classe/' + this.selectedClasse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
          this.rows = response.data.utilisateurs_absences
          console.log(this.rows)
          

      })
    },
  },
        watch: {
          selectedClasse() {
                this.fetchStudent();
            },
        },
}
</script>