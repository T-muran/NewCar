<template>
    <div class="main">
        <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>车队信息</span>
                    <el-button v-if="inPlatoon" class="button" text>退出车队</el-button>
                </div>
            </template>
            <div class="contain">
                <span>领队姓名: {{ mapData.name }}</span>
                <span>起点: {{ mapData.startPoint }}</span>
                <span>终点: {{ mapData.endPoint }}</span>
                <span>车队配速: {{ mapData.platoonSpeed }}</span>
                <span>车队间距: {{ mapData.platoonSpacing }}</span>
            </div>
            <div class="buttons">
                <el-button v-if="!inPlatoon" class="button" @click="createVisible = true">创建车队</el-button>
                <el-button v-if="!inPlatoon" class="button">加入车队</el-button>
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
                    <el-input v-model="formData1.curLmgLat" autocomplete="off" disabled />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="createVisible = false">取消</el-button>
                    <el-button type="primary">
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
import { getUserPlatoon } from '../../api/car'
import { useUserStore } from '../../stores/modules/user'

let map;
const userStore = useUserStore()
const lng = ref(104.04311);
const lat = ref(30.64242);

const mapSet = reactive({
    loading: true,
});

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
        return
    }
    inPlatoon.value = true
    mapData.value = res.data.data
    lng.value = mapData.value.records[0].curLongitude
    lat.value = mapData.value.records[0].curLatitude
}

const lnglat = ref('')

//#region 地图创建
onMounted(() => {
    getPlatoonData()

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
            formData1.curLmgLat = lnglat.value
        });
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

const formData1 = reactive({
    startPoint: '',
    endPoint: '',
    platoonSpacing: 0,
    platoonSpeed: 0,
    curLmgLat: lnglat.value
})

const rules1 = reactive({
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
    curLmgLat: [
        { required: true, message: '请输入当前经纬度', trigger: 'blur' }
    ]
})

//#endregion

//#region 加入车队

//#endregion

//#region 退出车队

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
</style>