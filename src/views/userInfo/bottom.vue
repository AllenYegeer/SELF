<template>
  <div calss="userInfo_bottom">
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template #extra>
          <el-button type="primary" circle @click="changeVisible"><el-icon><EditPen /></el-icon></el-button>
        </template>
        <el-descriptions-item>
          <template #label> 
            <i class="iconfont icon-xiugaitouxiang"></i>
            头像
          </template>
          <img class="img" :src="props.info.headportait" alt="" />
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
        <el-descriptions-item>
          <template #label>
            <i class="iconfont icon-register"></i>
            注册日期
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-dialog
      title="个人信息修改"
      v-model="visible"
      :before-close="changeVisible"
      append-to-body="true"
    >
    <updata></updata>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import updata from '@/components/update/index.vue'
const props = defineProps(['info'])
const visible = ref(false)
const changeVisible = () =>{
  visible.value = !visible.value
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
