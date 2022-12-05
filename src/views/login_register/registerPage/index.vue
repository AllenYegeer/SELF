<template>
  <el-container style="display: flex; justify-content: center">
    <div style="background: #ffffff">
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

          <el-form-item label="性&nbsp&nbsp&nbsp&nbsp别：" prop="sex" required>
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

          <el-form-item label="年&nbsp&nbsp&nbsp&nbsp龄：" prop="age" required>
            <el-input
              v-model.number="user_info.age"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="10px" style="margin-top: 25px">
            <el-button
              @click="upLoadInfo(ruleFormRef)"
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
import store from "../../../store";
import { isPassword,isPhone} from '@/utils/authentify/index';
const emit = defineEmits(["changeVisible"]);
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
  if (value === "") {
    return callback(new Error("请输入用户名"));
  } else if(value.length < 5 || value.length > 8){
    return callback(new Error('用户名的长度为5-8位'))
  } else {
    callback();
  }
};

const checkAge = (rule: any, value: any, callback: any) => {
  if (value === "") {
    return callback(new Error("请输入年龄"));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      return callback(new Error("年龄只能是数字"));
    } else if (value < 14 || value > 75) {
      return callback(new Error("请输入正确的年龄,只能在14 - 75"));
    } else callback();
  }, 500);
};

const checkPhone = (rule: any, value: any, callback: any) => {
  if (value === "") return callback(new Error("请输入手机号"));
  else if (!isPhone(value)) {
    return callback(new Error("请填写正确手机号码"));
  } else callback();
};
const checkPass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (value !== "") {
      if (!ruleFormRef.value) return;
      else if (!isPassword(value)){
        callback(new Error())
        error('首位必须是大小写字母,且由字母和数字组成,长度至少是6位')
      }
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

const upLoadInfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {
      const res = await register_({
        username: user_info.value.username,
        gender: user_info.value.sex,
        phone: user_info.value.phoneNum,
        password: user_info.value.password,
        age: user_info.value.age,
      });
      if (res.code === "100") {
        router.push("/home");
        emit("changeVisible", 1);
        Object.keys(user_info.value).forEach((key) => {
          user_info.value[key] = "";
        });
      }
    } else {
      error('请按要求填写')
      return false;
    }
  });
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