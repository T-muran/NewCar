<template>
    <div class="platoonInfo">
        <div class="top">
            <SearchBar />
            <div class="selector">
                <el-select v-model="value1" class="m-2" placeholder="选择车队状态" size="large" >
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <dateSelect placeholder="选择起始时间" />
                <dateSelect placeholder="选择结束时间"/>
            </div>
        </div>
        <div class="container">
            
        </div>
        <div class="line"></div>
        <div class="foot">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                :page-size="10"
                class="m-2"
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
import SearchBar from './components/searchBar.vue';
import dateSelect from '../../components/dateSelect.vue';
import { ref } from 'vue'

const value1 = ref('')

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
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }
}
</style>