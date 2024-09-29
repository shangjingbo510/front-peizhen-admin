<template>
  <div class="padding-20">
    <el-page-header @back="goBack" content="服务合同签署详情"></el-page-header>
    <el-divider></el-divider>
    <el-form ref="submitForm" :model="form" label-width="140px" class="form">
      <h3 class="title">服务基本信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="业务名称：">
            <span>{{form.serviceInfo.businessName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务标题：">
            <span>{{ form.serviceInfo.serviceTitle }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务编码：">
            <span>{{ form.serviceInfo.serviceCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人姓名：">
            <span>{{ form.serviceInfo.applyName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务申请时间：">
            <span>{{ form.serviceInfo.applyTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理名称：">
            <span>{{ form.serviceInfo.masterName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="title">客户基本信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：">
            <span>{{ form.customer.customer.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型：">
            <span>{{ form.customer.customer.credentialTypeText }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码：">
            <span>{{ form.customer.customer.credentialNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：">
            <span>{{ form.customer.customer.sexText }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年收入：">
            <span>{{ form.customer.customer.annualIncome }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况：">
            <span>{{ form.customer.customer.marital }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：">
            <span>{{ form.customer.customer.phone }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯：">
            <span>{{ form.customer.customer.hometown }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址：">
            <span>{{ form.customer.customer.address }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="title">
        合同签署信息
        <el-button type="primary" size="medium" @click="handleAddElectronic"
          >创建电子合同</el-button>
        <el-button type="primary" size="medium" @click="amountShowDialog = true"
          >记录首付款结款信息</el-button>
      </h3>
      <el-divider></el-divider>
      <el-row v-if="form.contractSignInfo">
        <el-col :span="12">
          <el-form-item label="合同模版标题：">
            <span>{{ form.contractSignInfo.templateTitle }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签署时间：">
            <span>{{ form.contractSignInfo.signTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="签署状态：">
            <span>{{ form.contractSignInfo.signStatusText }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付款方式：">
            <span>{{ form.contractSignInfo.payType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首付款应付金额:">
            <span>{{ form.contractSignInfo.firstShouldAmount }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首付款支付时间:">
            <span>{{ form.contractSignInfo.firstPayTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="首付款实际付款金额:" label-width="180px">
            <span>{{ form.contractSignInfo.firstAmount }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同总金额:">
            <span>{{ form.contractSignInfo.contractAmount }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col :span="24">
          <div class="text-center" style="color: #999;">
            暂未签署合同信息！
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
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
            <el-button size="small" type="primary" @click="handleAudit(2)"
              >审核不通过</el-button>
            <el-button size="small" type="primary" @click="handleAudit(1)"
              >审核通过</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog
      title="创建电子合同"
      :visible.sync="assessShowDialog"
      width="70%"
    >
      <div class="padding-20">
        <el-form
          ref="assessForm"
          :rules="assessRules"
          :model="assessForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="首付款应付金额" prop="firstShouldAmount">
                <el-input
                  v-model="assessForm.firstShouldAmount"
                  size="medium"
                  maxlength="50"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合同总金额" prop="contractAmount">
                <el-input
                  v-model="assessForm.contractAmount"
                  size="medium"
                  maxlength="50"
                  clearable
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="支付方式" prop="payType">
                <el-select
                  v-model="assessForm.payType"
                  clearable
                  placeholder="请选择"
                  size="medium"
                >
                  <el-option label="线上" value="1"></el-option>
                  <el-option label="线下" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="服务类别" prop="serviceCategoryIdList">
                <el-select
                  v-model="assessForm.serviceCategoryIdList"
                  filterable
                  clearable
                  multiple
                  placeholder="请输入"
                >
                  <el-option
                    v-for="item in serviceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子合同模板" prop="templateId">
                <el-select
                  v-model="assessForm.templateId"
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
            <el-col :span="12">
              <el-form-item label="签署时间" prop="signTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  clearable
                  placeholder="选择日期"
                  v-model="assessForm.signTime"
                  size="small"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户委托合同" class="readonlyItem" prop="contractOssUrl">
                <input type="text" class="readonlyInput" v-model="assessForm.contractOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="medium" style="margin-right: 10px;">上传</el-button>
                <input type="file" ref="referenceUpload1" @change="getFile($event, assessForm, 'contractOssUrl', 'contractExcelFile', 1)" class="kio" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户尽调协议合同" class="readonlyItem" prop="dueOssUrl">
                <input type="text" class="readonlyInput" v-model="assessForm.dueOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="medium" style="margin-right: 10px;">上传</el-button>
                <input type="file" ref="referenceUpload2" @change="getFile($event, assessForm, 'dueOssUrl', 'dueExcelFile', 2)" class="kio" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保密协议" class="readonlyItem" prop="secrecyOssUrl">
                <input type="text" class="readonlyInput" v-model="assessForm.secrecyOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="medium" style="margin-right: 10px;">上传</el-button>
                <input type="file" ref="referenceUpload3" @change="getFile($event, assessForm, 'secrecyOssUrl', 'secrecyExcelFile', 3)" class="kio" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" @click="assessShowDialog = false"
                  >取消</el-button>
                <el-button size="small" type="primary" @click="submitAssessForm"
                  >保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      title="记录首付款结款信息"
      :visible.sync="amountShowDialog"
      width="70%"
    >
      <div class="padding-20">
        <el-form
          ref="amountForm"
          :rules="amountRules"
          :model="amountForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="首付款实收金额" prop="firstAmount">
                <el-input
                  v-model="amountForm.firstAmount"
                  size="medium"
                  maxlength="50"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="首付款结款时间" prop="firstPayTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="amountForm.firstPayTime"
                  size="medium"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="amountForm.remark"
                  size="medium"
                  maxlength="50"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" @click="amountShowDialog = false"
                  >取消</el-button>
                <el-button size="small" type="primary" @click="submitAmountForm"
                  >保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getServiceList, ossUploadFile } from "@/api/common";
import {
  serviceSignDetail,
  serviceSignCreateEleContract,
  serviceEleContractSignDetail,
  contractTemplateList,
  serviceSignAudit,
  serviceSignFirstPayRecords,
} from "@/api/service";
import { mapState } from "vuex";
export default {
  data() {
    return {
      serviceId: this.$route.params.id || "",
      form: {
        contractSignInfo: {}
      },
      serviceList: [],
      templateList: [], //电子合同模板下拉列表
      checkForm: {
        auditContent: "", //审核内容
      },
      pickerOptions: {
        disabledDate(date){
          return date.getTime() > new Date().getTime();
        }
      },
      assessShowDialog: false, //创建电子合同模态框
      assessForm: {
        firstShouldAmount: "",
        contractAmount: "",
        payType: "",
        serviceCategoryIdList: [],
        serviceId: this.$route.params.id || "",
        signTime: '',
        contractExcelFile: null,
        contractOssUrl: '', //客户委托合同
        dueExcelFile: null,
        dueOssUrl: '', //客户尽调协议合同
        secrecyExcelFile: null,
        secrecyOssUrl: '', //保密协议
      },
      assessRules: {
        firstShouldAmount: [
          {
            required: true,
            message: "首付款应付金额不可为空",
            trigger: "blur",
          },
        ],
        contractAmount: [
          {
            required: true,
            message: "合同总金额不可为空",
            trigger: "blur",
          },
        ],
        payType: [
          {
            required: true,
            message: "支付方式不可为空",
            trigger: "change",
          },
        ],
        serviceCategoryIdList: [
          {
            required: true,
            message: "服务类别不可为空",
            trigger: "change",
          },
        ],
        templateId: [
          {
            required: true,
            message: "电子合同模板不可为空",
            trigger: "change",
          },
        ],
        signTime: [
          {
            required: true,
            message: "签署时间不可为空",
            trigger: "change",
          },
        ],
        contractOssUrl: [
          {
            required: true,
            message: "请上传客户委托合同",
            trigger: "change",
          },
        ],
        dueOssUrl: [
          {
            required: true,
            message: "请上传客户尽调协议合同",
            trigger: "change",
          },
        ],
        secrecyOssUrl: [
          {
            required: true,
            message: "请上传保密协议",
            trigger: "change",
          },
        ],
      },
      amountShowDialog: false, //记录首付款结款信息模态框
      amountForm: {
        id: "", //合同签署ID
        firstAmount: "",
        firstPayTime: "",
        remark: "",
      },
      amountRules: {
        firstAmount: [
          {
            required: true,
            message: "首付款实收金额不可为空",
            trigger: "blur",
          },
        ],
        firstPayTime: [
          {
            required: true,
            message: "首付款结款时间不可为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      // enumList: state => state.app.enumList,
      expertList: (state) => state.app.expertList,
    }),
  },
  mounted() {
    //获取详情
    this.getDetail();
  },
  methods: {
    //获取详情
    async getDetail() {
      let res = await serviceSignDetail(this.serviceId);
      if (res.code == 1) {
        this.form = res.data;
        if(!this.form.contractSignInfo){
          this.form.contractSignInfo = {};
        }else{
          this.amountForm.id = this.form.contractSignInfo.id;
        }
        
        //获取服务类别下拉列表
        this._getServiceList();
        //获取电子合同模板
        this.getTemplateList();
      }
    },
    //创建电子合同模板
    async handleAddElectronic(){
      this.assessShowDialog = true;
      let res = await serviceEleContractSignDetail(this.serviceId);
      if(res.code == 1){
        this.assessForm = Object.assign({}, this.assessForm, res.data);
      }
    },
    //获取服务类别下拉列表
    async _getServiceList() {
      let res = await getServiceList({
        name: "",
        businessId: this.form.serviceInfo.businessId,
      });
      if (res.code == 1) {
        this.serviceList = res.data;
      } else {
        this.serviceList = [];
      }
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
    //上传文件
    async getFile(event, row, key1, key2, flag) {
      let fileVal = event.target.files[0];

      let res = await ossUploadFile({
        businessType: 'contract',
        file: fileVal
      })
      if(res.code == 1){
        row[key1] = res.data;
        row[key2] = fileVal;
        this.$refs['referenceUpload' + flag].value = null;
      }else{
        row[key2] = null;
        row[key1] = '';
        this.$refs['referenceUpload' + flag].value = null;
        this.openMessage(res.message, "err");
      }
    },
    //添加电子合同保存
    submitAssessForm() {
      this.$refs.assessForm.validate(async (valid) => {
        if (valid) {
          let res = await serviceSignCreateEleContract(this.assessForm);
          if (res.code == 1) {
            this.assessShowDialog = false;
            this.$refs.assessForm.resetFields();
            this.openMessage(res.message, "suc");
          } else {
            this.openMessage(res.message, "err");
          }
        }
      });
    },
    //记录首付款结款信息保存
    submitAmountForm() {
      this.$refs.amountForm.validate(async (valid) => {
        if (valid) {
          let res = await serviceSignFirstPayRecords(this.amountForm);
          if (res.code == 1) {
            this.amountShowDialog = false;
            this.$refs.amountForm.resetFields();
            this.openMessage(res.message, "suc");
          } else {
            this.openMessage(res.message, "err");
          }
        }
      });
    },
    //审核
    async handleAudit(status) {
      if (!this.checkForm.auditContent) {
        return this.openMessage("请填写审核内容说明", "err");
      }
      let res = await serviceSignAudit({
        auditContent: this.checkForm.auditContent,
        auditStatus: status,
        id: this.amountForm.id,
      });
      if (res.code == 1) {
        this.openMessage(res.message, "suc");
        this.goBack();
      } else {
        this.openMessage(res.message, "err");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='scss' scoped>
.el-input,
.el-select,
.el-textarea {
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
