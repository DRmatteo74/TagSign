import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'App',
        component: () => import("@/layouts/MainLayout.vue"),
        children: [
            {path: '', component: () => import('@/pages/Home.vue')},
            /*{path: '/planning', component: () => import('pages/Planning.vue') }*/
        ]
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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router