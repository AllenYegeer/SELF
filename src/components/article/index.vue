<template>
    <div class="article"
    v-loading="loading"
    >
         <div :class="{empty:articles.length === 0,right:articles.length != 0}">
            <Right :articles="articles" :diffence="diffence" @changeIdx="changeIdx"></Right> 
         </div>
        <div class="left" v-if="(articles.length != 0)">
            <Left :article="articles[idx]" ref="child_"></Left>
        </div>
    </div>
</template>

<script setup>
import  Right from './right.vue'
import Left from './left.vue'
import { getUserCollection_ } from '@/utils/user/userCollection';
import { getUserLike_ } from '@/utils/user/getUserLike';
import { onBeforeMount, ref } from '@vue/runtime-core';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
const userId = ref()
const articles = ref([])
const idx = ref(0)
const child_ = ref()
const loading = ref(false)
const diffence = ref()
onBeforeRouteUpdate((to,from) => {
    if (to.params.name == 'myLike'){
        getUserLike()      
        diffence.value  = 1
    }else if (to.params.name == 'myCollect'){
        getUserCollection() 
        diffence.value  = 2
    }
})
onBeforeMount(() => {
    userId.value = sessionStorage.getItem('userId')
    console.log(useRoute().params.name);
    if(useRoute().params.name == 'myLike'){
        getUserLike()  //得到用户的点赞
        diffence.value  = 1
    }else if (useRoute().params.name == 'myCollect'){
        getUserCollection()  //得到用户的收藏
        diffence.value = 2
    }
    loading_()
})

const getUserCollection =  async () => {  //得到用户的收藏信息
    const res = await getUserCollection_(userId.value)
    articles.value = res.reverse()
}
const getUserLike = async () => {   //得到用户的点赞信息
    const res = await getUserLike_(userId.value)
    articles.value = res.reverse()
}
const changeIdx = (num) =>{ 
    idx.value = num
    loading_()
    child_.value.refsh()
}

const loading_ = async () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false  
    },2000)
}
</script>

<style scoped>
    .article {
        display: flex;
    }
    .empty{
        margin:0 auto;
    }
    .right{
        margin: 20px 10px;
        box-shadow: 0 0 28px 3px rgba(189, 192, 191, 0.5);
    }
    .left {
        margin-top: 20px;
    }
</style>