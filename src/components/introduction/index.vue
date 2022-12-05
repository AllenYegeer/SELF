<template>
  <div class="PersonTop">
    <div class="header">
     <router-link :to="('/homePage/userInfo/' + id)">
        <div class="img">
            <img
              :src="info.headportait"
              class="avatar"
              style="height: 70px; width: 70px"
            />
        </div>
     </router-link>
      <div class="user_text">
        <div class="user_name">
          <span>{{info.username}}</span>
        </div>
        <div class="user-v">
          <img src="@/assets/logo/v.png" class="user-v-img" />
          <span class="user-v-font">优质媒体作者</span>
        </div>
      </div>
    </div>

    <div class="nav">
      <div class="user_num">
        <div @click="f" style="border-left:1px solid #999">
          <div class="num_number">{{info.followNub}}</div>
          <span class="num_text">粉丝</span>
        </div>
        <div @click="f">
          <div class="num_number">{{info.attentNub}}</div>
          <span class="num_text">关注</span>
        </div>
        <div>
          <router-link :to="`/homePage/Articles/${id}`">
            <div class="num_number">{{info.articleNub}}</div>
            <span class="num_text">作品</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer">
        <el-button type="primary" @click="attenion" v-if="props.userAttenionId.indexOf(props.id) === -1">
          <el-icon><Plus /></el-icon>
          <span>关注他</span>
        </el-button>
        <el-button v-else type="info" @click="attenion">
          <el-icon><Select /></el-icon>
          <span>已关注</span>
        </el-button>
        <el-button type="success" ><el-icon><Message /></el-icon><span></span>私信他</el-button>
    </div>
  </div>
</template>

<script setup>
import {getUserInfo_} from '@/utils/user/getUserInfo'
import { onBeforeMount, onMounted, ref} from '@vue/runtime-core'
import {attent_} from '@/utils/user/attent'
import {success,error,warn} from '@/utils/popup/message'
import store from '../../store'
const props = defineProps(['userAttenionId','id'])
var userId
const userInfo = ref()
const visible = ref()
const info = ref(
  {
    headportait:'',
    username:'',
    articleNub:'',
    attentNub:'',
    followNub:''
  }
)
const attenion = async () => {   
  userId = sessionStorage.getItem('userId')
  if (userId){
    const idx = props.userAttenionId.indexOf(props.id)
    if (idx == -1){
        const res = await attent_(userId,1,props.id)  //关注
        if (res.code === '100'){
          props.userAttenionId.push(props.id)
          info.value.followNub ++
          store.commit('addUserAttendInfo',props.id)
        }
    }else{
        const res = await attent_(userId,-1,props.id) //取消关注
        if (res.code === '100'){
          props.userAttenionId.splice(idx,1)
          info.value.followNub --
          store.commit('removeUsedAttendInfo',props.id)
        }
    }
  }else{
    error('请先登陆')
  }
}
const getInfo = async (id) =>{  //得到用户信息
  const {data:res} = await getUserInfo_(id)
  info.value.headportait = res.headportait
  info.value.username = res.username
  info.value.articleNub = res.articleNub
  info.value.attentNub = res.attentNub
  info.value.followNub = res.followNub
}
defineExpose({   //抛出方法，让父亲调用
	getInfo
})
</script>

<style scoped>
.loading {
  width: 200px;
  height: 200px;
  margin:0 auto;
}
img {
  cursor: pointer;
}
.avatar-uploader .avatar {
  display: block;
}
.PersonTop {
  padding-top: 20px;
  background-color: white;
  border-radius: 5px;
}

.header{
    display: flex;
    margin-left:20px;
}
.img{
    margin-bottom: 20px;
    margin-left:20px;
}
.nav {
  display: flex;
  margin-left:20px;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
  margin-left: 20px;
}

.user_name {
  font-weight: bold;
}
.user-v {
  margin-bottom: -5px;
}
.user-v-img {
  width: 15px;
  height: 15px;
  margin-right: 4px;
}
.user-v-font {
  font-size: 15px;
  color: #00c3ff;
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
.footer{
    margin:20px 0;
}
.footer > .el-button {
    margin-left:10%;
    text-align: center;
}
</style>