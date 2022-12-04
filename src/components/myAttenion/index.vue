<template>
  <el-card>
    <div class="fanorfollow_box">
      <div
        class="fanorfollow"
        v-for="(item, index) in userAttentions"
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
          <el-button type="success">
            <span style="margin-right: 10px"><el-icon><ChatDotRound /></el-icon></span>私信
          </el-button>
          <el-button type="primary" v-if="(store.state.userAttendInfo.indexOf(item.userid) === -1)" @click="toAttend(item.userid)">
            <span style="margin-right: 10px"><el-icon><Plus /></el-icon></span>关注
          </el-button>
          <el-button type="info" v-else @click="cancelAttend(item.userid)">
            <span style="margin-right: 10px"><el-icon><Close /></el-icon></span>取消关注
          </el-button>
        </div>
      </div>
      <div>
        <el-empty
          v-if="userAttentions.length == 0"
          description="这里什么都没有哟"
        ></el-empty>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getUserAttention_ } from "@/utils/user/getUseAttenion";
import { onMounted, ref } from "@vue/runtime-core";
import {attent_} from '@/utils/user/attent' 
import store from "../../store";
const userAttentions = ref([]);
const userId = sessionStorage.getItem("userId");
const attentVis = ref(false)
const getUserFans = async () => {//得到用户的粉丝
  const { data: res } = await getUserAttention_(userId);
  userAttentions.value = res
};

const toAttend = async (id) => {   //点击关注
  attentVis.value = false
  const res = await attent_(userId,1,id)
  store.commit('addUserAttendInfo',id)
}

const cancelAttend = async (id) => {  //取消关注
  attentVis.value = true
  const res = await attent_(userId,-1,id)
  store.commit('removeUsedAttendInfo',id)
}
onMounted(() => {
    getUserFans()
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
/* .fanorfollow_info_bottom :hover {
  color: deepskyblue;
} */
</style>