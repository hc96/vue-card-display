import Vue from 'vue'
import VueRouter from 'vue-router'
import Building from '../components/Building.vue'
import Room from '../components/Room.vue'
import Setting from '../components/Setting.vue'
import Radar from '../components/Radar.vue'
import Hub from '../components/Hub.vue'
import Rhub from '../components/Rhub.vue'
import Sensor from '../components/Sensor.vue'
import Show from '../components/Show.vue'




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
        path: '/show',
        component: Show,
        children: [
            { path: '/sensor', component: Sensor },
            { path: '/rhub', component: Rhub },
        ]
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
