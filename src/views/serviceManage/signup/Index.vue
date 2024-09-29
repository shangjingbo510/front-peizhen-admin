<template>
  <div class="padding-20">
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="起止日期" prop="startTime">
            <el-date-picker
              v-model="queryForm.dateTime"
              type="daterange"
              range-separator="至"
              size="medium"
              start-placeholder="起始日期"
              end-placeholder="截止日期"
              value-format="yyyy-MM-dd"
              @change="handleDateChange">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请合伙人姓名" prop="applyName">
            <el-input size="small" v-model="queryForm.applyName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户姓名" prop="customerName">
            <el-input size="small" v-model="queryForm.customerName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理姓名" prop="masterName">
            <el-input size="small" v-model="queryForm.masterName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务审核状态" prop="auditStatus">
            <el-select
              v-model="queryForm.auditStatus"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in enumList.AuditStatusEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务阶段子节点" prop="childNode">
            <el-select
              v-model="queryForm.childNode"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in childNodesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="签署状态" prop="signStatus">
            <el-select
              v-model="queryForm.signStatus"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option label="已签署" value="1"></el-option>
              <el-option label="未签署" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
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
        <el-table-column prop="partnerName" label="合伙人姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="masterName" label="项目经理姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="applyTime" label="服务申请时间" width="140" align="center"></el-table-column>
        <el-table-column prop="auditStatusText" label="服务状态" width="140" align="center"></el-table-column>
        <el-table-column prop="flowStepText" label="服务流程阶段" align="center"></el-table-column>
        <el-table-column prop="childNodeText" label="服务阶段子节点" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleView(scope.row.id)"
              class="textBtn"
            >查看详情</el-button>
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
  getChildNodeListByFlowStep
} from "@/api/common";
import {
  serviceSignList
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryForm: {
        dateTime: [],
        startTime: '',
        endTime: '',
        applyName: "",
        customerName: "",
        masterName: '',
        auditStatus: '',
        // signStatus: '',
        childNode: '',
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      childNodesList: []
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted(){
    this.queryTable();
    //获取服务阶段子节点
    this._getChildNodeListByFlowStep(3);
  },
  methods: {
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      serviceSignList(this.queryForm)
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
    handleDateChange(val){
      if(val && val.length){
        this.queryForm.startTime = val[0];
        this.queryForm.endTime = val[1];
      }else{
        this.queryForm.startTime = '';
        this.queryForm.endTime = '';
      }
    },
    //获取服务阶段子节点
    async _getChildNodeListByFlowStep(val){
      let res = await getChildNodeListByFlowStep(val);
      if(res.code == 1){
        this.childNodesList = res.data;
      }else{
        this.childNodesList = [];
      }
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changePageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    handleView(id){
      this.$router.push({
        path: '/serviceManage/stageManage/signup/detail/' + id
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
</style>
