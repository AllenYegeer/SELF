<template>
  <el-card style="width: auto">
    <template #header>
      <div class="header">
        <span>关于作者</span>
      </div>
    </template>

    <div class="mid">
      <router-link :to="`/homePage/userInfo/${nowUserId}`">
        <div class="img">
          <img
            style="width: 60px; height: 60px; cursor: pointer"
            :src="url"
            alt=""
          />
        </div>
      </router-link>
      <div class="user_name">
        <span>{{ uesrname }}</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="nav">
      <div class="user_num">
        <div @click="f" style="border-left: 1px solid #999">
          <div class="num_number">{{ followNub }}</div>
          <span class="num_text">粉丝</span>
        </div>
        <div @click="f">
          <div class="num_number">{{ attentNub }}</div>
          <span class="num_text">关注</span>
        </div>
        <div>
          <router-link :to="`/homePage/Articles/${nowUserId}`">
            <div class="num_number">{{ articleNub }}</div>
            <span class="num_text">作品</span>
          </router-link>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="footer" v-if="(Number(userId) !== Number(nowUserId))">
      <el-button type="primary" @click="Attend" v-if="attentVis">
        <el-icon><Plus /></el-icon>
        <span>关注他</span>
      </el-button>
      <el-button type="info" @click="cancelAttend" v-else>
        <el-icon><Select /></el-icon>
        <span>已关注</span>
      </el-button>
      <el-button type="success"
        ><el-icon><Message /></el-icon><span></span>私信他</el-button
      >
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onBeforeMount, watch } from "@vue/runtime-core";
import { getUserInfo } from "@/request/tmp";
import store from "@/store";
import { attent_ } from "@/utils/user/attent";
import { error } from "../../utils/popup/message";
const props = defineProps(["article"]);
const info = ref();
const uesrname = ref();
const url = ref();
const followNub = ref();
const attentNub = ref();
const articleNub = ref();
const userId = sessionStorage.getItem("userId");
const nowUserId = ref();
const attentVis = ref();
onBeforeMount(() => {
  refsh();
});
const Attend = async () => {
  //点击关注
  if (userId) {
    attentVis.value = false;
    followNub.value++;
    const res = await attent_(userId, 1, nowUserId.value);
    store.commit("addUserAttendInfo", nowUserId.value);
  } else {
    error("请先登录");
  }
};

const cancelAttend = async () => {
  //取消关注
  attentVis.value = true;
  followNub.value--;
  const res = await attent_(userId, -1, nowUserId.value);
  store.commit("removeUsedAttendInfo", nowUserId.value);
};
const refsh = () => {
  setTimeout(() => {
    uesrname.value = props.article.user.username;
    url.value = props.article.user.headportait;
    followNub.value = props.article.user.followNub;
    attentNub.value = props.article.user.attentNub;
    articleNub.value = props.article.user.articleNub;
    nowUserId.value = props.article.user.userid;
    attentVis.value =
      store.state.userAttendInfo.indexOf(nowUserId.value) === -1 ? true : false;
  }, 1000);
};
defineExpose({
  //抛出方法，让父亲调用
  refsh,
});
</script>

<style scoped>
.header {
  color: rgb(18, 18, 18);
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mid {
  display: flex;
}
.user_name {
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-decoration-color: rgb(18, 18, 18);
  color: #00c3ff;
  text-decoration-style: solid;
  white-space: nowrap;
  cursor: pointer;
  text-decoration-thickness: auto;
  margin-left: 10px;
  margin-top: 10px;
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
  width: 60px;
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

.footer > .el-button {
  width: 6vw;
  text-align: center;
}
</style>