<template>
    <router-view #default="{route,Component}"> 
        <transition :enter-active-class="`animate__animated ${route.meta.transition}`">
            <component :is="Component" >
            </component>
        </transition>
    </router-view>
</template>

<script setup lang='ts'>
    import 'animate.css';
</script>

<style lang="less">
*{
    margin: 0;
    padding: 0;
}
html, body,#app {
    height: 100vh;
    background-color: #f5f5f5;
}
</style>
