<template>
    <div class="login">
        <div class="background">
            <div class="picture"></div>
            <div class="container">
                <Login />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Login from './components/login.vue'

</script>

<style scoped lang="less">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../../assets/login/login2.jpg");
        background-size: cover;
        display: flex;

        .picture {
            height: 100%;
            width: 50%;
            background: url("../../assets/login/login.png");
            background-size: cover;
        }
        
        .container {
            height: 100%;
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;            
        }
    }
}
</style>