<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="menuName">
            <el-input size="small" v-model="queryForm.menuName" placeholder="请输入" clearable></el-input>
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
        <el-table-column prop="menuName" label="菜单名称" align="center"></el-table-column>
        <el-table-column prop="parentMenuName" label="父级菜单名称" align="center"></el-table-column>
        <el-table-column prop="isLeafText" label="是否子节点" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row.id)" size="small">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
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

    <el-dialog title="编辑菜单" :visible.sync="editShow" width="50%">
      <el-form label-width="120px" ref="formEdit" :model="editForm" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="editForm.menuName" size="small" placeholder="请输入" maxlength="30" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单路径" prop="menuUrl">
              <el-input v-model="editForm.menuUrl" size="small" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="父级菜单" prop="parentId">
              <el-select
                v-model="editForm.parentId"
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
        <div class="dialog-footer">
          <el-button type="button" size="small" @click="editShow = false;">取消</el-button>
          <el-button type="primary" size="small" @click="submitForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { menuList, menuDetail, menuUpdate, menuDelete } from "@/api/userManage";
export default {
  components: {},
  data() {
    return {
      queryForm: {
        menuName: "",
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      editShow: false,
      editForm: {
        id: '',
        menuName: "",
        remarks: "",
        idArr: []
      },
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
      },
      menuList: [],
    };
  },
  mounted(){
    this.queryTable();
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
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      menuList(this.queryForm)
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
    async handleEdit(id) {
      let res = await menuDetail(id);
      if(res.code == 1){
        this.editForm = res.data;
        this.editForm.parentId = res.data.parentId === 0 ? null : res.data.parentId;
        this.editShow = true;
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //删除
    handleDelete(id){
      this.$confirm('确定删除该菜单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await menuDelete(id);
          if(res.code == 1){
            this.queryTable();
            this.openMessage(res.message, "suc");
          }else{
            this.openMessage(res.message, "err");
          }
        }).catch();
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          menuUpdate(this.editForm).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.editShow = false;
              this.queryTable();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        } else {
          return false;
        }
      });
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
