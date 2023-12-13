<template>
    <div class="login">
        <div class="background">
            <div class="picture"></div>
            <div class="container">
                <el-card class="box-card">
                    <span class="title">欢迎登录车辆编队管理系统</span>
                    <carLogo />
                    <el-form ref="form" :model="formInline" :rules="rules" class="demo-form-inline">
                        <el-form-item prop="user" label="">
                            <img src="../../assets/login/user.png" alt="">
                            <el-input v-model="formInline.user" placeholder="请输入账号" clearable />
                        </el-form-item>
                        <el-form-item prop="password" label="">
                            <img src="../../assets/login/lock.png" alt="">
                            <el-input v-model="formInline.password" placeholder="请输入密码" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <el-checkbox v-model="checked1" label="记住密码" size="large" />
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import type { FormItemRule, FormInstance } from 'element-plus'
import carLogo from '../../assets/carLogo.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../../stores/modules/user'

const userStore = useUserStore()

type From = {
    user: string,
    password: string
}

type Rules = {
    [key in keyof From]?: Array<FormItemRule>
}

const formInline = reactive<From>({
    user: '',
    password: '',
})

const checked1 = ref<boolean>(false)

const form = ref<FormInstance>()

const rules = reactive<Rules>({
    user: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const onSubmit = () => {
    form.value?.validate((valid: boolean) => {
        if (valid) {
            doLogin()
        } else {
            ElMessage.error('请输入账号或密码')
            return false
        }
    })

}

const isSubmitting = ref(false)

const doLogin = async () => {
    // 如果正在提交，则返回并不发送请求
    if (isSubmitting.value) {
        return
    }
    // 发送登录请求
    const data = {
        userName: formInline.user,
        passWord: formInline.password
    }
    // 在发送请求前，设置 isSubmitting 为 true
    isSubmitting.value = true
    await userStore.loginAdmin(data)
    // 在请求结束后，设置 isSubmitting 为 false
    isSubmitting.value = false
}
</script>

<style scoped lang="less">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../../assets/login/login2.jpg");
        background-size: cover;
        display: flex;

        .picture {
            height: 100%;
            width: 50%;
            background: url("../../assets/login/login.png");
            background-size: cover;
        }

        .container {
            height: 100%;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

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
                    margin-top: 20px;
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
        }
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