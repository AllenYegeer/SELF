<template>
   <div class="homePage">
    <Header :isActive="isActive" @changeActive="changeActive" style="position:sticky; top:0;z-index: 1;"/>
    <div class="right">
        <div><router-view></router-view></div>
    </div>
   </div>
</template>

<script setup>
import  MyMenu from './myMenu/index.vue'
import Header from './header/Header.vue'
import { ref } from '@vue/reactivity'
const isActive = ref(1)
const changeActive = (num) => {
    isActive.value = num;
}

</script>

<style scoped>
    .homePage{
        position: relative;
    }
</style>