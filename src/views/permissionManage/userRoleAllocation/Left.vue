<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="loginName">
            <el-input size="small" v-model="queryForm.loginName" placeholder="支持模糊查询"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input size="small" v-model="queryForm.realName" placeholder="支持模糊查询"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构" prop="orgId">
            <el-select v-model="queryForm.orgId" clearable placeholder="请选择" size="small">
              <el-option v-for="item in orgList" :key="item.orgCode" :label="item.orgCode+'-'+item.orgName" :value="item.orgCode"></el-option>
            </el-select>
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
        <el-table-column prop="loginName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="slockName" label="用户状态" align="center"></el-table-column>
        <el-table-column prop="mail" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="orgName" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="cellphone" label="手机号" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="updateInfo(scope.row)" size="small">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
         <!-- <el-button type="primary" class="export" size="small" @click="toExport">导出</el-button> -->
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

    <el-dialog title="待分配角色" :visible.sync="editShow" width="40%">
      <el-form label-width="120px" ref="formEdit" :model="editForm">
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
import { userList, queryRoleByUserId, queryOrgAll, modifyUserRole, groupQueryByUserId, userGroupModify } from "@/api/userManage";
export default {
  data() {
    return {
      queryForm: {
        loginName: "",
        realName: '',
        orgId: '',
        pageNum: 1,
        pageSize: 10
      },
      orgList: [],
      tableLoading: false,
      tableData: [],
      total: 0,
      editShow: false,
      editForm: {
        userId: '',
        roleIdList: []
      },
      treeData: [],
      defaultProps: {
        label: 'roleName'
      }
    };
  },
  mounted(){
    //获取机构权限列表
    this._initOrg();
    this.queryTable();
  },
  methods: {
    //获取机构权限列表
    async _initOrg(){
      let res = await queryOrgAll();
      if(res.code == 1){
        this.orgList = res.data;
      }else{
        this.orgList = [];
      }
    },
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      userList(this.queryForm)
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
    async updateInfo(row) {
      //根据用户id查询角色
      let res = await queryRoleByUserId(row.id);
      if(res.code == 1){
        this.editForm.userId = row.id;
        this.treeData = res.data;
        this.editShow = true;
        let ids = res.data.map(item => {
          if(item.selectFlag == 1){
            return item.id;
          }
        })
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(ids);
        })
      }else{
        this.treeData = [];
      }
    },
    submitForm() {
      this.editForm.roleIdList = this.$refs.tree.getCheckedKeys();
      modifyUserRole(this.editForm).then(res => {
        if (res.code == 1) {
          this.openMessage(res.message, "suc");
          this.editShow = false;
          this.queryTable();
        } else {
          this.openMessage(res.message, "err");
        }
      });
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
