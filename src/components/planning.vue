<template>
    <div class="full-height">
        <div class="card-module">
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
                <div class="col">
                  <div class="text-center">
                    <div class="text-h6 text-weight-bold">{{ formattedDate }}</div>
                  </div>
                </div>
                <div class="col">
                </div>
            </div>
            

            <q-calendar
                ref="calendar"
                v-model="selectedDate"
                :weekdays="[1, 2, 3, 4, 5]"
                view="week"
                locale="fr"
                hour24-format
                :interval-start="7"
                :interval-count="13"
                bordered
                style="width: 100%; height: 50vh; border-radius: 7px;"
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
                            <span class="title q-calendar__ellipsis">
                                {{ event.title }}
                                <q-tooltip>{{ event.details }}</q-tooltip>
                            </span>
                        </div>
                    </template>
                </template>
            </q-calendar>
        </div>
    </div>
</template>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>
<style>
    .full-height{
        width: 100%;
        height: 100%;
        min-height: 0 !important;
    }

    .card-module{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 30px;
        background-color: var(--moduleBackgroundColor);
    }

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

   
    export default {
        name: 'PlanningSmall',
        components: {
			QCalendar
        },
        data() {
            return {
                selectedDate: new Date().toISOString().split('T')[0],
				events: [
                    {
                        id: 1,
                        title: "Cours d'anglais",
                        details: 'Time to pitch my idea to the company',
                        date: "2023-06-09",
                        time: '10:00',
                        duration: 120
                    },
                    {
                        id: 2,
                        title: 'Cours UML',
                        details: 'Company is paying!',
                        date: "2023-06-08",
                        time: '11:30',
                        duration: 90
                    }
                ]
			}
        },
        methods: {
            calendarNext () {
                console.log(this.$refs.calendar);
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
        }
    }
    
</script>