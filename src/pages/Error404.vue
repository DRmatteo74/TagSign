<template>
    <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
      <div>
        <div style="font-size: 25vh">
          404
        </div>
  
        <div class="text-h3" style="opacity:.7">
            Attention, attention ! La page que vous cherchez est en grève pour revendiquer des droits de pixels.
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
      name: 'Error404Page'
    })
</script>