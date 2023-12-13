<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Card name</span>
                <el-icon @click="close">
                    <Close />
                </el-icon>
            </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        <template #footer>Footer content</template>
    </el-card>
</template>

<script setup lang='ts'>
import { defineProps, onMounted, ref } from 'vue';
import {Close} from '@element-plus/icons-vue'
import {mapDatas} from '../stores/modules/map'


const mapDataInfo = mapDatas();



const props = defineProps({
    closeApp: {
        type: Function,
        required: true
    }
});

console.log(mapDataInfo.mapData);


const close = () => {
  props.closeApp()
}


</script>
<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 400px;
    height: 600px;
    position: absolute;
    left: 50px;
    top: -300px
}

.el-icon {
    cursor: pointer;
    scale: 1.25;
}
</style>