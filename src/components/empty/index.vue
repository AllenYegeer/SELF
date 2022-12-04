<template>
  <el-empty :image-size="200" />
</template>
<script setup>
import { onBeforeMount } from "@vue/runtime-core";

onBeforeMount(() => {
  console.log(1);
})
</script> 
<style  scoped>

</style>