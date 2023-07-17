<script>
    import { ref } from 'vue';
    import axios from 'axios';
    import config from '@/assets/config';

    export default {
        name: 'APClasses',
        props: ['selectedEcole'],
        data() {
            return {
                classes: [],
                selectedClasse: null,
                prompt: ref(false),
                ecoles : ref([]),
                ecole : ref(null)
            };
        },
        mounted() {
            this.fetchClasses();
            this.fetchEcoles();
        },
        methods: {
            fetchClasses() {
                axios.get(config.apiUrl + 'classes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    this.classes = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
            },
            clickClasse(id){
                if(this.selectedClasse == id){
                    this.selectedClasse = null;
                }else{
                    this.selectedClasse = id;
                }
                this.$emit('classe-selected', this.selectedClasse);
            },
            filterClasses() {
                if (!this.selectedEcole) {
                  return []; // Retourne toutes les classes si selectedEcole n'est pas défini
                }
            
                return this.classes.filter(classe => classe.ecole.id === this.selectedEcole);
            },
            async fetchEcoles() {
                await axios.get(config.apiUrl + 'ecoles', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.ecoles.push({label: response.data[i].nom, value: response.data[i].id})
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            },
            newClasse(){
                const data = {
                    nom : this.nom,
                    idEcole : this.ecole.value,
                    idUtilisateurs: []
                }

                axios.post(config.apiUrl + "classes/create", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    this.$q.notify({
                        message : "<strong>La classe a bien été ajouté !</strong>",
                        type: "positive",
                        html: true
                    })
                })
                .catch(error => {
                    console.error(error);
                });
            }
        }
    }
</script>

<template>
    <q-card flat ordered class="card-module">
        <div class="row justify-between">
            <div class="text-h6 text-weight-bold">Classes : </div>
            <q-btn icon="add" rounded color="primary" @click="prompt = true" size="md" class="round-button"/>
        </div>
    
        <div class="text-subtitle-1 q-mt-md text-upercase" v-if="selectedEcole == null">Veuillez selectionner une école...</div>
        <q-card-section v-else class="row wrap">
            <div class="col-6 q-px-sm"  v-for="classe in filterClasses()" :key="classe.id">
                <q-btn push v-bind:color="selectedClasse == classe.id ? 'primary' : 'grey-6'" class="q-ma-sm q-pa-md full-width" :label="classe.nom" @click="clickClasse(classe.id)"/>
            </div>
        </q-card-section>
    </q-card>
    
    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px" class="modal-color">
            <q-card-section>
                <div class="text-h6">Nouvelle classe</div>
                <q-select v-model="ecole" :options="ecoles" label="Ecoles" />
                <q-input dense v-model="nom" autofocus label="Nom"/>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Annuler" v-close-popup />
                <q-btn @click="newClasse" flat label="Ajouter" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
  
</template>

<style>
.round-button{
    padding: 4px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 30px;
}
</style>