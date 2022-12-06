<template>
  <el-tag
    size="small"
    style="cursor: pointer"
    @click="like(articleid, index)"
  >
    <i
      class="iconfont icon-dianzan_kuai"
      style="font-size: 15px; transition: all 1s linear"
      :class="{
        active: userLikeInfo.indexOf(Number(articleid)) != -1,
      }"
    ></i>
    {{(likeNub_  != 0 ? likeNub_ : '')}}
  </el-tag>
</template>
<script setup>
import { success,error,warn } from '@/utils/popup/message';
import { like_ } from "@/utils/user/like";
import { ref } from '@vue/reactivity';
import store from '@/store';
import { onBeforeMount } from '@vue/runtime-core';
const props = defineProps(['articleid','likeNub'])
let likeNub_ = ref(props.likeNub)
const userId = sessionStorage.getItem('userId')
const userLikeInfo = ref(store.state.userLikeInfo)
const like = async (articleId, idx) => {
  //点赞功能
  if (userId) {
    const idx = userLikeInfo.value.indexOf(Number(articleId));
    if (idx == -1) {
      //点赞
      const res = await like_(userId, articleId, 1);
      if (res.code === "100") {
        success("点赞成功");
        likeNub_.value ++
        userLikeInfo.value.push(Number(articleId));
        store.commit('addUserLikeInfo',Number(articleId))
      } else {
        error(res.msg);
      }
    } else {
      //取消点赞
      const res = await like_(userId, articleId, -1);
      if (res.code === "100") {
        likeNub_.value --
        userLikeInfo.value.splice(idx, 1);
        store.commit('removeUserLikeInfo',Number(articleId))
      } else {
        error(res.msg);
      }
    }
  } else {
    error("请先登陆");
  }
};
</script>

<style scoped>
.active {
  color: #f0cc3e;
}
</style>