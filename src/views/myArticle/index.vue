<template>
  <div class="userAtricle" v-if="myArticle.total != 0">
    <template 
    v-for="(item,index) in myArticle.posts" :key="item.articleid">
          <el-card style="margin:20px 30px;  background: #ffffff" v-if="index == idx">
            <div style="min-height: auto">
              <div class="header">
                <h3>{{item.head}}</h3>
                <el-button  
                v-if="otherUserId === userId"
                type="danger" 
                circle 
                @click="deleteArticle(index,item.articleid)">  <!-- 删除按钮 -->
                  <el-icon><DeleteFilled /></el-icon></el-button>
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
    <Pageination :total="myArticle.total" @changePage="changePage" :pageSize='1'></Pageination>
  </div>
  <empty style="margin:100px 500px" v-else></empty>
</template>

 <script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import empty from '@/components/empty/index.vue'
import { getUserAtricle_ } from "../../utils/user/getUserAtricle";
import Pageination from '@/components/Pageination/index.vue' //分页
import {deleteArticle_} from '../../utils/article/deleteArticle'
import { ElMessage, ElMessageBox } from 'element-plus'
import { success,error } from "../../utils/popup/message";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
const myArticle = ref(  //我的文章信息
    {
      total:0,
      posts:[], 
    }
)

const idx = ref(0)
const visible = ref(false)
const userId = ref()
const otherUserId = ref()
const changePage = (num) => { //点击页码切换
  idx.value = num - 1
}

const deleteArticle = (index,articId) => {  //删除文章
   ElMessageBox.confirm(
    '确认删除?',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const res = await deleteArticle_(articId)
      if (res.code === '100')
      {
        success('删除成功')
        myArticle.value.posts.splice(index,1)
        myArticle.value.total --
      }
      else error('删除失败')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

onBeforeRouteUpdate( async () => {  //刷新路由
    otherUserId.value = userId.value
    const myArticles = await getUserAtricle_(userId.value)  
    myArticle.value.posts = myArticles.data
    myArticle.value.total = myArticles.data.length
    if (myArticle.value.total != 0){
        visible.value = true;
    }
})
onBeforeMount(async () => {
    userId.value = sessionStorage.getItem('userId')  //当前登陆用户的id
    otherUserId.value = useRoute().params.id    //当前其他用户的id 
    const myArticles = await getUserAtricle_(otherUserId.value)  
    myArticle.value.posts = myArticles.data
    myArticle.value.total = myArticles.data.length
    if (myArticle.value.total != 0){
        visible.value = true;
    }
})
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