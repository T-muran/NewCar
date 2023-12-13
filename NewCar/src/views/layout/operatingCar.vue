<template>
    <div class="userList">
        <div class="top">
            <SearchBar info="搜索用户名字"  />
            <div class="selector">
                <el-select v-model="value1" class="m-2" placeholder="选择用户状态" size="large">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <div class="container">

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
    const userList = document.querySelector('.userList')
    if (animator.animations.isCollapse) {
        userList.classList.remove('hide')
    } else {
        userList.classList.add('hide')
    }
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