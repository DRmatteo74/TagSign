<template>
    <div>
        <div class="card-module">
            <div class="text-h6 text-weight-bold">Absences</div>
            <p class="text-grey-7 text-weight-thin">1 absences non justifié</p>

            <div class="column" v-for="event in events" :key="event.id">
                <div class="col q-my-sm">
                    <div class="row items-center">
                        <q-avatar color="warning" size="md" text-color="red" icon="priority_high" />
                        <div class="q-mx-md">
                            <div class="text-subtitle2 text-weight-bold no-margin no-padding">{{ event.title }}</div>
                            <p class="text-grey-7 text-weight-thin no-margin no-padding">{{ event.cours }}</p>
                        </div>
                        <q-badge text-color="grey-8" class="badge q-px-md q-py-xs" style="border-radius: 50px;">
                            <div v-if="event.justificatif == false" class="text-caption">Non justifié</div>
                            <div v-else class="text-caption">Justificatif envoyé</div>
                        </q-badge>
                    </div>
                </div>
            </div>
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

.q-btn:before {
    box-shadow: none !important;
}

.badge{
    background: var(--buttonColor) !important;
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
                        title: "Absence du 5 décembre 2023 11h30-13h",
                        cours: "Cours d'Anglais",
                        justificatif: true
                    },
                    {
                        id: 2,
                        title: "Absence du 5 mai 2023 13h-14h30",
                        cours: "Cours d'UML",
                        justificatif: false
                    }
                ]
            }
        },
}
</script>
  