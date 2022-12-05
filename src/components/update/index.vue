<template>
<div class="xg">
  <el-form :model="info" >
    <div class="update">
      <div class="left">
        <el-form-item label="手机号：" label-width="auto"> 
          <el-input  type="text" v-model="info.phoneNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵&nbsp&nbsp&nbsp称：" label-width="auto">
          <el-input v-model="info.user_name"></el-input>
        </el-form-item>
        <el-form-item label="年&nbsp&nbsp&nbsp龄：" label-width="auto">
          <el-input v-model.number="info.age"></el-input>
        </el-form-item>
        <el-form-item label="性别：" label-width="auto"  >
          <span style="margin-right: 5px">男</span>
          <el-switch
            v-model="info.sex"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #13ce66;
            "/>
          <span style="margin-left: 5px">女</span>
        </el-form-item>
      </div>
      <div class="right">
        <el-form-item label="密码：" required label-width="auto" >
          <el-input
            v-model="info.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="&nbsp&nbsp地区：" label-width="auto">
          <el-input v-model="info.address"></el-input>
        </el-form-item>
        <el-form-item label="&nbsp&nbsp职业：" label-width="auto">
          <el-input v-model="info.profession"></el-input>
        </el-form-item>
      </div>
    </div>
  </el-form>
  <span class="footer">
    <el-button @click="changeVisible_">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
</div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { success, error,warn} from "@/utils/popup/message";
import type { UploadProps } from "element-plus";
import {updateUserInfo_} from '@/utils/user/updateUserInfo'
const imageUrl = ref();
const emit = defineEmits(['changeVisible','changeInfo']);
const props = defineProps(['userInfo'])
const userId = sessionStorage.getItem('userId')
const info = ref(
  {
  phoneNum: props.userInfo.phoNum,
  user_name: props.userInfo.user_name,
  age: props.userInfo.age,
  sex: (props.userInfo.gender === '男' ? false : true),
  password: props.userInfo.password,
  address: props.userInfo.address,
  profession: props.userInfo.profession,
  }
);
const changeVisible_ = () => {  //改变修改信息窗口的可见性
  emit('changeVisible')
}
const submit = async () => {   //提交修改信息
    if(info.value.password == ''){
      warn('请填写密码')
    }else{
      const res = await updateUserInfo_(
      {
        username: info.value.user_name,
        age: info.value.age,
        gender: (info.value.sex === false ? '男' : '女'),
        password: info.value.password,
        address: info.value.address,
        profession: info.value.profession,
        userid: userId
      }
    )
    if (res.code === '100'){
      success('修改成功')
      changeVisible_()
      emit('changeInfo',info.value)
    }else{
      error(res.msg)
    }
    }
}
</script>

<style scoped>

.update {
  display: flex;
}
.footer {
  margin-left: 18vw;
}
.left .el-form-item{
  margin-left: 2vw;
}
.right .el-form-item{
  margin-left: 6vw;
}
</style>