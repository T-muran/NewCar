<template>
    <div>
        <el-card class="box-card">
            <span class="title">欢迎登录车辆编队管理系统</span>
            <carLogo />
            <el-form @keyup.enter.native="onSubmit" ref="form" :model="formInline" :rules="rules" class="demo-form-inline">
                <el-form-item prop="user" label="">
                    <img src="../../../assets/login/user.png" alt="">
                    <el-input v-model="formInline.user" placeholder="请输入账号" clearable />
                </el-form-item>
                <el-form-item prop="password" label="">
                    <img src="../../../assets/login/lock.png" alt="">
                    <el-input v-model="formInline.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-checkbox v-model="checked1" label="记住密码" size="large" />
                        <el-checkbox v-model="checked2" label="管理员登录" size="large" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" >登录</el-button>
                </el-form-item>

                <div class="foot">
                    <span>还没有账号?去 <RouterLink to="/register">注册</RouterLink> </span>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import carLogo from '../../../assets/carLogo.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../../stores/modules/user'

const userStore = useUserStore()

type Form = {
    user: string
    password: string
}

type Rules = {
    [key in keyof Form]?: Array<import('element-plus').FormItemRule>
}

const formInline = reactive<Form>({
    user: '',
    password: '',
})

const checked1 = ref(false)
const checked2 = ref(false)

const form = ref<import('element-plus').FormInstance>()

const rules = reactive<Rules>({
    user: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const onSubmit = () => {
    form.value?.validate((valid: boolean) => {
        if (valid) {
            doLogin()
        } else {
            ElMessage.error('请输入账号或密码')
        }
    })
}

const isSubmitting = ref(false)

const doLogin = async () => {
    if (isSubmitting.value) {
        return
    }

    isSubmitting.value = true

    const data = {
        userName: formInline.user,
        passWord: formInline.password
    }

    if (checked2.value) {
        await userStore.loginAdmin(data)
    } else {
        await userStore.loginUser(data)
    }

    isSubmitting.value = false
}

</script>

<style lang="less" scoped>
.box-card {
    width: 400px;
    height: 500px;
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
}

.el-form {
    margin: 20px 0;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
    height: 40px;
}

.el-button {
    width: 300px;
    height: 45px;
    border-radius: 8px;
}
</style>