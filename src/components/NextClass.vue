<script>
    import axios from 'axios';
    import config from '@/assets/config.js';

    export default {
        name: 'NextClass',

        props: {
            isProf: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                id: 0,
                date : "",
                cours : "",
                salle : "",
                presence: false
			}
        },
        mounted(){
            this.fetchNextCours();
        },
        methods : {
            openAppelProf() {
                if (this.isProf === true) {
                  this.$router.push('/appel/' + this.id);
                }
            },
            fetchNextCours() {
                axios.get(config.apiUrl + 'cours/next/' + localStorage.getItem("idUser"), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
                })
                    .then(response => {
                        const nextCours = response.data;
                        this.id = nextCours.id;
                        this.date = this.formatDate(nextCours.date, nextCours.heure)
                        this.cours = nextCours.cours;
                        this.salle = nextCours.salle;
                        this.presence = nextCours.presence;
                    })
                    .catch((e)=>{
                        console.log(e);
                    })
            },
            formatDate(date, heure) {
                const dd = new Date(date);
                let h = heure.substring(0, heure.length - 3);
                h = h.replace(":", "h")
                return dd.getDate().toString().padStart(2, '0') + "/" + dd.getMonth().toString().padStart(2, '0') + "/" + dd.getFullYear() + " " +h;
            },
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
                <q-badge v-if="presence === true" floating color="green" rounded>
                    <q-icon name="done" color="white" />
                </q-badge>
                <q-badge v-else floating color="red" rounded>
                    <q-icon name="close" color="white" />
                </q-badge>
            </div>
            <q-card-section>
                <div class="text-h6 center text-white">{{ date }}</div>
                <div class="text-h4 center text-white text-weight-bold">{{ cours }}</div>
                <div class="text-h6 center text-white">Salle : {{ salle }}</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<style>
  .center{
    text-align: center;
  }
</style>