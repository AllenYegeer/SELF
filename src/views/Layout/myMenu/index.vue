<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    router
    text-color="#409EFF"
  >
      <el-menu-item index='/homePage/userInfo'
      :route="{name:'homePage_userInfo',query:{userId:userId}}"
      @click="changeActive_">
        <i class="iconfont icon-gerenziliao"></i>
        <span>个人资料</span>
      </el-menu-item>

      <el-menu-item index="" @click="changeActive_();toArticlePage()">
        <i class="iconfont icon-chuangzuo"></i>
        <span>我的创作</span>
      </el-menu-item>
      <el-menu-item index="" @click="changeActive_">
        <i class="iconfont icon-shoucang"></i>
        <span>我的收藏</span>
      </el-menu-item>

      <el-menu-item index="" @click="changeActive_" style="border-bottom:2px solid #E3E5E7">
        <i class="iconfont icon-dianzan_kuai"></i>
        <span>我的点赞</span>
      </el-menu-item>

      <el-menu-item  index='/home' @click="loginOut" >
        <i class="iconfont icon-dingbudaohang-zhangh"></i>
        <span>退出登陆</span>
      </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import router from "../../../router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const emit = defineEmits(['changeActive'])
const userId = sessionStorage.getItem('userId')
const isCollapse = ref(false);

const changeActive_ = async () => {  //改变header下底
  emit('changeActive',-1)
}

const toArticlePage = async () => {   //点击去文章界面
  router.push(`/homePage/myArticle/${userId}`)
}

const loginOut = () => {   //退出登录
    sessionStorage.clear()  //清空
    router.push('/enterTOHome')
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
}

.iconfont {
  margin-right:8px
}
</style>>
