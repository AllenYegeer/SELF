<template>
  <div class="common-layout" style="background: #f6f6f6;" >
    <el-container  >
      <el-header style="background:#FFFFFF;" >Header</el-header>
      <el-container>
        <el-aside width="20%" style="background:#FFFFFF;">Aside</el-aside>
        <div>
         <el-main style="margin:20px;width:80%;background:#FFFFFF"  >
          <div style="min-height:500px">
            <div><h3>我的喜欢</h3></div>
              <el-divider /><!--这里是分割线-->
            <div>
              <el-descriptions title="这里是文章标题" column="2" >
                <el-descriptions-item class="img">
                   <div class="demo-image">
                    <div class="block">
                      <span class="demonstration"></span>
                      <el-image style="width: 120px; height: 80px" :src="url" fit="contain" />
                    </div>
                  </div>
              </el-descriptions-item>
             
            <el-descriptions-item label="文章简介">
              <div>
                <p>
                  可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。
                  可通过 scroll-container 来设置滚动容器， 若未定义，则为最近一个 overflow 
                  值为 auto 或 scroll 的父元素。
                </p>
              </div>
              
            </el-descriptions-item>
            <el-descriptions-item label="文章作者" >
              <span>{{user}}</span>
            </el-descriptions-item>
            <el-descriptions-item label="">
            <span style="padding-right:5px"><el-tag size="small">{{time}}</el-tag></span>            
            <span style="padding-left:5px">
              <el-tag size="small">
                <span class="iconfont icon-dianzan"></span><!--点赞图标但不能点，文件在iconfont文件夹 -->
                </el-tag>
                </span>   
              
              </el-descriptions-item>
            </el-descriptions>
            <el-divider style="margin:0" />
              </div>   
              
        </div>
        
        </el-main>
        <el-footer style="background:#FFFFFF;" >
           <!-- 这里是分页，应该居中的但没找到居中的方法，后面再改-->
          <div class="pagination" style="margin-left:15%">
             <el-pagination background layout="prev, pager, next" :total="1000" />
          </div>
        </el-footer>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity"

const user = ref('张三')
const time = ref('2022/11/18')
const fit = ref('contain')
const url =
  ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
</script>

<style scoped>

.demo-image .block {
  /* padding: 30px 0; */
  text-align: left;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  margin: auto;
}



</style>