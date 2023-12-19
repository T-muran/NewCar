<template>
    <div class="main">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>个人信息</span>
                    <el-button class="button" text @click="dialogFormVisible = true">修改信息</el-button>
                </div>
            </template>
            <div class="info">
                <ul>
                    <li>用户名:<span>{{ data.userName }}</span></li>
                    <li>姓名:<span>{{ data.name }}</span></li>
                    <li>性别:<span>{{ data.sex }}</span></li>
                    <li>手机号:<span>{{ data.phoneNum }}</span></li>
                    <li>邮箱:<span>{{ data.email }}</span></li>
                    <li>出生日期:<span>{{ data.birthDate }}</span></li>
                    <li>身份证号码:<span>{{ data.idNumber }}</span></li>
                    <li>常用地址:<span>{{ data.address }}</span></li>
                </ul>
            </div>
            <template #footer></template>
        </el-card>
    </div>
    <CarInfo />
    <div class="dialog">
        <el-dialog v-model="dialogFormVisible" title="修改个人信息">
            <el-form :model="formData">
                <el-form-item label="真实姓名" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="formData.userName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="formData.phoneNum" autocomplete="off" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="formData.sex" class="m-2" placeholder="性别" size="default">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="formData.birthDate" type="date" placeholder="选择日期" size="default" />
                </el-form-item>
                <el-form-item label="身份证号码" :label-width="formLabelWidth">
                    <el-input v-model="formData.idNumber" autocomplete="off" />
                </el-form-item>
                <el-form-item label="常用地址" :label-width="formLabelWidth">
                    <CitySelect />
                    <el-input placeholder="详细地址" v-model="formData.idNumber" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import CarInfo from './components/carInfo.vue';
import { useUserStore } from '../../stores/modules/user';
import { reactive, ref } from 'vue';
import CitySelect from '../components/citySelect.vue';

const userInfo = useUserStore();

type FormData = {
    id: string,
    userName: string,
    name: string,
    sex: string,
    phoneNum: string,
    birthDate: string,
    idNumber: string,
    address: string,
    avatar: string,
}

const data = userInfo.getUserInfo()

const options = [
    {
        value: '男',
        label: '男',
    },
    {
        value: '女',
        label: '女',
    },
]


//formData数据 从data中获取
const formData = reactive<FormData>({
    id: data.id,
    userName: '',
    name: '',
    sex: '',
    phoneNum: '',
    birthDate: '',
    idNumber: '',
    address: '',
    avatar: data.avatar,
});

//#region dialog

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

//#endregion


</script>

<style scoped lang="less">
.box-card {
    height: 98vh;
    width: 1000px;
    margin-top: 5px;
    margin-left: 5px;

    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
        font-weight: 700;

        .button {
            width: 100px;
            height: 30px;
            border-radius: 5px;
            background-color: #409EFF;
            color: #fff;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
        margin-top: 20px;
        font-size: 20px;
        font-weight: 700;

        span {
            margin-top: 10px;
        }

        ul {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 100%;

            li {
                margin-top: 10px;
                //取消圆点
                list-style: none;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 40px;

                span {
                    width: 70%;
                    margin-top: 0;
                }
            }
        }
    }
}

.el-button--text {
    margin-right: 15px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-date-picker .block:last-child {
    border-right: none;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>