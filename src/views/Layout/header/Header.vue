<template>
  <div class="hd">
    <div class="logo">
      <img src="../../../assets/logo/logo.png" alt="" width="120" height="45" />
    </div>
    <div class="h-nav">
      <ul>
        <li @click="changeActive_(1)">
          <router-link to="/homePage" :class="{ active: isActive == 1 }"
            >首页</router-link
          >
        </li>
        <li @click="changeActive_(2)">
          <router-link to="#" :class="{ active: isActive == 2 }"
            >关注</router-link
          >
        </li>
        <li @click="changeActive_(3)">
          <router-link to="#" :class="{ active: isActive == 3 }"
            >学习</router-link
          >
        </li>
        <li @click="changeActive_(4)">
          <router-link to="#" :class="{ active: isActive == 4 }"
            >生活</router-link
          >
        </li>
        <li @click="changeActive_(5)">
          <router-link to="#" :class="{ active: isActive == 5 }"
            >离职</router-link
          >
        </li>
      </ul>
    </div>
    <div class="hd-search">
      <el-input v-model="search" placeholder="搜索" class="input-with-select">
        <template #append>
          <el-button :icon="Search" circle />
        </template>
      </el-input>
    </div>
    <!-- 投稿 -->
    <div class="article">
      <router-link to="/homePage/createArticle">
        <el-button type="primary" :icon="Edit" circle @click="changeActive_(0)">
        </el-button
      ></router-link>
    </div>
    <!-- 个人中心 -->
    <div class="user">
      <el-dropdown style="width: 100%; height: 100%">
        <img :src="imgUrl" alt="" v-if="!visBeforLogin" />
        <span v-else class="login">登陆</span>
        <template #dropdown>
          <el-dropdown-menu
            style="width:100%">
            <beforeLoin v-if="visBeforLogin" @changeVisBeforLogin="changeVisBeforLogin"></beforeLoin>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { Edit, Search } from "@element-plus/icons-vue";
import beforeLoin from '../../../components/login/beforeLogin.vue';
import afterLogin from '../../../components/login/afterLogin.vue'
const select = ref("");
const search = ref("");
const imgUrl = ref("");
const visBeforLogin = ref(true);
const props = defineProps(["isActive"]);
const emit = defineEmits(["changeActive"]);
const isActive = computed(() => props.isActive);
const changeActive_ = (num) => {
  emit("changeActive", num);
};
const changeVisBeforLogin = () => {
  visBeforLogin.value = !visBeforLogin.value;
  refresh()
};
onBeforeMount(() => {
  refresh()
})
const refresh = () => {
  const url = sessionStorage.getItem("userHeadPortraitUrl");
  if (url) {
    imgUrl.value = url;
    visBeforLogin.value = false
  }
}
</script>

<style scoped>
.hd {
  display: flex;
  border-bottom: 1px solid #f6f6f6;
  justify-content: space-around;
  font-size: 15px;
  height: 50px;
  background: #FFFFFF;
}
.login {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: #fff;
  background: #00aeec;
  text-align: center;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 36px;
  font-style: normal;
  font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei,
    sans-serif;
  font-weight: 700;
}
.active {
  border-bottom: 4px solid #056de8;
  color: #121212;
}
.user img {
  height: 100%;
  width: 100%;
}
.h-nav {
  margin-right: 50px;
}
ul a {
  color: #8590a6;
  text-align: center;
  display: inline-block;
  padding-bottom: 13px;
  font-weight: 600;
}
ul {
  width: 40vw;
}
a:hover {
  color: #121212;
}
.h-nav ul {
  display: flex;
  justify-content: space-around;
}

.h-nav ul li {
  margin-right: 80px;
  color: #8590a6;
}

/*  .h-nav ul li:nth-child(1) {
        margin-left: 50px;
    } */

.hd-search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 35px;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid #efefef;
  margin-top: 8px;
}
.user {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 4px 90px 0px 0px;
  overflow: hidden;
  cursor: pointer;
}

.hd .article {
  display: inline-block;
  margin: 10px 0 15px 10px;
}
</style>