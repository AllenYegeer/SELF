<template>
     <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="val"
      status="success"
      style="width:50vw;
      margin:0 auto;
      transform: translateY(50vh);
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
       /*  if (val.value === 100){
            router.push('/home')
        } */
    },500)
</script>

<style scoped>
</style>