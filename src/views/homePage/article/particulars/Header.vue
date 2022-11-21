<template>
    <div class="hd">
        <div class="h-nav">
            <ul>
                <li>
                    <a href="">首页</a>
                </li>
                <li>
                    <a href="">首页</a>
                </li>
                <li>
                    <a href="">首页</a>
                </li>
                <li>
                    <a href="">首页</a>
                </li>
                <li>
                    <a href="">首页</a>
                </li>
            </ul>
        </div>
        <div class="hd-search">
            <el-input v-model="input3" placeholder="搜索" class="input-with-select">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <!-- 个人中心 -->
        <div class="toUser">
            <router-link to="/user">个人中心</router-link>
        </div>
        <!-- 投稿 -->
        <div class="send">
            <button>
                <router-link to="/create">投稿</router-link>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input3 = ref('')
const select = ref('')
</script>

<style>
.hd {
    display: flex;
}

.h-nav{
    margin-right: 50px;
}

.h-nav ul {
    display: flex;
}

.h-nav ul li {
    margin-right: 40px;
}

.h-nav ul li:nth-child(1) {
    margin-left: 50px;
}

.h-nav ul li a {
    font-size: 20px;
    color: black;
}

.hd-search {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.toUser{
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 14px;
    text-align: center;
    margin: 10px 0 10px 40px;
    /* vertical-align: middle; */
}
.hd .send button{
    display: inline-block;
    width: 60px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 15px 0 15px 10px;
}
</style>