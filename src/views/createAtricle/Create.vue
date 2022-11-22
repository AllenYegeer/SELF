<template>
  <div class="common-layout">
    <el-container>
      <el-main style="background: #f6f6f6">
        <div class="createArticle" style="background: #ffffff">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
          >
            <!-- 以下是文章标题 -->
            <el-form-item
              label=""
              prop="head"
              label-width="auto"
              style="margin-bottom: auto"
            >
              <el-input
                class="head"
                v-model="ruleForm.head"
                placeholder="请输入文章标题"
                style="height: 100px; font-size: large"
              />
            </el-form-item>
            <el-divider border-style="double" style="margin-top: auto" />
            <!-- 以下是文章简介 -->
            <el-form-item label="" prop="summary" label-width="auto">
              <el-input
                class="summary"
                v-model="ruleForm.summary"
                placeholder="请输入简介"
                type="textarea"
              />
            </el-form-item>
            <el-divider border-style="double" style="margin-bottom: auto" />
            <!-- 以下是文章正文 -->
            <el-form-item label="" prop="txt" label-width="auto">
              <el-input
                class="txt"
                v-model="ruleForm.txt"
                placeholder="请输入正文"
                type="textarea"
              />
            </el-form-item>
            <el-divider border-style="double" style="margin-bottom: auto" />
            <!-- 以下是文章种类单选框 -->
            <el-form-item label="文章类型：" prop="type" required>
              <el-radio-group v-model="ruleForm.type">
                <el-radio label="学习" />
                <el-radio label="生活" />
                <el-radio label="求职" />
              </el-radio-group>
            </el-form-item>
            <!-- 以下是传入图片 -->
            <el-form-item label="添加图片：">
              <el-upload
                class="uploader"
                action="http://47.109.58.84:9090/file/upload"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :before-upload="beforeUpload"
                :on-error="failToUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="cover" />
                <el-icon v-else class="icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>

            <!-- 以下是发布和取消按钮 -->

            <el-form-item style="display: flex; flex-direction: row-reverse">
              <el-button type="primary" @click="submitForm(ruleFormRef)"
                >发布</el-button>

              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { publishArticle_ } from "@/utils/user/publishArticle";
import type { UploadProps } from "element-plus";
import { success,error } from "@/utils/popup/message";
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  head: "",
  type: "",
  summary: "",
  txt: "",
});
// 以下的图片的script
const imageUrl = ref();

const rules = reactive<FormRules>({
  head: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    { min: 1, max: 20, message: "标题不超过二十个字", trigger: "blur" },
  ],

  type: [
    {
      required: true,
      message: "请选择文章类型",
      trigger: "change",
    },
  ],
  summary: [{ required: true, message: "请填写文章简介", trigger: "blur" }],
  txt: [{ required: true, message: "请输入文章正文", trigger: "blur" }],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  //发布文章
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      const userId = sessionStorage.getItem("userId");
      publishArticle_({
        cover: imageUrl.value,
        head: ruleForm.value.head,
        summary: ruleForm.value.summary,
        txt: ruleForm.value.txt,
        type: ruleForm.value.type,
        userId: userId,
      });
    } else {
       //如果有空，则发不了
      error("请按规定填写内容")
    }
  });
};
const failToUpload = () => {
  error("图片上传失败,请重新上传!")
};
const resetForm = (formEl: FormInstance | undefined) => {
  //重置
  if (!formEl) return;
  formEl.resetFields();
};

/* const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
})) */

const uploadSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  success("图片上传成功")
  imageUrl.value = uploadFile.response;
};

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    error("文件的后缀名必须是JPG格式,请重新上传!")
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    error("文件的大小不能超过2MB,请重新上传!")
    return false;
  }
  return true;
};
</script>

<style scoped>
.uploader .cover {
  width: 178px;
  height: 178px;
  display: block;
}
.head:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0; /*去除边框*/
}
.head :deep(.el-input__inner) {
  color: #000000;
  font-size: 32px;
}
.txt :deep(.el-textarea__inner) {
  box-shadow: 0 0 0 0; /*去除边框*/
  resize: none;
  font-size: 16px;
  color: #121212;
  height: 400px;
}
.summary :deep(.el-textarea__inner) {
  box-shadow: 0 0 0 0; /*去除边框*/
  resize: none;
  font-size: 16px;
  color: #121212;
  line-height: 2px;
}
</style>
<style>
/* 以下是图片的样式 */
.uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 100px;
  text-align: center;
}
/* 以上是图片的样式 */
.createArticle {
  width: 840px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  padding: 0 20px;
  position: relative;
}
</style>
