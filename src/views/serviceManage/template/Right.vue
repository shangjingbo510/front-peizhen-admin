<template>
  <div class="padding-20">
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="电子合同模板" prop="templateId">
            <el-input size="small" v-model="queryForm.templateId" clearable placeholder="请输入"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="电子合同标题" prop="templateTitle">
            <el-input size="small" v-model="queryForm.templateTitle" clearable placeholder="请输入"></el-input>
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
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="templateId" label="电子合同模板ID" width="140" align="center"></el-table-column>
        <el-table-column prop="templateTitle" label="电子合同标题" width="140" align="center"></el-table-column>
        <el-table-column prop="templateDesc" label="电子合同描述" width="140" align="center"></el-table-column>
        <el-table-column label="电子合同模板" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.attachmentOssUrl}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="statusText" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row.id)"
              class="textBtn"
            >修改</el-button>
            <el-button
              type="text"
              @click="handleUpdateStatus(scope.row)"
              class="textBtn"
            >{{scope.row.status == 0 ? '启用' : '禁用'}}</el-button>
            <el-button
              type="text"
              @click="delItem(scope.row)"
              class="textBtn"
              style="color: #ff5b5b;"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
         <!-- <el-button type="primary" class="export" size="small" @click="toExport">导出</el-button> -->
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePageSize($event)"
            @current-change="changePageNum($event)"
            :current-page="queryForm.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="queryForm.pageSize"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  contractTemplateList,
  contractTemplateDelete,
  contractTemplateUpdateStatus
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryForm: {
        // templateId: "",
        templateTitle: "",
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted(){
    this.queryTable();
  },
  methods: {
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      contractTemplateList(this.queryForm)
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
        });
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changePageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    handleEdit(id){
      this.$router.push({
        path: '/serviceManage/template/edit/' + id
      })
    },
    //启用、禁用
    async handleUpdateStatus(row){
      let res = await contractTemplateUpdateStatus({
        id: row.id,
        status: row.status == 1 ? 0 : 1
      });
      if(res.code == 1){
        this.openMessage(res.message, "suc");
        this.queryTable();
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //删除电子合同模板
    delItem(row){
      this.$confirm('即将删除该电子合同模板，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await contractTemplateDelete(row.id);
          if (res.code == 1) {
            this.openMessage(res.message, "suc");
            this.queryTable();
          } else {
            this.openMessage(res.message, "err");
          }
        }).catch();
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
