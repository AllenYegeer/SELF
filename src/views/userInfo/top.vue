<template>
  <div class="PersonTop">
      <el-upload
        class="avatar-uploader"
        action="http://47.109.58.84:9090/file/upload"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="failToUpload"
        style=" margin:0 10px;"
      >
        <el-tooltip content="点击更换头像" placement="bottom">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            style="height: 150px; width: 150px"
          />
        </el-tooltip>
      </el-upload>
    <div class="PersonTop_text">
      <div class="user_text">
        <div class="user_name">
          <span> {{ props.info.user_name }} </span>
        </div>
        <div class="user-v" v-if="3 === 3">
          <img src="@/assets/logo/v.png" class="user-v-img" />
          <span class="user-v-font">优质媒体作者</span>
        </div>
        <!-- <div class="user_anniu">
          <el-button
            v-if="this.$route.params.id != this.$store.state.id"
            @click="follow"
            type="primary"
            size="medium"
            icon="el-icon-check"
            v-text="
              isfollowid.indexOf(this.$route.params.id) > -1 ? '已关注' : '关注'
            "
          ></el-button>
        </div> -->
      </div>
      <div class="user_num">
        <div style="cursor: pointer" @click="f">
          <div class="num_number">{{ props.info.followNub }}</div>
          <span class="num_text">粉丝</span>
        </div>
        <div style="cursor: pointer" @click="f">
          <div class="num_number">{{ props.info.attentNub }}</div>
          <span class="num_text">关注</span>
        </div>
        <div>
          <div class="num_number">{{ props.info.articleNub }}</div>
          <span class="num_text">作品</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from "@vue/reactivity";
import { success, error } from "@/utils/popup/message";
import type { UploadProps } from "element-plus";
import { onBeforeMount } from "@vue/runtime-core";
import {updateUserInfo_} from '@/utils/user/updateUserInfo'
import router from "@/router";
import store from "../../store";
const props = defineProps(["info"]);
const imageUrl = ref();
onBeforeMount(() => {
  imageUrl.value = sessionStorage.getItem('imgUrl')
})
const failToUpload = () => {
  error("图片上传失败,请重新上传!");
};
const uploadSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  success('图片上传成功')
  const userId = sessionStorage.getItem('userId')
  updateHeadPortrait(
    {
      headportait:uploadFile.response,
      userid:userId
    },
    uploadFile.response
  )
};

const updateHeadPortrait = async (data,url) => {
  const res = await updateUserInfo_(data)
  if (res.code === '100'){
    imageUrl.value = url;
    sessionStorage.setItem('imgUrl',url)
    store.commit('updateUrl',url)
    success('头像修改成功')
    //router.push('/homePage/userInfo')
  } 
  else error('头像修改失败')
}
</script>

<style scoped>
.avatar-uploader .avatar {
  display: block;
}
.PersonTop {
  width: 100%;
  height: 140px;
  padding-top: 20px;
  background-color: white;
  margin: 30px 200px;
  display: flex;
  border-radius: 5px;
}
.PersonTop_text {
  height: 120px;
  width: 880px;
  display: flex;
}

.user_text {
  width: 60%;
  height: 100%;
  line-height: 30px;
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
.user_qianming {
  font-size: 14px;
  color: #999;
}

.user_num {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
}

.user_num > div {
  text-align: center;
  border-right: 1px dotted #999;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  line-height: 20px;
}

.num_text {
  color: #999;
}

.num_number {
  font-size: 20px;
  color: #333;
}
.el-menu-item > span {
  font-size: 16px;
  color: #999;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform: translateY(-10%);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
