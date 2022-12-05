<template>
  <div calss="userInfo_bottom">
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template #extra>
          <el-button v-if="props.userId == userId" type="primary" circle @click="changeVisible"><el-icon><EditPen/></el-icon></el-button>
        </template>
        <el-descriptions-item>
          <template #label> 
            <i class="iconfont icon-xiugaitouxiang"></i>
            头像
          </template>
          <img v-if="userId === props.userId" class="img" :src="imgurl ||imgUrl" alt="" />  <!-- 是用户显示用户头像 -->
          <img v-else :src="props.info.headportait" class="img"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-zhanghao"></i>
            手机号
          </template>
         {{props.info.phoNum}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-nicheng1"></i>
            昵称
          </template>
          {{props.info.user_name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-nianling"></i>
            年龄
          </template>
         {{props.info.age}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-tongxingbie"></i>
            性别
          </template>
          {{props.info.gender}}
        </el-descriptions-item>
        <!-- <el-descriptions-item>
          <template #label>
            <i class="el-icon-message"></i>
            邮箱Email
          </template>
          11111
        </el-descriptions-item> -->
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-zhiye"></i>
            职业
          </template>
          {{props.info.profession}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-register"></i>
            地区
          </template>
        {{props.info.address}}
        </el-descriptions-item>
       <!--  <el-descriptions-item>
          <template #label>
            <i class="el-icon-office-building"></i>
            职业
          </template>
          11111
        </el-descriptions-item> -->

        <!-- <el-descriptions-item>
          <template #label>
            <i class="el-icon-basketball"></i>
            兴趣爱好
          </template>
          11111
        </el-descriptions-item> -->
     <!--    <el-descriptions-item>
          <template #label>
            <i class="el-icon-magic-stick"></i>
            个性签名
          </template>
        </el-descriptions-item> -->
       <!--  <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-register"></i>
            注册日期
          </template>
        </el-descriptions-item> -->
      </el-descriptions>
    </el-card>
   
    <el-dialog
      title="个人信息修改"
      v-model="visible"
      :before-close="changeVisible"
      append-to-body="true"
      class="grxg"
    >
    <updata @changeInfo="changeInfo" @changeVisible="changeVisible" :userInfo="props.info"></updata>
    </el-dialog>
    
  </div>
</template>

<script setup>
import { computed, ref,onMounted } from 'vue';
import updata from '@/components/update/index.vue'
import store  from '../../store';
const props = defineProps(['info','userId'])
const emit = defineEmits(['changeInfo'])
const visible = ref(false)  //个人信息修改界面的可见性
const imgUrl = ref(computed(() => sessionStorage.getItem('imgUrl')))
const imgurl = ref(computed (() => store.state.url))
const userId = sessionStorage.getItem('userId')
const changeVisible = () =>{  //修改个人信息修改界面的可见性
  visible.value = !visible.value
}

const changeInfo = (info) =>{
  emit('changeInfo',info)
}
</script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
}
i {
  margin-right: 3px;
}
</style>
<style>
  .grxg{
    min-width: 450px;
  }
</style>
