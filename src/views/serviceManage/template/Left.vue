<template>
  <div class="padding-20">
    <el-form
      ref="submitForm"
      :rules="rules"
      :model="form"
      label-width="140px"
      class="form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="电子合同标题" prop="templateTitle">
            <el-input
              v-model="form.templateTitle"
              size="medium"
              maxlength="30"
              placeholder="请输入电子合同标题"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子合同描述" prop="templateDesc">
            <el-input
              type="textarea"
              v-model="form.templateDesc"
              size="medium"
              maxlength="200"
              placeholder="请输入电子合同描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电子合同模版" class="readonlyItem" prop="attachmentOssUrl">
            <input type="text" class="readonlyInput" v-model="form.attachmentOssUrl" placeholder="请上传" disabled />
            <el-button type="primary" size="small">上传电子合同模版</el-button>
                <el-button type="primary" size="small" v-if="form.attachmentOssUrl" @click="handleDownLoad(form.attachmentOssUrl)">查看</el-button>
            <input type="file" ref="referenceUpload" @change="getFile($event)" class="kio" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item class="text-center">
            <el-button size="small" type="primary" @click="submitForm()"
              >保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  ossUploadFile
} from "@/api/common";
import {
  contractTemplateAdd
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      form: {
        templateId: '101', //上上签上传之后的电子合同模版ID
        templateTitle: '',
        templateDesc: '',
        excelFile: null,
        attachmentOssUrl: ''
      },
      rules: {
        'templateTitle': [
          {
            required: true,
            message: "电子合同标题不可为空",
            trigger: "blur",
          },
        ],
        'attachmentOssUrl': [
          {
            required: true,
            message: "电子合同模版不可为空",
            trigger: "blur",
          },
        ]
      },
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted() {
    
  },
  methods: {
    //上传文件
    async getFile(event) {
      let fileVal = event.target.files[0];
      let fileName = fileVal.name;
      let type = fileName
        .substring(fileName.lastIndexOf('.'), fileName.length)
        .toLowerCase();
      if (type != '.pdf') {
        this.openMessage('仅支持上传pdf格式');
        return;
      }else{
        let res = await ossUploadFile({
          businessType: 'certificate',
          file: fileVal
        })
        if(res.code == 1){
          this.form.excelFile = fileVal;
          this.form.attachmentOssUrl = res.data;
          this.$refs['referenceUpload'].value = null;
        }else{
          this.form.excelFile = null;
          this.form.attachmentOssUrl = '';
          this.$refs['referenceUpload'].value = null;
          this.openMessage(res.message, "err");
        }
      }
    },
    //下载附件
    handleDownLoad(url){
      window.open(url);
    },
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          contractTemplateAdd(this.form).then((res) => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc", () => {
                location.reload();
              });
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      });
    },
  }
};
</script>
<style lang='scss' scoped>
.el-input,
.el-select {
  width: 76%;
}
.readonlyItem {
    width: 700px;
    .readonlyInput {
      width: 328px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #dee1e5;
      position: relative;
    }
    .kio {
      width: 82px;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      text-align: center;
      color: #2e50ff;
      border: 1px solid #2e50ff;
      border-radius: 2px;
      position: absolute;
      right: 148px;
      top: 4px;
      opacity: 0;
    }
  }
</style>
