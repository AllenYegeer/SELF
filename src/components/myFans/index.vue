<template>
  <el-card>
    <div class="fanorfollow_box">
      <div
        class="fanorfollow"
        v-for="(item, index) in userFans"
        :key="item.userid"
      >
        <div class="fanorfollow_left">
          <img class="fanorfollow_img" :src="item.headportait" />
        </div>
        <div class="fanorfollow_info">
          <div class="fanorfollow_info_top">
            <span
              style="color: deepskyblue; max-width: 180px"
              @click="personal(item.id)"
              >{{ item.username }}</span
            >
          </div>
          <div class="fanorfollow_info_bottom">
            <img src="@/assets/logo/v.png" class="user-v-img" />
            <span class="user-v-font">优质媒体作者</span>
          </div>
        </div>
        <div class="fanorfollow_botton">
          <el-button type="primary" @click="toAttend(item.userid)"
          v-if="(store.state.userAttendInfo.indexOf(item.userid) === -1)"
            ><el-icon style="margin-right: 10px"><Plus /></el-icon
            >关注</el-button
          >
          <el-button v-else
          type="info"
          >
            <el-icon><Select /></el-icon>
              已关注
          </el-button>
          <el-button type="success"
            ><span style="margin-right: 10px"><i class="iconfont icon-sixin"></i></span>私信</el-button
          >
        </div>
      </div>
      <div>
        <el-empty
          v-if="userFans.length == 0"
          description="这里什么都没有哟"
        ></el-empty>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getUserFans_ } from "@/utils/user/getUserFans";
import { onMounted, ref } from "@vue/runtime-core";
import {attent_} from '@/utils/user/attent'
import store from "../../store";
const userFans = ref([]);
const userId = sessionStorage.getItem("userId");
const attentVis = ref(true)
const getUserFans = async () => {
  //得到用户的粉丝
  const { data: res } = await getUserFans_(userId);
  userFans.value = res;
};

const toAttend = async (id) => {
  attentVis.value = false
  const res =  await attent_(userId,1,id)
  store.commit('addUserAttendInfo',id)
}
onMounted(() => {
  getUserFans();
});
</script>

<style scoped>
.el-card {
  transform: translateX(200px);
}
img {
  cursor: pointer;
}
.user-v-img {
  height: 20px;
  width: 20px;
}
/* .fanorfollow_box :hover {
  border-width: 1px;
  border-color: deepskyblue;
} */
.fanorfollow {
  padding: 15px 40px 15px 30px;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb;
}
.fanorfollow :hover {
  border-width: 1px;
  border-color: deepskyblue;
}
.fanorfollow_left {
  width: 60px;
  height: 60px;
}
.fanorfollow_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}
.fanorfollow_info {
  display: inline-block;
  margin-left: 20px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: hidden;
}
.fanorfollow_info_top {
  display: inline-block;
  font-size: 10;
  line-height: 14px;
  vertical-align: top;
  cursor: pointer;
}
.fanorfollow_info_top :hover {
  color: deepskyblue;
}
.fanorfollow_info_bottom {
  line-height: 14px;
  color: #999;
  margin-top: 5px;
  cursor: pointer;
}
</style>