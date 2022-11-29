<template>
  <el-dropdown style="width: 100%; height: 100%">
        <img :src=" imgurl ||imgUrl" alt="" v-if="!visBeforLogin" />
        <span  class="login">登陆</span>
        <template #dropdown>
          <el-dropdown-menu
            style="width:100%">
            <beforeLogin v-if="visBeforLogin" @changeVisBeforLogin="changeVisBeforLogin"></beforeLogin>
          </el-dropdown-menu>
          <el-dropdown-menu
            style="width:100%">
            <afterLogin v-if="!visBeforLogin" @changeVisBeforLogin="changeVisBeforLogin" @changeActive="changeActive_"></afterLogin>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
</template>

<script setup>
import { ref,onBeforeMount, computed } from 'vue';
import beforeLogin from '../login/beforeLogin.vue'
import afterLogin from '../login/afterLogin.vue'
import store from '@/store';
const imgUrl = ref();
const imgurl = ref (computed (() => store.state.url))
const visBeforLogin = ref(true);
const emit = defineEmits(['changeActive'])
const changeVisBeforLogin = () => {   //登录或注册后发生变化
  visBeforLogin.value = !visBeforLogin.value;
  refresh()
};
const changeActive_ = (num) =>{
  emit('changeActive',num)
}
onBeforeMount(() => {
  console.log(imgUrl.value);
  refresh()
})
const refresh = () => {
  const url = sessionStorage.getItem('imgUrl')
  if (url) {
    imgUrl.value = url;
    visBeforLogin.value = false
  }else{
    visBeforLogin.value = true
  }
}
</script>
<style scoped>
.login {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: #fff;
  background: #00aeec;
  text-align: center;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 36px;
  font-style: normal;
  font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei,
    sans-serif;
  font-weight: 700;
}
</style>