<template>
     <div class=" animation"></div>
     <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="val"
      status="success"
      style="width:50vw;
      margin:0 auto;
      transform: translateY(5vh);
      "
    />
</template>
<script setup>
import { ref } from "@vue/reactivity";
import router from "@/router";
    const val = ref(0)
    setInterval(() => {
        if (val.value < 100){
            val.value += 10
        }
        if (val.value === 100){
            window.location.replace('/home')
        }
    },500)
</script>

<style scoped>
body {
    background: #FFFFFF;
}
.animation {
            height: 350px;
            background-image: url('../../assets/img/2.png');
            margin: 50px auto;
            animation: run 1s step-end infinite;
        }
        @keyframes run {
            0% {
                background-position:-157px -20px;
                width: 250px;
            }
            25% {
                 background-position:-420px 0px;
                 width: 267px;
            }
            50% {
                background-position:-685px -20px;
                width: 220px;;
            }
            75% {
                background-position:-910px -20px;
                width: 250px;
            }
            100% {
                background-position: -1200px 0;
            }
        }
</style>