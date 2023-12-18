<template>
    <div class="aside">
        <el-menu router default-active="2" class="el-menu-vertical-demo" :collapse="animator.animations.isCollapse"
            @mouseover="mouseover" @mouseleave="mouseleave">
            <div class="logo">
                <carLogo />
            </div>
            <el-menu-item index="home" class="first">
                <el-icon>
                    <House />
                </el-icon>
                <template #title>个人主页</template>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>车队管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="platoonInfo">车队信息</el-menu-item>
                    <el-menu-item index="map">地图界面</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <div class="head">

                <el-sub-menu index="5" id="one">
                    <template #title>
                        <img :src="userData.avatar" alt="">
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="userInfo">个人信息</el-menu-item>
                        <el-menu-item @click="logout">退出登录</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </div>
        </el-menu>

    </div>
</template>

<script setup lang='ts'>
import carLogo from '../../../assets/carLogo.vue'
import { anim } from '../../../stores/modules/animator';
import { onBeforeRouteLeave } from 'vue-router';
import router from '../../../router/index'
import { House, Memo } from '@element-plus/icons-vue'
import { useUserStore } from '../../../stores/modules/user'


const userStore = useUserStore()
const userData = userStore.getUserInfo()
const animator = anim();

//鼠标移动到侧边栏时，侧边栏展开,logo显示
const mouseover = () => {
    animator.animations.isCollapse = false
    const logo = document.querySelector('.logo')
    logo.classList.add('show')
}

//鼠标离开侧边栏时，侧边栏收起,logo隐藏
const mouseleave = () => {
    animator.animations.isCollapse = true
    const logo = document.querySelector('.logo')
    logo.classList.remove('show')
}

onBeforeRouteLeave((to, from, next) => {
    if (to.path === '/login') {
        next()
        return
    }
    if (to.path === '/home/home') {
        to.path = '/home'
        next(false)
        router.push(to.path)
        return
    }
    if (from.path === '/home') {
        to.path = '/home' + to.path
        next(false)
        router.push(to.path)
        return
    }
})


//退出登录
const logout = () => {
    userStore.logout()
}

</script>


<style scoped>
.el-menu-vertical-demo.el-menu--collapse {
    width: 100px;
    height: 100%;
    position: relative;

    .el-icon {
        position: relative;
        left: 20%;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    min-height: 400px;
}

.logo {
    height: 100px;
    position: relative;
    opacity: 0;

    .car {
        position: absolute;
        top: 50%;
        left: 15%;
    }

}

.logo.show {
    opacity: 1;
}

.head {
    position: absolute;
    bottom: 10%;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    img:hover {
        scale: 1.1;
        cursor: pointer;
    }
}

:deep(#one) .el-menu-item-group {
    position: relative;
    left: -16px;
}

:deep(#one) .el-icon {
    display: none;
}

:deep(#one) :hover {
    color: #1890FF;
    background: #fff;
}
</style>