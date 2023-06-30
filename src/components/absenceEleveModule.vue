<template>
        <div class="card-module" style="overflow: hidden;">
            <div class="text-h6 text-weight-bold">Absences</div>
            <p class="text-grey-7 text-weight-thin">1 absences non justifié</p>
            
            <div style="overflow: scroll; height: 150px; ">
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
                            <q-badge v-if="event.justificatif == false" text-color="white" class="bg-negative q-px-md q-py-xs" style="border-radius: 50px;">
                                <div class="text-caption">Non justifié</div>
                            </q-badge>
                            <q-badge v-else text-color="white" class="bg-positive q-px-md q-py-xs" style="border-radius: 50px;">
                                <div class="text-caption">Justificatif envoyé</div>
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
                                    <q-badge v-if="event.justificatif == false" text-color="white" class="bg-negative q-px-md q-py-xs" style="border-radius: 50px;">
                                        <div class="text-caption">Non justifié</div>
                                    </q-badge>
                                    <q-badge v-else text-color="white" class="bg-positive q-px-md q-py-xs" style="border-radius: 50px;">
                                        <div class="text-caption">Justificatif envoyé</div>
                                    </q-badge>
                                </div>
                            </q-card-section>
                    
                            <q-card-section class="q-pt-none q-mt-sm">
                                <div class="text-h6 text-weight-bold">{{ event.cours }}</div>
                                
                                <div class="text-h6">{{ event.date }}</div>
                            </q-card-section>

                            <q-card-section class="q-pt-none q-mt-sm">
                                <div class="items-center text-center">
                                    <q-btn v-if="event.justificatif == true" class="btnColor">Envoyé un nouveau justificatif</q-btn>
                                    <q-btn v-else class="btnColor">Envoyé un justificatif</q-btn>
                                </div>
                                <q-uploader
                                    url="http://localhost:4444/upload"    
                                    class="q-mt-sm btnColor no-shadow"
                                    label="Fichiers"
                                    multiple
                                    max-file-size="5242880"
                                    max-total-size="15728640"
                                    accept=".jpg, image/*, .pdf, .png, .doc"
                                />
                            </q-card-section>
                        </q-card>
                    </q-dialog>
                </q-btn>
            </div>
            
        </div>
</template>
  
<style>
.card-module{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 30px;
    background-color: var(--moduleBackgroundColor);
}

.modal-color{
    background-color: var(--moduleBackgroundColor);
}

.q-btn:before {
    box-shadow: none !important;
}
</style>
<script>
    export default {
        name: 'AbsenceEleveModule',
        data() {
            return {
                events: [
                    {
                        id: 1,
                        title: "Absence du 5 décembre 2022 11h30-13h",
                        cours: "Cours d'Anglais",
                        date: "05/12/2022 10h30h-13h",
                        justificatif: true
                    },
                    {
                        id: 2,
                        title: "Absence du 5 mai 2023 13h-14h30",
                        cours: "Cours d'UML",
                        date: "05/05/2023 13h-14h30",
                        justificatif: false
                    }
                ]
            }
        }        
    }
</script>
  