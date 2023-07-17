<template>
    <div class="card-module">
        <q-tabs
          v-model="tab"
          dense
          class="bg-moduleBackgroundColor"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
            <q-tab name="absences" label="absences"/>
            <q-tab name="eleves" label="élèves"/>
            <q-tab name="planning" label="planning" v-bind:disable="selectedClasse == null || selectedEcole == null"/>
        </q-tabs>
        <q-separator />
  
        <q-tab-panels v-model="tab" animated class="bg-moduleBackgroundColor" style="height: 95%;">
            <q-tab-panel name="absences">
                <Absences :selected-ecole="selectedEcole" :selected-classe="selectedClasse"/>
            </q-tab-panel>
  
            <q-tab-panel v-model="tab" name="eleves">
                <Eleves :selected-ecole="selectedEcole" :selected-classe="selectedClasse"/>
            </q-tab-panel>
            <q-tab-panel name="planning">
                <Planning :isDifferent="randomUserForPlannig" :selected-ecole="selectedEcole" :selected-classe="selectedClasse" />
            </q-tab-panel>
        </q-tab-panels>
    </div>
</template>
  
<script>
    import Planning from '@/components/Planning.vue'
    import Absences from '@/components/APStudentTable.vue'
    import Eleves from '@/components/APListEleves.vue'

    import axios from 'axios';
    import config from '@/assets/config';


    export default {
        name: 'APTab',
        props: ['selectedEcole', 'selectedClasse'],
        components: {
            Planning,
            Absences,
            Eleves,
        },
        data() {
            return {
                tab: 'absences',
                randomUserForPlannig: null
            };
        },
        watch: {
            selectedEcole() {
                this.refreshPlannig();
            },
            selectedClasse() {
                this.refreshPlannig();
            }
        },
        methods: {
            refreshPlannig() {
                if(this.selectedEcole && this.selectedClasse){
                    axios.get(config.apiUrl + 'classes/' + this.selectedClasse, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    .then(response => {
                        const classe = response.data;
                        if(classe.ecole.id == this.selectedEcole){
                            const user = response.data;
                            this.randomUserForPlannig = user.utilisateurs[0].id;
                        }
                    })
                    .catch((e)=>{
                        console.log(e);
                    })
                }
            }
        }
    };
</script>
  