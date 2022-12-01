<template>
        <Content style="margin-top:2vw" :articleId="articleId"/>
</template>
  
<script setup>
import Content from './Content.vue'
import { ref,reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleComments_ } from '@/utils/article/getArticleComments';
const articleId = ref()
onBeforeMount( () => {
  articleId.value = useRoute().params.id
})
</script>
  
<style>
.el-header{
    margin: 0 auto;
}
.p_main {
    border-top: 1px solid gray;
}


</style>
  