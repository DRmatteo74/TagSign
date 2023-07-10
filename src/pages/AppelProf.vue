<template>
    <div class="card">
      <q-tabs
        v-model="tab"
        dense
        class="bg-moduleBackgroundColor"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="tableau" label="Tableau blanc" 
        @click="changeMenu" v-bind:disable="isDistanciel"/>
        <q-tab name="liste" label="Liste" 
        @click="changeMenu"/>
      </q-tabs>
      <q-separator />
  
      <q-tab-panels v-model="tab" animated class="bg-moduleBackgroundColor" style="height: 95%;">
        <q-tab-panel name="tableau">
          <div class="random_container" ref="container">
            <div :style="getRandomElementStyle(event)" v-for="event in events" :key="event.id" ref="element" class="random_element">
              {{ event.nom + " " + event.prenom }}
            </div>
          </div>
        </q-tab-panel>
  
        <q-tab-panel v-model="tab" name="liste">
            <div class="row justify-end">
                <q-btn color="primary" outline label="Actualiser" @click="fetchDataListe" class="q-mb-md"/>
                <q-btn color="primary" label="Valider" @click="validerAppel" class="q-mb-md q-ml-md"/>
            </div>
            <q-table
                flat bordered
                title="Élèves"
                :rows="listeOfEleve"
                :columns="columns"
                row-key="name"
                virtual-scroll
                no-data-label="Aucun élèves"
                :rows-per-page-options="[0]"
            >
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="nom" :props="props">{{ props.row.nom }}</q-td>
                        <q-td key="prenom" :props="props">{{ props.row.prenom }}</q-td>
                        <q-td key="present" :props="props" auto-width>
                            <q-checkbox v-model="props.row.presence" />
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </template>
  
<script>
import axios from 'axios';
import config from '@/assets/config.js';

  export default {
    data() {
      return {
        tab: 'tableau',
        events: [],
        columns: [
            { name: 'nom', required: true, label: 'Nom', align: 'left', field: 'nom', sortable: true },
            { name: 'prenom', required: true, label: 'Prénom', align: 'left', field: 'prenom', sortable: true },
            { name: 'present', required: true, label: 'Présence', align: 'left', field: 'present', sortable: true },
        ],
        selectedEvents: [],
        idCours : 0,
        intervalIdTableau : null,
        listeOfEleve: [],
        isDistanciel : false,
        containerSize: []
      };
    },
    mounted() {
        this.idCours = this.$route.params.id;

        axios.get(config.apiUrl + 'cours/' + this.idCours, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            const cours = response.data;
            this.isDistanciel = cours.distanciel;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de l\'API', error);
        });

        if(this.isDistanciel === true){
            this.tab = 'liste';
            this.fetchDataListe();
        }else{
            this.fetchDataTableau();
            this.startFetchingDataTableau();
        }
    },
    methods: {
        changeMenu(){
            if(this.isDistanciel == false){
                if(this.tab == "tableau"){
                    this.startFetchingDataTableau();
                }else{
                    this.fetchDataListe();
                    this.stopFetchingDataTableau();
                }
            }
        },
        startFetchingDataTableau() {
            this.intervalIdTableau = setInterval(this.fetchDataTableau, 5000);
        },
        stopFetchingDataTableau() {
            clearInterval(this.intervalIdTableau); // arrête l'intervalle
        },
        setRandomPositions() {
            let parentWidth = 0;            
            let parentHeight =0;

            if(this.$refs.container != null){
                const container = this.$refs.container;
                parentWidth = container.offsetWidth;
                parentHeight = container.offsetHeight;
                
                this.containerSize = { "width" : parentWidth, "height" : parentHeight }
            }else{
                parentWidth = this.containerSize.width;
                parentHeight = this.containerSize.height;
            }

            const occupiedPositions = new Set();

            let randomX, randomY;
            do {
                randomX = Math.floor(Math.random() * (parentWidth - 100));
                randomY = Math.floor(Math.random() * (parentHeight - 40));
            } while (this.isPositionOccupied(randomX, randomY, occupiedPositions));

            occupiedPositions.add({ x: randomX, y: randomY });

            let randomColor = Math.floor(Math.random()*16777215).toString(16);

            var red = parseInt(randomColor.substr(0, 2), 16);
            var green = parseInt(randomColor.substr(2, 2), 16);
            var blue = parseInt(randomColor.substr(4, 2), 16);

            var luminance = (red * 299 + green * 587 + blue * 114) / 1000;
            let randomTextColor = "";
            if(luminance > 128){ randomTextColor = "#000"; }else{randomTextColor = "#FFF"; }

            return {
                position: 'absolute',
                left: `${randomX}px`,
                top: `${randomY}px`,
                background : `#${randomColor}`,
                color : `${randomTextColor}`
            };
        },
        isPositionOccupied(x, y, occupiedPositions) {
            for (const position of occupiedPositions) {
              if (Math.abs(position.x - x) < 120 && Math.abs(position.y - y) < 120) {
                return true;
              }
            }
            return false;
        },
        getRandomElementStyle(event) {
            if(event.elementStyle == null){
                event.elementStyle = this.setRandomPositions();
            }
            return event.elementStyle;
        },
        fetchDataTableau() {
            axios.get(config.apiUrl + 'cours/getPresence/' + this.idCours, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                const newEvents = response.data;
                newEvents.forEach(newEvent => {
                    const existingEvent = this.events.find(event => event.id === newEvent.id);
                    if (!existingEvent) {
                        // Ajoute l'événement seulement s'il n'existe pas déjà
                        this.events.push({
                            id: newEvent.id,
                            nom: newEvent.utilisateur.nom,
                            prenom:newEvent.utilisateur.prenom,
                            elementStyle: null
                        });
                    }
                });
            })
            .catch(error => {
              console.error('Erreur lors de la récupération des données de l\'API', error);
            });
        },
        fetchDataListe(){
            axios.get(config.apiUrl + 'cours/getListEleve/' + this.idCours, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                this.listeOfEleve = [];
                const newEvents = response.data;
                newEvents.forEach(newEvent => {
                    this.listeOfEleve.push({
                        nom: newEvent.nom,
                        prenom: newEvent.prenom,
                        presence : newEvent.presence
                    });
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données de l\'API', error);
            });
        },
        validerAppel(){
            const data = {
                coursId: this.idCours,
                eleves: this.listeOfEleve
            };
            
            axios.post(config.apiUrl + "cours/setPresence", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.error(error);
              });
        }
    }  
};
</script>
  
<style>
    .card {
        background: var(--cardColor);
        width: 100%;
        height: 100%;
        padding: 30px;
        border-radius: 15px;
    }

    .random_container {
        height: 100%;
    }

    .random_element{
        padding: 5px 10px 5px 10px;
        font-size: medium;
        font-weight: bolder;
        border-radius: 50px;
    }
</style>
  