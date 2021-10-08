/* eslint-disable */


import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
//import Login from '../views/login.vue'
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页',
            hidden: false,
        }
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
        meta: {
            title: '登录页',
            hidden: true,
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
})
//console.log("查看是否有token：", sessionStorage.getItem('token'));
router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token');
    if(token){
        if(to.path === '/login'){
            next('/');
        }else{
            next()
        }
    }else{
        if(to.path === '/login'){
            next()
        }else{
            next('/login');
        }
    }
})

router.afterEach((to: any, from) => {
    document.title = to.meta.title;
})

export default router
