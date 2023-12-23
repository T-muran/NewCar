<template>
    <div class="carInfo">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>车辆信息</span>
                    <el-button class="button" text @click="addCarFormVisible = true">添加车辆</el-button>
                </div>
            </template>
            <div class="container">
                <el-card class="box-card2" v-for="item in carInfo" :key="item">
                    <img :src=item.avatar alt="">
                    <el-icon class="close" @click="showDelete(item)"><Close /></el-icon>
                    <el-icon class="edit" @click="updatedCars(item)"><Edit /></el-icon>
                    <div class="text">
                        <span>{{ item.carPlate }}</span>
                        <span v-if=item.isRenewable>新能源</span>
                        <div class="info">
                            <span>高度：{{ item.carHeight }}米 &nbsp</span>
                            <span>长度：{{ item.carLength }}米 &nbsp</span>
                            <span>颜色：{{ item.color }} &nbsp</span>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-card>
        <div class="dialog1">
            <el-dialog width="40%" v-model="addCarFormVisible" title="添加车辆">
                <el-form class="form1" :model="formData1" ref="form1" :rules="rules1">
                    <el-form-item prop="carPlate" label="车牌号" :label-width="formLabelWidth">
                        <el-input v-model="formData1.carPlate" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="color" label="颜色" :label-width="formLabelWidth">
                        <el-input v-model="formData1.color" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="carHeight" label="车辆高度" :label-width="formLabelWidth">
                        <el-input v-model="formData1.carHeight" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="carLength" label="车辆长度" :label-width="formLabelWidth">
                        <el-input v-model="formData1.carLength" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="isRenewable" label="是否为新能源" :label-width="formLabelWidth">
                        <el-select v-model="formData1.isRenewable" placeholder="">
                            <el-option label="是" value="1" />
                            <el-option label="否" value="0" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="addCarFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit1">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div class="dialog2">
            <el-dialog v-model="deleteVisible" title="删除车辆信息" width="30%">
                <span>确认删除这辆车的信息吗？</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="deleteVisible = false">取消</el-button>
                        <el-button type="primary" @click="deleteCars">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
        <div class="dialog3">
            <el-dialog width="40%" v-model="updateCarFormVisible" title="更改车辆信息">
                <el-form class="form1" :model="formData1" ref="form1" :rules="rules1">
                    <el-form-item prop="carPlate" label="车牌号" :label-width="formLabelWidth">
                        <el-input v-model="formData1.carPlate" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="color" label="颜色" :label-width="formLabelWidth">
                        <el-input v-model="formData1.color" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="carHeight" label="车辆高度" :label-width="formLabelWidth">
                        <el-input v-model="formData1.carHeight" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="carLength" label="车辆长度" :label-width="formLabelWidth">
                        <el-input v-model="formData1.carLength" autocomplete="off" />
                    </el-form-item>
                    <el-form-item prop="isRenewable" label="是否为新能源" :label-width="formLabelWidth">
                        <el-select v-model="formData1.isRenewable" placeholder="">
                            <el-option label="是" value="1" />
                            <el-option label="否" value="0" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="updateCarFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit2">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch, onMounted, ref, reactive } from 'vue';
import { anim } from '../../../stores/modules/animator';
import { addCar,deleteCar,updatedUserCar } from '../../../api/user'
import {useUserCarStore} from '../../../stores/modules/car'
import { useUserStore } from '../../../stores/modules/user'
import { ElMessage } from 'element-plus'
import { Close,Edit } from '@element-plus/icons-vue'
import { de } from 'element-plus/es/locale/index.mjs';

const animator = anim();
const userStore = useUserStore()
const userCarStore = useUserCarStore()

const userId = {
    userId: userStore.getUserInfo().id
}

const carInfo = reactive([])
onMounted(() => {
    getCarInfo()
})

const getCarInfo = async () => {
    await userCarStore.getAllCar(userId);
    // 清除原先carInfo
    carInfo.splice(0, carInfo.length);
    carInfo.push(...userCarStore.carInfo);
    console.log(carInfo);
};

watch(() => animator.animations.isCollapse,
    //如果为true，则为currCar移除hide类，否则添加hide类
    () => {
        const currCar = document.querySelector('.carInfo')
        if (animator.animations.isCollapse) {
            currCar.classList.remove('hide')
        } else {
            currCar.classList.add('hide')
        }
    }
)

//#region 添加车辆
const addCarFormVisible = ref(false)

const form1 = ref<import('element-plus').FormInstance>()

type AddForm = {
    carPlate: string
    carLength: number
    carHeight: number
    color: string
    isRenewable: number
}

type AddRules = {
    [key in keyof AddForm]?: Array<import('element-plus').FormItemRule>
}

const formLabelWidth = ref('150px')

const formData1 = reactive<AddForm>({
    carPlate: '',
    carLength: 0,
    carHeight: 0,
    color: '',
    isRenewable: 0,
})

const rules1 = reactive<AddRules>({
    carPlate: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
    carLength: [{ required: true, message: '请输入车长', trigger: 'blur' }],
    carHeight: [{ required: true, message: '请输入车高', trigger: 'blur' }],
    color: [{ required: true, message: '请输入颜色', trigger: 'blur' }],
    isRenewable: [{ required: true, message: '请选择是否为新能源', trigger: 'blur' }]
})

const addCars =async () => {
    const data = {
        userId: userStore.getUserInfo().id,
        carPlate: formData1.carPlate,
        carLength: formData1.carLength,
        carHeight: formData1.carHeight,
        color: formData1.color,
        isRenewable: formData1.isRenewable,
        avatar: userStore.getUserInfo().avatar,
    }
    await addCar(data)
    addCarFormVisible.value = false
    getCarInfo()
}

const onSubmit1 = () => {
    form1.value?.validate((valid: boolean) => {
        if (valid) {
            addCars()
        } else {
            ElMessage.error('请输入正确的信息')
        }
    })
}

//#endregion

//#region 删除车辆
const deleteVisible = ref(false)
const deleteForm = {
    userId: userStore.getUserInfo().id,
    id: ''
}

const showDelete = (value:any) => {
    deleteVisible.value = true
    deleteForm.id = value.id
}

const deleteCars =async (value) => {
    await deleteCar(deleteForm)
    deleteVisible.value = false
    getCarInfo()
}
//#endregion

//#region 修改车辆信息
const updateCarFormVisible = ref(false)

const carId = ref(0)

const updatedCars =async (value) => {
    updateCarFormVisible.value = true
    formData1.carPlate = value.carPlate
    formData1.carLength = value.carLength
    formData1.carHeight = value.carHeight
    formData1.color = value.color
    formData1.isRenewable = value.isRenewable
    carId.value = value.id
}

const onSubmit2 = () => {
    form1.value?.validate((valid: boolean) => {
        if (valid) {
            const data = {
                id: carId.value,
                carPlate: formData1.carPlate,
                carLength: formData1.carLength,
                carHeight: formData1.carHeight,
                color: formData1.color,
                isRenewable: formData1.isRenewable,
                avatar: '/images/car.jpg',
            }
            updatedUserCar(data)
            updateCarFormVisible.value = false
            getCarInfo()
        } else {
            ElMessage.error('请输入正确的信息')
        }
    })
}

//#endregion
</script>
<style scoped lang="less">
.carInfo {
    height: 100%;
    width: 410px;
    margin-left: 5px;
}

.box-card {
    height: 98vh;
    width: 100%;
    margin-top: 5px;
    margin-left: 5px;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        width: 100%;

        span {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0px;
            line-height: 24px;
            color: rgba(9, 0, 0, 1);
            text-align: left;
            vertical-align: top;
        }
    }

    .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        .box-card2 {
            width: 100%;
            height: 200px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 17px 36px rgba(23, 57, 222, 0.25);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            margin-bottom: 10px;
            position: relative;

            img {
                width: 100px;
                height: 100px;
                border-radius: 5%;
                margin-bottom: 10px;
                position: relative;
                left: 30%;
                object-fit: cover;
            }

            .close {
                position: absolute;
                font-size: 20px;
                top: 5px;
                right: 5px;
                margin-right: 10px;
                margin-top: 10px;
                cursor: pointer;
                border-radius: 50%;
                opacity: 1;
            }

            .close:hover {
                color: #FF0000;
                border: 1px solid #ff000077;
                opacity: 1;
                scale: 1.2;
            }

            .edit {
                position: absolute;
                font-size: 20px;
                top: 45px;
                right: 5px;
                margin-right: 10px;
                margin-top: 10px;
                cursor: pointer;
                border-radius: 50%;
                opacity: 1;
            }

            .edit:hover {
                scale: 1.2;
                color:#409eff;
            }

            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                span {
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: 0px;
                    line-height: 24px;
                    color: rgba(9, 0, 0, 1);
                    text-align: left;
                    vertical-align: top;
                }

                .info {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    width: 100%;
                    margin-top: 10px;

                    span {
                        font-size: 14px;
                        font-weight: 500;
                        letter-spacing: 0px;
                        line-height: 24px;
                        color: rgba(9, 0, 0, 1);
                        text-align: left;
                        vertical-align: top;
                    }

                }
            }
        }
    }
}


.hide {
    width: 310px;
    transition: all 0.5s;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>