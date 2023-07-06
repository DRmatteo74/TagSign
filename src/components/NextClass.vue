<script>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    export default {
        name: 'NextClass',

        props: {
            isProf: {
                type: Boolean,
                required: true
            }
        },

        setup(props) {
            const validation = ref(true);
            const router = useRouter();
        
            const openAppelProf = () => {
                if (props.isProf === true) {
                    router.push('/appel');
                }
            }

            return {
                validation,
                openAppelProf
            }
        } 
    }
</script>

<template>
    <div flat class="card-module" @click="openAppelProf">
        <div class="text-h6 text-weight-bold">Cours à venir</div>
        <q-card
            class="my-card q-mx-md q-my-sm" 
            style="background: #009eF7" flat
            v-bind:style="isProf == true? {'cursor': 'pointer'} : {'cursor': 'auto'}">
            <div>
                <q-badge v-if="validation === true" floating color="green" rounded>
                    <q-icon name="done" color="white" />
                </q-badge>
                <q-badge v-else floating color="red" rounded>
                    <q-icon name="close" color="white" />
                </q-badge>
            </div>
            <q-card-section>
                <div class="text-h6 center text-white">Jeudi 11 mai 2023 11h15</div>
                <div class="text-h4 center text-white text-weight-bold">Anglais</div>
                <div class="text-h6 center text-white">Salle : 512</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<style>
  .center{
    text-align: center;
  }
</style>