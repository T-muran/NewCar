<template>
    <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { mapDatas } from "../stores/modules/map";
import car from "../assets/car.png";
import { createWindow } from "../utils/creareInfoWindow";

const lng = ref(104.04311);
const lat = ref(30.64242);
const mapdata = mapDatas();

let MarkerCluster;
let map;

const instance = getCurrentInstance();

const mapSet = reactive({
    loading: true,
});

//地图创建完成(动画关闭)
const complete = () => {
    if (map) {
        map.on("complete", () => {
            mapSet.loading = false;
        });
    }
};

window._AMapSecurityConfig = {
    securityJsCode: '0a6e937f4eb30bef45ed112b4a86b201'
}

//地图创建
onMounted(() => {
    if (navigator.geolocation) {
        // 支持获取当前位置信息的浏览器
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude; // 纬度
                const longitude = position.coords.longitude; // 经度
                lng.value = longitude;
                lat.value = latitude;
            },
            (err) => {
                console.log(err);
            }
        );
    } else {
        // 不支持获取当前位置信息的浏览器
    }

    if (!instance) return;

    AMapLoader.load({
        key: mapdata.mapData.amapKey,
        version: "2.0",
        plugins: ["AMap.MarkerCluster"],
    }).then((AMap) => {
        map = new AMap.Map("mapview", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 8, // 初始化地图级别
            center: [lng.value, lat.value], // 初始化地图中心点位置
        });
        let geocoder
        let infoWindow
        //地图中添加地图操作ToolBar插件
        map.plugin(["AMap.ToolBar", "AMap.MapType", "AMap.Geocoder"], () => {
            map.addControl(new AMap.ToolBar());
            //地图类型切换
            map.addControl(
                new AMap.MapType({
                    defaultType: 0,
                })
            );
            //逆地理编码
            geocoder = new AMap.Geocoder();
        });

        MarkerCluster = new AMap.MarkerCluster(map, [], {
            // 聚合网格像素大小
            gridSize: 80,
            maxZoom: 14,
            renderMarker(context) {
                const { marker, data } = context;

                if (Array.isArray(data) && data[0]) {
                    const content = `<img src="${car}" />`;
                    marker.setContent(content);
                    marker.setLabel({
                        direction: "bottom",
                        //设置文本标注偏移量
                        offset: new AMap.Pixel(-4, 0),
                        //设置文本标注内容
                    });
                    marker.setOffset(new AMap.Pixel(-18, -10));
                    marker.on("click", ({ lnglat }) => {
                        map.setZoom(17); //设置地图层级
                        map.setCenter(lnglat);
                        const userId = {
                            userId: data[0].userId,
                        }
                        mapdata.getPlatoonData(userId).then();
                        //逆地理编码
                        geocoder.getAddress(lnglat, (status, result) => {
                            if (status === "complete" && result.info === "OK") {
                                // result为对应的地理位置详细信息
                                const address = result.regeocode.formattedAddress;
                                console.log(address);
                                const { div, app } = createWindow(closeApp)
                                infoWindow = new AMap.InfoWindow({
                                    anchor: 'middle-left',
                                    isCustom: true,
                                    content: div,  //传入 dom 对象，或者 html 字符串
                                });
                                infoWindow.open(map, lnglat);
                                function closeApp() {
                                    infoWindow.close();
                                }
                            } else {
                                console.log('获取地理位置信息失败')
                            }
                        });
                    });
                }
            },
        });
        map.on('click', () => {
            if(infoWindow) infoWindow.close();
        })

        //添加聚合点点击事件
        MarkerCluster.on("click", (data) => {
            if (data.clusterData.length <= 1) return;
            //计算所有聚合点的中心点
            let alng = 0,
                alat = 0;
            for (const m of data.clusterData) {
                alng += m.lnglat.lng;
                alat += m.lnglat.lat;
            }
            const lat = alat / data.clusterData.length;
            const lng = alng / data.clusterData.length;
            //以中心点固定倍数放大地图，达到展开聚合点的效果
            map.setZoom(10);
            //如果zoom 等于 10，则继续放大
            if (map.getZoom() === 10) {
                map.setZoom(14);
            }
            map.setCenter([lng, lat]);
        });
        //获取车辆信息
        mapdata.getMapData().then(({ data } = mapdata.mapData) => {
            const points: object = data.map(v => {
                return {
                    lnglat: [v.curLongitude, v.curLatitude],
                    ...v
                }
            })
            if (MarkerCluster) MarkerCluster.setData(points);
        });
        complete();
    });
});

onUnmounted(() => {
    if (map) {
        map.destroy();
    }
});

</script>

<style scoped lang="less">
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
</style>   