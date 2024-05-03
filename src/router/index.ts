import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Schedule from '@/views/Schedule.vue';
import Result from '@/views/Result.vue';
import Camera from '@/views/Camera.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule
  },
  {
    path: '/camera',
    name: 'Camera',
    component: Camera
  },
  {
    path: '/result/:id&:title',
    name: 'Result',
    component: Result,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
