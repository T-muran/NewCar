<template>
    <div class="userList">
        <div class="top">
            <SearchBar info="搜索用户名字/手机号" @search="clickEvent" ref="searchName" />
            <div class="selector">
            </div>
        </div>
        <div class="container">
            <el-table :data="tableData" :row-style="{ height: '60px' }" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ textAlign: 'center' }" class="table">
                <el-table-column fixed prop="name" label="真实姓名" width="150" />
                <el-table-column prop="sex" label="性别" min-width="180" />
                <el-table-column prop="birthDate" label="生日" min-width="180" />
                <el-table-column prop="userName" label="用户名" min-width="180" />
                <el-table-column prop="phoneNum" label="手机号" min-width="180" />
                <el-table-column prop="email" label="邮箱" min-width="180" />
                <el-table-column prop="idNumber" label="身份证号" min-width="180" />
                <el-table-column prop="address" label="常用地址" min-width="320" />
                <el-table-column prop="status" fixed="right" label="操作" min-width="120">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="handleClick(row)"
                            v-if="row.status === 1">禁用</el-button>
                        <el-button link type="primary" size="small" @click="handleClick(row)"
                            v-else-if="row.status === 0">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="line"></div>
        <div class="foot">
            <el-pagination background layout="prev, pager, next" :total=pageInfo.total :page-size=pageInfo.size
                @click="clickEvent" v-model:current-page="pageInfo.curr" class="m-2" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import SearchBar from './components/searchBar.vue';
import { ref, watch, onMounted, reactive } from 'vue'
import { anim } from '../../stores/modules/animator';
import { usersInfo } from '../../stores/modules/user';
import { changeState } from '../../api/user'

const usersdata = usersInfo()
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

const handleClick = (row) => {
    changeState({ id: row.id, status: row.status, who: 0 }).then(res => {
        console.log(res)
        if (res.data.code === 1) {
            if (row.status === 1) {
                row.status = 0
            } else {
                row.status = 1
            }
        }
    })

}

const tableData = reactive([])

const pageInfo = reactive({
    curr: 1,
    total: 1,
    size: 10
})

onMounted(async () => {
    await getVal()
})

const getVal = async () => {
    await usersdata.getUsersInfo({ page: 1, pageSize: 10 });

    pageInfo.curr = usersdata.users.data.current
    pageInfo.total = usersdata.users.data.total
    pageInfo.size = usersdata.users.data.size

    tableData.push(...usersdata.users.data.records)
    console.log(tableData)
};

const search = async () => {
    await usersdata.getUsersInfo(searchData.value)
    const res = usersdata.users.data.records
    tableData.splice(0, tableData.length)
    tableData.push(...res)

    pageInfo.curr = usersdata.users.data.current
    pageInfo.total = usersdata.users.data.total
    pageInfo.size = usersdata.users.data.size
    console.log(tableData)
}

const searchName = ref('')

type SearchData = {
    page: number
    pageSize: number
    name?: string
    phoneNum?: string
}

const searchData = ref<SearchData>({
    page: 1,
    pageSize: 10,
})

const clickEvent = () => {
    searchData.value.page = pageInfo.curr
    searchData.value.pageSize = pageInfo.size
    //如果searchName.value.InputValue为数字，则为phoneNum赋值，否则为name赋值
    if (isNaN(Number(searchName.value.inputValue))) {
        searchData.value.name = searchName.value.inputValue
        searchData.value.phoneNum = ''
    } else {
        searchData.value.phoneNum = searchName.value.inputValue
        searchData.value.name = ''
    }

    console.log(searchData.value)
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

        .table {
            height: 101%;

            .el-button {
                width: 60px;
                height: 30px;
                border-radius: 5px;
                font-size: 15px;
            }
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