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
          <el-form-item label="服务类别名称" prop="categoryName">
            <el-input
              v-model="form.categoryName"
              size="medium"
              maxlength="30"
              placeholder="请输入服务类别名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务类型" prop="businessId">
            <el-select
              v-model="form.businessId"
              filterable
              clearable
              placeholder="请输入">
              <el-option
                v-for="item in businessList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务类别编码" prop="categoryCode">
            <el-input
              v-model="form.categoryCode"
              size="medium"
              maxlength="10"
              placeholder="请输入服务类别编码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务类别描述" prop="categoryDesc">
            <el-input
              type="textarea"
              v-model="form.categoryDesc"
              size="medium"
              maxlength="200"
              placeholder="请输入服务类别描述"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务类别图片" prop="bannerUrl">
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
  serviceCategoryAdd
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      form: {
        categoryName: '',
        categoryCode: '',
        categoryDesc: '',
        bannerUrl: '',
        businessId: ''
      },
      rules: {
        'categoryName': [
          {
            required: true,
            message: "服务类别名称不可为空",
            trigger: "blur",
          },
        ],
        'categoryCode': [
          {
            required: true,
            message: "服务类别编码不可为空",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]+$/,
            message: '服务类别编码只能输入数字'
          }
        ],
        'businessId': [{
            required: true,
            message: "业务类型不可为空",
            trigger: "change",
          },
        ]
      },
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList,
      businessList: state => state.app.businessList
    })
  },
  mounted() {
    
  },
  methods: {
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
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          serviceCategoryAdd(this.form).then((res) => {
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
