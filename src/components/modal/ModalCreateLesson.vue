<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn icon="add" rounded color="primary" @click="prompt = true" size="md" class="round-button"/>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px" class="modal-color">
                <q-card-section>
                    <div class="text-h6">Nouveau cours</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-tabs
                        v-model="tab"
                        dense
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                        class="bg-moduleBackgroundColor"
                    >
                        <q-tab name="form" label="Formulaire"/>
                        <q-tab name="import" label="Importer depuis un fichier"/>
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab" animated class="bg-moduleBackgroundColor">
                        <q-tab-panel name="form">
                            <q-toggle v-model="distanciel" label="Distanciel" />
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
                        </q-tab-panel>
                        <q-tab-panel v-model="tab" name="import">
                            <q-uploader
                                class="q-mt-sm btnColor no-shadow"
                                label="Fichier (csv)"
                                multiple
                                ref="uploader"
                                max-file-size="5242880"
                                accept=".csv"
                                :factory="files => factoryFn(files)"
                            />
                        </q-tab-panel>
                    </q-tab-panels>
                    
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
        data(){
            return{
                tab: 'form',
                token : null
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
                .catch(e => {
                    console.log(e);
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
                .catch(e => {
                    console.log(e);
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
                await axios.post(config.apiUrl + "cours/create", this.data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    this.$q.notify({
                        message : "<strong>Le cours a bien été ajouté !</strong>",
                        type: "positive",
                        html: true
                    })
                })
                .catch(error => {
                  console.error(error);
                });
            },
            // eslint-disable-next-line no-unused-vars
            factoryFn (files) {
                let uploadFile = files[0];
                let fd = new FormData();
                fd.append("csv_file", uploadFile);
                fd.append("id", "1");

                axios.post(config.apiUrl + 'cours/import', fd, {
                   headers: {'Content-Type': undefined, 'Authorization' : this.token},
                }).then(
                function (response) {
                    if (response.data.success) {
                        this.$q.notify({
                            color: 'positive',
                            message: 'Fichier envoyé avec succès !'
                        });
                    }
                }.bind(this))
            }
        },
        mounted(){
            this.fetchSalles();
            this.fetchProfs();
            this.token = `Bearer ${localStorage.getItem("token")}`
        },
    }
</script>
<style>
.top{
  margin-top: 5%;
}

.round-button{
    padding: 4px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 30px;
}
</style>
