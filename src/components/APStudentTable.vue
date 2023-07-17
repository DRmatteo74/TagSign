<template>
    <div>
        <q-table
            flat
            title="Absence"
            :rows="rows"
            :columns="columns"
            row-key="nom"
            card-class="bg-galette"
        >
            <template v-slot:body-cell-justificatif="p">
                <td class="text-center">
                    <q-btn @click="openModalValidateJustificatif(p.row.justificatif)" v-if="!p.row.justificatif.includes(null)" round color="primary" icon="open_in_new" :href="p.row.justificatif" target="_blank" size="sm"/>
                    <q-icon v-else name="block" color="red" size="sm"/>
                </td>
            </template>
        </q-table>
        <q-dialog v-model="justifier">
            <q-card class="modal-color q-pa-md">
                <q-card-section>
                    <div class="col text-h6 text-weight-bold ellipsis q-mr-md q-mb-md">
                        Valider le justificatif : 
                    </div>
                    <div class="row justify-center">
                        <q-btn unelevated rounded color="positive" label="Oui" class="q-mr-sm" @click="validateJustificatif" />
                        <q-btn unelevated rounded color="red" label="Non" class="q-ml-sm" @click="justifier = false"/>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
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
                    { name: 'nom', label: 'Nom', align: 'center', field: 'nom', sortable: true },
                    { name: 'prenom', align: 'center', label: 'Prenom', field: 'prenom', sortable: true },
                    { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true },
                    { name: 'heure', align: 'center', label: 'Heure', field: 'heure', sortable: true },
                    { name: 'cours', align: 'center', label: 'Cours', field: 'cours', sortable: true},
                    { name: 'justificatif', align: 'center', label: 'Justificatif', sortable: true },
                ]),
                rows: ref([]),
                columns_origin: ref([
                    { name: 'nom', label: 'Nom', align: 'center', field: 'nom', sortable: true },
                    { name: 'prenom', align: 'center', label: 'Prenom', field: 'prenom', sortable: true },
                    { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true },
                    { name: 'heure', align: 'center', label: 'Heure', field: 'heure', sortable: true },
                    { name: 'cours', align: 'center', label: 'Cours', field: 'cours', sortable: true},
                    { name: 'justificatif', align: 'center', label: 'Justificatif', sortable: true },
                ]),
                justifier: ref(false),
                justificatifToValidate: null
            }
        },
        methods: {
            fetchAbsences(){
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
                            this.fetchAbsenceClasse()
                        }else{
                            this.fetchAbsenceEcole()
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                }else if (this.selectedClasse == null && this.selectedEcole !=null){
                    this.fetchAbsenceEcole()
                }else{
                    this.fetchAllAbsence()
                }
            },
            fetchAbsenceClasse() {
                this.columns = [...this.columns_origin];
                axios.get(config.apiUrl + 'absences/classe/' + this.selectedClasse, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    const data = response.data.utilisateurs_absences
                    
                    data.forEach(newEvent => {
                        newEvent.absences.forEach(absence=> {
                            this.rows.push({
                                nom: newEvent.nom,
                                prenom:newEvent.prenom,
                                cours: absence.cours,
                                date: this.formatDate(absence.date.date),
                                heure : this.formatTime(absence.heure.date),
                                justificatif : config.apiUrl + "document/" + absence.justificatif
                            });
                        })
                    });
                })
                .catch(e => {
                    console.log(e);
                })
            },
            fetchAbsenceEcole() {
                this.columns = [...this.columns_origin];
                this.columns.unshift({ name: 'classe', label: 'Classe', align: 'center', field: 'classe', sortable: true })
                axios.get(config.apiUrl + 'absences/ecole/' + this.selectedEcole, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    const data = response.data.utilisateurs_absences
                    
                    data.forEach(newEvent => {
                        newEvent.utilisateurs.forEach(user => {
                            user.absences.forEach(absence=> {
                                this.rows.push({
                                    classe: newEvent.nom,
                                    nom: user.nom,
                                    prenom:user.prenom,
                                    cours: absence.cours,
                                    date: this.formatDate(absence.date.date),
                                    heure : this.formatTime(absence.heure.date),
                                    justificatif : config.apiUrl + "document/" + absence.justificatif
                                });
                            })
                        })
                    });
                })
                .catch(e => {
                    console.log(e);
                })
            },
            fetchAllAbsence() {
                this.columns = [...this.columns_origin];
                this.columns.unshift({ name: 'classe', label: 'Classe', align: 'center', field: 'classe', sortable: true })
                this.columns.unshift({ name: 'ecole', label: 'Ecole', align: 'center', field: 'ecole', sortable: true })
                axios.get(config.apiUrl + 'absences', {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    const data = response.data.utilisateurs_absences
                    
                    data.forEach(newEvent => {
                        this.rows.push({
                            ecole : newEvent.ecole,
                            classe: newEvent.classe,
                            nom: newEvent.nom,
                            prenom: newEvent.prenom,
                            cours: newEvent.cours,
                            date: this.formatDate(newEvent.date.date),
                            heure : this.formatTime(newEvent.heure.date),
                            justificatif : config.apiUrl + "document/" + newEvent.justificatif
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
            },
            openModalValidateJustificatif(justificatif){
                this.justifier = true;
                this.justificatifToValidate = justificatif.replace(config.apiUrl + "document/", "")
            },
            validateJustificatif(){
                axios.get(config.apiUrl + 'participes/validateJustificatif/' + this.justificatifToValidate, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    this.$q.notify({
                        message : "<strong>Le justificatif a bien été validé.</strong>",
                        type: "positive",
                        html: true
                    })
                })
                .catch(e => {
                    console.log(e);
                })
                this.justifier = false;
            }
        },
        watch: {
            selectedClasse() {
                this.fetchAbsences();
            },
            selectedEcole(){
                this.fetchAbsences();
            }
        },
        mounted() {
            return this.fetchAbsences()
        },
    }
</script>