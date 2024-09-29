<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input size="small" v-model="queryForm.roleName" placeholder="请输入" clearable></el-input>
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
      <el-table :data="tableData" border @row-click="handleSelectionChange">
        <el-table-column prop="radio" width="60" label="选择" align="center">
          <template slot-scope="scope">
            <el-radio v-model="currentRadio" :label="scope.row.id" style="padding-left: 9px">
              <span></span>
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="updateInfo(scope.row)" size="small">查看</el-button>
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

    <div class="table" v-if="showUserList">
      <el-table :data="tableData2" border @selection-change="selUserHanlde">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="loginName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="slockName" label="用户状态" align="center"></el-table-column>
        <el-table-column prop="mail" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="orgName" label="机构权限" align="center"></el-table-column>
        <el-table-column prop="cellphone" label="手机号" align="center"></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
          <el-button class="add-btn" size="medium" type="danger" plain :disabled="disabledRemoveCheckedFlag" @click="removeCheckedHandle">移除选中用户</el-button>
          <el-button class="add-btn" style="left: 120px;" size="medium" type="danger" plain :disabled="disabledRemoveAllFlag" @click="removeAllHandle">用户全移除</el-button>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePageSize2($event)"
            @current-change="changepageNum2($event)"
            :current-page="queryForm2.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            :total="total2"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="菜单权限列表" :visible.sync="editShow" width="40%">
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
          <el-button type="primary" size="small" @click="editShow = false">关闭</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, queryUserByRoleId, removeUserRole, getMenuTree } from "@/api/userManage";
export default {
  data() {
    return {
      queryForm: {
        roleName: "", //角色名称
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      queryForm2:{
        roleId: "", //角色id
        pageNum: 1,
        pageSize: 10
      },
      tableData2: [],
      total2: 0,
      editShow: false,
      editForm: {
        id: '',
        idArr: []
      },
      treeData: [],
      defaultProps: {
        children: 'childList',
        label: 'menuName'
      },
      currentRadio: '',
      multipleSelection: {},
      showUserList: false, //显示根据角色查询的用户列表
      selectedUserList: [],
      disabledRemoveCheckedFlag: true,
      disabledRemoveAllFlag: true
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
      this.currentRadio = '';
      this.tableData2 = [];
      this.total2 = 0;
      this.disabledRemoveCheckedFlag = true;
      this.disabledRemoveAllFlag = true;
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
    //单选行
    handleSelectionChange(row) {
      this.currentRadio = row.id;
      if (row.id) {
        this.queryForm2.roleId = row.id;
        this.queryForm2.pageNum = 1;
        this.queryForm2.pageSize = 10;
        this.showUserList = true;
        this.disabledRemoveCheckedFlag = false
        this.disabledRemoveAllFlag = false
        //根据角色id查询用户列表
        this.queryUserHandle();
      }
    },
    //根据角色id查询用户列表
    async queryUserHandle(pageNum = 1){
      this.queryForm2.pageNum = pageNum;
      let res = await queryUserByRoleId(this.queryForm2);
      if (res.code == 1) {
        this.tableData2 = res.data.list;
        this.total2 = res.data.total;
        this.disabledRemoveCheckedFlag = this.tableData2.length ? false : true;
        this.disabledRemoveAllFlag = this.tableData2.length ? false : true;
      } else {
        this.tableData2 = [];
        this.total2 = 0;
        this.disabledRemoveCheckedFlag = true;
        this.disabledRemoveAllFlag = true;
        this.openMessage(res.message, "err");
      }
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changepageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changePageSize2(val) {
      this.queryForm2.pageSize = val;
      this.queryUserHandle(this.queryForm2.pageNum);
    },
    changepageNum2(val) {
      this.queryForm2.pageNum = val;
      this.queryUserHandle(this.queryForm2.pageNum);
    },
    //查看
    async updateInfo(row) {
      let res = await getMenuTree({roleId: row.id});
      if(res.code == 1){
        this.editForm.id = row.id;
        this.editShow = true;
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
    //复选框
    selUserHanlde(val) {
      this.selectedUserList = val;
    },
    // 移除选中用户
    async removeCheckedHandle() {
      if (!this.selectedUserList.length) {
        this.openMessage('请先选择待移除角色的用户', 'war')
      } else {
        let res = await removeUserRole({
          roleId: this.currentRadio,
          userIdList: this.selectedUserList.map(item => item.id),
          removeAll: 0
        })
        if(res.code == 1){
            this.openMessage(res.message, 'suc')
            //根据角色id查询用户列表
            this.queryUserHandle()
        }else{
          res.message ? this.openMessage(res.message, 'err') : ''
        }
      }
    },
    // 删除所有用户
    removeAllHandle() {
      this.openConfirm({}, '请确认是否收回所有已分配此角色的用户菜单权限？', async () => {
        let res = await removeUserRole({
          roleId: this.currentRadio,
          userIdList: this.selectedUserList.map(item => item.id),
          removeAll: 1
        })
        if(res.code == 1){
            this.openMessage(res.message, 'suc')
            //根据角色id查询用户列表
            this.queryUserHandle()
        }else{
          res.message ? this.openMessage(res.message, 'err') : ''
        }
      })
    }
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
