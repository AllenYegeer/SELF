<template>
  <el-card style="width:auto">
    <template #header>
      <div class="header">
        <span>关于作者</span>
      </div>
    </template>

    <div class="mid">
      <div class="img">
        <img
          style="width: 60px; height: 60px"
          :src="url"
          alt=""
        />
      </div>
      <div class="user_name">
        <span>{{uesrname}}</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="nav">
      <div class="user_num">
        <div @click="f" style="border-left: 1px solid #999">
          <div class="num_number">{{followNub}}</div>
          <span class="num_text">粉丝</span>
        </div>
        <div @click="f">
          <div class="num_number">{{attentNub}}</div>
          <span class="num_text">关注</span>
        </div>
        <div>
          <div class="num_number">{{articleNub}}</div>
          <span class="num_text">作品</span>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="footer">
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          <span>关注他</span>
        </el-button>
        <el-button type="success"><el-icon><Message/></el-icon><span></span>私信他</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed, onBeforeMount, watch } from "@vue/runtime-core";
import { getUserInfo } from "@/request/tmp";
const props = defineProps(['article'])
const info = ref()
const uesrname = ref()
const url = ref()
const followNub = ref()
const attentNub = ref()
const articleNub = ref()
onBeforeMount(() => {
  refsh()
})
const refsh =  () => {
  setTimeout(() => {
  uesrname.value = props.article.user.username
  url.value = props.article.user.headportait
  followNub.value = props.article.user.followNub
  attentNub.value = props.article.user.attentNub
  articleNub.value = props.article.user.articleNub
},1000);
}
defineExpose({   //抛出方法，让父亲调用
	refsh
})
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
    text-align: center;
}
</style>