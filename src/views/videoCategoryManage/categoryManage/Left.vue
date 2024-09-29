<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input size="small" v-model="form.categoryName" placeholder="请输入分类名称" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类描述" prop="categoryDesc">
            <el-input size="small" v-model="form.categoryDesc" placeholder="请输入分类描述" maxlength="50" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { schoolCategoryAdd } from "@/api/videoManage";
export default {
  data() {
    return {
      form: {
        categoryName: '',
        categoryDesc: ''
      },
      orgList: [],
      rules: {
        categoryName: [
          {
            required: true,
            trigger: "blur",
            message: "分类名称不可为空"
          }
        ]
      }
    };
  },
  mounted(){
    
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          schoolCategoryAdd(this.form).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc", () => {
                location.reload();
              });
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.el-input,.el-select {
  width: 76%;
}
</style>
