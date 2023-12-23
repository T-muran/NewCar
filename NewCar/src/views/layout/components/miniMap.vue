<template>

<div class="miniMap">
    <reMap />
</div>

</template>

<script setup lang='ts'>
import reMap from '../../../components/reMap.vue';
</script>
<style scoped>
.miniMap {
    width: 100%;
    height: 550px;
    background-color: #fff;
    margin-top: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;
}
</style>