import Vue from 'vue'
import VueRouter from 'vue-router'
import Room from '../components/Room.vue'
import Building from '../components/Building.vue'



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/building'
    },
    {
        path: '/room/:id',
        component: Room,
    },
    {
        path: '/building',
        component: Building,
    }
]

const router = new VueRouter({
    routes
})


export default router
