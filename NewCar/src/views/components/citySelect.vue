<template>
    <div class="city">
        <el-cascader placeholder="省 / 市 / 县" v-model="value" ref="cascaderAddr" :options="options" :props="cityProps" @change="handleChange" />
    </div>
</template>

<script setup lang='ts'>
import cityData from '../../assets/json/pca-code.json'
import { ref, unref } from 'vue'

const value = ref('')

const cascaderAddr = ref()

const handleChange = () => {
    let addrNode = unref(cascaderAddr).getCheckedNodes()[0].pathLabels
    console.log(addrNode)
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