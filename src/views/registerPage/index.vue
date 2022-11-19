<template>
  <div class="register">
    <el-form
      status-icon
      label-width="120px"
      class="demo-ruleForm"
      :model="user_info"
      :rules="rules"
       ref="ruleFormRef"
    >
      <el-form-item label="用户名：" prop="username" required>
        <el-input type="text" v-model="user_info.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="性别：" prop="sex" required>
        <el-radio-group v-model="user_info.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="手机号：" prop="phoneNum" required>
        <el-input type="text" v-model.number="user_info.phoneNum" autocomplete="off" > </el-input>
      </el-form-item>

      <el-form-item label="密码：" prop="password" required>
        <el-input type="text" v-model="user_info.password" show-password autocomplete="off" > </el-input>
      </el-form-item>

      <el-form-item label="年龄：" prop="age" required>
        <el-input  v-model.number="user_info.age" autocomplete="off" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="upLoadInfo" type="primary" round>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref } from "@vue/reactivity";
import type { FormInstance } from 'element-plus'
import {register_} from '@/utils/register'

const ruleFormRef = ref<FormInstance>()
const user_info = ref({
  phoneNum: "",
  password: "",
  confirmPassword: "",
  age: "",
  username: "",
  sex: "男",
});

const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }else{
    callback()
  }
}

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入年龄'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      return callback(new Error('年龄只能是数字'))
    }
  }, 500)
}

const checkPhone = (rule: any, value: any, callback: any) => {
    if (!value) return callback(new Error('请输入手机号'))
    else if (value.toString().length != 11){
        return callback(new Error('手机号的长度必须是11位'))
    }
    else if (!Number.isInteger(value)) {
      callback(new Error('手机号只能是数字'))
    }
}
const checkPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (user_info.value.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}

const rules = reactive({
    username: [{validator: checkUsername, trigger: 'blur' }],
    phoneNum: [{validator: checkPhone,  trigger: 'blur' }],
    password: [{validator: checkPass,trigger: 'blur' }],
    age: [{validator: checkAge, trigger: 'blur' }],
})
const upLoadInfo = () => {
  register_(
    {
        username: user_info.value.username,
        gender: user_info.value.sex,
        phone: user_info.value.phoneNum,
        password: user_info.value.password,
        age: user_info.value.age
    }
  )
};
</script>

<style scoped>
.register {
  height: 360px;
  width: 400px;
  margin: 100px auto;
  background-color: aqua;
  padding: 30px 30px;
  border-radius: 50px;
}
</style>