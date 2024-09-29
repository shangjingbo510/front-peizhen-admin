<template>
  <div>
    <el-form :model="queryForm" label-width="80px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input size="small" v-model="queryForm.categoryName" placeholder="请输入分类名称" clearable></el-input>
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
        <el-table-column prop="categoryName" label="分类名称" align="center"></el-table-column>
        <el-table-column prop="categoryDesc" label="分类描述" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="updateInfo(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
         <el-button type="primary" class="export" size="small" @click="toExport">导出</el-button>
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

    <el-dialog title="修改分类" :visible.sync="editShow" width="40%">
      <el-form label-width="80px" :rules="rules" ref="formEdit" :model="editForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类名称" prop="categoryName">
              <el-input v-model="editForm.categoryName" size="small" maxlength="30" placeholder="分类名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类描述" prop="categoryDesc">
              <el-input size="small" v-model="editForm.categoryDesc" placeholder="分类描述" maxlength="50" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dialog-footer">
          <el-button size="small" type="button" @click="editShow = false">取消</el-button>
          <el-button size="small" type="primary" @click="submitForm()">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { schoolCategoryList, schoolCategoryUpdate } from "@/api/videoManage";
export default {
  components: {},
  data() {
    return {
      queryForm: {
        categoryName: "",
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      editShow: false,
      editForm: {
        id: '',
        categoryName: "",
        categoryDesc: ''
      },
      rules: {
        categoryName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入分类名称"
          }
        ]
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
      schoolCategoryList(this.queryForm)
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
    updateInfo(row) {
      this.editForm = row;
      this.editShow = true;
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          delete this.editForm.createTime;
          schoolCategoryUpdate(this.editForm).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.editShow = false;
              this.queryTable();
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
.el-select,
.el-date-picker {
  width: 76%;
}
</style>
