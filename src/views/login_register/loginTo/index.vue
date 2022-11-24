<template>
    <div class="login_window" @keyup.enter='clickLogin'>
      <div class="login_left">
        <el-form status-icon label-width="auto" :model="login_info" class="demo-ruleForm">
          <el-form-item>
            <div class="left">
              <div><svg t="1666098110913" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2566" width="16" height="16">
                  <path
                    d="M391.136179 588.720987C191.832264 588.720987 42.993669 717.867879 42.993669 905.407919v20.203177C42.993669 1023.643389 202.487948 1023.643389 404.434473 1023.643389h214.477609c193.93345 0 361.440804 0 361.440805-98.032293v-20.203177c0-187.54004-148.838595-316.686931-348.142511-316.686932H391.136179z m109.796169-49.357128c157.874615 0 286.339543-120.87808 286.339543-269.546185 0-148.582859-128.464927-269.460939-286.339543-269.460939-157.78937 0-286.254297 120.87808-286.254297 269.460939 0 148.668104 128.464927 269.546185 286.254297 269.546185z"
                    p-id="2567"></path>
                </svg></div>
              <el-input type="text" v-model="login_info.phone" autocomplete="off" placeholder="手机号" clearable></el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="left">
              <div><svg t="1666098515596" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="6773" width="16" height="16">
                  <path
                    d="M297.4 250.2c22.6 0 41 18.3 41 41V462c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41V291.2c0-22.6 18.4-41 41-41zM701.5 246.2c22.6 0 41 18.3 41 41v169.1c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41V287.2c0-22.6 18.4-41 41-41z"
                    fill="#242424" p-id="6774"></path>
                  <path
                    d="M499.4 126.2c89 0 161.1 72.1 161.1 161.1h81.9c0-134.2-108.8-243-243-243s-243 108.8-243 243h81.9c0-89 72.2-161.1 161.1-161.1zM865.4 938V482.1c-3.4-33.4-31-59.7-64.9-61H200.6c-37.5 0-68 30.4-68.1 67.9v444.3c4 30.2 27.8 54.2 57.9 58.5h621.5c27-5.4 48.3-26.8 53.5-53.8z"
                    fill="#242424" p-id="6775"></path>
                </svg></div>
              <el-input type="password" placeholder="密码" v-model="login_info.password" autocomplete="off" show-password clearable>
              </el-input>
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

import { ref } from "@vue/reactivity";
import { login_ } from "@/utils/login";
import router from "@/router";
import { ElMessage } from 'element-plus'
import { error, success } from "../../../utils/popup/message";
const emit = defineEmits(['changeVisible'])
const login_info = ref({
  phone: "",
  password: "",
});

const reset = () => {   //重置
  Object.keys(login_info).forEach(key => {
    login_info.value[key] = ''
  })
}

const clickLogin = async () => {  //点击登录
   const res = await login_(
    {
      phone: login_info.value.phone,
      password: login_info.value.password
    })
    if (res.code === '100'){
      loginSuccess()
    }else{
      loginFali()
    }
}

const loginSuccess = () => {
    Object.keys(login_info).forEach((key => {
          login_info[key] = ''
    }))
    router.push('/home')
    emit('changeVisible',1)
}

const loginFali = (msg) => {
    error(msg)
}

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
  width: 600px;
  padding: 80px 10px;
  background-color: #FFFFFF;
  position: relative;
  top: 20%;
  margin: 0 auto;
  border-radius: 40px;
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