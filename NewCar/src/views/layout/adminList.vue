<template>
    <div class="adminList">
        <div class="top">
            <SearchBar @search="clickEvent" info="搜索管理员名字" ref="searchName" />
            <div class="selector"></div>
        </div>
        <div class="container">
            <el-table :data="tableData" :row-style="{ height: '60px' }" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ textAlign: 'center' }" class="table">
                <el-table-column fixed prop="userName" label="用户名" width="150" />
                <el-table-column prop="id" label="管理员id" min-width="180" />
                <el-table-column prop="idNumber" label="身份证号" min-width="180" />
                <el-table-column prop="phoneNum" label="手机号" min-width="180" />
                <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default="{ row }">
                        <el-button link type="primary" size="small" @click="handleClick(row)" v-if="row.status === 1">
                            禁用
                        </el-button>
                        <el-button link type="primary" size="small" @click="handleClick(row)" v-else-if="row.status === 0">
                            启用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="line"></div>
        <div class="foot">
            <span>
                <dialogButton />
            </span>
            <el-pagination background layout="prev, pager, next" :total="pageInfo.total" :page-size="pageInfo.size"
                @click="clickEvent" v-model:current-page="pageInfo.curr" class="m-2" />
        </div>
    </div>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import SearchBar from "./components/searchBar.vue";
import { ref, watch, onMounted, reactive } from "vue";
import { anim } from "../../stores/modules/animator";
import { usersInfo } from "../../stores/modules/user";
import { changeState } from "../../api/user";
import dialogButton from "./components/dialogButton.vue";

const usersdata = usersInfo();
const animator = anim();

onMounted(() => {
    const adminList = document.querySelector(".adminList");
    adminList.classList.toggle("hide", !animator.animations.isCollapse);
});

watch(
    () => animator.animations.isCollapse,
    () => {
        const adminList = document.querySelector(".adminList");
        adminList.classList.toggle("hide", !animator.animations.isCollapse);
    }
);

const dialogVisible = ref(false);

const handleClick = (row) => {
    row.status = row.status === 1 ? 0 : 1;
    changeState({ id: row.id, status: row.status, who: 1 });
};

const tableData = reactive([]);

const pageInfo = reactive({
    curr: 1,
    total: 1,
    size: 10,
});

onMounted(async () => {
    await getVal();
});

const getVal = async () => {
    await usersdata.getAdminInfo({ page: 1, pageSize: 10 });

    const { data } = usersdata.users;
    pageInfo.curr = data.current;
    pageInfo.total = data.total;
    pageInfo.size = data.size;

    tableData.push(...data.records);
    console.log(tableData);
};

const search = async () => {
    await usersdata.getAdminInfo(searchData.value);
    const res = usersdata.users.data.records;
    tableData.splice(0, tableData.length, ...res);

    const { data } = usersdata.users;
    pageInfo.curr = data.current;
    pageInfo.total = data.total;
    pageInfo.size = data.size;
    console.log(tableData);
};

const searchName = ref("");

type SearchData = {
    page: number;
    pageSize: number;
    userName?: string;
};

const searchData = ref<SearchData>({
    page: 1,
    pageSize: 10,
});

const clickEvent = () => {
    searchData.value.page = pageInfo.curr;
    searchData.value.pageSize = pageInfo.size;
    searchData.value.userName = searchName.value.inputValue;

    console.log(searchData.value);
    search();
};
</script>

<style scoped>
.adminList {
    width: 91%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 15px;
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
            justify-content: flex-end;
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
        justify-content: flex-start;
        align-items: flex-start;

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
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        position: relative;

        span {
            margin-left: 50px;

            .el-button {
                width: 100px;
                height: 30px;
                border-radius: 5px;
                font-size: 15px;
            }
        }

        .el-pagination {
            margin-right: 50px;
        }
    }
}

.hide {
    width: 83%;
    transition: all 0.5s;
}
</style>