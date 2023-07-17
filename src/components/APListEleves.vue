<template>
    <div class="row justify-end"><NewStudent /></div>
    <div>
        <q-table
          flat
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
                    { name: 'nom', label: 'Nom', align: 'center', field: 'nom', sortable: true },
                    { name: 'prenom', align: 'center', label: 'Prénom', field: 'prenom', sortable: true },
                    { name: 'badge', align: 'center', label: 'Badge', field: 'badge' },
                ]),
                rows: ref([])
            }
        },
        methods: {
            fetchStudent(){
                this.rows = [];
                if(this.selectedClasse != null && this.selectedEcole != null){
                    axios.get(config.apiUrl + 'classes/' + this.selectedClasse, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    .then(response => {
                        const classe = response.data;
                        if(classe.ecole.id == this.selectedEcole){
                            this.fetchEleveClasse()
                        }else{
                            this.fetchEleveEcole()
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                }else if (this.selectedClasse == null && this.selectedEcole !=null){
                    this.fetchEleveEcole()
                }else{
                    this.fetchAllEleve()
                }
            },
            fetchEleveClasse() {
                axios.get(config.apiUrl + 'users/classe/' + this.selectedClasse, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    const data = response.data
                    
                    data.forEach(newEvent => {
                        this.rows.push({
                            nom: newEvent.nom,
                            prenom: newEvent.prenom,
                            badge: newEvent.badge,
                        });
                    });
                })
                .catch(e => {
                    console.log(e);
                })
            },
            fetchEleveEcole() {
                axios.get(config.apiUrl + 'users/ecole/' + this.selectedEcole, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    const data = response.data
                    
                    data.forEach(newEvent => {
                        this.rows.push({
                            nom: newEvent.nom,
                            prenom: newEvent.prenom,
                            badge: newEvent.badge,
                        });
                    });
                })
                .catch(e => {
                    console.log(e);
                })
            },
            fetchAllEleve() {
                axios.get(config.apiUrl + 'users/eleves', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    const data = response.data
                    
                    data.forEach(newEvent => {
                        this.rows.push({
                            nom: newEvent.nom,
                            prenom: newEvent.prenom,
                            badge: newEvent.badge,
                        });
                    });
                })
                .catch(e => {
                    console.log(e);
                })
            },
            formatDate(date) {
                const dd = new Date(date);
                return dd.getDate().toString().padStart(2, '0') + "/" + (dd.getMonth()+1).toString().padStart(2, '0') + "/" + dd.getFullYear();
            },
            formatTime(time) {
                const tt = new Date(time);
                return tt.getHours().toString().padStart(2, '0') + ":" + tt.getMinutes().toString().padStart(2, '0');
            }
        },
        watch: {
            selectedClasse() {
                this.fetchStudent();
            },
            selectedEcole() {
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