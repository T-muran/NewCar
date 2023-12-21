<template>
    <div class="state">
        <div class="container">
            <div class="state-item" v-for="(item, index) in data" :key="index">
                <div class="state-item-name">{{ item.name }}</div>
                <div class="state-item-num">{{ item.num }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from 'vue';
import { useUserStore } from '../../../stores/modules/user';
import { getUser } from '../../../utils/auth';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
//如果userStore.userInfo为{}，则从localStorage中获取

onMounted(() => {


    if (Object.keys(userStore.userInfo).length === 0) {
        userStore.userInfo = getUser()
        //如果userStore.userInfo为{}，则跳转到登录页面
        if (Object.keys(userStore.userInfo).length === 0) {
            router.push('/login')
        }
    }
    console.log(userStore.userInfo)
    //改变data中的num值
    data[0].num = userStore.userInfo.runningCarTotal
    data[1].num = userStore.userInfo.carTotal
    data[2].num = userStore.userInfo.userTotal
    data[3].num = userStore.userInfo.platoonTotal
})

const data = reactive([{
    name: '当前运行车辆',
    num: userStore.userInfo.runningCarTotal,
},
{
    name: '车辆总数',
    num: userStore.userInfo.carTotal,
},
{
    name: '当前用户',
    num: userStore.userInfo.userTotal,
},
{
    name: '当前车队',
    num: userStore.userInfo.platoonTotal,
}]
)


</script>
<style scoped>
.state {
    width: 100%;
    height: 125px;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .state-item {
        width: 25%;
        height: 100%;
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        top: -10px;

        .state-item-name {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }

        .state-item-num {
            font-size: 24px;
            font-weight: 700;
            color: #000;
        }
    }
}
</style>