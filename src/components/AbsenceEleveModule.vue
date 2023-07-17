<template>
        <q-layout class="card-module" container >
            <q-header reveal  view="lHh Lpr lFf" class="q-px-lg q-pt-lg bg-moduleBackgroundColor text-color">
                <div class="text-h6 text-weight-bold">Absences</div>
                <p class="text-grey-7 text-weight-thin">{{nbAbsenceInjustifie}} absence(s) non justifié</p>
            </q-header>
            <q-page-container>
            <q-page padding>
                <q-btn @click="event.id = true" v-for="event in events" :key="event.id" class="q-px-none full-width">
                    <div class="row no-wrap items-center full-width">
                        <div class="col-1">
                            <q-avatar color="warning" size="md" text-color="red" icon="priority_high" />
                        </div>
                        
                        <div class="col">
                            <div class="q-mx-md">
                                <div class="text-subtitle2 text-weight-bold no-margin no-padding">{{ event.title }}</div>
                                <p class="text-grey-7 text-weight-thin no-margin no-padding">{{ event.cours }}</p>
                            </div>
                            <q-badge v-if="event.justificatif == false && event.fileSend == false" text-color="white" class="bg-negative q-px-md q-py-xs" style="border-radius: 50px;">
                                <div class="text-caption">Non justifié</div>
                            </q-badge>
                            <q-badge v-else-if="event.justificatif == false && event.fileSend == true" text-color="white" class="bg-orange q-px-md q-py-xs" style="border-radius: 50px;">
                                <div class="text-caption">Justificatif envoyé</div>
                            </q-badge>
                            <q-badge v-else text-color="white" class="bg-positive q-px-md q-py-xs" style="border-radius: 50px;">
                                <div class="text-caption">Justificatif validé</div>
                            </q-badge>
                        </div>
                    </div>
                    <q-dialog v-model="event.id">
                        <q-card class="modal-color q-pa-md">
                            <q-card-section>
                                <div class="row no-wrap items-center">
                                    <div class="col text-h5 text-weight-bold ellipsis q-mr-md">
                                        Absence
                                    </div>
                                    <q-badge v-if="event.justificatif == false && event.fileSend == false" text-color="white" class="bg-negative q-px-md q-py-xs" style="border-radius: 50px;">
                                        <div class="text-caption  text-uppercase text-weight-bold">Non justifié</div>
                                    </q-badge>
                                    <q-badge v-else-if="event.justificatif == false && event.fileSend == true" text-color="white" class="bg-orange q-px-md q-py-xs" style="border-radius: 50px;">
                                        <div class="text-caption text-uppercase text-weight-bold">Justificatif envoyé</div>
                                    </q-badge>
                                    <q-badge v-else text-color="white" class="bg-positive q-px-md q-py-xs" style="border-radius: 50px;">
                                        <div class="text-caption text-uppercase text-weight-bold">Justificatif validé</div>
                                    </q-badge>
                                </div>
                            </q-card-section>
                    
                            <q-card-section class="q-pt-none q-mt-sm">
                                <div class="text-h6 text-weight-bold">{{ event.cours }}</div>
                                
                                <div class="text-h6">{{ event.date }}</div>
                            </q-card-section>

                            <q-card-section  v-if="event.justificatif == false" class="q-pt-none q-mt-sm">
                                <div class="items-center text-center">
                                    <div v-if="event.fileSend == true" class="text-uppercase text-weight-bold">Envoyé un nouveau justificatif : </div>
                                    <div v-else class="text-uppercase text-weight-bold">Envoyé un justificatif : </div>
                                </div>
                                <q-separator spaced/>
                                <q-uploader
                                    class="q-mt-sm btnColor no-shadow"
                                    label="Fichiers"
                                    multiple
                                    ref="uploader"
                                    max-file-size="5242880"
                                    max-total-size="15728640"
                                    accept=".jpg, image/*, .pdf, .png, .doc"
                                    :factory="files => factoryFn(files, event)"
                                />
                            </q-card-section>
                        </q-card>
                    </q-dialog>
                </q-btn>
                <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
                    <q-btn fab icon="keyboard_arrow_up" color="primary" />
                </q-page-scroller>
            </q-page>
        </q-page-container>
        </q-layout>
</template>
  
<style>
.modal-color{
    background-color: var(--moduleBackgroundColor);
}

.q-btn:before {
    box-shadow: none !important;
}

.bg-orange{
    background-color: orangered;
} 
</style>
<script>
import config from '@/assets/config.js';
import axios from 'axios';
    export default {
        name: 'AbsenceEleveModule',
        data() {
            return {
                events: [],
                id : 1,
                selected_file:'',
                check_if_document_upload:false,
                nbAbsenceInjustifie : 0,
                token: null
            }
        },
        mounted() {
            this.token = `Bearer ${localStorage.getItem("token")}`
            this.fetchAbsences();
        },
        methods: {
            fetchAbsences() {
                axios.get(config.apiUrl + 'absences/' + localStorage.getItem("idUser"), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                })
                    .then(response => {
                        const absences = response.data.absences;
                        this.events = absences.map(absence => {
                            return {
                                idCours: absence.idCours,
                                title: `Absence du ${this.formatDate(absence.date.date)} ${this.formatTime(absence.heure.date)}`,
                                cours: absence.cours,
                                date: this.formatDateTime(absence.date.date, absence.heure.date),
                                justificatif: absence.justifie !== null ? absence.justifie : false,
                                fileSend: absence.justificatif != null
                            };
                        });
                        let count = 0;
                        this.events.forEach(e => {
                            if(e.justificatif == false){
                                count++;
                            }
                        });
                        this.nbAbsenceInjustifie = count;
                    })
                    .catch((e)=>{
                        console.log(e);
                    })
            },
            generateId() {
                return this.id+=1; 
            },
            formatDate(date) {
                const dd = new Date(date);
                return dd.getDate().toString().padStart(2, '0') + "/" + (dd.getMonth()+1).toString().padStart(2, '0') + "/" + dd.getFullYear()
            },
            formatTime(time) {
                const tt = new Date(time);
                let tt2 = new Date(time);
                tt2.setMinutes(tt2.getMinutes() + 90);
                return tt.getHours().toString().padStart(2, '0') + "h" + tt.getMinutes().toString().padStart(2, '0') + "-" + tt2.getHours().toString().padStart(2, '0') + "h" + tt2.getMinutes().toString().padStart(2, '0');
            },
            formatDateTime(date, time) {
                return this.formatDate(date) + " " + this.formatTime(time);
            },
            // eslint-disable-next-line no-unused-vars
            factoryFn (files, event) {
                let uploadFile = files[0];
                let fd = new FormData();
                fd.append("file", uploadFile);
                fd.append("id", "1");
                fd.append("name", event.idCours);
                fd.append("cours", event.idCours);
                fd.append("user", localStorage.getItem("idUser"));

                axios.post(config.apiUrl + 'absence/uploadJustificatif', fd, {
                   headers: {'Content-Type': undefined, 'Authorization' : this.token},
                }).then(
                function (response) {
                    if (response.data.success) {
                        this.$q.notify({
                            color: 'positive',
                            message: 'Fichier envoyé avec succès !'
                        });
                        event.id = false;
                    }
                }.bind(this))
            }
        }
    }
</script>
  