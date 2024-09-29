<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input size="small" v-model="queryForm.name" placeholder="请选择"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input size="small" v-model="queryForm.phone" placeholder="请选择"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户级别" prop="level">
            <el-select
              v-model="queryForm.level"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in enumList.CustomerLevelEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="auditStatus">
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
        <el-table-column prop="code" label="编码" width="140" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="credentialType" label="证件类型" align="center"></el-table-column>
        <el-table-column prop="credentialNo" label="证件号码" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="140" align="center"></el-table-column>
        <el-table-column prop="orgCode" label="所属机构" align="center"></el-table-column>
        <el-table-column prop="level" label="客户级别" width="140" align="center"></el-table-column>
        <el-table-column prop="annualIncome" label="年收入（万元）" width="140" align="center"></el-table-column>
        <el-table-column prop="marital" label="婚姻情况" width="100" align="center"></el-table-column>
        <el-table-column prop="auditStatusText" label="状态" width="120" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人" width="180" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleCheck(scope.row.id)"
              class="textBtn"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
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
  customList
} from "@/api/customManage";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryForm: {
        name: '',
        phone: '',
        level: '', //客户级别
        auditStatus: '', //状态
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
      customList(this.queryForm)
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
    //审核
    handleCheck(id){
      this.$router.push({
        path: '/customManage/checkDetail/' + id + '?flag=view'
      })
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changePageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
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
