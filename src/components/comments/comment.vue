<template>
  <el-tag
    size="small"
    style="cursor: pointer"
    @click="showComments(index, item.articleid)"
  >
    <i class="iconfont icon-pinglun1" style="font-size: 15px"></i>
    <!--   {{ commentVisible === index ? comments.length : 0}} -->
  </el-tag>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { getArticleComments_ } from "@/utils/article/getArticleComments";
import { error, success } from "@/utils/popup/message";
const comments = ref([]); //文章的评论
const commentVisible = ref(); //评论窗口的可见性
const userId = sessionStorage.getItem("userId");
const conmmentIndex = ref(0)
const addComment = (val) => {   //发表评论
  comments.value.unshift(val)
}
const changeCommentIndex = (page) => {   //改变评论分页的下标
  conmmentIndex.value = (page - 1) * 6
}
const showComments = (idx, id) => {
  //展示评论
  if (userId) {
    commentVisible.value = idx;
    if(idx != -1)
    getArticleComments(id);
  } else {
    error("请先登陆");
  }
};
const getArticleComments = async (id) => {
  //得到文章的评论
  const { data: res } = await getArticleComments_(id);
  comments.value = res.comments;
};
</script>

<style scoped>
</style>