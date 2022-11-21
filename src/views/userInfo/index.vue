<template>
    <div style="margin-left:100px;border:1px solid red">
        <div class="user_top">
            <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634" alt="">
            <div class="top-r">
                <span>miaomiao</span>
                <div>
                    <!-- 关注 -->
                    <span>
                        <el-button type="primary"
                            style="width: 20px;height: 10px;background-color: #fff;border: 0;color: #000;font-size: 16px;margin-bottom: 2px;"
                            @click="drawer_atten = true">
                            关注
                        </el-button>
                        <!-- 关注列表 -->
                        <el-drawer v-model="drawer_atten" title="关注列表" :direction="direction"
                            :before-close="handleClose">
                            <ul class="gfw_list">
                                <li>
                                    <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634"
                                        alt="">
                                    <span>用户名</span>
                                </li>
                                <li>
                                    <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634"
                                        alt="">
                                    <span>用户名</span>
                                </li>
                                <li>
                                    <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634"
                                        alt="">
                                    <span>用户名</span>
                                </li>
                            </ul>
                        </el-drawer>
                        <span>45</span>
                    </span>
                    <!-- 粉丝 -->
                    <span>
                        <el-button type="primary"
                            style="width: 20px;height: 10px;background-color: #fff;border: 0;color: #000;font-size: 16px;margin-bottom: 2px;"
                            @click="drawer_fans = true">
                            粉丝
                        </el-button>
                        <!-- 粉丝列表 -->
                        <el-drawer v-model="drawer_fans" title="粉丝列表" :direction="direction"
                            :before-close="handleClose">
                            <ul class="gfw_list">
                                <li>
                                    <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634"
                                        alt="">
                                    <span>用户名</span>
                                </li>
                                <li>
                                    <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634"
                                        alt="">
                                    <span>用户名</span>
                                </li>
                                <li>
                                    <img src="http://thirdqq.qlogo.cn/g?b=sdk&k=SxqsWBQ7OMbaENiaAyfsb0g&s=140&t=1665829634"
                                        alt="">
                                    <span>用户名</span>
                                </li>
                            </ul>
                        </el-drawer>
                        <span>45</span>
                    </span>
                    <!-- 文章 -->
                    <span>
                        <el-button type="primary"
                            style="width: 20px;height: 10px;background-color: #fff;border: 0;color: #000;font-size: 16px;margin-bottom: 2px;"
                            @click="drawer_atic = true">
                            文章
                        </el-button>
                        <!-- 文章列表 -->
                        <el-drawer v-model="drawer_atic" title="文章列表" :direction="direction"
                            :before-close="handleClose">
                            <ul class="gfw_list text_list">
                                <li>
                                    <span>
                                        <h3>标题</h3>
                                    </span>
                                    <span>简介</span>
                                </li>
                                <li>
                                    <span>
                                        <h3>标题</h3>
                                    </span>
                                    <span>简介</span>
                                </li>
                                <li>
                                    <span>
                                        <h3>标题</h3>
                                    </span>
                                    <span>简介</span>
                                </li>
                            </ul>
                        </el-drawer>
                        <span>45</span>
                    </span>
                </div>
            </div>
        </div>
        <!-- 个人信息 -->
        <div class="message">个人信息</div>
        <el-form label-width="100px" :model="formLabelAlign" style="max-width: 460px">
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.name" placeholder="miaomiao" :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formLabelAlign.sex" placeholder="女" :disabled="disabled">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="formLabelAlign.age" :disabled="disabled"/>
            </el-form-item>
            <el-form-item label="职业">
                <el-select v-model="formLabelAlign.profession" placeholder="学生" :disabled="disabled">
                    <el-option label="学生" value="学生" />
                    <el-option label="老师" value="老师" />
                    <el-option label="从业人员" value="从业人员" />
                </el-select>
            </el-form-item>
            <el-form-item label="所在地">
                <el-input v-model="formLabelAlign.region" :disabled="disabled"/>
            </el-form-item>
            <el-form-item>
                <el-button typeof="primary" @click="disabled = false">修改</el-button>
                <el-button type="primary" @click="onSubmit();disabled = true" style="margin-left: 240px;">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const direction = ref('rtl')
// 关注
const drawer_atten = ref(false)
// 粉丝
const drawer_fans = ref(false)
// 文章
const drawer_atic = ref(false)
// 用户名
const disabled = ref(true)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确定关闭？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
// do not use same name with ref
const formLabelAlign = reactive({
    name: '',
    region: '',
    age: '',
    sex: '',
    profession: '',
})

const onSubmit = () => {
    console.log('submit!')
}
</script>

<style>
img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
}

.user_top {
    display: flex;
}

.top-r {
    margin-left: 10px;
}

.top-r div>span {
    margin-right: 10px;
}

.message {
    margin-top: 30px;
}

.el-form {
    padding: 20px;
}
/* 关注列表 */
.gfw_list li{
    margin-bottom: 20px;
}
.gfw_list li span{
    margin-left: 10px;
}
.text_list li span{
    margin-left: 0;
}

</style>