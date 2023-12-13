<template>
    <div class="currCar">
        <span class="titleSpan">当前车队</span>
        <div class="title">
            <div class="cards" v-for="(item, index) in props.carDataChil" :key="index">
                <div class="up">
                    <div class="upleft">
                        <span>起点</span>
                        <span>{{ item.startPoint }}</span>
                    </div>
                    <div class="upright">
                        <span>终点</span>
                        <span>{{ item.endPoint }}</span>
                    </div>
                </div>
                <div class="line"></div>
                <div class="down">
                    <div class="downleft">
                        <div class="avatar">
                            <img :src="item.avatar" alt="">
                        </div>
                        <span class="name">{{ item.leaderName }}</span>
                    </div>
                    <div class="downright">
                        <span>车队长度</span>
                        <span class="carNum">{{ item.carNum }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch,toRefs,isRef } from 'vue';
import { anim } from '../../../stores/modules/animator';

const animator = anim();

interface CarData {
    status: number;
    startPoint: string;
    endPoint: string;
    carNum: number;
    leaderName: string;
    avatar: string;
}

//接收父组件传过来的数据对象
const props = defineProps<{
    carDataChil: [];
}>()

//监视animator.animations.isCollapse，如果为true，说明侧边栏收起，此时将车队信息收起
watch(() => animator.animations.isCollapse,
    //如果为true，则为currCar移除hide类，否则添加hide类
    () => {
        const currCar = document.querySelector('.currCar')
        if (animator.animations.isCollapse) {
            currCar.classList.remove('hide')
        } else {
            currCar.classList.add('hide')
        }
    }
)




</script>
<style scoped>
img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.currCar {
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;

    .titleSpan {
        position: relative;
        top: 5px;
        left: 20px;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 700;
        color: #000;
    }

    .title {
        width: 100%;
        height: 100%;
        flex-wrap: wrap;

        .cards {
            width: 90%;
            height: 150px;
            background-color: #fff;
            margin-top: 20px;
            margin-left: 20px;
            border-radius: 5px;
            border: 1px solid #ddd;

            .up {
                width: 100%;
                height: 50%;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;

                .upleft {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .avatar {
                        width: 50px;
                        height: 50px;
                        background-color: #ddd;
                        border-radius: 50%;
                    }

                    span {
                        width: 80%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-bottom: 10px;
                    }

                    span:nth-child(1) {
                        color: #999;
                    }

                    span:nth-child(2) {
                        color: #000;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }

                .upright {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    span {
                        width: 80%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-bottom: 10px;
                    }

                    span:nth-child(1) {
                        color: #999;
                    }

                    span:nth-child(2) {
                        color: #000;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
            }

            .line {
                width: 100%;
                height: 1px;
                background-color: #ddd;
            }

            .down {
                width: 100%;
                height: 50%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;

                .downleft {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin-left: 20px;

                    .avatar {
                        width: 50px;
                        height: 50px;
                        background-color: #ddd;
                        border-radius: 50%;
                    }

                    .name {
                        margin-left: 10px;
                    }
                }

                .downright {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    span {
                        margin-bottom: 10px;
                    }

                    span:nth-child(1) {
                        color: #999;
                    }

                    span:nth-child(2) {
                        color: #000;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
            }
        }

        .cards:hover {
            box-shadow: 0 0 10px #409eff;
            scale: 1.01;
            cursor: pointer;
        }
    }
}

.hide {
    width: 350px;

    transition: all 0.5s;
}
</style>