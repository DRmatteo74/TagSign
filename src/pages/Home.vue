<template>
    <div class="card">
        <div class="q-pa-md example-row-equal-width fit">
            <div class="row justify-between fit">
                <div class="column q-mr-md" style="width: 35%; height: 100%;">
                    <div class="col-auto q-mb-md">
                        <NextClass :is-prof="isProf" v-if="(isEleve || isProf) && !isAp"/>
                        <APEcoles v-if="isAp" @ecole-selected="handleEcoleSelected"/>
                    </div>
                    <div class="col" >
                        <Absence v-if="isEleve"/>
                        <APClasses v-if="isAp" :selected-ecole="selectedEcole" @classe-selected="handleClasseSelected"/>
                    </div>
                </div>
                <div class="col">
                    <PlanningSmall  v-if="isEleve || isProf"/>
                    <APStudentTable v-if="isAp"/>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
    import { ref } from 'vue'
    import NextClass from '@/components/NextClass.vue'
    import PlanningSmall from '@/components/Planning.vue'
    import Absence from '@/components/AbsenceEleveModule.vue'
    import APClasses from '@/components/APClasses.vue'
    import APEcoles from '@/components/APEcoles.vue'
    import APStudentTable from '@/components/APStudentTable.vue'

    export default {
        name: 'HomePage',
        
        components: {
            NextClass,
            PlanningSmall,
            Absence,
            APClasses,
            APEcoles,
            APStudentTable
        },

        setup () {
            return {
                leftDrawerOpen: ref(false)
            }
        },

        data(){
            return {
                isProf : false,
                isEleve : true,
                isAp : false,
                isAdmin : false,
                selectedEcole: null,
                selectedClasse: null
            }
        },
        mounted() {
            const roles = JSON.parse(localStorage.getItem('roles'));

            if (roles && roles.length > 0) {
                this.isProf = roles.includes('ROLE_PROF');
                this.isEleve = roles.includes('ROLE_ELEVE');
                this.isAp = roles.includes('ROLE_AP');
                this.isAdmin = roles.includes('ROLE_ADMIN');
            }
        },
        methods: {
            handleEcoleSelected(selectedEcole) {
                this.selectedEcole = selectedEcole;
            },
            handleClasseSelected(selectedClasse){
                this.selectedClasse = selectedClasse;
            }
        }
    }
</script>

<style>
    .card{
      background: var(--cardColor);
      width: 100%;
      height: 100%;
      padding: 30px;
      border-radius: 15px;
    }
</style>