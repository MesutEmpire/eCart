import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SuperUserView from '../views/SuperUserView.vue'
import {UserStore} from "@/stores/Users";
import {UserAuthStore} from "@/stores/UserAuth";



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: () => import(/* webpackChunkName: "about" */ '../views/PageNotFoundView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogInView.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',

    component: () => import(/* webpackChunkName: "about" */ '../views/SignUpVIew.vue')
  },
  {
    path: '/SuperUser/',
    name: 'SuperUser',
    // component: SuperUserView,
    component: () => import(/* webpackChunkName: "about" */ '../views/SuperUserView.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import(/* webpackChunkName: "about" */ '../components/DashBoard.vue'),
      },
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../components/AllUsers.vue'),
      },
    ],

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
