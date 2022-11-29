<template>
    <el-card style="margin:0 15px">
        <div @click="inputFocus" class="my-reply">
                <el-button type="primary" 
                link 
                style="transform:translate(86vw,-3vh)" 
                @click="showComments_"
                >
                    收起评论<el-icon><ArrowUpBold />
                    </el-icon>
                    </el-button>
               <div style="display:flex">
                    <el-avatar class="header-img" :size="40" :src="imgurl" style="margin-right:5px"></el-avatar>
                    <el-input
                      type="textarea"
                      placeholder="请输入评论..."
                      style="resize:none;"
                      v-model="comment_txt"
                    ></el-input>
               </div>
          <div class="reply-btn-box" v-show="1==1">
            <el-button
              class="reply-btn"
              size="medium"
              type="primary"
              @click="addComment"
              >发表评论
              </el-button
            >
          </div>
          <el-divider></el-divider>
        </div>
        <!--  以下是回复内容  -->
            <div
              v-for="item in props.comments"
              :key="item.commentid"
              class="author-title reply-father"
            >
              <el-avatar class="header-img" :size="40" :src="item.user.headportait"></el-avatar>
              <div class="author-info">
                <span class="author-name">{{item.user.username}}</span>
                <span class="author-time">{{item.comtime.slice(0, 10)}}</span>
              </div>
              <!-- <div class="icon-btn">
                <span @click="showReplyInput()"
                  ><i class="iconfont el-icon-s-comment"></i>11121</span
                >
                <i class="iconfont el-icon-caret-top"></i>1113111
              </div> -->
              <div class="talk-box">
                <p>
                  <span class="reply">{{item.comtext}}</span>
                </p>
              </div>
              <!-- <div class="reply-box">
                <div v-for="(reply, j) in item.reply" :key="j" class="author-title">
                  <el-avatar
                    class="header-img"
                    :size="40"
                    :src="reply.fromHeadImg"
                  ></el-avatar>
                  <div class="author-info">
                    <span class="author-name">1111111</span>
                    <span class="author-time">111111</span>
                  </div>
                  <div class="icon-btn">
                    <span @click="showReplyInput()"
                      ><i class="iconfont el-icon-s-comment"></i
                      >1111</span
                    >
                    <i class="iconfont el-icon-caret-top"></i>1111
                  </div>
                  <div class="talk-box">
                    <p>
                      <span>回复 1111:</span>
                      <span class="reply">1111</span>
                    </p>
                  </div>
                  <div class="reply-box"></div>
                </div>
              </div>
              <div v-show="1 == 1" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info">
                  <div
                    tabindex="0"
                    contenteditable="true"
                    spellcheck="false"
                    placeholder="输入评论..."
                    @input="onDivInput($event)"
                    class="reply-input reply-comment-input"
                  ></div>
                </div>
                <div class="reply-btn-box">
                  <el-button
                    class="reply-btn"
                    size="medium"
                    @click="sendCommentReply()"
                    type="primary"
                    >发表评论</el-button
                  >
                </div>
              </div> -->
            </div>
            <Page :total="total" :pageSize='6' @changePage="changePage"></Page>
    </el-card>
</template>

<script setup>
import store from '@/store';
import { ref,computed } from 'vue';
import {addComment_} from '@/utils/article/addComment'
import { error,success,warn } from '@/utils/popup/message';
import Page from '../Pageination/index.vue'
const emit = defineEmits(['showComments','changePage','addComment'])
const imgurl = sessionStorage.getItem('imgUrl')
const userName = sessionStorage.getItem('userName')
const props = defineProps(['comments','articId','total'])
const comment_txt =  ref('')
const userId = sessionStorage.getItem('userId')
const showComments_ = () => {
    emit('showComments',-1)
}

const addComment = async () => {  //添加评论
    if (comment_txt.value.trim() === ''){
      warn('评论内容不可为空')
    }else{
        const time = new Date()
        const date = time.getFullYear() +'-' + time.getMonth() + '-' +time.getDay()
        emit('addComment',
          {
            comtime:date,
            comtext:comment_txt.value,
            user:{
              headportait:imgurl,
              username:userName
            }
          }
        )
        const res = await addComment_(
          {
            articleId:props.articId,
            comtext:comment_txt.value,
            userId:userId
          }
        )
        if (res.code === '100'){
          success('评论成功')
          comment_txt.value = ''
        } 
        else error('评论失败')
    }
}

const changePage = async (page) =>{
    emit('changePage',page)
}
</script>

<style lang="stylus" scoped>
.my-reply
    padding 10px

    .header-img
        display inline-block
        vertical-align top

    .reply-btn-box
        height 25px
        margin 10px 0
        .reply-btn
            position relative
            float right
            margin-right 15px
.author-title:not(:last-child)
    border-bottom: 1px solid rgba(178,186,194,.3)
.author-title
    padding 10px
    .header-img
        display inline-block
        vertical-align top
        margin-right:5px
    .author-info
        display inline-block
        margin-left 5px
        width 60%
        height 40px
        line-height 20px
        >span 
            display block
            cursor pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        .author-name
            color #000
            font-size 16px
            font-weight bold
            color: #00c3ff
        .author-time
            font-size 14px
    .icon-btn
        width 30%
        padding 0 !important 
        float right
        @media screen and (max-width : 1200px){
            width 20%
            padding 7px
        }
        >span 
            cursor pointer
    .talk-box
        margin 0 50px
        >p
           margin 0
        .reply
            font-size 16px
            color #000
</style>
