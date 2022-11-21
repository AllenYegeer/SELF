<template>
    <div class="common-layout" style="background-color: #fff;padding: 20px 40px 0;">
        <el-container>
            <el-container style="width: 80%;border-right: 1px solid rgba(0, 0, 0, 0.1);">
                <el-main style="padding: 0 30px 10px;">
                    <!-- ceshi -->

                    <div class="header">
                        <h2>标题</h2>
                        <div>
                            <span>时间</span>
                            <span class="name">作者</span>
                        </div>
                    </div>
                    <div>
                        <h4>简介</h4>
                    </div>
                    <div>
                        内容
                    </div>
                    <div class="opt">
                        <div>
                            <img src="" alt="">
                            <button class="atten">关注</button>
                        </div>
                        <div class="dsp">
                            <!-- 点赞 -->
                            <span>
                                <button @click=" ">
                                    <span class="iconfont icon-dianzan"></span>
                                    <span>123</span>
                                </button>
                            </span>
                            <!-- 收藏 -->
                            <span>
                                <button @click=" ">
                                    <span class="iconfont icon-shoucang"></span>
                                    <span>12</span>
                                </button>
                            </span>
                            <!-- 评论 -->
                            <span class="comment">
                                <!-- 评论图标 -->
                                <button @click="display">
                                    <span class="iconfont icon-pinglun"></span>
                                    <span>12</span>
                                </button>
                            </span>
                        </div>
                    </div>
                </el-main>
                <el-footer v-show="isVisible">
                    <Footer/>
                </el-footer>
            </el-container>
            <el-aside style="width: 20%;">
                <Aside style="padding-left: 10px;"/>
            </el-aside>
        </el-container>
    </div>
</template>

<script setup>
import Aside from './Aside.vue'
import Footer from './Footer.vue'
import { onMounted, ref } from 'vue'

//点击评论 footer评论展示
const isVisible = ref('true')
function display() {
    isVisible.value = true
}

</script>

<style>
.el-aside {
    padding: 20px 15px 0 0;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 986px; */
    /* overflow-x: hidden; */
}

.header div .name {
    display: inline-block;
    text-align: center;
    margin-left: 15px;
}

.opt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: bisque; */
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    height: 50px;
    margin-top: 10px;
}

.opt img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
}

.opt .atten {
    border-radius: 17px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 7px;
}

.dsp>span {
    margin-right: 20px;
    cursor: pointer;
}

.dsp .comment {
    margin-right: 90px;
}

/* 评论按钮 */
.dsp button {
    border: 0;
    background-color: #fff;
    cursor: pointer;
}

.dsp button span {
    font-size: 21px;
}
</style>