<template>
    <div class="blackList">
        <div class="top">
            <SearchBar />
            <div class="selector">
                <el-select v-model="value1" class="m-2" placeholder="选择用户状态" size="large">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <div class="container">
            <el-table :data="tableData" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }"
                class="table">
                <el-table-column fixed prop="date" label="真实姓名" width="150" />
                <el-table-column prop="name" label="性别" width="180" />
                <el-table-column prop="state" label="年龄" width="180" />
                <el-table-column prop="city" label="用户名" width="180" />
                <el-table-column prop="address" label="手机号" width="180" />
                <el-table-column prop="zip" label="身份证号" width="180" />
                <el-table-column prop="address" label="常用地址" width="320" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="line"></div>
        <div class="foot">
            <el-pagination background layout="prev, pager, next" :total="1000" :page-size="10" class="m-2" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import SearchBar from './components/searchBar.vue';
import { ref, watch,onMounted } from 'vue'
import { anim } from '../../stores/modules/animator';


const value1 = ref('')
const animator = anim()

onMounted(() => {
    const blackList = document.querySelector('.blackList')
    if (animator.animations.isCollapse) {
        blackList.classList.remove('hide')
    } else {
        blackList.classList.add('hide')
    }
})

watch(() => animator.animations.isCollapse,
    //如果为true，则为platoonInfo移除hide类，否则添加hide类
    () => {
        const blackList = document.querySelector('.blackList')
        if (animator.animations.isCollapse) {
            blackList.classList.remove('hide')
        } else {
            blackList.classList.add('hide')
        }
    }
)

const options1 = [
    {
        value: 0,
        label: '管理员',
    },
    {
        value: 1,
        label: '空闲',
    },
    {
        value: 2,
        label: '忙碌',
    },
]

const handleClick = () => {
    console.log('click')
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home',
    },
]


</script>
<style scoped>
.blackList {
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