<template>
    <div class="platoonInfo">
        <div class="top">
            <SearchBar @search="clickEvent" ref="searchName" info="搜索车队领队" />
            <div class="selector">
                <el-select @change="selectChange" v-model="value1" class="m-2" placeholder="选择车队状态" size="large">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <div class="container">
            <el-table :data="tableData" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }"
                class="table">
                <el-table-column fixed prop="leaderName" label="车队领队" width="150" />
                <el-table-column prop="createTime" label="起始时间" width="110" />
                <el-table-column prop="endTime" label="结束时间" width="110" />
                <el-table-column prop="status" label="车队状态" width="120" />
                <el-table-column prop="carNum" label="车辆数量" width="120" />
                <el-table-column prop="startPoint" label="车队起点" width="320" />
                <el-table-column prop="startPoint" label="车队终点" width="320" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" v-model:current-page="currPage" @click="handleClick">查看信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="line"></div>
        <div class="foot">
            <el-pagination background layout="prev, pager, next" :total=pageInfo.total :page-size=pageInfo.size @click="clickEvent" class="m-2" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import SearchBar from './components/searchBar.vue';

import { anim } from '../../stores/modules/animator';
import { ref, watch,onMounted, toRaw, reactive } from 'vue'
import { carDatas } from '../../stores/modules/platoonInfo';


const value1 = ref('')
const animator = anim()
const carData = carDatas()

onMounted(() => {
    const platoonInfo = document.querySelector('.platoonInfo')
    if (animator.animations.isCollapse) {
        platoonInfo.classList.remove('hide')
    } else {
        platoonInfo.classList.add('hide')
    }
})

watch(() => animator.animations.isCollapse,
    //如果为true，则为platoonInfo移除hide类，否则添加hide类
    () => {
        const platoonInfo = document.querySelector('.platoonInfo')
        if (animator.animations.isCollapse) {
            platoonInfo.classList.remove('hide')
        } else {
            platoonInfo.classList.add('hide')
        }
    }
)


const options1 = [
    {
        value: 0,
        label: '已结束',
    },
    {
        value: 1,
        label: '运行中',
    },
    {
        value: 2,
        label: '事故',
    },
]

const handleClick = () => {
    console.log('click')
}

const tableData = reactive([
    {}
])

const pageInfo = reactive({
    curr:1,
    total:1,
    size:10
})

onMounted(async ()=>{
    await getVal()
})

const getVal = async () => {
    await carData.getPlatoonData2({page:pageInfo.curr,pageSize:pageInfo.size});
    const res=carData.carData.values.data.records

    //tableData第一个元素为{}，所以需要先删除
    tableData.splice(0,1)
    toRaw(tableData).push(...res)

    pageInfo.curr=carData.carData.values.data.current
    pageInfo.size=carData.carData.values.data.size
    pageInfo.total=carData.carData.values.data.total
};

const search = async() =>{
    await carData.getPlatoonData2(searchData.value)
    const res=carData.carData.values.data.records

    //清空tableData
    tableData.splice(0,tableData.length)

    toRaw(tableData).push(...res)
    console.log(tableData)

    pageInfo.curr=carData.carData.values.data.current
    pageInfo.size=carData.carData.values.data.size
    pageInfo.total=carData.carData.values.data.total

    console.log(pageInfo)
}

const currPage = ref(1)
const searchName = ref('')

type SearchData={
    page:number
    pageSize:number
    name?:string
    status?:number
}

const searchData = ref<SearchData>({
    page:1,
    pageSize:10,
})

const clickEvent = () => {
    searchData.value.name = searchName.value.inputValue
    searchData.value.page = currPage.value
    //调用getVal函数，重新获取数据
    search()
}

const selectChange = (item:number) => {
    searchData.value.status = item
}


</script>
<style scoped>
.platoonInfo {
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
            justify-content: center;
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

        .table {
            height: 101%;
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
</style>../../stores/modules/platoonInfo