<template>
    <div class="fit">
        <q-layout class="card-module" container>
            <q-header reveal view="lHh Lpr lFf" class="q-px-lg q-pt-lg bg-moduleBackgroundColor text-color">
                <div class="text-h6 text-weight-bold">Emploi du temps</div>
                <p class="text-grey-7 text-weight-thin">Emploi du temps prévisionnel, sous réserve de modification</p>

                <div class="row">
                    <div class="col">
                        <q-btn-group class="q-mb-lg no-shadow">
                            <q-btn class="btnColor" label="<" @click="calendarPrev" />
                            <q-btn class="btnColor" label=">" @click="calendarNext"/>
                        </q-btn-group>
                        <q-btn class="q-mb-lg q-ml-sm no-shadow btnColor" style="text-transform: none;" @click="calendarToday">Aujourd'hui</q-btn>
                    </div>
                    <div class="col-auto">
                      <div class="text-center">
                        <div class="text-h6 text-weight-bold">{{ formattedDate }}</div>
                      </div>
                    </div>
                    <div class="col">
                    </div>
                </div>
            </q-header>
                
            
            <q-page-container>
            <q-page padding>
            <q-calendar
                ref="calendar"
                v-model="selectedDate"
                :weekdays="[1, 2, 3, 4, 5]"
                view="week"
                locale="fr"
                hour24-format
                :interval-start="7"
                :interval-count="13"
                :interval-height="30"
                bordered
                style="width: 100%; border-radius: 7px;"
            >

                <template #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }">
                    <template
                        v-for="event in getEvents(timestamp.date)"
                        :key="event.id"
                    >
                        <div
                            v-if="event.time !== undefined"
                            class="my-event"
                            :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
                        >
                            <div class="title q-calendar__ellipsis text-center">
                                <div>
                                    <div class="text-subtitle1 text-weight-bold">{{ event.title }}</div>
                                    <div class="text-caption">Salle {{ event.details }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </q-calendar>
        </q-page>
        </q-page-container>
        </q-layout>
    </div>
</template>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<style>
    .q-btn:before {
        box-shadow: none !important;
    }

    .q-calendar-day__day.q-current-day{
        background-color: #fff8ddb9;
    }

    .my-event{
        position: absolute;
        font-size: 12px;
        justify-content: center;
        margin: 0 1px;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        width: 100%;
        background-color: #009ef7;
        color: white;
        border-radius: 5px;
    }

    .title{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>
  
<script>
    import { QCalendar, parseTimestamp, addToDate } from '@quasar/quasar-ui-qcalendar'
    import axios from 'axios';
    import config from '@/assets/config.js';
   
    export default {
        name: 'PlanningSmall',
        props: {
            isDifferent: {
                default: 0
            }
        },
        components: {
			QCalendar
        },
        data() {
            return {
                selectedDate: new Date().toISOString().split('T')[0],
				events: []
			}
        },
        mounted(){
            return this.fetchPlanning();
        },
        methods: {
            calendarNext () {
                this.$refs.calendar.next()
            },
            calendarPrev () {
                this.$refs.calendar.prev()
            },
            calendarToday(){
                this.$refs.calendar.moveToToday()
            },
			badgeStyles (event, type, timeStartPos = undefined, timeDurationHeight = undefined) {
                const s = {}
                if (timeStartPos && timeDurationHeight) {
                    s.top = timeStartPos(event.time) + 'px'
                    s.height = timeDurationHeight(event.duration) + 'px'
                }
                return s
            },
            getEvents (dt) {
                const events = this.eventsMap[ dt ] || []
                if (events.length === 1) {
                    events[ 0 ].side = 'full'
                }
                return events
            },
            fetchPlanning() {
                let idPlanning = 0;
                if(this.isDifferent == 0){
                    idPlanning = localStorage.getItem("idUser");
                }else{
                    idPlanning = this.isDifferent;
                }
                console.log(this.isDifferent);
                axios.get(config.apiUrl + 'planning/' + idPlanning, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then(response => {
                        const planning = response.data;
                        this.events = planning.map(cours => {
                            return {
                                id: cours.id,
                                title: cours.nom,
                                details: cours.salle,
                                date: this.formatDate(cours.date.date),
                                time: this.formatTime(cours.heure.date),
                                duration: 90
                            };
                        });
                    })
                    .catch(()=>{
                        //console.log(e);
                    })
            },
            formatDate(date) {
                const dd = new Date(date);
                return dd.getFullYear() + "-" +  (dd.getMonth()+1).toString().padStart(2, '0') + "-" + dd.getDate().toString().padStart(2, '0')
            },
            formatTime(time) {
                const tt = new Date(time);
                return tt.getHours().toString().padStart(2, '0') + ":" + tt.getMinutes().toString().padStart(2, '0');
            }
        },
        computed: {
            formattedDate() {
              const options = {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              };

              let date = new Date(this.selectedDate).toLocaleDateString('fr-FR', options);
              date = date.charAt(0).toUpperCase() + date.slice(1);
              return date;
            },
            eventsMap () {
                const map = {}
                // this.events.forEach(event => (map[ event.date ] = map[ event.date ] || []).push(event))
                this.events.forEach(event => {
                    if (!map[ event.date ]) {
                        map[ event.date ] = []
                    }
                    map[ event.date ].push(event)
                    if (event.days) {
                        let timestamp = parseTimestamp(event.date)
                        let days = event.days
                        do {
                        timestamp = addToDate(timestamp, { day: 1 })
                        if (!map[ timestamp.date ]) {
                            map[ timestamp.date ] = []
                        }
                        map[ timestamp.date ].push(event)
                        } while (--days > 0)
                    }
                })
                return map
            }
        },
        watch: {
            isDifferent() {
                this.fetchPlanning();
            },
        },
    }

</script>