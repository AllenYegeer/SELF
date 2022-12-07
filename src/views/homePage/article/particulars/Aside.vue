<template>
  <router-link :to="`/homePage/userInfo/${userId}`">
    <div class="author">
      <!-- 头像 -->
      <img :src="headportait" alt="" style="margin: 0 20px" />
      <span class="username">{{ username }}</span>
    </div>
  </router-link>
  <div class="nav">
    <div class="user_num">
      <div @click="f" style="border-left: 1px solid #999">
        <div class="num_number">{{ followNub_ }}</div>
        <span class="num_text">粉丝</span>
      </div>
      <div @click="f">
        <div class="num_number">{{ attentNub }}</div>
        <span class="num_text">关注</span>
      </div>
      <div>
        <router-link :to="`/homePage/Articles/${userId}`">
          <div class="num_number">{{ articleNub }}</div>
          <span class="num_text">作品</span>
        </router-link>
      </div>
    </div>
  </div>
  <div class="footer" v-if="(Number(userId_) !== Number(props.userId))">
    <el-button type="primary" v-if="attentVis" @click="Attend">
      <el-icon><Plus /></el-icon>
      <span>关注他</span>
    </el-button>
    <el-button v-else type="info" style="color: #ffffff" @click="cancelAttend"
      ><el-icon><Select /></el-icon>已关注</el-button
    >
    <el-button type="success"
      ><el-icon><Message /></el-icon><span></span>私信他</el-button
    >
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import { getUserInfo_ } from "@/utils/user/getUserInfo";
import { attent_ } from "@/utils/user/attent";
import store from "@/store";
import { error } from "../../../../utils/popup/message";
let userId_ = sessionStorage.getItem("userId");
const attentVis = ref();
const props = defineProps([
  "username",
  "attentNub",
  "followNub",
  "articleNub",
  "headportait",
  "userId",
]);
const followNub_ = ref();
onBeforeMount(() => {
  setTimeout(() => {
    attentVis.value = store.state.userAttendInfo.indexOf(props.userId) === -1 ? true : false;
    followNub_.value = props.followNub;
  }, 500);
});
const Attend = async () => {
  //点击关注
  if (userId_) {
    attentVis.value = false;
    const res = await attent_(userId_, 1, props.userId);
    followNub_.value++;
    store.commit("addUserAttendInfo", props.userId);
  } else {
    error("请先登录");
  }
};

const cancelAttend = async () => {
  //取消关注
  attentVis.value = true;
  const res = await attent_(userId_, -1, props.userId);
  followNub_.value--;
  store.commit("removeUsedAttendInfo", props.userId);
};
</script>

<style scoped>
.username {
  font-weight: bold;
  font-size: 15px;
  color: #00c3ff;
}
.author img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  cursor: pointer;
}
.author {
  margin-bottom: 30px;
}
.user_num {
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px solid #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
  cursor: pointer;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}

.footer {
  margin: 20px 20px;
}
</style>