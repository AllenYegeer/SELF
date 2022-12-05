<template>
  <div class="hd">
    <div class="logo">
      <img src="@/assets/logo/logo.png" alt="" />
    </div>
    <div class="h-nav">
      <ul>
        <li @click="changeActive_(1)">
          <router-link
            :to="'/homePage/' + home"
            :class="{ active: isActive == 1 }"
            >首页</router-link
          >
        </li>
        <!--   <li @click="changeActive_(2)">
          <router-link to="#" :class="{ active: isActive == 2 }"
            >关注</router-link
          >
        </li> -->
        <li @click="changeActive_(3)">
          <router-link
            :to="'/homePage/' + learning"
            :class="{ active: isActive == 3 }"
            >学习</router-link
          >
        </li>
        <li @click="changeActive_(4)">
          <router-link
            :to="'/homePage/' + life"
            :class="{ active: isActive == 4 }"
            >生活</router-link
          >
        </li>
        <li @click="changeActive_(5)">
          <router-link
            :to="'/homePage/' + job"
            :class="{ active: isActive == 5 }"
            >求职</router-link
          >
        </li>
      </ul>
    </div>
    <div class="hd-search">
      <el-input
        v-model="searchVal"
        placeholder="搜索"
        class="input-with-select"
      >
        <template #append>
          <!-- <router-link :to="'/homePage/search/' + searchVal"> -->
            <el-button type="primary" :icon="Search" circle @click="search" />
          <!-- </router-link> -->
        </template>
      </el-input>
    </div>
    <!-- 投稿 -->
    <div class="article">
      <router-link to="/homePage/createArticle">
        <el-tooltip content="创作">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="changeActive_(0)"
          >
          </el-button>
        </el-tooltip>
      </router-link>
    </div>
    <!-- 个人中心 -->
    <div class="user">
      <!-- <el-dropdown style="width: 100%; height: 100%">
        <img :src="imgUrl" alt="" v-if="!visBeforLogin" />
        <span v-else class="login">登陆</span>
        <template #dropdown>
          <el-dropdown-menu
            style="width:100%">
            <beforeLogin v-if="visBeforLogin" @changeVisBeforLogin="changeVisBeforLogin"></beforeLogin>
          </el-dropdown-menu>
          <el-dropdown-menu
            style="width:100%">
            <afterLogin v-if="!visBeforLogin" @changeVisBeforLogin="changeVisBeforLogin" @changeActive="changeActive_"></afterLogin>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
      <profile @changeActive="changeActive_"></profile>
      <!-- 头像信息 -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { Edit, Search } from "@element-plus/icons-vue";
import profile from "@/components/profile/index.vue";
import { success, error, warn } from "../../../utils/popup/message";
import router from "../../../router";
const select = ref("");
const searchVal = ref("");
const props = defineProps(["isActive"]);
const emit = defineEmits(["changeActive"]);
const isActive = computed(() => props.isActive);
const home = ref("首页");
const learning = ref("学习");
const life = ref("生活");
const job = ref("求职");
const userId = sessionStorage.getItem("userId");
const changeActive_ = (num) => {
  emit("changeActive", num);
};

const search = () => {
  if (searchVal.value === ''){
    warn('搜索内容不可为空')
  }else{
    router.push(`/homePage/search/${ searchVal.value}`)
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
  width: 100%;
  background: #ffffff;
}

.hd .logo img {
  height: 50px;
  width: 120px;
  position: relative;
  top: 50%;
  margin-top: -25px;
}

/* @media screen and (max-width:992px){
  .hd .logo img{
    width: 150px;
  }
} */
@media screen and (max-width: 768px) {
  .h.hd .logo img {
    height: 50px;
    width: 80px;
  }
}

@media screen and (max-width: 590px) {
  .hd .logo img {
    width: 80px;
    height: 50px;
  }
}
@media screen and (max-width: 414px) {
  .hd .logo img {
    width: 50px;
    height: 40px;
    margin-top: -20px;
  }
}

/* .login {
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
} */
.active {
  border-bottom: 4px solid #056de8;
  color: #121212;
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
  padding: 0;
}

a:hover {
  color: #121212;
}

.h-nav ul {
  display: flex;
  justify-content: space-around;
}

.h-nav ul li {
  /* margin-right: 80px; */
  color: #8590a6;
  /* font-size: 16px; */
}

/*  .h-nav ul li:nth-child(1) {
        margin-left: 50px;
    } */

.hd-search {
  display: flex;
  height: 35px;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid #efefef;
  margin-top: 5px;
  box-shadow: 0 2px 1px rgb(0 0 0 / 10%);
  width: 225px;
}

@media screen and (max-width: 992px) {
  .hd-search {
    width: 150px;
  }
}

@media screen and (max-width: 768px) {
  .hd-search {
    width: 100px;
  }
}

@media screen and (max-width: 480px) {
  .hd-search {
    width: 80px;
  }
}

.hd .user {
  border-radius: 50%;
  width: 40px;
  height: 40px;

  position: relative;
  top: 50%;
  margin-top: -20px;
  margin-right: 5vw;
  /* margin-top:-20px; */
  /* margin-bottom:-25px; */
  /* margin: 4px 90px 0px 0px; */
  overflow: hidden;
  cursor: pointer;
}

.hd .article {
  display: inline-block;
  margin: 10px 0 15px 10px;
}
</style>
<style>
.hd-search div.el-input__wrapper {
  box-shadow: 0 0 0 #fff;
  padding: 1px 0 1px 11px;
}

.hd-search div.el-input-group__append {
  box-shadow: none;
  height: 35px;
  background-color: white;
}
</style>