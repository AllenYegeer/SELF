<template>
  <el-tag size="small" style="cursor: pointer" @click="cllect(articleid)">
    <i
      class="iconfont icon-shoucang"
      style="font-size: 15px; transition: all 1s linear"
      :class="{
        active: userCollection.indexOf(Number(articleid)) != -1,
      }"
    ></i>
  </el-tag>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { collect_ } from "@/utils/user/collect";
import { success,error,warn } from '@/utils/popup/message';
import store from "@/store";
import { onBeforeMount } from "@vue/runtime-core";
const props = defineProps(['articleid','collectNum'])
const collectNum_ = ref(props.collectNum)
const userId = sessionStorage.getItem('userId')
const userCollection = ref([])
onBeforeMount(() => {
    userCollection.value = store.state.userCollectInfo
})
const cllect = async (articleId) => {
  //点击收藏
  if (userId) {
    const idx = userCollection.value.indexOf(Number(articleId));
    if (idx == -1) {
      //取消收藏
      const res = await collect_(userId,articleId, 1);
      if (res.code == "100") {
        success("收藏成功");
        collectNum_.value ++
        userCollection.value.push(Number(articleId));
        store.commit('addUserCollectInfo', Number(articleId))
      } else {
        error("收藏失败");
      }
    } else {
      //收藏
      const res = await collect_(userId, articleId, -1);
      collectNum_.value --
      userCollection.value.splice(idx, 1);
      store.commit('removeUserCollectInfo',Number(articleId))
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