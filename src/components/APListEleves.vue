<template>
  <NewStudent class="right" />
  <div>
    <q-table
      flat
      title="Élèves"
      :rows="rows"
      :columns="columns"
      row-key="nom"
      card-class="bg-galette"
    />
  </div>
</template>

<script>
import NewStudent from '@/components/modal/ModalCreateStudent.vue'
import axios from 'axios';
import config from '@/assets/config.js';
import { ref } from 'vue'

export default {
  props: ['selectedEcole', 'selectedClasse'],
  components: {
      NewStudent
        },
  setup () {
    return {
      columns: ref([
  { name: 'nom', required: true, label: 'Nom', align: 'center', field: 'nom', sortable: true },
  { name: 'Prenom', align: 'center', label: 'Prenom', field: 'prenom', sortable: true },
]),
      rows: ref([])
    }
  },
  methods: {
    async fetchStudent() {
      console.log(this.selectedClasse);
      await axios.get(config.apiUrl + 'classes/' + this.selectedClasse, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
          this.rows = response.data.utilisateurs
          console.log(this.rows)
      })
      .catch(console.error())
    },
  },
  watch: {
          selectedClasse() {
                this.fetchStudent();
            },
        },
        mounted() {
            return this.fetchStudent()
        },
}
</script>
<style>
.right{
margin-left: 90%; 
}
</style>