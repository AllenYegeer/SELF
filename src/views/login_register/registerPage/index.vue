<template>
    <el-container
      style="
        display: flex;
        justify-content: center;
        background-color: rgb(239, 239, 239);
      "
    >
      <div
        style="
          margin: 30px 0;
          padding: 10px 30px;
          background: #ffffff;
        "
      >
        <div style="margin: 20px">
          <img src="@/assets/logo/logo2.jpg" alt="" style="width: 350px" />
        </div>
        <div class="register" style="text-align: center">
          <el-form
            status-icon
            label-width="80px"
            class="demo-ruleForm"
            :model="user_info"
            :rules="rules"
            ref="ruleFormRef"
          >
            <el-form-item label="用户名：" prop="username" required>
              <el-input
                type="text"
                v-model="user_info.username"
                autocomplete="off"
                style="width"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="性&nbsp&nbsp&nbsp&nbsp别："
              prop="sex"
              required
            >
              <el-radio-group v-model="user_info.sex">
                <el-radio label="男" />
                <el-radio label="女" />
              </el-radio-group>
            </el-form-item>

            <el-form-item label="手机号：" prop="phoneNum" required>
              <el-input
                type="text"
                v-model.number="user_info.phoneNum"
                autocomplete="off"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              label="密&nbsp&nbsp&nbsp&nbsp码："
              prop="password"
              required
            >
              <el-input
                type="text"
                v-model="user_info.password"
                show-password
                autocomplete="off"
              >
              </el-input>
            </el-form-item>

            <el-form-item
              label="年&nbsp&nbsp&nbsp&nbsp龄："
              prop="age"
              required
            >
              <el-input
                v-model.number="user_info.age"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="10px" style="margin-top: 25px">
              <el-button
                @click="upLoadInfo"
                type="primary"
                style="padding: 0 140px"
                >注 册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div></el-container
    >
</template>
<script lang='ts' setup>
import { reactive, ref } from "@vue/reactivity";
import type { FormInstance } from "element-plus";
import { register_ } from "@/utils/register";
import { error, success } from "@/utils/popup/message";
import router from "@/router";

const emit = defineEmits(['changeVisible'])
const ruleFormRef = ref<FormInstance>();
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
    return callback(new Error("请输入用户名"));
  } else {
    callback();
  }
};

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入年龄"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      return callback(new Error("年龄只能是数字"));
    }
  }, 500);
};

const checkPhone = (rule: any, value: any, callback: any) => {
  if (!value) return callback(new Error("请输入手机号"));
  else if (value.toString().length != 11) {
    return callback(new Error("手机号的长度必须是11位"));
  } else if (!Number.isInteger(value)) {
    callback(new Error("手机号只能是数字"));
  }
};
const checkPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (user_info.value.password !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  phoneNum: [{ validator: checkPhone, trigger: "blur" }],
  password: [{ validator: checkPass, trigger: "blur" }],
  age: [{ validator: checkAge, trigger: "blur" }],
});
const upLoadInfo = async () => {
  const result = await register_({
    username: user_info.value.username,
    gender: user_info.value.sex,
    phone: user_info.value.phoneNum,
    password: user_info.value.password,
    age: user_info.value.age,
  });
  if (result.code === '100'){
      success('注册成功')
      sessionStorage.setItem('userHeadPortraitUrl',result.data.headportait)
      sessionStorage.setItem('userId', result.data.userid)
      emit('changeVisible',1)
      Object.keys(user_info.value).forEach((key) => {
        user_info.value[key] = ''
      })
  }else{
      error(result.msg)
  }
};
</script>

<style scoped>
</style>
<style>
.register {
  display: flex;
  justify-content: center;
}
</style>