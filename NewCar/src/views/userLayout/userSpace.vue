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
            <template #footer>
                <el-button type="primary" @click="PWFormVisible = true">修改密码</el-button>
            </template>
        </el-card>
    </div>
    <CarInfo />
    <div class="dialog1">
        <el-dialog v-model="dialogFormVisible" title="修改个人信息">
            <el-form :model="formData" ref="form" :rules="rules1">
                <el-form-item prop="name" label="真实姓名" :label-width="formLabelWidth">
                    <el-input v-model="formData.name" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="userName" label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="formData.userName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="phoneNum" label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="formData.phoneNum" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
                    <el-select v-model="formData.sex" class="m-2" placeholder="性别" size="default">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item proap="birthDate" label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker value-format="YYYY-MM-DD" v-model="formData.birthDate" type="date" placeholder="选择日期"
                        size="default" />
                </el-form-item>
                <el-form-item prop="idNumber" label="身份证号码" :label-width="formLabelWidth">
                    <el-input v-model="formData.idNumber" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="address" label="常用地址" :label-width="formLabelWidth">
                    <CitySelect @change="changeEvent" />
                    <el-input placeholder="详细地址" v-model="address" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <div class="dialog2">
        <el-dialog v-model="PWFormVisible" title="修改密码">
            <el-form :model="form2" ref="form3" :rules="rules2">
                <el-form-item prop="oldPW" label="旧密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form2.oldPW" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="newPW" label="新密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form2.newPW" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="confirmPW" label="确认密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="form2.confirmPW" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="PWFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit2">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import CarInfo from './components/carInfo.vue';
import { useUserStore } from '../../stores/modules/user';
import { updateUserInfo, changePassWord } from '../../api/user'
import { onMounted, reactive, ref } from 'vue';
import CitySelect from '../components/citySelect.vue';
import { ElMessage } from 'element-plus'
import { setUser } from '../../utils/auth';

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

const data = reactive({
    id: userInfo.getUserInfo().id,
    userName: userInfo.getUserInfo().userName,
    name: userInfo.getUserInfo().name,
    sex: userInfo.getUserInfo().sex,
    email: userInfo.getUserInfo().email,
    phoneNum: userInfo.getUserInfo().phoneNum,
    birthDate: userInfo.getUserInfo().birthDate,
    idNumber: userInfo.getUserInfo().idNumber,
    address: userInfo.getUserInfo().address,
    avatar: userInfo.getUserInfo().avatar,
})

onMounted(() => {

})

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
    userName: data.userName,
    name: data.name,
    sex: data.sex,
    phoneNum: data.phoneNum,
    birthDate: data.birthDate,
    idNumber: data.idNumber,
    address: '',
    avatar: data.avatar,
});

//#region dialog1

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const address = ref('')

const changeEvent = (addrNode: string) => {
    formData.address = addrNode
}

const changeState = () => {
    console.log(formData);
    formData.address += address.value
    updateUserInfo(formData).then(res => {
        if (res.data.code === 0) {
            return
        }
        res.data.data.avatar = 'http://159.75.147.119:8080' + res.data.data.avatar
        //更新用户信息
        setUser(res.data.data)
        data.id = res.data.data.id
        data.userName = res.data.data.userName
        data.name = res.data.data.name
        data.sex = res.data.data.sex
        data.email = res.data.data.email
        data.phoneNum = res.data.data.phoneNum
        data.birthDate = res.data.data.birthDate
        data.idNumber = res.data.data.idNumber
        data.address = res.data.data.address
    })
    dialogFormVisible.value = false
}

type Rules = {
    [key in keyof FormData]?: Array<import('element-plus').FormItemRule>
}

const form = ref<import('element-plus').FormInstance>()

const rules1 = reactive<Rules>({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    phoneNum: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
    birthDate: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
    idNumber: [{ required: true, message: '请输入身份证号码', trigger: 'blur' }],
    address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
})

const onSubmit = () => {
    form.value?.validate((valid: boolean) => {
        if (valid) {
            changeState()
        } else {
            ElMessage.error('请输入完整信息')
        }
    })
}
//#endregion

//#region dialog2
const PWFormVisible = ref(false)

type passWord = {
    oldPW: string,
    newPW: string,
    confirmPW: string,
}

const form2 = reactive<passWord>({
    oldPW: '',
    newPW: '',
    confirmPW: '',
})

type Rules2 = {
    [key in keyof passWord]?: Array<import('element-plus').FormItemRule>
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== form2.newPW) {
        callback(new Error("两次输入密码不一致"))
    } else {
        callback()
    }
}

const rules2 = reactive<Rules2>({
    oldPW: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    newPW: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPW: [{ validator: validatePass2, trigger: 'blur' }],
})

const form3 = ref<import('element-plus').FormInstance>()

const changePassWords = () => {
    const data = {
        id: userInfo.getUserInfo().id,
        oldPassWord: form2.oldPW,
        newPassWord: form2.newPW
    }

    changePassWord(data).then(res => {
        if (res.data.code === 0) {
            return
        }
        //退出登录
        userInfo.logout()
    })
    PWFormVisible.value = false
}

const onSubmit2 = () => {
    form3.value?.validate((valid: boolean) => {
        if (valid) {
            changePassWords()
        } else {
            ElMessage.error('请输入完整信息')
        }
    })
}

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