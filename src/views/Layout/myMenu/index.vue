<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    router
    text-color="#409EFF"
  >
      <el-menu-item index="#" @click="changeActive_">
        <i class="iconfont icon-gerenziliao"></i>
        <span>个人资料</span>
      </el-menu-item>

      <el-menu-item index="/homePage/myArticle" @click="changeActive_">
        <i class="iconfont icon-chuangzuo"></i>
        <template #title>我的创作</template>
      </el-menu-item>

      <el-menu-item index="" @click="changeActive_">
        <i class="iconfont icon-shoucang"></i>
        <span>我的收藏</span>
      </el-menu-item>

      <el-menu-item index="" @click="changeActive_">
        <i class="iconfont icon-dianzan_kuai"></i>
        <template #title>我的点赞</template>
      </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const emit = defineEmits(['changeActive'])
const isCollapse = ref(false);
/* const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}; */

const changeActive_ = () => {
  emit('changeActive',-1)
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 500px;
}
</style>>
