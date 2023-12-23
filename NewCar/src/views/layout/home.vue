<template>
    <div class="main">
        <div class="center">
            <stateShow />
            <MiniMap />
        </div>
        <div class="right">
            <currPlatoon :carDataChil="value1" />
        </div>
    </div>
</template>

<script setup lang="ts">
import currPlatoon from './components/currPlatoon.vue';
import MiniMap from './components/miniMap.vue';
import searchBar from './components/searchBar.vue';
import stateShow from './components/stateShow.vue';
import { onBeforeMount, ref,onMounted } from 'vue';
import { carDatas } from '../../stores/modules/platoonInfo';
import { getInfo } from '../../api/user';
import { setUser } from '../../utils/auth';
import { useUserStore } from '../../stores/modules/user';

const userStore = useUserStore()


const carData = carDatas();
const value1 = ref([]);


const getVal = async () => {
    await carData.getPlatoonData1();
};

// 调用getVal函数，并在获取到数据后，将数据赋值给value1
onMounted(async () => {
    try{
        await getVal();
        value1.value = carData.carData.values.data;

        console.log(value1.value);
    }catch(err){
        console.log(err);
    }

    getInfo().then(res => {
        userStore.userInfo.carTotal = res.data.data.carTotal
        userStore.userInfo.platoonTotal = res.data.data.platoonTotal
        userStore.userInfo.runningCarTotal = res.data.data.runningCarTotal
        userStore.userInfo.userTotal = res.data.data.userTotal
        setUser(userStore.userInfo)
    })
});



</script>
<style scoped>
.main {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    
    .center {
        width: 70%;
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        margin-top: 40px;

        .bar{
            margin-top: 20px;
            box-shadow: 0 0 10px #ddd;
        }
    }
    .right {
        position: relative;
        right: 20px;
        width: 30%;
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
}   
</style>