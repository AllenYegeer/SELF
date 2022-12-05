<template>
  <el-card style="width: auto; margin: 0 20px">
    <el-container>
      <el-container
        style="width: auto; border-right: 1px solid rgba(0, 0, 0, 0.1)"
      >
        <el-main style="padding: 0 30px 10px">
          <div class="header">
            <h1>{{ articInfo.head }}</h1>
            <div class="time">
              <el-tag>{{ articInfo.releasetime.slice(0, 10) }}</el-tag>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="summary">
            <h2>{{ articInfo.summary }}</h2>
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
            <h4>{{ articInfo.txt }}</h4>
          </div>
        </el-main>
        <el-divider></el-divider>
        <el-footer>
          <div class="type">
            <el-tag>{{ articInfo.type }}</el-tag>
          </div>
          <div class="footer">
            <!-- 点赞 -->
            <span>
              <!-- <el-button type="primary" link><i class="iconfont icon-dianzan_kuai"></i></el-button>
                                    {{(articInfo.likeNub === null ? 0 : articInfo.likeNub)}} -->
              <likePage
                :articleid="props.articleId"
                :likeNub="articInfo.likeNub"
              >
              </likePage>
            </span>
            <!-- 收藏 -->
            <span>
              <collectPage :articleid="props.articleId"></collectPage>
            </span>
            <!-- 评论 -->
            <span>
              <el-tag
                size="small"
                style="cursor: pointer"
                @click="showComments"
              >
                <i class="iconfont icon-pinglun1" style="font-size: 15px"></i>
                {{(articInfo.comments.length === 0 ? 0 : articInfo.comments.length)}}
              </el-tag>
            </span>
          </div>
        </el-footer>
      </el-container>
      <el-aside style="width: auto">
        <Aside
          style="margin-left: 10px"
          :username="articInfo.user.username"
          :headportait="articInfo.user.headportait"
          :attentNub="articInfo.user.attentNub"
          :followNub="articInfo.user.followNub"
          :articleNub="articInfo.user.articleNub"
          :userId="articInfo.user.userId"
        />
      </el-aside>
    </el-container>
  </el-card>
  <commentVue v-if="commentVis"
    :total="articInfo.comments.length"
    :comments="articInfo.comments.slice(conmmentIndex,conmmentIndex + 6)"
    :articId="Number(articleId)"
    @changePage="changePage"
    @addComment="addComment" 
    @showComments="showComments"

  ></commentVue>
</template>

<script setup>
import Aside from "./Aside.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { getArticleComments_ } from "@/utils/article/getArticleComments";
import likePage from "@/components/like/index.vue";
import collectPage from "@/components/collect/index.vue";
import commentVue from "../../../../components/comments/index.vue";
const props = defineProps(["articleId"]);
const commentVis = ref(false) //评论窗口的可见性
const conmmentIndex = ref(0)
const articInfo = ref({
  head: "",
  summary: "",
  cover: "",
  releasetime: "",
  txt: "",
  type: "",
  likeNub: "",
  comments: [],
  user: {
    userId: "",
    username: "",
    headportait: "",
    attentNub: "",
    followNub: "",
    articleNub: "",
  },
});

onBeforeMount(async () => {
  const { data: res } = await getArticleComments_(props.articleId);
  articInfo.value.head = res.head;
  articInfo.value.summary = res.summary;
  articInfo.value.cover = res.cover;
  articInfo.value.releasetime = res.releasetime;
  articInfo.value.txt = res.txt;
  articInfo.value.type = res.type;
  articInfo.value.likeNub = res.likeNub;
  articInfo.value.comments = res.comments;
  articInfo.value.user.userId = res.user.userid;
  articInfo.value.user.username = res.user.username;
  articInfo.value.user.headportait = res.user.headportait;
  articInfo.value.user.articleNub = res.user.articleNub;
  articInfo.value.user.attentNub = res.user.attentNub;
  articInfo.value.user.likeNub = res.user.likeNub;
  articInfo.value.user.followNub = res.user.followNub;
  console.log(articInfo.value);
});
//点击评论 footer评论展示
const isVisible = ref("true");
function display() {
  isVisible.value = true;
}

const showComments = () => { //展示评论
    commentVis.value = !commentVis.value
}

const changePage = (page) => {  //改变评论分页的下标
  conmmentIndex.value = (page - 1) * 6
}

const addComment = (val) => {   //发表评论
  articInfo.value.comments.unshift(val)
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