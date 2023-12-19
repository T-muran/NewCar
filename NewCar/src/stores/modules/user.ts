import { defineStore } from 'pinia'
import { isRef, ref } from "vue";
import { userType } from './types'
import { UserResult, login1, login2 } from '../../api/login'
import { setToken, removeToken, setUser } from '../../utils/auth'
import router from '../../router/index'
import { getAllUser, getAllEmployee, getEmployeeInfo, updateUserInfo } from '../../api/user'

//个人信息
export const useUserStore = defineStore('user', () => {
    const userSet = ref({
        userName: '',
        roles: '',
        isRemembered: false,
    })

    const userInfo = ref<userType>({

    })

    const error = ref('')

    //管理员登录
    const loginAdmin = async (data: any) => {
        try {
            const res = await login1(data)
            const result = res.data
            result.data.avatar = 'http://159.75.147.119:8080' + result.data.avatar;
            console.log(result.data.avatar);
            if (result.code) {
                userInfo.value = result.data
                setUser(result.data)
                console.log(userInfo.value);
                setToken(result.data.jwt)
                router.push('/home')
            }
        } catch (error) {
            console.log('登录失败:', error)
            error.value = error.message
        }
    }

    //普通用户登录
    const loginUser = async (data: any) => {
        try {
            const res = await login2(data)
            const result = res.data
            if (result.code) {
                userInfo.value = result.data
                setUser(result.data)
                setToken(result.data.jwt)
                router.push('/userSpace')
            }
        } catch (error) {
            console.log('登录失败:', error)
            error.value = error.message
        }
    }

    //退出登录
    const logout = () => {
        //清除token
        removeToken()
        //清除用户信息
        localStorage.removeItem('user')
        //重定向到登录页面
        router.push('/login')
    }

    //从localStorage获取用户信息
    const getUserInfo = () => {
        const user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user)
        }
        return {}
    }


    return {
        userSet,
        error,
        loginAdmin,
        logout,
        userInfo,
        getUserInfo,
        loginUser,
    }
})

//用户信息
export const usersInfo = defineStore('usersInfo', () => {
    const users = ref([])

    const adminUser = ref({})

    const user = ref({})
    //
    //#region 管理员
    //获取所有用户表信息
    const getUsersInfo = async (data?: any) => {
        try {
            const res = await getAllUser(data)
            if (res) {
                users.value = res.data
            }
        } catch (error) {
            console.error('获取管理员信息失败:', error)
        }
    }

    //获取管理员表信息
    const getAdminInfo = async (data?: any) => {
        try {
            const res = await getAllEmployee(data)
            if (res) {
                users.value = res.data
            }
        } catch (error) {
            console.error('获取管理员信息失败:', error)
        }
    }

    const EmployeeInfo = async () => {
        try {
            const res = await getEmployeeInfo()
            if (res) {
                adminUser.value = res.data
            }
        } catch (error) {
            console.error('获取管理员信息失败:', error)
        }
    }

    //#endregion
    
    //#region 用户

    //#endregion

    return {
        user,
        users,
        adminUser,
        getUsersInfo,
        getAdminInfo,
        EmployeeInfo,
    }
})