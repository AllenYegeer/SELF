<template>
    <div class="hd">
        <div class="h-nav">
            <ul>
                <li @click="changeActive_(1)">
                    <router-link to="/homePage" :class="{active:isActive == 1}">首页</router-link>
                </li>
                <li @click="changeActive_(2)">
                   <router-link to="#" :class="{active:isActive == 2}">关注</router-link>
                </li>
                <li @click="changeActive_(3)">
                    <router-link to="#" :class="{active:isActive == 3}">学习</router-link>
                </li>
                <li @click="changeActive_(4)">
                    <router-link to="#" :class="{active:isActive == 4}">生活</router-link>
                </li>
                <li @click="changeActive_(5)">
                    <router-link to="#" :class="{active:isActive == 5}">离职</router-link>
                </li>
            </ul>
        </div>
        <div class="hd-search">
            <el-input v-model="search" placeholder="搜索" class="input-with-select">
                <template #append>
                     <el-button :icon="Search" circle />
                </template>
            </el-input>
        </div>
        <!-- 投稿 -->
       <div class="article">
                <router-link to="/homePage/createArticle">
                    <el-button type="primary" :icon="Edit" circle @click="changeActive_(0)">
                </el-button></router-link>
        </div>
        <!-- 个人中心 -->
        <div class="user">
             <img :src="imgUrl" alt=""/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    Edit,
    Search
} from '@element-plus/icons-vue'
const select = ref('')
const search = ref('')
const imgUrl = ref(sessionStorage.getItem('userHeadPortraitUrl'))
const props = defineProps(['isActive'])
const emit = defineEmits(['changeActive'])
const isActive = computed (() => props.isActive)
const changeActive_ = (num) => {   
    emit('changeActive',num)
}
</script>

<style scoped>
    .hd {
        display: flex;
        border-bottom: 1px solid #F6F6F6;
        justify-content: space-around;
        font-size: 15px;
        height: 50px;
        /* background: #334F77; */
    }
    .active{
        border-bottom:4px solid #056DE8;
        color:#121212;
    }
    .user img{
        height: 100%;
        width: 100%;
    }
    .h-nav{
        margin-right: 50px;
    }
    ul a{
        color: #8590A6;
        text-align: center;
        display: inline-block;
        padding-bottom: 13px;
        font-weight: 600;
    }
    a:hover {
        color:#121212;
    }
    .h-nav ul {
        display: flex;
    }

    .h-nav ul li {
        margin-right: 40px;
        color: #8590A6;
       /*  border-bottom:4px solid #056DE8; */
    }

    .h-nav ul li:nth-child(1) {
        margin-left: 50px;
    }

    .hd-search {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 35px;
        overflow: hidden;
        border-radius: 20px;
        border: 1px solid #EFEFEF;
        margin-top: 8px;
    }
    .user{
        border-radius: 10px;
        width: 35px;
        height: 35px;
        margin: 10px 0 0px 40px;
        overflow: hidden;
        cursor: pointer;
    }

    .hd .article {
        display: inline-block;
        margin: 10px 0 15px 10px;
    }
</style>