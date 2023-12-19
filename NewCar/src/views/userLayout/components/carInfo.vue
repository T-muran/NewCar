<template>
    <div class="carInfo">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>Card name</span>
                    <el-button class="button" text>Operation button</el-button>
                </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { watch, toRefs, isRef } from 'vue';
import { anim } from '../../../stores/modules/animator';

const animator = anim();

watch(() => animator.animations.isCollapse,
    //如果为true，则为currCar移除hide类，否则添加hide类
    () => {
        const currCar = document.querySelector('.carInfo')
        if (animator.animations.isCollapse) {
            currCar.classList.remove('hide')
        } else {
            currCar.classList.add('hide')
        }
    }
)
</script>
<style scoped lang="less">
.carInfo {
    height: 100%;
    width: 410px;
    margin-left: 5px;
}
.box-card {
    height: 98vh;
    width: 100%;
    margin-top: 5px;
    margin-left: 5px;
}

.hide {
    width: 310px;
    transition: all 0.5s;
}
</style>