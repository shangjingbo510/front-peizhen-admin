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
          <el-form-item label="合伙人类别" prop="partnerType">
            <el-select
              v-model="queryForm.partnerType"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in enumList.MemberTypeEnum"
                :key="item.value"
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
          <el-form-item label="所属机构" prop="orgCode">
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
          <el-form-item label="推荐人姓名" prop="recommendCode">
            <el-input size="small" v-model="queryForm.recommendCode" placeholder="请选择"></el-input>
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
              @click="handleCheck(scope.row.id, scope.row.yesOrNo)"
              class="textBtn"
            >审核</el-button>
            <el-button
              type="text"
              v-if="scope.row.auditStatus == 1"
              @click="handleUpload(scope.row.id)"
              class="textBtn"
            >上传合同</el-button>
            <el-button
              v-if="scope.row.auditStatus == 1"
              type="text"
              @click="handleEditLevel(scope.row.id, scope.row.level)"
              class="textBtn"
            >修改级别</el-button>
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

    <!-- 上传合同 -->
    <el-dialog title="合同" :visible.sync="uploadContractModalFlag" width="40%">
      <div class="padding-20">
        <el-form
          ref="contractForm"
          :rules="contractRules"
          :model="contractForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="合同标题" prop="contractTitle">
                <el-input size="small" v-model="contractForm.contractTitle" placeholder="请选择"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="合同描述" prop="contractDesc">
                <el-input type="textarea" size="small" v-model="contractForm.contractDesc" placeholder="请选择"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="合同模板" prop="eleContractId">
                <el-select
                  v-model="contractForm.eleContractId"
                  clearable
                  placeholder="请输入"
                >
                  <el-option
                    v-for="item in templateList"
                    :key="item.id"
                    :label="item.templateTitle"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="签约时间" prop="signTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="contractForm.signTime"
                  size="small"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传合同" class="readonlyItem" prop="attachmentOssUrl">
                <input type="text" class="readonlyInput" v-model="contractForm.attachmentOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="medium" style="margin-right: 10px;">上传合同</el-button>
                <input type="file" ref="referenceUpload" @change="getFile" class="kio" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" @click="uploadContractModalFlag = false">取消</el-button>
                <el-button size="small" type="primary" @click="handleUploadSave">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="修改级别" :visible.sync="editLevelModalFlag" width="40%">
      <div class="padding-20">
        <el-form
          ref="editForm"
          :rules="editRules"
          :model="editForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="合伙人级别" prop="level">
                <el-select
                  v-model="editForm.level"
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
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" @click="editLevelModalFlag = false">取消</el-button>
                <el-button size="small" type="primary" @click="handleSubmit">保存</el-button>
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
  ossUploadFile
} from "@/api/common";
import {
  partnerList,
  partnerUpdateLevel,
  partnerSignDetail,
  partnerSign
} from "@/api/partnerManage";
import {
  contractTemplateList,
} from "@/api/service";
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
        orgCode: '', //所属机构
        recommendCode: '', //推荐人姓名
        auditStatus: '', //状态
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      orgList: [],
      uploadContractModalFlag: false, //上传合同模态框
      editLevelModalFlag: false, //修改级别模态框
      templateList: [], //电子合同模板下拉列表
      editForm: {
        partnerId: '',
        level: ''
      },
      editRules: {
        level: [
          {
            required: true,
            message: "合伙人级别不能为空",
            trigger: "change"
          },
        ],
      },
      contractForm: {
        id: '',
        contractTitle: '',
        contractDesc: '',
        signTime: '',
        eleContractId: '',
        partnerId: '',
        signStatus: '',
        excelFile: null,
        attachmentOssUrl: ''
      },
      contractRules: {
        contractTitle: [{
          required: true,
          message: "合同标题不可为空",
          trigger: "blur"
        }],
        signTime: [{
          required: true,
          message: "签约时间不可为空",
          trigger: "change"
        }],
        eleContractId: [{
          required: true,
          message: "合同模板不可为空",
          trigger: "change"
        }],
        attachmentOssUrl: [
          {
            required: true,
            message: "请上传合同",
            trigger: "blur"
          },
        ],
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
    //获取电子合同模板
    this.getTemplateList();
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
    //获取电子合同模板
    async getTemplateList() {
      let res = await contractTemplateList({
        pageNum: 1,
        pageSize: 100
      });
      if (res.code == 1) {
        this.templateList = res.data.list;
      } else {
        this.templateList = [];
      }
    },
    //审核
    handleCheck(id, status){
      //是否可以操作审核,1可以操作审核，0不可以操作审核
      if(status == 1){
        this.$router.push({
          path: '/partnerManage/checkDetail/' + id + '?flag=view'
        })
      }else{
        this.openMessage('审核已通过，无需再次审核！', "err");
      }
    },
    //上传合同
    async handleUpload(id){
      this.uploadContractModalFlag = true;
      this.contractForm.partnerId = id;
      let res = await partnerSignDetail(id);
      if(res.code == 1){
        this.contractForm = Object.assign(res.data, this.contractForm);
        this.contractForm.signStatus = res.data.signStatus == '' ? 1 : res.data.signStatus;
      }else{
        //todo
      }
    },
    //上传文件
    async getFile(event) {
      let fileVal = event.target.files[0];

      let res = await ossUploadFile({
        businessType: 'contract',
        file: fileVal
      })
      if(res.code == 1){
        this.contractForm.excelFile = fileVal;
        this.contractForm.attachmentOssUrl = res.data;
        this.$refs['referenceUpload'].value = null;
      }else{
        this.contractForm.excelFile = null;
        this.contractForm.attachmentOssUrl = '';
        this.$refs['referenceUpload'].value = null;
        this.openMessage(res.message, "err");
      }
    },
    //上传合同保存
    handleUploadSave(){
      this.$refs.contractForm.validate(async (valid) => {
        if(valid){
          let res = await partnerSign(this.contractForm);
          if(res.code == 1){
            this.openMessage(res.message, "suc");
            this.uploadContractModalFlag = false;
          }else{
            this.openMessage(res.message, "err");
          }
        }
      })
    },
    //修改级别
    handleEditLevel(id, level){
      this.editForm.partnerId = id;
      this.editForm.level = level;
      this.editLevelModalFlag = true;
    },
    //修改级别保存
    handleSubmit(){
      this.$refs.editForm.validate(async (valid) => {
        if(valid){
          let res = await partnerUpdateLevel(this.editForm);
          if(res.code == 1){
            this.editLevelModalFlag = false;
            this.queryTable();
            this.openMessage(res.message, "suc");
          }else{
            this.openMessage(res.message, "err");
          }
        }
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
.el-textarea,
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
