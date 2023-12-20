import { defineStore } from 'pinia'
import { ref } from "vue";
import { getCarInfo } from '../../api/car'
import { getUserCar} from '../../api/user'
import { setUserCar,localGetUserCar } from '../../utils/auth'

//管理员获取车辆信息
export const useCarStore = defineStore('car', () => {
    const carInfo = ref([])

    //获取所有车辆信息
    const getAllCar = async (data: any) => {
        try {
            const res = await getCarInfo(data)
            const result = res.data
            if (result.code) {
                console.log(result.data.records);

                result.data.records.forEach((item: any) => {
                    item.avatar = 'http://159.75.147.119:8080' + item.avatar;
                    carInfo.value = result.data
                })
            }
        } catch (error) {
            console.log('获取车辆信息失败:', error)
        }
    }

    return {
        carInfo,
        getAllCar
    }
})

//用户获取自己的车辆信息
export const useUserCarStore = defineStore('userCar', () => {
    const carInfo = ref([])

    //获取所有车辆信息
    const getAllCar = async (data: any) => {
        try {
            const res = await getUserCar(data)
            const result = res.data
            if (result.code === 0) {
                return
            }
            result.data.forEach((item: any) => {
                item.avatar = 'http://159.75.147.119:8080' + item.avatar;
            })
            carInfo.value = result.data
            setUserCar(result.data)
        } catch (error) {
            console.log('获取车辆信息失败:', error)
        }
    }  

    //获取本地车辆信息
    const getLocalCar = () => {
        const userCar = localGetUserCar()
        if (userCar) {
            return userCar;
        }
        return {};
    }
    
    return {
        carInfo,
        getAllCar,
        getLocalCar,
    }
})
