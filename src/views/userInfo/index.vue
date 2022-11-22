<template>
  <div class="userInfo" v-loading.fullscreen.lock="visible">
    <Top :info="userInfo"></Top>
    <Bottom class="bottom" :info="userInfo"></Bottom>
  </div>
</template>

<script setup>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
import { getUserAttention_ } from "../../utils/user/getUseAttenion";
import { getUserFans_ } from "../../utils/user/getUserFans";
import { getUserInfo_ } from "../../utils/user/getUserInfo";
import { onBeforeMount, ref } from "@vue/runtime-core";
const userId = sessionStorage.getItem("userId");
onBeforeMount(() => {
  visible.value = true;
  getUserInfo();
  getUserFans();
  getUseAttenion();
  setTimeout(() => {
    visible.value = false;
  }, 2000);
});
const getUserInfo = async () => {
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
  /* console.log(res.data); */
};
const getUserFans = async () => {
  const res = await getUserFans_(userId);
  userFans.value = res.data;
  /* console.log(userFans.value); */
};
const getUseAttenion = async () => {
  const res = await getUserAttention_(userId);
  userAttention.value = res.data;
  /* console.log( userAttention.value); */
};
const userInfo = ref({
  user_name: "",
  age: 18,
  phoNum: "",
  profession: "",
  gender: "",
  attentNub: 0,
  articleNub: 0,
  followNub: 0,
  headportait: "",
  address: "",
});
const userFans = ref([]);
const userAttention = ref([]);
const visible = ref(true);
</script>

<style scoped>
.userInfo {
  width: 70vw;
}
.bottom {
  /*  position: absolute;
      left:500px;
      width: 500px; */
  transform: translateX(200px);
}
</style>