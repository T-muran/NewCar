<template>
    <el-card class="box-card">
        <div class="card-header">
            <span>车队编号#{{ mapDataInfo.mapData.data.carPlate }}</span>
            <el-icon @click="close">
                <Close />
            </el-icon>
        </div>
        <div class="status">
            1
        </div>
        <div class="time">
            <el-card class="time-card card1">
                <div class="part1">
                    <span>起始时间</span>
                    <span>{{ time.startTime }}</span>
                </div>
                <div class="line"></div>
                <div class="part2">
                    <span>车队起点</span>
                    <span>{{ mapDataInfo.mapData.data.startPoint }}</span>
                </div>
            </el-card>
            <el-card class="time-card card2">
                <div class="part1">
                    <span>结束时间</span>
                    <span>{{ time.endTime }}</span>
                </div>
                <div class="line"></div>
                <div class="part2">
                    <span>车队</span>
                    <span>{{ mapDataInfo.mapData.data.startPoint }}</span>
                </div>
            </el-card>
        </div>

        <div class="leaderInfo">
            <el-card class="info-card">
                <div class="head">
                    <span>领队信息</span>
                    <div class="headInfo">
                        <img :src=avatar alt="">
                        <div class="text">
                            <span>{{ mapDataInfo.mapData.data.userName }}</span>
                            <span>{{ mapDataInfo.mapData.data.sex }}</span>
                        </div>
                    </div>
                </div>
                <div class="line"></div>
                <div class="contain">
                    <div class="phone">
                        <span>手机号</span>
                        <span>{{ mapDataInfo.mapData.data.phoneNum }}</span>
                    </div>
                    <div class="address">
                        <span>常住地址</span>
                        <span>{{ mapDataInfo.mapData.data.address }}</span>
                    </div>
                </div>
            </el-card>
        </div>
        <el-button type="primary">查看车队</el-button>
    </el-card>
</template>

<script setup lang='ts'>
import { onMounted, ref, toRef, watch, toRefs, reactive } from 'vue';
import { Close } from '@element-plus/icons-vue'
import { mapDatas } from '../stores/modules/map'


const mapDataInfo = mapDatas();

const props = defineProps({
    closeApp: {
        type: Function,
        required: true
    }
});

const time = reactive({
    startTime: '',
    endTime: ''
})

const getTime = () => {
    if(!mapDataInfo.mapData.data.creatTime) return
    time.startTime = (mapDataInfo.mapData.data.creatTime).replace('T', ' ').slice(5, -3)
    //如果车队未结束，结束时间为---
    time.endTime = (mapDataInfo.mapData.data.status === 1) ? '---' : (mapDataInfo.mapData.data.endTime).replace('T', ' ').slice(5, -3)
}

getTime()

const avatar = ref('')
avatar.value = mapDataInfo.mapData.data.avatar

const close = () => {
    props.closeApp()
}

//修改时间格式函数
const changeTime = (time) => {
    //修改时间格式 2021-08-09T12:00:00 => 08-09-12:00 ,需要去掉T和秒
    return time.replace('T', ' ').slice(5, -3)
}

//监视mapDataInfo.mapData的变化
watch(toRef(mapDataInfo, 'mapData'), (newVal, oldVal) => {
    time.startTime = changeTime(newVal.data.creatTime)
    time.endTime = changeTime(newVal.data.endTime)

    if (newVal.data.status === 1) {
        time.endTime = '---'
    }
})

///TODO : 返回父组件点击事件

</script>
<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 400px;
    height: 600px;
    position: absolute;
    left: 50px;
    top: -300px;
    border-radius: 15px;
}

.el-icon {
    cursor: pointer;
    scale: 1.25;
}

.status {}

.time {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.time-card {
    width: 100%;
    height: 170px;
    box-shadow: none;
}

.card1 {
    position: relative;
    left: -4px;
}

.card2 {
    position: relative;
    left: 4px;
}

.part1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    position: relative;
    top: -10px;
    left: -5px;

    span:nth-child(1) {
        font-size: 14px;
        margin-bottom: 5px;
        color: #999;
    }

    span:nth-child(2) {
        font-size: 18px;
        font-weight: 700;
        color: #333;
    }
}

.line {
    position: relative;
    left: -20px;
    width: 130%;
    height: 1px;
    background: #ddd;
}

.part2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    margin-top: 10px;
    position: relative;
    left: -5px;

    span:nth-child(1) {
        font-size: 14px;
        margin-bottom: 5px;
        color: #999;
    }

    span:nth-child(2) {
        font-size: 16px;
        font-weight: 700;
        color: #333;
    }
}

.leaderInfo {
    width: 100%;

    .info-card {
        position: relative;
        left: -5px;
        top: 20px;
        width: 101.8%;
        height: 250px;
        box-shadow: none;

        .head {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 20px;

            span {
                font-size: 14px;
                font-weight: 600;
                color: #333;
            }

            .headInfo {
                display: flex;
                justify-content: space-between;
                align-items: center;

                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 20px;
                    margin-top: 10px;
                }

                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: start;

                    span:nth-child(1) {
                        font-size: 18px;
                        font-weight: 700;
                        color: #333;
                        margin-bottom: 5px;
                    }

                    span:nth-child(2) {
                        font-size: 14px;
                        font-weight: 500;
                        color: #999;
                    }
                }
            }
        }

        .line {
            position: relative;
            left: -20px;
            width: 130%;
            height: 1px;
            background: #ddd;
        }

        .contain {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: start;

            .phone {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: start;
                margin-bottom: 10px;
                position: relative;
                left: -5px;

                span:nth-child(1) {
                    font-size: 14px;
                    font-weight: 500;
                    color: #999;
                    margin-top: 10px;
                    margin-bottom: 5px;
                }

                span:nth-child(2) {
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                }
            }

            .address {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: start;
                margin-bottom: 10px;
                position: relative;
                left: -5px;

                span:nth-child(1) {
                    font-size: 14px;
                    font-weight: 500;
                    color: #999;
                    margin-top: 10px;
                    margin-bottom: 5px;
                }

                span:nth-child(2) {
                    font-size: 14px;
                    font-weight: 600;
                    margin-top: 5px;
                    color: #333;
                }
            }
        }
    }
}

.el-button {
    position: relative;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    margin-top: 20px;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    font-size: 20px;
}
</style>
