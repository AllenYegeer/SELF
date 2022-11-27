<template>
  <div
    class="common-layout"
    style="background: #f6f6f6; overflow: auto"
    v-infinite-scroll="load"
    v-for="(item, index) in article.posts"
    :key="item.articleid"
  >
    <el-card style="margin: 20px; width: 96vw; background: #ffffff">
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

          <el-descriptions-item 
          label="" 
          label-align="left" 
          class="summary">
            <router-link to="#">
              <p>
                {{ item.summary }}
              </p>
            </router-link>
          </el-descriptions-item>

          <el-descriptions-item 
          label="" 
          label-align="left" 
          class="txt"
            v-if="articleVisible === index"
          >
            <router-link to="#">
              <p>
                {{ item.txt }}
              </p>
            </router-link>
          </el-descriptions-item>
          <el-descriptions-item label="" class="show"> 
            <el-button     
            @click="showArticle(index)" 
            type="info" 
            link
            v-if="articleVisible != index"
            >
              阅读全文<el-icon><ArrowDownBold /></el-icon>
              </el-button>
            <el-button 
            @click="hiddenArticle" 
            type="info" 
            link
            v-else
            >
              收起<el-icon><ArrowUpBold /></el-icon>
              </el-button>
          </el-descriptions-item>
        </el-descriptions>

        <el-divider style="margin: 0" />
        <div class="footer">
          <!-- 时间 -->
          <span style="padding-right: 5px">
            <el-tag size="small">{{ item.releasetime.slice(0, 10) }}</el-tag>
          </span>
  
          <span style="padding-left: 5px; margin-left: 10px; margin-top: 10px">
            <!-- 点赞 -->
            <el-tag
              size="small"
              style="cursor: pointer"
              @click="like(item.articleid, index)"
            >
              <i
                class="iconfont icon-dianzan_kuai"
                style="font-size: 15px; transition: all 1s linear"
                :class="{
                  active: userLike.indexOf(item.articleid) != -1,
                }"
              ></i>
              <!-- {{ item.likeNub }} -->
            </el-tag>
          </span>
          <span style="padding-left: 5px; margin-left: 10px; margin-top: 10px">
            <!-- 收藏 -->
            <el-tag
              size="small"
              style="cursor: pointer"
              @click="cllect(item.articleid)"
            >
              <i
                class="iconfont icon-shoucang"
                style="font-size: 15px; transition: all 1s linear"
                :class="{
                  active: userCllection.indexOf(item.articleid) != -1,
                }"
              ></i>
            </el-tag>
          </span>
          <el-tooltip content="发表或查看评论">
            <span style="padding-left: 5px; margin-left: 10px; margin-top: 2px">
              <!-- 评论 -->
              <el-tag
                size="small"
                style="cursor: pointer"
                @click="showComments(index, item.articleid)"
              >
                <i class="iconfont icon-pinglun1" style="font-size: 15px"></i>
                <!--                         {{ commentVisible === index ? comments.length : 0}} -->
              </el-tag>
            </span>
          </el-tooltip>
          <el-dropdown>
            <router-link :to="{name:'homePage_userInfo',query:{userId:item.user.userid}}">
              <span style="margin-left: 20px">
                <img
                  class="img"
                  :src="item.user.headportait"
                  alt=""
                  @mouseenter="showInfo(item.user.userid, index)"
                />
              </span>
            </router-link>
            <template #dropdown>
              <el-dropdown-menu style="width: 285px">
                <introuction
                  ref="child"
                  :userAttenionId="userAttenionId"
                  :id="item.user.userid"
                ></introuction>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-card>
    <Comments
      v-if="commentVisible === index"
      @showComments="showComments"
      :comments="comments"
      :articId="item.articleid"
    >
    </Comments>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { onBeforeMount } from "@vue/runtime-core";
import { getPost_ } from "../../../utils/article/getPosts";
import { getUserAttention_ } from "@/utils/user/getUseAttenion";
import { getArticleComments_ } from "../../../utils/article/getArticleComments";
import introuction from "../../../components/introduction/index.vue";
import Comments from "../../../components/comments/index.vue";
import { error, success } from "../../../utils/popup/message";
import { getUserCollection_ } from "../../../utils/user/userCollection";
import { getUserLike_ } from "../../../utils/user/getUserLike";
import { collect_ } from "../../../utils/user/collect";
import { like_ } from "../../../utils/user/like";
const article = ref({
  posts: [],
});
const userId = sessionStorage.getItem("userId");
const userAttenionId = ref([]);
const count = ref(2); //滑动加载
const child = ref(); //子组件
const commentVisible = ref(); //评论窗口的可见性
const articleVisible = ref() //帖子可见性
const comments = ref([]); //文章的评论
const userCllection = ref([]); //用户的收藏
const userLike = ref([]); //用户的点赞
const load = () => {
  count.value++;
  /* getPost_(1,count.value,'学习',article)  */
};
onBeforeMount(async () => {
  getUserAttentionId();
  getposts();
  getUserCollection();
  getUserLike();
});

const showArticle = (idx) => {  //展示文章txt
  articleVisible.value = idx
}

const hiddenArticle = () => {  //隐藏文章txt
  articleVisible.value = -1
}
const showComments = (idx, id) => {
  //展示评论
  if (userId) {
    commentVisible.value = idx;
    getArticleComments(id);
  } else {
    error("请先登陆");
  }
};
const getposts = async () => {
  //得到帖子
  const data = await getPost_(1, count.value, "");
  article.value.posts = data.records;
};
const getUserAttentionId = async () => {
  //得到用户的关注用户Id
  if (userId) {
    const { data: res } = await getUserAttention_(userId);
    userAttenionId.value = res.map((item) => {
      return item.userid;
    });
  }
};
const showInfo = (id, idx) => {
  //悬停用户头像显示用户的简介信息
  child.value[idx].getInfo(id); //因为有多个子组件,idx用区分每个子组件的事件
};

const getArticleComments = async (id) => {
  //得到文章的评论
  const { data: res } = await getArticleComments_(id);
  comments.value = res.comments;
};

const getUserCollection = async () => {
  //获取用户的收藏
  if (userId) {
    const res = await getUserCollection_(userId);
    userCllection.value = res.map((item) => {
      return item.articleid;
    });
  }
};
const getUserLike = async () => {
  //获取用户的点赞信息
  if (userId) {
    const res = await getUserLike_(userId);
    userLike.value = res.map((item) => {
      return item.articleid;
    });
  }
};
const cllect = async (articleId) => {
  //点击收藏
  if (userId) {
    const idx = userCllection.value.indexOf(articleId);
    if (idx == -1) {
      //取消收藏
      const res = await collect_(userId, articleId, 1);
      if (res.code == "100") {
        success("收藏成功");
        userCllection.value.push(articleId);
      } else {
        error("收藏失败");
      }
    } else {
      //收藏
      const res = await collect_(userId, articleId, -1);
      userCllection.value.splice(idx, 1);
    }
  } else {
    error("请先登陆");
  }
};

const like = async (articleId, idx) => {
  //点赞功能
  if (userId) {
    const idx = userLike.value.indexOf(articleId);
    if (idx == -1) {
      //点赞
      const res = await like_(userId, articleId, 1);
      if (res.code === "100") {
        success("点赞成功");
        /* article.value.posts[idx].likeNub++ */
        userLike.value.push(articleId);
      } else {
        error(res.msg);
      }
    } else {
      //取消点赞
      const res = await like_(userId, articleId, -1);
      if (res.code === "100") {
        /* article.value.posts[idx].likeNub -- */
        userLike.value.splice(idx, 1);
      } else {
        error(res.msg);
      }
    }
  } else {
    error("请先登陆");
  }
};
</script>

<style scoped>

.footer {
  margin-top: 30px;
}
.active {
  color: #f0cc3e;
}
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
</style>
