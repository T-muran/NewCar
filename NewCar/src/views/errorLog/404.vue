<template>
    <el-result icon="warning" title="404" sub-title="页面没了">
        <template #extra>
            <el-button type="primary" @click="$event=>$router.push('/login')">返回首页</el-button>
        </template>
    </el-result>
</template>

<script setup lang='ts'>

</script>
<style scoped>
.error {
    width: 400px;
    height: 400px;
    background-color: #ff0;
}
</style>