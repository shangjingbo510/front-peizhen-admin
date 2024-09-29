<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input size="small" v-model="queryForm.roleName" placeholder="支持模糊查询"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="queryTable()">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="inline-bg"></div>

    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePageSize($event)"
            @current-change="changepageNum($event)"
            :current-page="queryForm.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="修改角色信息" :visible.sync="editShow" width="40%">
      <el-form label-width="120px" ref="formEdit" :model="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="editForm.roleName" size="small" placeholder="请输入" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色描述" prop="roleDesc">
              <el-input v-model="editForm.roleDesc" size="small" placeholder="请输入" maxlength="200" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
        </el-row>
        <div class="dialog-footer">
          <el-button type="button" size="small" @click="editShow = false">取消</el-button>
          <el-button type="primary" size="small" @click="submitForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getMenuTree, roleUpdate, roleDelete } from "@/api/userManage";
export default {
  components: {},
  data() {
    return {
      queryForm: {
        roleName: "",
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      editShow: false,
      editForm: {
        roleId: '',
        roleName: "",
        roleDesc: "",
        menuIdList: []
      },
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'menuName'
      }
    };
  },
  mounted(){
    this.queryTable();
  },
  methods: {
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      getRoleList(this.queryForm)
        .then(res => {
          if (res.code == 1) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else {
            this.tableData = [];
            this.total = 0;
            this.openMessage(res.message, "err");
          }
        })
        .catch(err => {
          console.log("err");
        })
        .finally(() => {
          this.tableLoading = false;
          this.update = false;
        });
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changepageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    //编辑
    async handleEdit(row) {
      this.editForm.roleName = row.roleName;
      this.editForm.roleDesc = row.roleDesc;
      this.editForm.roleId = row.id;
      this.editShow = true;
      //获取菜单树
      let res = await getMenuTree({roleId: row.id});
      if(res.code == 1){
        this.treeData = res.data;
        this.$nextTick(() => {
          let ids = [];
          res.data.forEach(item => {
            let flag = item.childList.every(child => child.selectFlag == 1);
            if(item.selectFlag == 1 && flag){
              ids.push(item.id);
            }
            item.childList.forEach(subItem => {
              if(subItem.childList.length > 0){
                let subFlag = subItem.childList.every(subChild => subChild.selectFlag == 1);
                if(subItem.selectFlag == 1 && subFlag){
                  ids.push(subItem.id);
                }
                subItem.childList.forEach(thirdItem => {
                  if(thirdItem.selectFlag == 1){
                    ids.push(thirdItem.id);
                  }
                })
              }else{
                if(subItem.selectFlag == 1){
                  ids.push(subItem.id);
                }
              }
            })
          })
          this.$refs.tree.setCheckedKeys(ids);
        })
      }else{
        this.treeData = [];
      }
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          let childKeys = this.$refs.tree.getCheckedKeys();
          let parentKeys = this.$refs.tree.getHalfCheckedKeys();
          this.editForm.menuIdList = childKeys.concat(parentKeys);
          roleUpdate(this.editForm).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.editShow = false;
              this.queryTable();
              location.reload();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        } else {
          return false;
        }
      });
    },
    //删除角色
    handleDelete(id){
      this.$confirm('确定删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await roleDelete(id);
          if(res.code == 1){
            this.openMessage(res.message, "suc");
            this.queryTable();
            location.reload();
          }else{
            this.openMessage(res.message, "err");
          }
        }).catch();
    },
  }
};
</script>

<style lang='scss' scoped>
.el-input,
.el-select,
.el-date-picker {
  width: 76%;
}
.tree-box{
  max-height: 400px;
  overflow: auto;
}
</style>
