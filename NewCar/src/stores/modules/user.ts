import { defineStore } from 'pinia'
import { ref } from "vue";
import { userType } from './types'
import { UserResult, login1 } from '../../api/login'
import { setToken, removeToken,setUser } from '../../utils/auth'
import router from '../../router/index'
import { getAllUser,getAllEmployee } from '../../api/user'

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

    //退出登录
    const logout = () => {
        removeToken()
        router.push('/login')
    }

    return {
        userSet,
        error,
        loginAdmin,
        logout,
        userInfo
    }
})

//用户信息
export const usersInfo = defineStore('usersInfo', () => {
    const users = ref([])

    //获取所有用户信息
    const getUsersInfo = async (data?: any) => {
        try {
            const res = await getAllUser(data)
            if (res) {
                users.value = res.data
            }
        } catch (error) {
            console.error('获取用户信息失败:', error)
        }
    }

    //获取管理员信息
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

    return {
        users,
        getUsersInfo,
        getAdminInfo,
    }
})