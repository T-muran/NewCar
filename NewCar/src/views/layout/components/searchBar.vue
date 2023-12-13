<template>
    <div class="search">
        <el-input :placeholder="info" v-model="inputValue" class="search-input" />
        <el-button @click="click" type="primary" class="search-button">搜索</el-button>
    </div>
</template>

<script setup lang='ts'>
import { ref,toRefs } from 'vue'

const props = defineProps({
    info: {
        type: String,
        default: ''
    }
})

const {info} = toRefs(props)

const inputValue = ref('')

const emit = defineEmits(['search'])
const click = () => {
    emit('search', inputValue.value)
}

defineExpose({inputValue})

</script>
<style scoped>
.search {
    width: 100%;
    background-color: #fff;
    height: 50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .search-input {
        width: 80%;
    }
}
</style>