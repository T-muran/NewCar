<template>
    <div class="layout">
        <layoutAside />
        <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
import layoutAside from './components/layoutAside.vue';
</script>
<style scoped lang="less">
.layout {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
}

.aside {
    position: relative;
    top: 0;
    left: 0;
}
</style>