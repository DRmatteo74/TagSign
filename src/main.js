import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import "./assets/main.css"
import axios from 'axios';
import config from './assets/config.js';

const app = createApp(App);

app.use(Quasar, quasarUserOptions);

app.use(router);

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const roles = JSON.parse(localStorage.getItem('roles'));
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (token && roles && roles.length > 0) {
            axios.get(config.apiUrl + 'checkToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                // Token valide
                next();
            })
            .catch(() => {
                console.log("Erreur")
                // Token invalide
                router.push('/login');
            });

            if (hasAccess(roles, to.meta.requiredRoles)) {
                // L'utilisateur a les droits d'accès requis, continuer vers la route demandée
                next();
            } else {
                // L'utilisateur n'a pas les droits d'accès requis, rediriger vers une page d'erreur ou une page d'accès refusé
                router.push('/access-denied');
            }
        } else {
            // Aucun token trouvé, redirigez vers la page de connexion
            router.push('/login');
        }
    } else {
        // La route ne nécessite pas d'authentification
        next();
    }
});

function hasAccess(userRoles, requiredRoles) {
    return userRoles.some(role => requiredRoles.includes(role));
}

app.mount('#app')
