<template>
    <div class="car">
        <div class="image"></div>
        <div class="line"></div>
        <span class="text1">Car</span>
        <div class="carLogo">

        </div>
        <span class="text2">Platoon</span>
    </div>
</template>

<style scoped lang="less">
.car {
    position: relative;
    width: 121px;
    height: 27px;;

    .image {
        position: absolute;
        width: 121px;
        height: 27px;
        background: url("./carLogo.png");
        background-size: contain;
        background-repeat: no-repeat;
        top:-0.5px;
        left:-2px
    }

    .line {
        position: absolute;
        bottom: 0px;
        width: 108px;
        height: 2px;
        border-radius: 10px;
        background: rgba(48, 107, 249, 1);
        left: 7px;
    }

    .text1 {
        position: absolute;
        width: 27px;
        height: 24px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 24px;
        color: #fff;
        text-align: left;
        vertical-align: top;
        left:17px;
    }

    .carLogo {
        
        width: 52px;
        height: 27px;
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
     }

    .text2 {
        position: absolute;
        width: 60px;
        height: 24px;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 24px;
        color: rgba(33, 96, 249, 1);
        text-align: left;
        vertical-align: top;
    }
}
</style>