<template>
    <div class="card">
        <div class="q-pa-md example-row-equal-width fit">
            <div class="row justify-between fit">
                <div class="col-auto q-mr-md" style="width: 35%;">
                    <NextClass class="q-mb-md"/>
                    <Absence/>
                </div>
                <div class="col">
                    <PlanningSmall />
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

export default {
  name: 'HomePage',

  components: {
    NextClass,
    PlanningSmall,
    Absence
  },

  setup () {
    return {
      leftDrawerOpen: ref(false)
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