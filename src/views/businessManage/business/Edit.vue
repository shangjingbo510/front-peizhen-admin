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
          <el-form-item label="业务名称" prop="businessName">
            <el-input
              v-model="form.businessName"
              size="medium"
              maxlength="30"
              placeholder="请输入业务名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务描述" prop="businessDesc">
            <el-input
              type="textarea"
              v-model="form.businessDesc"
              size="medium"
              maxlength="200"
              placeholder="请输入业务描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务编码" prop="businessCode">
            <el-input
              v-model="form.businessCode"
              size="medium"
              maxlength="50"
              placeholder="请输入业务编码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务图片" prop="bannerUrl">
            <el-upload class="titImg-uploader" action="" :auto-upload="false" list-type="picture"
                             :show-file-list="false" :on-change="submitThumbChange" :multiple="false"
                             accept="image/jpeg,image/jpg,image/png">
                <img v-if="form.bannerUrl" class="titImg" :src="form.bannerUrl" />
                <i v-else class="el-icon-plus titImg-uploader-icon"></i>
                <div slot="tip" class="titImgMenuContainer">
                  <span class="titImgTip">上传格式包括jpeg/jpg/png，图片不超过2MB</span>
                </div>
              </el-upload>
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
  businessDetail,
  businessUpdate
} from "@/api/business";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      headerTitle: '编辑业务',
      id: this.$route.params.id,
      viewFlag: this.$route.query.flag == 'view' || false,
      form: {
        businessName: '',
        businessCode: '',
        businessDesc: '',
        bannerUrl: ''
      },
      rules: {
        'businessName': [
          {
            required: true,
            message: "业务名称不可为空",
            trigger: "blur",
          },
        ],
        'businessCode': [
          {
            required: true,
            message: "业务编码不可为空",
            trigger: "change",
          },
          {
            pattern: /^[0-9]+$/,
            message: '业务编码只能输入数字'
          }
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
      this.headerTitle = '业务详情';
    }
    //获取业务详细信息
    this.getDetail();
  },
  methods: {
    //获取业务详细信息
    async getDetail(){
      let res = await businessDetail(this.id);
      if(res.code == 1){
        this.form = res.data;
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //上传
    async submitThumbChange(file) {
      // 检验图片大小
      if (file.size / 1024 > 1024 * 20) {
        this.$message({
          showClose: true,
          message: '照片大小不能超过20MB!',
          type: 'warning'
        })
        return
      }
      let res = await ossUploadFile({
        businessType: 'certificate',
        file: file.raw
      })
      if(res.code == 1){
        this.form.bannerUrl = res.data;
      }else{
        this.form.bannerUrl = '';
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    //保存
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          businessUpdate(this.form).then((res) => {
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
.titImg-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.titImg-uploader .el-upload:hover {
  border-color: #409eff;
}

.titImg-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.titImg {
  max-width: 300px;
  height: 100%;
  display: block;
}
.titImgTip {
  margin-top: 10px;
  display: block;
  color: #666666;
}
</style>
