<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main class="p_main" style="padding: 20px 0 120px 0;">
        <Content />
      </el-main>
    </el-container>
  </div>
</template>
  
<script setup>
import Header from './Header.vue'
import Content from './Content.vue'
import { ref,reactive } from 'vue'

</script>
  
<style>
.el-header{
    margin: 0 auto;
}
.p_main {
    border-top: 1px solid gray;
}


</style>
  