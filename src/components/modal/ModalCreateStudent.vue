<template>
    <div class="q-mb-sm">
        <q-btn icon="add" rounded color="primary" @click="prompt = true" size="md" class="round-button"/>
        <q-dialog v-model="prompt" persistent>
            <q-card style="min-width: 350px" class="modal-color">
                <q-card-section>
                    <div class="text-h6 q-mb-sm">Nouvel Élève</div>
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
                            <q-input dense v-model="nom" autofocus label="Nom"/>
                            <q-input dense v-model="prenom" autofocus label="Prénom"/>
                            <q-input dense v-model="login" autofocus label="Login"/>
                            <q-input dense v-model="password" autofocus label="Mot de passe"/>
                            <q-input dense v-model="badge" autofocus label="Badge"/>
                            <q-select v-model="classe" :options="classes" label="Classes" />
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
                    <q-btn @click="newUser" flat label="Ajouter" v-close-popup v-if="tab == 'form'"/>
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
                classes: ref([]),
                classe: ref(null),
                idClasse: ref([])
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
                await axios.get(config.apiUrl + 'classes', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    for (let i = 0; i < response.data.length; i++) {
                        this.classes.push({label: response.data[i].ecole.nom + ' ' + response.data[i].nom, value: response.data[i].id})
                        this.idClasse.push(response.data[i].id)
                    }
                })
                .catch(e => {
                    console.log(e);
                })
            },
            async newUser() {
                if(this.tab == "form"){
                    const data = {
                        login : this.login,
                        nom : this.nom,
                        prenom : this.prenom,
                        password : this.password,
                        badge : this.badge,
                        roles : "ROLE_ELEVE",
                        classesId: [this.classe.value]
                    }

                    await axios.post(config.apiUrl + "users/create", data, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    .then(() => {
                        this.$q.notify({
                            message : "<strong>L'élève a bien été ajouté !</strong>",
                            type: "positive",
                            html: true
                        })
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            },
            // eslint-disable-next-line no-unused-vars
            factoryFn (files) {
                let uploadFile = files[0];
                let fd = new FormData();
                fd.append("csv_file", uploadFile);
                fd.append("id", "1");

                axios.post(config.apiUrl + 'users/import', fd, {
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
            this.token = `Bearer ${localStorage.getItem("token")}`
        },
    }
</script>
<style>
.round-button{
    padding: 4px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 30px;
}
</style>
