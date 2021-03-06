/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '@/views/Auth/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    name: "login",
    component: UserLogin,
    meta: {
      requiresVisitor: true,
      layout: 'blank'
    },
  },

  //menu section
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/clients/clients.vue'),
  },
  {
    path: '/developers',
    name: 'developers',
    component: () => import('@/views/developers/developers.vue'),
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: () => import('@/views/repositories/repositories.vue'),
  },
  {
    path: '/repoclients',
    name: 'repoclients',
    component: () => import('@/views/repoclients/repoclients.vue'),
  },
  {
    path: '/repodev',
    name: 'repodev',
    component: () => import('@/views/repodev/repodev.vue'),
  },
  {
    path: '/handover',
    name: 'handover',
    component: () => import('@/views/handover/handover.vue'),
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/reports/reports.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
export default router
