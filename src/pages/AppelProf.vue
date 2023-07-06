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
        <q-tab name="tableau" label="Tableau blanc" />
        <q-tab name="liste" label="Liste" />
      </q-tabs>
      <q-separator />
  
      <q-tab-panels v-model="tab" animated class="bg-moduleBackgroundColor" style="height: 95%;">
        <q-tab-panel name="tableau">
          <div class="random_container" ref="container">
            <div :style="getRandomElementStyle(event)" v-for="event in events" :key="event.id" ref="element" class="random_element">
              {{ event.name }}
            </div>
          </div>
        </q-tab-panel>
  
        <q-tab-panel name="liste">
            <q-table
                flat bordered
                title="Élèves"
                :rows="events"
                :columns="columns"
                row-key="name"
                virtual-scroll
                no-data-label="Aucun élèves"
                :rows-per-page-options="[0]"
            >
                <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="id" :props="props">{{ props.row.id }}</q-td>
                      <q-td key="nom" :props="props">{{ props.row.nom }}</q-td>
                      <q-td key="prenom" :props="props">{{ props.row.prenom }}</q-td>
                      <q-td key="present" auto-width>
                        <q-checkbox v-model="props.selected" />
                      </q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tab: 'tableau',
        events: [
        { id: 1, name: 'Événement 1', elementStyle: null },
        { id: 2, name: 'Événement 2', elementStyle: null },
        { id: 3, name: 'Événement 3', elementStyle: null },
        { id: 4, name: 'Événement 4', elementStyle: null },
        { id: 5, name: 'Événement 5', elementStyle: null },
        { id: 6, name: 'Événement 6', elementStyle: null },
        { id: 7, name: 'Événement 7', elementStyle: null },
        { id: 8, name: 'Événement 8', elementStyle: null },
        { id: 9, name: 'Événement 9', elementStyle: null },
        { id: 10, name: 'Événement 10', elementStyle: null },
        { id: 11, name: 'Événement 11', elementStyle: null },
        { id: 12, name: 'Événement 12', elementStyle: null },
        { id: 13, name: 'Événement 13', elementStyle: null },
        { id: 14, name: 'Événement 14', elementStyle: null },
        { id: 15, name: 'Événement 15', elementStyle: null },
        { id: 16, name: 'Événement 16', elementStyle: null },
        { id: 17, name: 'Événement 17', elementStyle: null },
        { id: 18, name: 'Événement 18', elementStyle: null },
        { id: 19, name: 'Événement 19', elementStyle: null },
        { id: 20, name: 'Événement 20', elementStyle: null },
        { id: 21, name: 'Événement 11', elementStyle: null },
        { id: 22, name: 'Événement 12', elementStyle: null },
        { id: 23, name: 'Événement 13', elementStyle: null },
        { id: 24, name: 'Événement 14', elementStyle: null },
        { id: 25, name: 'Événement 15', elementStyle: null },
        { id: 26, name: 'Événement 16', elementStyle: null },
        { id: 27, name: 'Événement 17', elementStyle: null },
        { id: 28, name: 'Événement 18', elementStyle: null },
        { id: 29, name: 'Événement 19', elementStyle: null },
        { id: 30, name: 'Événement 10', elementStyle: null },
        { id: 31, name: 'Événement 11', elementStyle: null },
        { id: 32, name: 'Événement 12', elementStyle: null },
        { id: 33, name: 'Événement 13', elementStyle: null },
        { id: 34, name: 'Événement 14', elementStyle: null },
        { id: 35, name: 'Événement 15', elementStyle: null },
        { id: 36, name: 'Événement 16', elementStyle: null },
        { id: 37, name: 'Événement 17', elementStyle: null },
        { id: 38, name: 'Événement 18', elementStyle: null },
        { id: 39, name: 'Événement 19', elementStyle: null },
        { id: 40, name: 'Événement 20', elementStyle: null },
        ],
        columns: [
        { name: 'id', required: true, label: 'ID', align: 'left', field: 'id', sortable: true },
        { name: 'name', required: true, label: 'Nom', align: 'left', field: 'name', sortable: true },
        { name: 'present', required: true, label: 'Présence', align: 'left', field: 'present', sortable: true },
      ],
      selectedEvents: [],
      };
    },
    mounted() {
      this.$nextTick(() => {
        const container = this.$refs.container;
        const elements = this.$refs.element;
        this.setRandomPositions(container, elements);
      });
    },
    methods: {
        setRandomPositions(container, elements) {
            const parentWidth = container.offsetWidth;
            const parentHeight = container.offsetHeight;
            const elementHeight = elements[0].offsetHeight;
            
            const occupiedPositions = new Set();
            
            this.events.forEach(event => {
                let randomX, randomY;
                do {
                    randomX = Math.floor(Math.random() * (parentWidth - 100));
                    randomY = Math.floor(Math.random() * (parentHeight - elementHeight));
                } while (this.isPositionOccupied(randomX, randomY, occupiedPositions));
              
                occupiedPositions.add({ x: randomX, y: randomY });
              
                let randomColor = Math.floor(Math.random()*16777215).toString(16);

                var red = parseInt(randomColor.substr(0, 2), 16);
                var green = parseInt(randomColor.substr(2, 2), 16);
                var blue = parseInt(randomColor.substr(4, 2), 16);
                
                var luminance = (red * 299 + green * 587 + blue * 114) / 1000;
                let randomTextColor = "";
                if(luminance > 128){ randomTextColor = "#000"; }else{randomTextColor = "#FFF"; }

                event.elementStyle = {
                    position: 'absolute',
                    left: `${randomX}px`,
                    top: `${randomY}px`,
                    background : `#${randomColor}`,
                    color : `${randomTextColor}`
                };
            });
        },
        isPositionOccupied(x, y, occupiedPositions) {
            for (const position of occupiedPositions) {
              if (Math.abs(position.x - x) < 110 && Math.abs(position.y - y) < 110) {
                return true;
              }
            }
            return false;
        },
        getRandomElementStyle(event) {
            return event.elementStyle;
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
  