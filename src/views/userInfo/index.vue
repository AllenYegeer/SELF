<template>
  <div class="userInfo" v-loading.fullscreen.lock="loadingVisible">
    <Top :info="userInfo" @changeVisible="changeVisible" :userId="userId"></Top>
    <Bottom v-if="visible" class="bottom" :info="userInfo" @changeInfo="changeInfo" :userId="userId"></Bottom>
    <router-view v-else></router-view>
  </div>
</template>

<script setup>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
import { getUserAttention_ } from "../../utils/user/getUseAttenion";
import { getUserFans_ } from "../../utils/user/getUserFans";
import { getUserInfo_ } from "../../utils/user/getUserInfo";
import { onBeforeMount, ref } from "@vue/runtime-core";
import store from "../../store";
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
const loadingVisible = ref(true);  //加载的可见性
const userId = ref(0)
onBeforeRouteUpdate( async (to,from) => {  //路由更改时
    loading()
    if (to.params.id){
        userId.value = to.params.id
        getUserInfo(to.params.id || userId.value)
    }
    
})
onBeforeMount(() => { 
  if (useRoute().params.id){
    userId.value = useRoute().params.id
    getUserInfo(userId.value)
  }else{
    userId.value = sessionStorage.getItem('userId')
    getUserInfo(userId.value)
  }
  loading()
});

const loading = () => {  //页面加载
  loadingVisible.value = true;
  setTimeout(() => {
    loadingVisible.value = false;
  }, 2000);
}
const getUserInfo = async (userId) => {
  const res = await getUserInfo_(userId);
  userInfo.value.user_name = res.data.username;
  userInfo.value.age = res.data.age;
  userInfo.value.phoNum = res.data.phone;
  userInfo.value.gender = res.data.gender;
  userInfo.value.attentNub = res.data.attentNub;
  userInfo.value.articleNub = res.data.articleNub;
  userInfo.value.followNub = res.data.followNub;
  userInfo.value.headportait = res.data.headportait;
  userInfo.value.address = res.data.address;
  userInfo.value.profession = res.data.profession;
  userInfo.value.password = res.data.password;
};
const changeInfo = (info) =>{  //修改信息让页面刷新
  loading()
  userInfo.value.user_name = info.user_name
  userInfo.value.age = info.age
  userInfo.value.gender = (info.sex === false ? '男' : '女')
  userInfo.value.password = info.password
  userInfo.value.profession = info.profession
  userInfo.value.address = info.address
}
const userInfo = ref({
  user_name: "",
  age: 18,
  phoNum: "",
  password:'',
  profession: "",
  gender: "",
  attentNub: 0,
  articleNub: 0,
  followNub: 0,
  headportait: "",
  address: "",
});

const changeVisible = (num) => {
    if (num == 1) visible.value = false
    else visible.value = true
}

const visible = ref(true)
</script>

<style scoped>
.userInfo {
  width: 70vw;
}
.bottom {
  transform: translateX(200px);
}
</style>