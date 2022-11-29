<template>
  <div @click="refreshCode">
    <Identify :identifyCode="identifyCode" />
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Identify  from '@/components/Identify/index.vue';
let identifyCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let identifyCode = ref()
 
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
 
const makeCode = (o, l) => {
    for (let i = 0; i < l; i++) {
        identifyCode.value += o[
            randomNum(0, o.length)
        ];
    }
}
 
const refreshCode = () => {
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
}
 
onMounted(() => {
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
})
</script>

<style>

</style>