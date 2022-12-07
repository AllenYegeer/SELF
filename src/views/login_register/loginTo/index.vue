<template>
    <div class="login_window" @keyup.enter='clickLogin'>
      <div class="login_left">
        <el-form status-icon label-width="auto" :model="login_info" class="demo-ruleForm">
          <el-form-item>
              <el-input :prefix-icon="User" type="text" v-model="login_info.phone" autocomplete="off" placeholder="手机号" clearable></el-input>
          </el-form-item>

          <el-form-item>
              <el-input :prefix-icon="Lock" type="password" placeholder="密码" v-model="login_info.password" autocomplete="off" show-password clearable>
              </el-input>
          </el-form-item>

          <el-form-item>
              <div class="identify" style="display:flex">
                <el-input :prefix-icon="Key" type="text" placeholder="验证码" 
                v-model="login_info.code" autocomplete="off" clearable
                style="height:36px"
                ></el-input>
                <Identity  @click="refreshCode" :identifyCode="identifyCode" 
                style="margin-left:10px;
                "/>
              </div>
              
          </el-form-item>

          <el-form-item>
            <el-button class="loginBtn" :plain="true" @click.stop="clickLogin" type="primary" round>登 陆</el-button>
            <el-button class="loginBtn" :plain="true" @click.stop="reset" type="primary" round>重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_logo">
        <img src="@/assets/logo/logo2.jpg" alt="" width="210" height="90">
      </div>    
    </div>
    
</template>
<script setup>


import { login_ } from "@/utils/login";
import router from "@/router";
import { ElMessage } from 'element-plus'
import { error, success } from "@/utils/popup/message";
import {Iphone,Lock,User,Key } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import Identity from '../../../components/Identify/index.vue';
const emit = defineEmits(['changeVisible'])
const login_info = ref({  //登录信息
  phone: "",
  password: "",
  code:""
});
let identifyCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let identifyCode = ref()   //验证码
const reset = () => {   //重置
  Object.keys(login_info.value).forEach((key) => {
    login_info.value[key] = ''
  })
}

const clickLogin = async () => {  //点击登录
   if (login_info.value.code === ""){
      error('请输入验证码')
   }else if (login_info.value.code !== identifyCode.value.toLowerCase()){
      error('验证码输入错误')
   }else{
     const res = await login_(
      {
        phone: login_info.value.phone,
        password: login_info.value.password
      })
      /*   if (res.code === '100'){
        loginSuccess()
      }else{
        loginFali()
      } */
   }
}
  
/* const loginSuccess = () => {
    Object.keys(login_info).forEach((key => {
          login_info[key] = ''
    }))
    router.push('/home')
    emit('changeVisible',1)
}

const loginFali = (msg) => {
    error(msg)
} */

//验证码
const randomNum = (min, max) => {   
    return Math.floor(Math.random() * (max - min) + min)
}
 
const makeCode = (o, l) => {  //产生验证码
    for (let i = 0; i < l; i++) {
        identifyCode.value += o[
            randomNum(0, o.length)
        ];
    }
}
 
const refreshCode = () => {  //刷新验证码
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
}
 
onMounted(() => {
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
})
</script>


<style scoped>

.left {
  display: flex;
  width: 250px;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  margin: 0 1px;
}

.login_window {
  display: flex;
  justify-content: space-evenly;
  height: 200px;
  min-width: 500px;
  padding: 30px 10px 80px 10px;
  
  background-color: #FFFFFF;
  position: relative;
  top: 20%;
  margin: 0 auto;
  
}

.loginBtn {
  width: 70px;
  margin-left: 30px;
  border-radius: 2px;
  font-size: 18px;
}
.login_left{
  padding-top: 45px
}
.login_logo {
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 39px;
  line-height: 200px;
}
</style>