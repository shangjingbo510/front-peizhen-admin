<template>
  <div class="padding-20">
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人姓名" prop="applyName">
            <el-input size="small" v-model="queryForm.applyName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务编号" prop="serviceCode">
            <el-input size="small" v-model="queryForm.serviceCode" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起始日期" prop="startTime">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="queryForm.startTime"
              :picker-options="pickerOptions"
              size="medium"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="终止日期" prop="endTime">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="queryForm.endTime"
              :picker-options="pickerOptions"
              size="medium"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
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
        <el-table-column prop="serviceCode" label="服务编号" align="center"></el-table-column>
        <el-table-column prop="serviceTitle" label="服务标题" width="140" align="center"></el-table-column>
        <el-table-column prop="customerName" label="申请人姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="expertName" label="服务分类" width="140" align="center"></el-table-column>
        <el-table-column prop="masterName" label="客户姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="auditStatusText" label="审核状态" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleCheck(scope.row.serviceId)"
              class="textBtn"
            >审核</el-button>
            <!-- <el-button
              type="text"
              @click="delItem(scope.row)"
              class="textBtn"
              style="color: #ff5b5b;"
            >删除</el-button> -->
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

    <el-dialog title="审核详情" :visible.sync="checkModalDialog" width="40%">
      <div class="padding-20">
        <el-form
          ref="checkForm"
          :model="checkForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="审核内容说明">
                <el-input
                  v-model="checkForm.auditContent"
                  size="medium"
                  maxlength="50"
                  placeholder="请填写审核内容说明"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" type="primary" @click="handleAudit(2)">审核不通过</el-button>
                <el-button size="small" type="primary" @click="handleAudit(1)">审核通过</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  serviceProcessList,
  serviceCategoryDelete,
  serviceProcessAudit
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryForm: {
        applyName: "", //申请人姓名
        serviceCode: "", //服务编号
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      checkModalDialog: false,
      checkForm: {
        id: '',
        auditContent: '' //审核内容
      }
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
      serviceProcessList(this.queryForm)
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
    changePageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    //审核
    handleCheck(id){
      this.checkForm.id = id;
      this.checkModalDialog = true;
      this.checkForm.auditContent = '';
    },
    //审核
    async handleAudit(status){
      if(!this.checkForm.auditContent){
        return this.openMessage('请填写审核内容说明', "err");
      }
      let res = await serviceProcessAudit({
        auditContent: this.checkForm.auditContent,
        auditStatus: status,
        serviceId: this.checkForm.id
      })
      if(res.code == 1){
        this.checkModalDialog = false;
        this.queryTable();
        this.openMessage(res.message, "suc");
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //删除服务
    delItem(row){
      this.$confirm('即将删除该服务内容，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await serviceCategoryDelete(row.id);
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
