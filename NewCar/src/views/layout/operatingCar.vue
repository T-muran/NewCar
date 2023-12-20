<template>
    <div class="userList">
        <div class="top">

        </div>
        <div class="line"></div>
        <div class="container">
            <el-card class="box-card" v-for="item in carInfo" :key="item">
                <img :src=item.avatar alt="">
                <div class="text">
                    <span>{{ item.carPlate }}</span>
                    <span v-if=item.isRenewable>新能源</span>
                </div>
            </el-card>
        </div>
        <div class="line"></div>
        <div class="foot">
            <el-pagination background layout="prev, pager, next" @click="clickEvent" v-model:current-page="pageInfo.curr" :total=pageInfo.total :page-size=pageInfo.size
                class="m-2" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import SearchBar from './components/searchBar.vue';
import { ref, watch, onMounted, reactive } from 'vue'
import { anim } from '../../stores/modules/animator';
import { useCarStore } from '../../stores/modules/car'

const value1 = ref('')
const animator = anim()
const carStore = useCarStore()

const pageInfo = reactive({
    curr: 1,
    total: 1,
    size: 8
})

const carInfo = reactive([

])

onMounted(async () => {
    const userList = document.querySelector('.userList')
    if (animator.animations.isCollapse) {
        userList.classList.remove('hide')
    } else {
        userList.classList.add('hide')
    }
    //获取车辆信息
    await carStore.getAllCar({ page: pageInfo.curr, pageSize: pageInfo.size })
    const res = carStore.carInfo.records
    //res赋值给carInfo
    carInfo.push(
        ...res
    )
    console.log(carInfo);

    //获取页面信息
    pageInfo.curr = carStore.carInfo.current
    pageInfo.total = carStore.carInfo.total
    pageInfo.size = carStore.carInfo.size
})

watch(() => animator.animations.isCollapse,
    //如果为true，则为platoonInfo移除hide类，否则添加hide类
    () => {
        const userList = document.querySelector('.userList')
        if (animator.animations.isCollapse) {
            userList.classList.remove('hide')
        } else {
            userList.classList.add('hide')
        }
    }
)

const search = async() => {
    await carStore.getAllCar(searchData.value)

    const res = carStore.carInfo.records
    //res赋值给carInfo
    carInfo.splice(0, carInfo.length)
    carInfo.push(
        ...res
    )
}

type SearchData={
    page:number
    pageSize:number
}

const searchData = ref<SearchData>({
    page:1,
    pageSize:8,
})

const clickEvent = () => {
    searchData.value.page = pageInfo.curr
    searchData.value.pageSize = pageInfo.size
    //调用getVal函数，重新获取数据
    search()
}

</script>
<style scoped>
.userList {
    width: 91%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 15px 15px 15px 15px;
    box-shadow: 0 0 10px #ddd;
    border-radius: 5px;

    .top {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .selector {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;

        }

        .search {
            width: 35%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }

    .container {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: start;
        align-items: start;
        flex-wrap: wrap;

        .box-card{
            width: 20%;
            height: 45%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            box-shadow: 0 0 10px #ddd;
            border-radius: 5px;
            margin: 15px 15px 15px 15px;
            position: relative;
            left: 80px;

            img{
                width: 150px;
                height: 150px;
                border-radius: 5px 5px 0 0;
                object-fit: cover;
            }

            .text{
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span:nth-child(1) {
                    font-size: 16px;
                    font-weight: 700;
                    color: #333;
                }
    
                span:nth-child(2) {
                    width: 50px;
                    height: 25px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #e9f1ea;
                    background-color: rgb(66, 220, 125);
                    border-radius: 10px;
                    text-align: center;
                    line-height: 25px;
                }
            }

        }

        .box-card:hover{
            box-shadow: 0 0 10px #ddd;
            scale: 1.1;
        }
    }

    .line {
        width: 100%;
        height: 1px;
        background-color: #ddd;
    }

    .foot {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: end;
        align-items: center;
        margin-bottom: 20px;
        position: relative;
        right: 40px;
    }
}

.hide {
    width: 83%;

    transition: all 0.5s;
}
</style>