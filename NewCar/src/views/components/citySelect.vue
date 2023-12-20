<template>
    <div class="city">
        <el-cascader placeholder="省 / 市 / 县" v-model="value" ref="cascaderAddr" :options="options" :props="cityProps" @change="handleChange" />
    </div>
</template>

<script setup lang='ts'>
import cityData from '../../assets/json/pca-code.json'
import { ref, unref } from 'vue'

const emit = defineEmits(['change'])
const value = ref('')

const cascaderAddr = ref()

const handleChange = () => {
    let addrNode = unref(cascaderAddr).getCheckedNodes()[0].pathLabels
    //将数组转换为字符串
    addrNode = addrNode.join('')
    emit('change', addrNode)
}

const options = cityData

const cityProps: any = {
    value: 'code',
    label: 'name',
    children: 'children',
}



</script>
<style scoped>
.city{
    margin-bottom: 5px;
    width: 350px;
}
</style>