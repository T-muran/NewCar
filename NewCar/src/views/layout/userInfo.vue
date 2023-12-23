<template>
    <el-card class="box-card">
        <div class="card-header">
            <span>个人信息</span>
            <el-button class="button" @click="ChangeShow" text>修改信息</el-button>
        </div>
        <div class="main">
            <div>
                <span>用户名 </span>
                <span>{{ tableData.userName }}</span>
            </div>
            <div>
                <span>身份证号码 </span>
                <span>{{ tableData.idNumber }}</span>
            </div>
            <div>
                <span>手机号码 </span>
                <span>{{ tableData.phoneNum }}</span>
            </div>
            <div>
                <span>管理员id </span>
                <span>{{ tableData.id }}</span>
            </div>
        </div>

        <div class="form" v-if="isChange === true">
            <div class="line"></div>
            <el-form :rules="rules" ref="form" :label-position="labelPosition" label-width="100px" :model="formData"
                style="max-width: 460px">
                <el-form-item prop="userName" label="用户名">
                    <el-input v-model="formData.userName" />
                </el-form-item>
                <el-form-item prop="idNumber" label="身份证号码">
                    <el-input v-model="formData.idNumber" />
                </el-form-item>
                <el-form-item prop="phoneNum" label="手机号码">
                    <el-input v-model="formData.phoneNum" />
                </el-form-item>

                <div class="button">
                    <el-button @click="onSubmit" type="primary">确认</el-button>
                    <el-button @click="cancelSub" type="primary">取消</el-button>
                </div>
            </el-form>
        </div>
        <div v-else-if="isChange === false">

        </div>

    </el-card>
</template>

<script setup lang='ts'>
import { usersInfo } from '../../stores/modules/user'
import { onMounted, reactive, ref } from 'vue'
import type { FormProps } from 'element-plus'
import { changeEmployee } from '../../api/user'
import type { FormItemRule, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('right')
type From = {
    userName: string,
    phoneNum: string
    idNumber: string
    id: string
}

type Rules = {
    [key in keyof From]?: Array<FormItemRule>
}

const usersdata = usersInfo()

const tableData = reactive({
    id: '',
    idNumber: '',
    phoneNum: '',
    userName: '',
})

const formData = reactive<From>({
    userName: '',
    phoneNum: '',
    idNumber: '',
    id: ''
})


onMounted(async () => {
    await getVal()
    formData.userName = tableData.userName
    formData.phoneNum = tableData.phoneNum
    formData.idNumber = tableData.idNumber
    formData.id = tableData.id
})

const getVal = async () => {
    await usersdata.EmployeeInfo()
    console.log(usersdata.adminUser);

    tableData.idNumber = usersdata.adminUser.data.idNumber
    tableData.phoneNum = usersdata.adminUser.data.phoneNum
    tableData.userName = usersdata.adminUser.data.userName
    tableData.id = usersdata.adminUser.data.id

    console.log(tableData)
}

const ChangeShow = () => {
    isChange.value = !isChange.value
}

const isChange = ref(false)

const onSubmit = () => {
    form.value?.validate((valid: boolean) => {
        if (valid) {
            changeEmployee(formData).then(res => {
                console.log(res);
                if (res.data.code === 1) {
                    getVal()
                    isChange.value = !isChange.value
                }
            })
        } else {
            ElMessage.error('请输入正确的信息')
            return false
        }
    })

}

const cancelSub = () => {
    isChange.value = !isChange.value
}

const form = ref<FormInstance>()

const rules = reactive<Rules>({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
    phoneNum: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' },
    ],
    idNumber: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
        { min: 18, max: 18, message: '请输入正确身份证号', trigger: 'blur' },
    ],
})

</script>
<style scoped lang="less">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    height: 100%;

    div {
        width: 80%;
        margin: 10px 0;
        display: flex;
        justify-content: space-around;
        align-items: start;

        span {
            width: 200px;
            font-size: 16px;
        }
    }
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    height: 100%;
    margin-top: 100px;

    .line {
        width: 100%;
        height: 1px;
        background-color: #ccc;
        margin-bottom: 40px;
    }
    .el-form {
        width: 80%;
        margin: 10px 0;


        .el-form-item {
            margin-bottom: 20px;
        }
    }

    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        position: relative;
        left:-40px;
        top:20px;
    }

    .el-button {
        width: 100px;
        margin-left: 100px;
    }
}
</style>