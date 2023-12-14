<template>
    <div>
        <el-button type="primary" text @click="dialogFormVisible = true">
            添加管理员
        </el-button>
        <el-dialog v-model="dialogFormVisible" title="添加管理员">
            <el-form :model="forms" :rules="rules" ref="form" >
                <el-form-item prop="userName" label="用户名" :label-width="formLabelWidth">
                    <el-input placeholder="请输入用户名"  v-model="forms.userName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                    <el-input placeholder="请输入密码" v-model="forms.passWord" type="password" show-password autocomplete="off" />
                </el-form-item>
                <el-form-item prop="phoneNum" label="手机号" :label-width="formLabelWidth">
                    <el-input placeholder="请输入手机号" v-model="forms.phoneNum" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="idNumber" label="身份证号" :label-width="formLabelWidth">
                    <el-input placeholder="请输入身份证号" v-model="forms.idNumber" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="clickConfirm">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormItemRule, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { addEmployee } from '../../../api/user'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const forms = reactive({
    userName: '',
    passWord: '',
    phoneNum: '',
    idNumber: '',
})

type From = {
    userName: string,
    passWord: string
    phoneNum: string
    idNumber: string
}

type Rules = {
    [key in keyof From]?: Array<FormItemRule>
}
const form = ref<FormInstance>()

const rules = reactive<Rules>({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
    passWord: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
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

const clickConfirm = () => {
    form.value?.validate((valid: boolean) => {
        if (valid) {
            addEmployee(forms)
            dialogFormVisible.value = false
        } else {
            ElMessage.error('请输入正确的信息')
            return false
        }
    })
}
</script>
<style scoped>
.el-button{
    font-size: 16px;
}
.el-button--text {
    margin-right: 15px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}</style>