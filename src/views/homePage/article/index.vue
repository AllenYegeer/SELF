<template>
  <div
    class="common-layout"
    style="background: #f6f6f6; overflow: auto"
    v-infinite-scroll="load"
    v-for="item in article.posts"
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
                <el-dropdown>
                  <span>
                     <img class="img" :src="item.user.headportait" alt="" />
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <div>作者简介</div>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

              <span style="padding-right: 5px;margin-left: 30px;">
                <el-tag size="small">{{
                  item.releasetime.slice(0, 10)
                }}</el-tag>
              </span>

              <span
                style="padding-left: 5px; margin-left: 30px; margin-top: 10px"
              >
                <el-tag size="small">
                  <i
                    class="iconfont icon-dianzan_kuai"
                    style="font-size: 15px"
                  ></i>
                  {{ item.likeNub }}
                </el-tag>
              </span>
            </el-descriptions-item>
          </el-descriptions>

          <el-divider style="margin: 0" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import { getPost_ } from "@/utils/getPosts";
const article = ref({
  posts: [],
});

const count = ref(2);
const load = () => {
  count.value++;
  /* getPost_(1,count.value,'学习',article)  */
};
onBeforeMount(async () => {
 getposts();

});

const getposts = async () => {
    const data = await getPost_(1, count.value, "学习", article);
    article.value.posts = data.records
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
