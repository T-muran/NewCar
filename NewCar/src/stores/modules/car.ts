import { defineStore } from 'pinia'
import { ref } from "vue";
import { getCarInfo } from '../../api/car'

export const useCarStore = defineStore('car', () => {
    const carInfo = ref([])

    //获取所有车辆信息
    const getAllCar = async (data:any) => {
        try {
            const res = await getCarInfo(data)
            const result = res.data
            if (result.code) {
                carInfo.value = result.data
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
