import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'App',
        component: () => import("@/layouts/MainLayout.vue"),
        children: [
            {
                path: '', 
                component: () => import('@/pages/Home.vue'), 
                meta: { requiresAuth: true, requiredRoles: ['ROLE_USER'] }
            },
            /*{path: '/planning', component: () => import('pages/Planning.vue') }*/
            {
                path: '/appel/:id', 
                component: () => import('@/pages/AppelProf.vue'), 
                meta: { requiresAuth: true, requiredRoles: ['ROLE_ADMIN', 'ROLE_PROF'] } }
        ],
        meta: { requiresAuth: true, requiredRoles: ['ROLE_USER'] }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login.vue')
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('@/pages/Error404.vue')
    },
    {
        path: '/access-denied',
        name: 'access-denied',
        component: () => import('@/pages/AccessDenied.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router