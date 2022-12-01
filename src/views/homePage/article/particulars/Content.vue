<template>
    <el-card style="width:auto;margin:0 20px">
        <el-container>
            <el-container style="width: auto;border-right: 1px solid rgba(0, 0, 0, 0.1);">
                <el-main style="padding: 0 30px 10px;">
                    <div class="header">
                        <h1>{{articInfo.head}}</h1>
                        <div class="time">
                            <el-tag>{{articInfo.releasetime.slice(0,10)}}</el-tag>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="summary">
                        <h2>{{articInfo.summary}}</h2>
                    </div>
                    <div class="cover">
                        <el-image
                        v-if="articInfo.cover"
                        style="width: 120px; height: 120px"
                        :src="articInfo.cover"
                        fit="contain"
                  />
                    </div>
                    <div class="text">
                        <h4>{{articInfo.txt}}</h4>
                    </div>
                </el-main>
                <el-divider></el-divider>
                 <el-footer>
                    <div class="type">
                       <el-tag>{{articInfo.type}}</el-tag>
                    </div>
                     <div class="footer">
                                <!-- 点赞 -->
                                <span>
                                    <el-button type="primary" link><i class="iconfont icon-dianzan_kuai"></i></el-button>
                                    {{(articInfo.likeNub === null ? 0 : articInfo.likeNub)}}
                                </span>
                                <!-- 收藏 -->
                                <span>
                                    <el-button type="primary" link><i class="iconfont icon-shoucang"></i></el-button>
                                    {{11}}
                                </span>
                                <!-- 评论 -->
                                <span>
                                    <el-button type="primary" link><i class="iconfont icon-pinglun1"></i></el-button>
                                    {{articInfo.comments.length}}
                                </span>
                        </div>
                 </el-footer>
            </el-container>
            <el-aside style="width: auto;">
                <Aside style="margin-left: 10px;" 
                :username="articInfo.user.username"
                :headportai="articInfo.user.headportai"
                :attentNub="articInfo.user.attentNub"
                :followNub="articInfo.user.followNub"
                :articleNub="articInfo.user.articleNub"
                />
            </el-aside>
            
        </el-container>
    </el-card>
</template>

<script setup>
import Aside from './Aside.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { getArticleComments_ } from '@/utils/article/getArticleComments';
const props = defineProps(['articleId'])
const articInfo = ref(
  {
    head:'',
    summary:'',
    cover:'',
    releasetime:'',
    txt:'',
    type:'',
    likeNub:'',
    comments:'',
    user:{
        username:'',
        headportai:'',
        attentNub:'',
        followNub:'',
        articleNub:''
    }
  }
)

onBeforeMount(async () => {
    const {data:res} = await getArticleComments_(props.articleId)   
  articInfo.value.head = res.head
  articInfo.value.summary = res.summary
  articInfo.value.cover = res.cover
  articInfo.value.releasetime = res.releasetime
  articInfo.value.txt = res.txt
  articInfo.value.type = res.type
  articInfo.value.likeNub = res.likeNub
  articInfo.value.userId = res.user.userid
  articInfo.value.comments = res.comments
  articInfo.value.user.username = res.user.username
  articInfo.value.user.headportai = res.user.headportai
  articInfo.value.user.articleNub = res.user.articleNub
  articInfo.value.user.attentNub = res.user.attentNub
  articInfo.value.user.likeNub = res.user.likeNub
  articInfo.value.user.followNub = res.user.followNub
})
//点击评论 footer评论展示
const isVisible = ref('true')
function display() {
    isVisible.value = true
}

</script>

<style scoped>
.el-aside {
    padding: 20px 15px 0 0;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.opt {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 100px;
}

.footer {
    margin-top: 10px;
}
.footer > span {
    margin-right: 10px;
}
</style>