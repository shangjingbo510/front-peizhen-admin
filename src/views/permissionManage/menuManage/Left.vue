<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input size="small" v-model="form.menuName" placeholder="支持模糊查询" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单路径" prop="menuUrl">
            <el-input v-model="form.menuUrl" size="small" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="父级菜单" prop="parentId">
            <el-select
              v-model="form.parentId"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in menuList"
                :key="item.id"
                :label="item.menuName"
                :value="item.id"
              ></el-option>
            </el-select>
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
import { menuList, menuAdd } from "@/api/userManage";
export default {
  data() {
    return {
      form: {
        menuName: "",
        menuUrl: "",
        parentId: null,
        iconUrl: '',
        sort: 0
      },
      menuList: [],
      rules: {
        menuName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入菜单名称"
          },
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            message: '请输入中文'
          }
        ]
      }
    };
  },
  mounted(){
    this.getMenuList();
  },
  methods: {
    async getMenuList(){
      let res = await menuList({
        "pageNum": 1,
        "pageSize": 100
      });
      if(res.code == 1){
        this.menuList = res.data.list;
      }else{
        this.menuList = [];
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          menuAdd(this.form).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc", ()=> {
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
.tree-box{
  max-height: 400px;
  overflow: auto;
}
</style>
