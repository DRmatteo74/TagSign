<script>
    import { ref } from 'vue';
    import axios from 'axios';
    import config from '@/assets/config';

    export default {
        name: 'APEcoles',
        data() {
            return {
                ecoles: [],
                selectedEcole: null,
                prompt: ref(false),
                nom: ref("")
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
                if(this.selectedEcole == id){
                    this.selectedEcole = null;
                }else{
                    this.selectedEcole = id;
                }
                this.$emit('ecole-selected', this.selectedEcole);
            },
            newEcole(){
                const data = {
                    nom : this.nom
                }

                axios.post(config.apiUrl + "ecoles/create", data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    this.$q.notify({
                        message : "<strong>L'école a bien été ajouté !</strong>",
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
            <div class="text-h6 text-weight-bold">Ecoles : </div>
            <q-btn icon="add" rounded color="primary" @click="prompt = true" size="md" class="round-button"/>
        </div>
        <q-card-section class="row wrap">
            <div class="col-6 q-px-sm" v-for="ecole in ecoles" :key="ecole.id">
                <q-btn v-bind:color="selectedEcole == ecole.id ? 'primary' : 'grey-6'" push class="q-ma-sm q-pa-md full-width" :label="ecole.nom" @click="clickEcole(ecole.id)" />
            </div>
        </q-card-section>
    </q-card>

    <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px" class="modal-color">
            <q-card-section>
                <div class="text-h6">Nouvelle école</div>
                <q-input dense v-model="nom" autofocus label="Nom"/>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Annuler" v-close-popup />
                <q-btn @click="newEcole" flat label="Ajouter" v-close-popup />
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