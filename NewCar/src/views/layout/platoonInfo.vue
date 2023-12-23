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
            <el-table :data="tableData" :row-style="{height: '60px'}" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }"
                class="table">
                <el-table-column fixed prop="leaderName" label="车队领队" width="150" />
                <el-table-column prop="createTime" label="起始时间" width="110" />
                <el-table-column prop="endTime" label="结束时间" width="110" />
                <el-table-column prop="id" label="车队id" min-width="180" />
                <el-table-column prop="status" label="车队状态" min-width="120" />
                <el-table-column prop="carNum" label="车辆数量" min-width="120" />
                <el-table-column prop="platoonSpacing" label="车队间距" min-width="120" />
                <el-table-column prop="platoonSpeed" label="车队配速" min-width="120" />
                <el-table-column prop="startPoint" label="车队起点" min-width="270" />
                <el-table-column prop="endPoint" label="车队终点" min-width="270" />
                <!-- <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small"  @click="handleClick">查看信息</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="line"></div>
        <div class="foot">
            <el-pagination background layout="prev, pager, next" v-model:current-page="currPage" :total=pageInfo.total :page-size=pageInfo.size @click="clickEvent" class="m-2" />
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
        value: 3,
        label: '全部',
    },
]

// const handleClick = () => {
//     console.log('click')
// }

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
    
    //对时间进行格式化
    toRaw(tableData).forEach((item:any) => {
        item.createTime = formatTime(item.createTime)
        item.endTime = formatTime(item.endTime)
    })
    //如果tableData.status===0,则改为已结束，如果为1，则改为运行中，如果为2，则改为事故
    toRaw(tableData).forEach((item:any) => {
        if(item.status === 0){
            item.status = '已结束'
        }else if(item.status === 1){
            item.status = '运行中'
        }
    })

    pageInfo.curr=carData.carData.values.data.current
    pageInfo.size=carData.carData.values.data.size
    pageInfo.total=carData.carData.values.data.total
};

//对时间进行格式化 2023-01-05T01:15:27 => 2023-01-05 01:15:27
const formatTime = (time:string) => {
    if(time === null){
        return '---'
    }
    const arr = time.split('T')
    const arr1 = arr[1].split('.')
    return arr[0] + ' ' + arr1[0]
}

const search = async() =>{
    await carData.getPlatoonData2(searchData.value)
    const res=carData.carData.values.data.records

    //清空tableData
    tableData.splice(0,tableData.length)

    toRaw(tableData).push(...res)
    //对时间进行格式化
    toRaw(tableData).forEach((item:any) => {
        item.createTime = formatTime(item.createTime)
        item.endTime = formatTime(item.endTime)
    })
    //如果tableData.status===0,则改为已结束，如果为1，则改为运行中
    toRaw(tableData).forEach((item:any) => {
        if(item.status === 0){
            item.status = '已结束'
        }else if(item.status === 1){
            item.status = '运行中'
        }
    })

    pageInfo.curr=carData.carData.values.data.current
    pageInfo.size=carData.carData.values.data.size
    pageInfo.total=carData.carData.values.data.total
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
    if(item === 3){
        searchData.value.status = undefined
        return
    }
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
</style>