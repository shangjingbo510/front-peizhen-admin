<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input size="small" v-model="form.roleName" placeholder="支持模糊查询" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="form.roleDesc" size="small" placeholder="请输入" maxlength="200" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分配菜单">
            <div class="tree-box">
              <el-tree
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="id"
                default-expand-all
                :props="defaultProps">
              </el-tree>
            </div>
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
import { getMenuTree, roleAdd } from "@/api/userManage";
export default {
  data() {
    return {
      form: {
        roleName: "",
        roleDesc: "",
        menuIdList: [], //选中角色id
      },
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'menuName'
      },
      rules: {
        roleName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入角色名称"
          }
        ]
      }
    };
  },
  mounted(){
    this.getMenus();
  },
  methods: {
    async getMenus(){
      let res = await getMenuTree({roleId: 0});
      if(res.code == 1){
        this.treeData = res.data;
      }else{
        this.treeData = [];
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let childKeys = this.$refs.tree.getCheckedKeys();
          let parentKeys = this.$refs.tree.getHalfCheckedKeys();
          this.form.menuIdList = childKeys.concat(parentKeys);
          roleAdd(this.form).then(res => {
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
