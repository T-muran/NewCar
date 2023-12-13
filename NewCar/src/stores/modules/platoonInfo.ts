import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { carType } from './types'
import { getPartialPlatoon,getAllPlatoon } from '../../api/home'

export const carDatas = defineStore('carDatas', () => {
    const carData = reactive([
    ])

    //获取部分车队信息
    const getPlatoonData1 = async () => {
        const res = await getPartialPlatoon()
        if(res){
            carData.values = res.data
        }
    }

    //获取全部车队信息
    const getPlatoonData2 = async (data?:any) => {
        const res = await getAllPlatoon(data)
        if(res){
            carData.values = res.data
        }
    }

    return {
        carData,
        getPlatoonData1,
        getPlatoonData2
    }
})
