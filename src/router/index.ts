/* eslint-disable */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/index',
        meta: {
            title: '首页',
            hidden: false,
        },
        children: [
            { path: 'index', name: 'index', component: () => import('../views/index.vue'), meta: { title: '首页', hidden: false, } }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/login.vue'),
        meta: {
            title: '登录页',
            hidden: true,
        }
    },
    {
        path: '/markdown',
        name: 'Edit',
        component: Home,
        //redirect: '/about/',
        meta: {
            title: '博客管理',
            hidden: false,
        },
        children: [
            { path: 'edit', component:() => import('../views/markdownEdit.vue'), meta:{ title: '博客编辑', hidden: false,} },
            { path: 'list', component:() => import('../views/markdownList.vue'), meta:{ title: '博客列表', hidden: false,} }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
})
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
