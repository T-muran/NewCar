<template>
    <div>
        <el-card class="box-card">
            <span class="title">注册车辆编队管理系统</span>
            <carLogo />
            <el-form ref="form" :model="formInline" :rules="rules" class="demo-form-inline" status-icon>
                <el-form-item prop="userName" label="">
                    <el-input v-model="formInline.userName" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item prop="name" label="">
                    <el-input v-model="formInline.name" placeholder="请输入真实姓名" clearable></el-input>
                </el-form-item>
                <el-form-item prop="email" label="">
                    <el-input v-model="formInline.email" placeholder="请输入邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="code" v-model="formInline.verCode" placeholder="请输入验证码" clearable></el-input>
                    <el-button class="code-button" type="primary" size="small" @click="getCodes">获取验证码</el-button>
                </el-form-item>
                <el-form-item prop="password" label="">
                    <el-input v-model="formInline.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassword" label="">
                    <el-input v-model="formInline.checkPassword" placeholder="请确认密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">注册</el-button>
                </el-form-item>

                <div class="foot">
                    <span>已有账号?去 <RouterLink to="/login">登录</RouterLink> </span>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import carLogo from '../../../assets/carLogo.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../../stores/modules/user'
import {getCode,register} from '../../../api/login'
import router from '../../../router'

const userStore = useUserStore()

type Form = {
    userName: string
    name: string
    email: string
    password: string
    verCode: string
    checkPassword: string
}

type Rules = {
    [key in keyof Form]?: Array<import('element-plus').FormItemRule>
}

const formInline = reactive<Form>({
    userName: '',
    password: '',
    email: '',
    verCode: '',
    name: '',
    checkPassword: '',
})

const form = ref<import('element-plus').FormInstance>()

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== formInline.password) {
    callback(new Error("两次输入密码不一致"))
  } else {
    callback()
  }
}

const checkEmail = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入邮箱'))
    } else if (!value.includes('@')) {
        callback(new Error('请输入正确的邮箱'))
    } else {
        callback()
    }
}

const rules = reactive<Rules>({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    email: [{ validator: checkEmail, trigger: 'blur' }],
    verCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
    checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
})

const onSubmit = () => {
    form.value?.validate((valid: boolean) => {
        if (valid) {
            doRegister()
        } else {
            ElMessage.error('请输入账号或密码')
        }
    })
}

const isSubmitting = ref(false)

const doRegister = async () => {
    if (isSubmitting.value) {
        return
    }

    isSubmitting.value = true

    const data = {
        userName: formInline.userName,
        passWord: formInline.password,
        email: formInline.email,
        name: formInline.name,
        verCode: formInline.verCode
    }

    await register(data).then(res => {
        if(res.data.code === 1){
            //返回登录界面
            router.push('/login')
        }
    })

    isSubmitting.value = false
}

const getCodes = () => {
    const params = {
        userName: formInline.userName,
        email: formInline.email,
        name: formInline.name
    }
    getCode(params)
}

</script>
<style scoped lang="less">
.box-card {
    width: 400px;
    height: 700px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 17px 36px rgba(23, 57, 222, 0.25);


    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    .title {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 450px;
        height: 24px;
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 24px;
        color: rgba(9, 0, 0, 1);
        text-align: left;
        vertical-align: top;
    }

    .car {
        position: relative;
        left: 90px;
        margin-top: 20px;
    }

    img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .code{
        width: 150px;

    }

    .code-button{
        width: 110px;
        height: 40px;
        border-radius: 8px;
        margin-left: 10px;
    }
}

.el-form {
    margin: 20px 0;
}

.demo-form-inline .el-input {
    --el-input-width: 270px;
    height: 40px;
    margin-left: 5px;
}

.el-button {
    width: 300px;
    height: 45px;
    border-radius: 8px;
}

.el-checkbox {
    margin-left: 20px;
}
</style>