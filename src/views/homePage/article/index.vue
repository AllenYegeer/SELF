<template>
  <div
    class="common-layout"
    style="background: #f6f6f6; overflow: auto"
    v-infinite-scroll="load"
    v-for="(item,index) in article.posts"
    :key="item.articleid"
  >
    <el-container>
      <el-main style="margin: 20px; width: 60vw; background: #ffffff">
        <div style="min-height: 280px">
          <router-link to="#"
            ><h3>{{ item.head }}</h3></router-link
          >
          <el-divider /><!--这里是分割线-->
          <el-descriptions title="" column="1">
            <el-descriptions-item class="img" v-if="item.cover">
              <div class="demo-image">
                <div class="block">
                  <router-link to="#">
                    <el-image
                      style="width: 120px; height: 120px"
                      :src="item.cover"
                      fit="contain"
                    />
                  </router-link>
                </div>
              </div>
            </el-descriptions-item>

            <el-descriptions-item label="" label-align="left" class="nav">
              <router-link to="#">
                <p>
                  {{ item.summary }}
                </p>
              </router-link>
            </el-descriptions-item>

            <el-descriptions-item label="" class="footer">
              <span style="padding-right: 5px">
                <el-tag size="small">{{
                  item.releasetime.slice(0, 10)
                }}</el-tag>
              </span>

              <span
                style="padding-left: 5px; margin-left: 10px; margin-top: 10px"
              >
                <el-tag size="small">
                  <i
                    class="iconfont icon-dianzan_kuai"
                    style="font-size: 15px"
                  ></i>
                  {{ item.likeNub }}
                </el-tag>
              </span>
              <el-dropdown>
                <span style="margin-left:20px">
                  <img class="img" :src="item.user.headportait" alt="" @mouseenter="showInfo(item.user.userid,index)"/>
                </span>
                <template #dropdown>
                  <el-dropdown-menu style="width:285px">
                    <introuction  ref="child"></introuction>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-descriptions-item>
          </el-descriptions>

          <el-divider style="margin: 0" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onBeforeMount } from "@vue/runtime-core";
import { getPost_ } from "@/utils/user/getPosts";
import introuction from "../../../components/introduction/index.vue";
const article = ref({
  posts: [],
});

const count = ref(2);
const child = ref()  //子组件
const load = () => {
  count.value++;
  /* getPost_(1,count.value,'学习',article)  */
};
onBeforeMount(async () => {
  getposts();   
});
const getposts = async () => {  //得到帖子
  const data = await getPost_(1, count.value, "学习", article);
  article.value.posts = data.records; 
}; 
const showInfo = (id,idx) => {   //悬停用户头像显示用户的简介信息
  child.value[idx].getInfo(id)  //因为有多个子组件,idx用区分每个子组件的事件

}
</script>

<style scoped>
a {
  color: #646464;
}
a:hover {
  color: #175199;
}

.img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}
.demo-image .block {
  text-align: left;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
}
</style>
