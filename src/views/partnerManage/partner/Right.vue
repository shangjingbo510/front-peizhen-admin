<template>
  <div class="padding-20">
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
          <el-form-item label="合伙人类别" prop="partnerType">
            <el-select
              v-model="queryForm.partnerType"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in enumList.MemberTypeEnum"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合伙人级别" prop="level">
            <el-select
              v-model="queryForm.level"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in enumList.PartnerLevelEnum"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属合伙人" prop="orgCode">
            <el-select v-model="queryForm.orgCode" clearable placeholder="请选择" size="medium">
              <el-option
                v-for="item in orgList"
                :key="item.orgCode"
                :label="`${item.orgCode}-${item.orgName}`"
                :value="item.orgCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推荐人姓名" prop="recommendName">
            <el-input size="small" v-model="queryForm.recommendName" placeholder="请选择"></el-input>
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
        <el-col :span="12">
          <el-form-item label="所在省" prop="province">
            <el-select
              v-model="queryForm.province"
              clearable
              placeholder="请选择"
              size="medium"
              @change="handleProvinceChange"
              @clear="clearProvinceHandle"
            >
              <el-option
                v-for="item in proName"
                :key="item.provinceCode"
                :label="item.provinceName"
                :value="item.provinceCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在市" prop="city">
            <el-select
              v-model="queryForm.city"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in CityName"
                :key="item.cityCode"
                :label="item.cityName"
                :value="item.cityCode"
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
      <div class="mb-10">
        <el-button type="primary" size="small" @click="importFileShowDialog = true">批量导入合伙人</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="code" label="编码" width="140" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="credentialType" label="证件类型" align="center"></el-table-column>
        <el-table-column prop="credentialNo" label="证件号码" align="center" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="140" align="center"></el-table-column>
        <el-table-column prop="orgName" label="所属机构" width="160" align="center"></el-table-column>
        <el-table-column prop="partnerType" label="合伙人类别" width="140" align="center"></el-table-column>
        <el-table-column prop="levelText" label="合伙人级别" width="140" align="center"></el-table-column>
        <el-table-column prop="recommendName" label="推荐人姓名" align="center" width="140"></el-table-column>
        <el-table-column prop="annualIncome" label="年收入（万元）" width="140" align="center"></el-table-column>
        <el-table-column prop="marital" label="婚姻情况" width="100" align="center"></el-table-column>
        <el-table-column prop="auditStatusText" label="状态" width="120" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作人" width="180" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row.id)"
              class="textBtn"
            >修改</el-button>
            <el-button
              type="text"
              @click="handleView(scope.row.id)"
              class="textBtn"
            >查看</el-button>
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

    <el-dialog title="批量导入合伙人" :visible.sync="importFileShowDialog" width="40%">
      <div class="padding-20">
        <el-form
          ref="importForm"
          :rules="importRules"
          :model="importForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="批量导入" class="readonlyItem" prop="file">
                <input type="text" class="readonlyInput" v-model="importForm.file" placeholder="请上传" disabled />
                <el-button type="primary" size="medium" style="margin-right: 10px;">批量导入合伙人</el-button>
                <input type="file" ref="importRef" @change="getFile($event)" class="kio" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label=" ">
                <el-button size="small" type="primary" @click="downloadTemplate">下载模板</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" @click="importFileShowDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitImportForm">保存</el-button>
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
  getOrgProvinceList,
  getOrgCityList,
  ossUploadFile
} from "@/api/common";
import {
  partnerList,
  partnerDelete,
  batchImportPartner
} from "@/api/partnerManage";
import { queryOrgAll } from "@/api/userManage";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      queryForm: {
        name: '',
        phone: '',
        partnerType: '', //合伙人类别
        level: '', //合伙人级别
        orgCode: '', //所属合伙人
        recommendName: '', //推荐人姓名
        auditStatus: '', //状态
        province: '',
        city: '',
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      orgList: [],
      // 省市区列表数据
      proName: [],
      CityName: [],
      importFileShowDialog: false, //批量导入模态框
      importForm: {
        excelFile: null,
        file: ''
      },
      importRules: {
        file: [{
            required: true,
            message: "请上传合伙人",
            trigger: "change",
          },
        ]
      }
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted(){
    //获取机构列表
    this._initOrg();
    this.queryTable();
    //获取所在省数据
    this.getProvinceData();
  },
  methods: {
    //获取机构列表
    async _initOrg() {
      let res = await queryOrgAll();
      if (res.code == 1) {
        this.orgList = res.data;
      } else {
        this.orgList = [];
      }
    },
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      partnerList(this.queryForm)
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
    //获取所在省数据
    async getProvinceData() {
      let res = await getOrgProvinceList();
      if (res.code == 1) {
        this.proName = res.data;
      }
    },
    //省改变事件
    handleProvinceChange(val) {
      if (val) {
        //获取市数据
        this.getCityData(val);
      }
      this.queryForm.city = "";
      this.CityName = [];
    },
    //获取市数据
    async getCityData(code) {
      let res = await getOrgCityList(code);
      if (res.code == 1) {
        this.CityName = res.data;
      } else {
        this.CityName = [];
      }
    },
    //上传文件
    async getFile(event) {
      let fileVal = event.target.files[0];

      let res = await ossUploadFile({
        businessType: 'certificate',
        file: fileVal
      })
      if(res.code == 1){
        this.importForm.excelFile = fileVal;
        this.importForm.file = res.data;
        this.$refs['importRef'].value = null;
      }else{
        this.importForm.excelFile = null;
        this.importForm.file = '';
        this.$refs['importRef'].value = null;
        this.openMessage(res.message, "err");
      }
    },
    //下载模板
    downloadTemplate(){
      window.open('https://jbt-member.oss-cn-beijing.aliyuncs.com/excelTemplate/%E5%90%88%E4%BC%99%E4%BA%BA%E4%BF%A1%E6%81%AF%E7%99%BB%E8%AE%B0%E8%A1%A8%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx');
    },
    //批量导入
    submitImportForm(){
      this.$refs.importForm.validate(async valid => {
        if(valid){
          let res = await batchImportPartner({
            file: this.importForm.excelFile
          });
          if (res.code == 1) {
            this.openMessage(res.message, "suc");
            this.queryTable();
          } else {
            this.openMessage(res.message, "err");
          }
        }
      })
    },
    //编辑合伙人
    handleEdit(id){
      this.$router.push({
        path: '/partnerManage/edit/' + id
      })
    },
    //查看合伙人
    handleView(id){
      this.$router.push({
        path: '/partnerManage/edit/' + id + '?flag=view'
      })
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changePageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    //导出
    toExport() {
      exportExcelPost(orgExport(), this.queryForm);
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          orgUpdate(this.editItem).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.queryTable();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      });
    },
    //删除合伙人
    delItem(row){
      this.$confirm('即将删除该合伙人，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await partnerDelete(row.id);
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
.readonlyItem {
    width: 700px;
    .readonlyInput {
      width: 328px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #dee1e5;
      position: relative;
    }
    .kio {
      width: 82px;
      height: 34px;
      font-size: 14px;
      line-height: 34px;
      text-align: center;
      color: #2e50ff;
      border: 1px solid #2e50ff;
      border-radius: 2px;
      position: absolute;
      right: 130px;
      top: 2px;
      opacity: 0;
    }
  }
</style>
