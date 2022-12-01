<template>
    <div class="author">
      <!-- 头像 -->
      <img :src="headportait" alt="" style="margin:0 20px"/>
      <span class="username">{{username}}</span>
    </div>
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
     <div class="footer">
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          <span>关注他</span>
        </el-button>
        <el-button type="success" ><el-icon><Message /></el-icon><span></span>私信他</el-button>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import {getUserInfo_} from '@/utils/user/getUserInfo'
const props = defineProps(['username',
'attentNub',
'followNub',
'articleNub',
'headportait'])
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
}
.author{
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