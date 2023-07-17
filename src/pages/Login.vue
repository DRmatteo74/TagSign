<template>
  <q-layout>
    <q-page-container class="background">
      <q-page class="flex bg-image flex-center">
        <q-card flat v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}" class="q-pa-lg card">
          <q-card-section class="row justify-center">
            <q-avatar size="103px" class="circle">
              <q-icon name="person" />
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
              @submit="login"
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
                  <q-btn label="Se connecter" type="submit" color="primary" rounded/>
                </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
  
<script>  
    import axios from 'axios';
    import config from '@/assets/config.js';

    export default {
        name: 'LoginPage',
        
        
        data() {
            return {
                username: '',
                password: ''
            }
        },
        setup(){
            
            return {
                errorPopup(){
                    this.$q.notify({
                        message : "<strong>Erreur :</strong> Nom d'utilisateur ou mot de passe incorrect !",
                        type: "negative",
                        html: true
                    })
                },
                successPopup(){
                    this.$q.notify({
                        message : "<strong>Vous êtes bien connecté !</strong>",
                        type: "positive",
                        html: true
                    })
                }
            }
        },
        methods : {
            async login() {
                try {
                    const response = await axios.post(config.apiUrl + 'login_check', {
                        username: this.username,
                        password: this.password
                    })
                  
                    const token= response.data.token;
                    const roles = response.data.data.roles;
                    const idUser = response.data.data.id;
                    localStorage.setItem('token', token)
                    localStorage.setItem('roles', JSON.stringify(roles))
                    localStorage.setItem('idUser', idUser)

                    this.successPopup()

                    this.$router.push('/')
                } catch (error) {
                    this.errorPopup()
                    console.error(error)
                    // Gérez les erreurs de connexion ici (affichez un message d'erreur, etc.)
                }
            }
        },
        mounted(){
            const theme = localStorage.getItem("user-theme");
            document.documentElement.className = theme;
            if (theme === "light-theme")
              this.$q.dark.set(false);
            else 
              this.$q.dark.set(true);
            
            //const token = localStorage.getItem("token");

            /*if(token){
                axios.get(config.apiUrl + 'checkToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                .then(() => {
                    this.successPopup()
                    this.$router.push('/')
                })
                .catch(()=>{
                  
                })
            }*/
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

  .background{
    background-image: radial-gradient(circle, rgba(43,103,255,1) 10%, rgba(28,21,145,1) 100%);
  }

  .circle{
    background-color: var(--moduleColor);
    color: var(--textColor);

  }
</style>