<template>
    <div class="main">
        <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>车队信息</span>
                    <el-button v-if="inPlatoon" class="button" @click="deleteVisible = true" text>退出车队</el-button>
                </div>
            </template>
            <div class="contain">
                <span>车队邀请码 : {{ mapData.id }}</span>
                <span>领队姓名 : {{ mapData.name }}</span>
                <span>起点 : {{ mapData.startPoint }}</span>
                <span>终点 : {{ mapData.endPoint }}</span>
                <span>车队配速 : {{ mapData.platoonSpeed }}</span>
                <span>车队间距 : {{ mapData.platoonSpacing }}</span>
            </div>
            <div class="buttons">
                <el-button v-if="!inPlatoon" class="button" @click="createVisible = true">创建车队</el-button>
                <el-button v-if="!inPlatoon" class="button" @click="joinVisible = true">加入车队</el-button>
            </div>
        </el-card>
        <el-card class="lnglat">
            点击获取经纬度
            <el-input v-model="lnglat" disabled></el-input>
        </el-card>
    </div>
    <div class="dialog1">
        <el-dialog v-model="createVisible" title="创建车队" width="30%">
            <el-form :model="formData1" ref="form1" :rules="rules1">
                <el-form-item prop="carId" label="选择车辆" :label-width="formLabelWidth">
                    <el-select v-model="formData1.carId" placeholder="选择车牌号">
                        <el-option v-for="item in data" :label="item.carPlate" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="startPoint" label="起点" :label-width="formLabelWidth">
                    <el-input v-model="formData1.startPoint" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="endPoint" label="终点" :label-width="formLabelWidth">
                    <el-input v-model="formData1.endPoint" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="platoonSpacing" label="车队间距" :label-width="formLabelWidth">
                    <el-input v-model="formData1.platoonSpacing" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="platoonSpeed" label="车队配速" :label-width="formLabelWidth">
                    <el-input v-model="formData1.platoonSpeed" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="curLmgLat" label="经纬度" :label-width="formLabelWidth">
                    <el-input v-model="lnglat" autocomplete="off" disabled />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createVisible = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit1">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <div class="dialog2">
        <el-dialog v-model="deleteVisible" title="确认退出车队" width="30%">
            <span>确定要退出车队吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteVisible = false">取消</el-button>
                    <el-button type="primary" @click="quit">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <div class="dialog3">
        <el-dialog v-model="joinVisible" title="加入车队" width="30%">
            <el-form :model="formData2">
                <el-form-item prop="carId" label="选择车辆" :label-width="formLabelWidth">
                    <el-select v-model="formData2.carId" placeholder="选择车牌号">
                        <el-option v-for="item in data" :label="item.carPlate" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="id" label="车队邀请码" :label-width="formLabelWidth">
                    <el-input v-model="formData2.id" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="curLmgLat" label="经纬度" :label-width="formLabelWidth">
                    <el-input v-model="lnglat" autocomplete="off" disabled />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="joinVisible = false">取消</el-button>
                    <el-button type="primary" @click="onSubmit2">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import AMapLoader from "@amap/amap-jsapi-loader";
import { reactive, onMounted, ref, onUnmounted } from "vue";
import { getUserPlatoon, createPlatoon, joinPlatoon, quitPlatoon } from '../../api/car'
import { useUserStore } from '../../stores/modules/user'
import { useUserCarStore } from '../../stores/modules/car'
import { ElMessage } from 'element-plus'
import car from '../../assets/car.png'

window._AMapSecurityConfig = {
    securityJsCode: '0a6e937f4eb30bef45ed112b4a86b201'
}

let map;
const userStore = useUserStore()
const lng = ref(113.415096);
const lat = ref(23.016926);
const userCarStore = useUserCarStore()

const mapSet = reactive({
    loading: true,
});

let marker

const inPlatoon = ref(false)

const mapData = ref({
    id: '',
    name: '',
    carNum: 0,
    startPoint: '',
    endPoint: '',
    platoonSpacing: 0,
    platoonSpeed: 0,
    records: [
        {
            userId: '',
            carId: '',
            curLongitude: 0,
            curLatitude: 0
        }
    ]
})

//地图创建完成(动画关闭)
const complete = () => {
    if (map) {
        map.on("complete", () => {
            mapSet.loading = false;
        });
    }
};

const getPlatoonData = async () => {
    const userId = {
        userId: userStore.getUserInfo().id
    }
    const res = await getUserPlatoon(userId)
    if (res.data.code === 0) {
        mapData.value.name = '---'
        mapData.value.startPoint = '---'
        mapData.value.endPoint = '---'
        mapData.value.platoonSpacing = 0
        mapData.value.platoonSpeed = 0
        mapData.value.id = '---'
        if(marker) {
            map.remove(marker)
        }
        return
    }
    inPlatoon.value = true
    mapData.value = res.data.data
    lng.value = mapData.value.records[0].curLongitude
    lat.value = mapData.value.records[0].curLatitude
    map.setCenter([lng.value, lat.value])

    if (inPlatoon.value) {
        const content = `<img src="${car}" />`;
        // 所有车添加点标记
        mapData.value.records.forEach((item) => {
            marker = new AMap.Marker({
                position: [item.curLongitude, item.curLatitude],
                content: content,
                offset: new AMap.Pixel(-15, -15),
            });
            map.add(marker);
        });
    }
}

const lnglat = ref('')

//#region 地图创建
onMounted(() => {
    AMapLoader.load({
        key: '60382ce2c87be87ae9d5d029a3c86da7',
        version: "2.0",
        plugins: ["AMap.MarkerCluster"],
    }).then((AMap) => {
        map = new AMap.Map("mapview", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 8, // 初始化地图级别
            center: [lng.value, lat.value], // 初始化地图中心点位置
        });
        map.on("click", (e) => {
            lng.value = e.lnglat.getLng();
            lat.value = e.lnglat.getLat();
            lnglat.value = lng.value + ',' + lat.value
            formData1.curLongitude = lng.value
            formData1.curLatitude = lat.value
            formData2.curLongitude = lng.value
            formData2.curLatitude = lat.value
        });
        getPlatoonData()
        complete();
    });
})

onUnmounted(() => {
    if (map) {
        map.destroy();
    }
});

//#endregion

//#region 创建车队

const createVisible = ref(false)

const form1 = ref<import('element-plus').FormInstance>()

const formLabelWidth = ref('120px')

const data = userCarStore.getLocalCar()

const formData1 = reactive({
    carId: '',
    startPoint: '',
    endPoint: '',
    platoonSpacing: 0,
    platoonSpeed: 0,
    curLongitude: lng.value,
    curLatitude: lat.value,
})

const rules1 = reactive({
    carId: [
        { required: true, message: '请选择车牌号', trigger: 'change' }
    ],
    startPoint: [
        { required: true, message: '请输入起点', trigger: 'blur' }
    ],
    endPoint: [
        { required: true, message: '请输入终点', trigger: 'blur' }
    ],
    platoonSpacing: [
        { required: true, message: '请输入车队间距', trigger: 'blur' }
    ],
    platoonSpeed: [
        { required: true, message: '请输入车队配速', trigger: 'blur' }
    ],
})

const onSubmit1 = () => {
    form1.value.validate(async (valid) => {
        if (valid) {
            const submitData = {
                ...formData1,
                userId: userStore.getUserInfo().id
            }
            const res = await createPlatoon(submitData)
            if (res.data.code === 1) {
                createVisible.value = false
                getPlatoonData()
            }
        } else {
            ElMessage.error('请输入正确的信息')
        }
    });
};

//#endregion

//#region 加入车队
const joinVisible = ref(false)

const formData2 = reactive({
    carId: '',
    id: '',
    curLongitude: lng.value,
    curLatitude: lat.value,
})

const onSubmit2 = () => {
    const submitData = {
        ...formData2,
        userId: userStore.getUserInfo().id
    }
    console.log(submitData);

    joinPlatoon(submitData).then(res => {
        if (res.data.code === 1) {
            joinVisible.value = false
            getPlatoonData()
        }
    })
}

//#endregion

//#region 退出车队
const deleteVisible = ref(false)

const quit = async () => {
    const datas = {
        userId: userStore.getUserInfo().id,
        platoonId: mapData.value.id
    }

    const res = await quitPlatoon(datas)
    if (res.data.code === 1) {
        deleteVisible.value = false
        getPlatoonData()
        inPlatoon.value = false
    }

    //刷新页面
    window.location.reload()
}

//#endregion

</script>
<style scoped>
.amap-copyright {
    display: none !important;
}

.amap-logo {
    display: none !important;
}

#mapview {
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;
}

.main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;
    margin-left: 2px;

    .box-card {
        position: absolute;
        top: 5%;
        right: 3%;

        width: 250px;

        .contain {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: start;
            height: 100%;
            width: 100%;

            span {
                font-size: 18px;
                margin-top: 20px;
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: end;
            height: 100%;
            width: 100%;

            .button {
                width: 100%;
                height: 40px;
                margin-top: 20px;
            }
        }
    }

    .lnglat {
        position: absolute;
        bottom: 5%;
        right: 3%;

        width: 250px;

        .el-input {
            width: 100%;
            height: 40px;
            margin-top: 10px;
        }
    }
}

.custom-content-marker {
    position: relative;
    width: 25px;
    height: 34px;
}

.custom-content-marker img {
    width: 100%;
    height: 100%;
}

.custom-content-marker .close-btn {
    position: absolute;
    top: -6px;
    right: -8px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    background: #ccc;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 15px;
    box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
}

.custom-content-marker .close-btn:hover {
    background: #666;
}
</style>