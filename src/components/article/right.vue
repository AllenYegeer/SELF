<template>
  <div class="userAtricle" v-if="articles.length !== 0">
    <template 
    v-for="(item,index) in articles" :key="item.articleid">
          <el-card  v-if="index === idx"
            style="width:81vw"
          >
            <div style="min-height: auto">
              <div class="header">
                <h3>{{item.head}}</h3>
                <el-button type="primary" v-if="(diffence === 2)" @click="cancel(item.articleid,index)">取消收藏</el-button>
                
                <el-button type="primary" v-else @click="cancel(item.articleid,index)">取消点赞</el-button>
              </div>
              <el-divider /><!--这里是分割线-->
              <div>
                <el-descriptions  column="1">
                  <el-descriptions-item  label="封面:" class="img"  v-if="item.cover">
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

                  <el-descriptions-item label="文章内容:" label-align="left">
                    <p>
                       {{item.txt}}
                    </p>
                  </el-descriptions-item>
                </el-descriptions>
                 <el-divider style="margin: 0" />

                <div class="footer" style="margin-top:10px">
                    <span style="padding-right: 5px">
                      <el-tag size="small">{{item.releasetime.slice(0,10)}}</el-tag>
                    </span>

                    <span style="padding-left: 5px;margin-left:10px;margin-top:10px">
                      <el-tag size="small">
                        <i class="iconfont icon-dianzan_kuai" style="font-size:15px;"></i>
                        {{item.likeNub}}
                      </el-tag>
                    </span>
                  </div>              
              </div>
            </div>
          </el-card> 
    </template>
    <Pageination :total="props.articles.length" @changePage="changePage" :pageSize='1'></Pageination>
  </div>
  <empty style="margin:100px 500px;height:66.5vh" v-else></empty>
</template>

 <script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import empty from '@/components/empty/index.vue'
import Pageination from '@/components/Pageination/index.vue' //分页
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { like_ } from "@/utils/user/like";
import { collect_ } from "@/utils/user/collect";
import { like } from "../../request/tmp";
const props = defineProps(['articles','diffence'])
const emit = defineEmits(['changeIdx'])
const userId = sessionStorage.getItem('userId')
const idx = ref(0)
const changePage = (num) => { //点击页码切换
  idx.value = num - 1
  emit('changeIdx',idx.value)
}
const cancel = async (articId,idx) => {
  if (props.diffence === 1) {
    const res =  await like_(userId,articId,-1)
    if (res.code === '100'){
      props.articles.splice(idx,1)
    }
  }else{
    const res = await collect_(userId,articId,-1)
    if (res.code === '100'){
      props.articles.splice(idx,1)
    }
  }
}
</script> 

<style scoped>
.header{
  display: flex;
  justify-content: space-between;
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