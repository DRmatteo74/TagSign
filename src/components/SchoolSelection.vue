<script>
    export default {
        name: 'SchoolSelection',
        data() {
            return {
                events: [
                    {
                        id: 1,
                        name: "ESGI"
                    },
                    {
                        id: 2,
                        name: "ICAN"
                    }
                ]
            }
        }
    }
</script>

<template>
    <div flat class="card-module">
        <div class="text-h6 text-weight-bold">Cours à venir</div>
        <div class="row wrap justify-around">
            <q-btn-toggle
                v-model="model"
                toggle-color="primary"
                :options="[
                  {label: 'One', value: 'one'},
                  {label: 'Two', value: 'two'},
                  {label: 'Three', value: 'three'}
                ]"
            />
        </div>
    </div>
</template>

<style>
  .center{
    text-align: center;
  }
</style>