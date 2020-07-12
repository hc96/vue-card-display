import Vue from 'vue'
import VueRouter from 'vue-router'
import Building from '../components/Building.vue'
import Room from '../components/Room.vue'
import Setting from '../components/Setting.vue'
import Radar from '../components/Radar.vue'
import Hub from '../components/Hub.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/building'
    },
    {
        path: '/room',
        name: 'room',
        component: Room,
    },
    {
        path: '/building',
        component: Building,
    },
    {
        path: '/setting',
        component: Setting,
        children: [
            { path: '/radar', component: Radar },
            { path: '/hub', component: Hub },
        ]
    }
]

const router = new VueRouter({
    routes
})


export default router
