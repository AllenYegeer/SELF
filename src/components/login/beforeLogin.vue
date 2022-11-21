<template>
    <div class="beforeLogin">
        <div class="bt" style="margin-top:10px">
            <el-button type="primary" @click="changeLoginVisible">立 即 登 陆</el-button>
            <el-dialog
                v-model="visibleLogin"
                title="登陆"
                :before-close="changeLoginVisible"
                width="50%"
                append-to-body="true"
            >
                <Login @changeVisible="changeLoginVisible"></Login>
            </el-dialog>
            <el-dialog
                v-model="visibleRegister"
                title="注册"
                :before-close="changeRegisterVisible"
                append-to-body="true"
                style="margin:0 auto"
            >
                <Register @changeVisible="changeRegisterVisible"></Register>
            </el-dialog>
        </div>
        <div class="footer">
            首次使用？<span class="register" @click="changeRegisterVisible">点我注册</span>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Login from '../../views/login_register/loginTo/index.vue'
import Register from '../../views/login_register/registerPage/index.vue'
import router from '@/router';
    const emit = defineEmits(['changeVisBeforLogin'])
    const visibleLogin = ref(false)   //登陆窗口的可见
    const visibleRegister = ref(false)  //注册窗口的可见
    const changeRegisterVisible = (num) => {   //改变注册窗口
        visibleRegister.value = !visibleRegister.value
        console.log(1111111);
        sendToparent(num)
    }

    const changeLoginVisible = (num) => {   //改变登录窗口
        visibleLogin.value = !visibleLogin.value
        sendToparent(num)
    }

    const sendToparent = (num) => {
        if(num === 1)
        emit('changeVisBeforLogin')
    }
</script>
<style lang="scss" scoped>
    .beforeLogin {
       /*  background-color: aquamarine; */
        width: 220px;
        color:rgb(79, 165, 217);
        font-family: "PingFang SC";
        line-height: 28.8px;
        text-size-adjust: 100%;
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        margin: 0 10px;
    }
    .el-button {
        width: 100%;
    }
    .footer {
        font-size: 14px;
        text-align: center;
        color:rgb(33,33,33);
        margin-top: 10px;
    }

    .register {
        color:rgb(79, 165, 217);
        cursor: pointer;
    }

    .el-dialog {
        border-radius: 30px;
    }
</style>>