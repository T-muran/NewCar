import { defineStore } from 'pinia'
import { ref,isRef } from 'vue'
import { getMapPoint,getMemberPoint,getPointInfo } from '../../api/map'

export const mapDatas = defineStore('map',()=>{
    const mapData = ref({
        amapKey:'60382ce2c87be87ae9d5d029a3c86da7' //高德地图key
    })

    //获取地图点位信息
    const getMapData = async() => {
        const res = await getMapPoint()
        if(res){
            mapData.value = res.data
        }
        console.log(mapData.value);
    }

    //获取车队点位信息
    const getPlatoonData = async(data:any) => {
        const res = await getPointInfo(data)
        if(res){
            console.log(res.data.data.avatar);
            res.data.data.avatar = 'http://159.75.147.119:8080' + res.data.data.avatar;
            mapData.value = res.data
        }
        console.log(mapData.value);
    }

    //获取成员点位信息
    const getMemberData = async(data?:any) => {
        const res = await getMemberPoint(data)
        if(res){
            mapData.value = res.data
        }
        console.log(mapData.value);
    }

    return {
        mapData,
        getMapData,
        getMemberData,
        getPlatoonData
    }
})

export const windowInfo = defineStore('windowInfo',()=>{
    const windowInfo = ref({
        isClick:false,
    })

    return {
        windowInfo,
    }
})