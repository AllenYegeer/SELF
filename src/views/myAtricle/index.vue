<template>
  <div class="userAtricle" v-if="visible === true">
    <div class="common-layout" style="background: #f6f6f6" 
    v-for="(item,index) in myArticle.posts" :key="item.articleid">
      <!-- <el-header style="background:#FFFFFF;" >Header</el-header> -->
      <el-container v-if="index  == idx">
        <!--  <el-aside width="20%" style="background:#FFFFFF;">Aside</el-aside> -->
        <div>
          <el-main style="margin:20px 30px; width: 95vw; background: #ffffff">
            <div style="min-height: 500px">
              <h3>{{item.head}}</h3>
              <el-divider /><!--这里是分割线-->
              <div>
                <el-descriptions title="封面：" column="1">
                  <el-descriptions-item class="img">
                    <div class="demo-image">
                      <div class="block">
                        <span class="demonstration"></span>
                        <el-image
                          style="width: 120px; height: 80px"
                          :src="item.cover"
                          fit="contain"
                        />
                      </div>
                    </div>
                  </el-descriptions-item>
  
                  <el-descriptions-item label="文章简介:" label-align="left">
                      <p>
                        {{item.summary}}
                      </p>
                  </el-descriptions-item>
  
                  <el-descriptions-item label="">
                    <span style="padding-right: 5px">
                      <el-tag size="small">{{item.releasetime.slice(0,10)}}</el-tag>
                    </span>

                    <span style="padding-left: 5px;margin-left:10px;margin-top:10px">
                      <el-tag size="small">
                        <i class="iconfont icon-dianzan_kuai" style="font-size:15px;"></i>
                        {{item.likeNub}}
                      </el-tag>
                    </span>
                  </el-descriptions-item>
                </el-descriptions>
                <el-divider style="margin: 0" />
              </div>
              {{item.txt}}
            </div>
          </el-main> 
        </div>
      </el-container>
    </div>
    <Pageination :total="myArticle.total" @changePage="changePage"></Pageination>
  </div>
  <empty style="margin:100px 500px" v-else></empty>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import empty from '@/components/empty/index.vue'
import { getUserAtricle_ } from "@/utils/user/getUserAtricle";
import Pageination from '@/components/Pageination/index.vue' //分页
const myArticle = ref(
    {
      total:0,
      posts:[], 
    }
)

const idx = ref(0)
const visible = ref(false)
const changePage = (num) => { //点击页码切换
  idx.value = num - 1
}
onBeforeMount(async () => {
    const userId = sessionStorage.getItem('userId')
    const myArticles = await getUserAtricle_(userId)

    myArticle.value.posts = myArticles.data
    myArticle.value.total = myArticles.data.length
    if (myArticle.value.total != 0){
        visible.value = true;
    }
})

</script>

<style scoped>
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