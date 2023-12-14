import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router"

declare module 'vue-router' {
    interface RouteMeta {
        title: string
        icon: string
        hidden: boolean
        breadcrumb: boolean
        transition: string
    }
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
        meta: {
            title: '登录',
            icon: 'el-icon-s-home',
            hidden: true,
            breadcrumb: false,
            transition: 'animate__fadeIn'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'el-icon-s-home',
            hidden: true,
            breadcrumb: false,
            transition: 'animate__fadeIn'
        }
    },
    {
        path: '/home',
        component: () => import('../views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/layout/home.vue'),
            },
            {
                path: 'map',
                name: 'Map',
                component: () => import('../views/layout/map.vue'),
            },
            {
                path:'platoonInfo',
                name:'PlatoonInfo',
                component: () => import('../views/layout/platoonInfo.vue'),
            },
            {
                path: 'idleCar',
                name: 'IdleCar',
                component: () => import('../views/layout/idleCar.vue'),
            },
            {
                path: 'operatingCar',
                name: 'OperatingCar',
                component: () => import('../views/layout/operatingCar.vue'),
            },
            {
                path:'userList',
                name:'UserList',
                component: () => import('../views/layout/userList.vue'),
            },
            {
                path:'adminList',
                name:'AdminList',
                component: () => import('../views/layout/adminList.vue'),
            }
        ],
        meta: {
            title: 'home',
            icon: 'el-icon-s-home',
            hidden: true,
            breadcrumb: false,
            transition: 'animate__fadeIn'
        }
    },
    {
        path: '/:pathMatch(.*)*', // 此处需特别注意置于最底部
        name: 'NotFound', 
        component: () => import('../views/errorLog/404.vue'),
        meta: {
            title: '404',
            icon: 'el-icon-s-home',
            hidden: true,
            breadcrumb: false,
            transition: 'animate__bounceIn'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: (to,from,savePosition) => {
        if(savePosition){
            return savePosition
        }else{
            return {
                top: 0
            }
        }
    },
    routes
})

export default router