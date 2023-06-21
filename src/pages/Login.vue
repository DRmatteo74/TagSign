<template>
  <q-layout>
    <q-page-container class="background">
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}" class="q-pa-lg card">
          <q-card-section class="row justify-center">
            <q-avatar size="103px" class="shadow-10  circle">
              <q-icon name="person" color="black" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-sm">
              <div class="col text-h6 ellipsis">
                Se connecter
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="username"
                label="Nom d'utilisateur"
                lazy-rules
              />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Mot de passe"
                lazy-rules

              />

              <div class="row justify-center">
                <q-btn label="Se connecter" to="/" type="button" color="primary" rounded/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
  
  <script>  
  export default {
    name: 'LoginPage',
  
  
    setup () {
      return {
      }
    }
  }
  </script>
  <style>
  
  .card{
    background: #F6F6F6;
    width: 100%;
    height: 100%;
    padding: 30px;
    border-radius: 15px;
  }

  .background{
    background-image: radial-gradient(circle, rgba(43,103,255,1) 10%, rgba(28,21,145,1) 100%);
  }

  .circle{
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);

  }
  </style>