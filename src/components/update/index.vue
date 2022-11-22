<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="150px">
    <div class="update">
      <div class="left">
        <el-form-item label="账号：" prop="password">
          <el-input v-model="form.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
            <span style="margin-right:5px">男</span>
          <el-switch v-model="f"  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"/>
            <span style="margin-left:5px">女</span>
        </el-form-item>
      </div>
      <div class="right">
        <el-form-item label="密码：" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="地区：" prop="area">
          <el-input v-model="form.area"></el-input>
        </el-form-item>
        <el-form-item label="职业：" prop="work">
          <el-input v-model="form.work"></el-input>
        </el-form-item>
      </div>
    </div>
  </el-form>
  <span class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { success,error } from "@/utils/popup/message";
import type { UploadProps } from "element-plus";
const imageUrl = ref()
const failToUpload = () => {
  error("图片上传失败,请重新上传!")
};
const uploadSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  success("图片上传成功")
  imageUrl.value = uploadFile.response;
};
const form = ref({
    sex:false,
});

const f = ref(false)
</script>

<style scoped>
.update {
  display: flex;
}
.right {
  margin-right: 100px;
}
.avatar-uploader .avatar {
  /* width: 150px;
  height: 150px; */
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
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