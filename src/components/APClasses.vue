<script>
    import axios from 'axios';
    import config from '@/assets/config';

    export default {
        name: 'APClasses',
        props: ['selectedEcole'],
        data() {
            return {
                classes: [],
                selectedClasse: null,
            };
        },
        mounted() {
            this.fetchClasses();
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
                this.selectedClasse = id;
                this.$emit('classe-selected', id);
            },
            filterClasses() {
                if (!this.selectedEcole) {
                  return []; // Retourne toutes les classes si selectedEcole n'est pas défini
                }
            
                return this.classes.filter(classe => classe.ecole.id === this.selectedEcole);
            }
        }
    }
</script>

<template>
    <q-card flat ordered class="card-module">
        <div class="text-h6 text-weight-bold">Classes : </div>
    
        <div class="text-subtitle-1 q-mt-md text-upercase" v-if="selectedEcole == null">Veuillez selectionner une école...</div>
        <q-card-section v-else class="row wrap">
            <div class="col-6 q-px-sm"  v-for="classe in filterClasses()" :key="classe.id">
                <q-btn push v-bind:color="selectedClasse == classe.id ? 'primary' : 'grey-6'" class="q-ma-sm q-pa-md full-width" :label="classe.nom" @click="clickClasse(classe.id)"/>
            </div>
        </q-card-section>
    </q-card>
    
  
</template>