<template>
    <div class="inner">
        <div class="top">
            评论
            <span>12</span>
        </div>
        <!-- 中间区域 评论列表 -->
        <div class="comment_list">
            <div class="c_list">
                <ul class="pinglun">
                    <li>
                        <div>
                            <!-- 头像 -->
                            <img src="" alt="">
                            <div>
                                <div>
                                    <span>名字</span>
                                    <span>时间</span>
                                </div>
                                <div>内容</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 发表评论 -->
        <div class="public">
            
            <el-input class="commentDeep" v-model="textarea2" :autosize="{ minRows: 2, maxRows: 4 }" 
            type="textarea"  placeholder="评论千万条，友善第一条" />
            
            <el-button type="primary" style="height:58px; border-radius: inherit;">发布</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";


// props:['comments'],

const textarea2 = ref('')


</script>

<style scoped>
.commentDeep :deep(.el-textarea__inner){
  box-shadow: 0 0 0 0;
  resize:none;
  font-size: 16px; 
  color: #000000;
  padding: 5px 0;
}


</style>

<style>
.top {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.comment_list {
    display: flex;
    flex-direction: column;
    /* width: 700px; */
    margin: 0 auto;

}

.c_list {
    margin-bottom: 70px;
}

ul {
    list-style: none;
    padding: 0;
}
.pinglun li{
    margin-bottom: 10px;
}

.pinglun li > div{
    display: flex;
}
.pinglun li div span{
    margin-right: 10px;
}

.pinglun img{
    margin-right: 10px;
}

.public {
    display: flex;
    box-sizing:borderbox;
    border:1pt solid #409eff;
    justify-content: space-around;
    bottom: 2px;
    position: fixed;
    width: 75%;
    
}
</style>