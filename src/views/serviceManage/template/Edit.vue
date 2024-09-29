<template>
  <div>
    <el-page-header @back="goBack" :content="headerTitle"></el-page-header>
    <el-divider></el-divider>
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
              maxlength="50"
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
  contractTemplateDetail,
  contractTemplateUpdate
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      headerTitle: '编辑电子合同模板',
      id: this.$route.params.id,
      viewFlag: this.$route.query.flag == 'view' || false,
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
    //如果是点击查看按钮进来的
    if(this.viewFlag){
      this.headerTitle = '电子合同详情';
    }
    //获取电子合同详细信息
    this.getDetail();
  },
  methods: {
    //获取电子合同详细信息
    async getDetail(){
      let res = await contractTemplateDetail(this.id);
      if(res.code == 1){
        this.form = res.data;
      }else{
        this.openMessage(res.message, "err");
      }
    },
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
    goBack() {
      this.$router.go(-1);
    },
    //保存
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          contractTemplateUpdate(this.form).then((res) => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.goBack();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      });
    }
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
