<template>
    <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
      <div>
        <div class="text-h3" style="opacity:.7">
            Accès non autorisé
        </div>
  
        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="blue"
          unelevated
          size="xl"
          rounded
          to="/"
          label="Retourner au menu principal"
          no-caps
        />
      </div>
    </div>
  </template>
  
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
      name: 'AccessDenied'
    })
</script>