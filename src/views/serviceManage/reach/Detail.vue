<template>
  <div class="padding-20">
    <el-page-header @back="goBack" content="服务洽谈详情"></el-page-header>
    <el-divider></el-divider>
    <el-form
      ref="submitForm"
      :model="form"
      label-width="140px"
      class="form"
    >
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
            <span>{{form.serviceInfo.serviceTitle}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务编码：">
            <span>{{form.serviceInfo.serviceCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人姓名：">
            <span>{{form.serviceInfo.applyName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务申请时间：">
            <span>{{form.serviceInfo.applyTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理名称：">
            <span>{{form.serviceInfo.masterName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="title">客户基本信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：">
            <span>{{form.customer.customer.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型：">
            <span>{{form.customer.customer.credentialTypeText}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码：">
            <span>{{form.customer.customer.credentialNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：">
            <span>{{form.customer.customer.sexText}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年收入：">
            <span>{{form.customer.customer.annualIncome}}万元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况：">
            <span>{{form.customer.customer.marital}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：">
            <span>{{form.customer.customer.phone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯：">
            <span>{{form.customer.customer.hometown}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址：">
            <span>{{form.customer.customer.address}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <h3 class="title mb-30">子节点信息</h3>
    <div class="mb-30">
      <ul class="flex childNode-box">
        <li class="text-center" :class="item.isArrived == 1 ? 'active' : ''" v-for="(item, index) in form.childNodeList" :key="index">
          <div class="relative circle">
            <span>{{item.childNode}}</span>
            <div class="absolute line" v-if="index < form.childNodeList.length - 1"></div>
          </div>
          <p>{{item.childNodeText}}</p>
        </li>
      </ul>
    </div>

    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">尾款打款记录列表</span>
        <el-button type="primary" size="small" @click="assessShowDialog = true; assessFlag = 'add';">添加尾款打款记录</el-button>
      </div>
      <el-table :data="form.finishRecordsList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="lastShouldAmount" label="应收尾款打款金额" width="140" align="center"></el-table-column>
        <el-table-column prop="lastAmount" label="实际尾款打款金额" width="140" align="center"></el-table-column>
        <el-table-column prop="lastPayTime" label="尾款支付时间" width="160" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="operatorName" label="操作人员" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleAssessEdit(scope.row.id)"
              class="textBtn"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="assessFlag == 'add' ? '添加尾款打款记录' : '修改尾款打款记录'" :visible.sync="assessShowDialog" width="70%">
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
              <el-form-item label="应收尾款打款金额" prop="lastShouldAmount">
                <el-input
                  v-model="assessForm.lastShouldAmount"
                  size="medium"
                  maxlength="50"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实际尾款打款金额" prop="lastAmount">
                <el-input
                  v-model="assessForm.lastAmount"
                  size="medium"
                  maxlength="50"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="尾款支付时间" prop="lastPayTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessForm.lastPayTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="assessForm.remark"
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
                <el-button size="small" @click="assessShowDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitAssessForm">保存</el-button>
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
  recordsDetail,
  serviceFinishRecordsAdd,
  serviceFinishRecordsFinishRecordsList,
  serviceFinishRecordsDetail,
  serviceFinishRecordsUpdate,
  getFlowstepChildNodeList
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      serviceId: this.$route.params.id || '',
      form: {},
      assessShowDialog: false,
      assessFlag: 'add', //add 添加 edit 编辑
      assessForm: {
        serviceId: this.$route.params.id || '',
        id: '',
        lastShouldAmount: '',
        lastAmount: '',
        lastPayTime: '',
        remark: ''
      },
      assessRules: {
        'lastShouldAmount': [
          {
            required: true,
            message: "应收尾款打款金额不可为空",
            trigger: "blur",
          },
        ],
        'lastAmount': [
          {
            required: true,
            message: "实际尾款打款金额不可为空",
            trigger: "blur",
          },
        ],
        'lastPayTime': [
          {
            required: true,
            message: "尾款支付时间不可为空",
            trigger: "change",
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      // enumList: state => state.app.enumList,
      // expertList: state => state.app.expertList,
      // partnerList: state => state.app.partnerList,
      // masterList: state => state.app.masterList
    })
  },
  mounted() {
    //获取详情
    this.getDetail();
  },
  methods: {
    //获取详情
    async getDetail(){
      let res = await recordsDetail(this.serviceId);
      if (res.code == 1) {
        this.form = res.data;
      }
    },
    //尾款打款记录列表编辑
    async handleAssessEdit(id){
      this.assessFlag = 'edit';
      this.assessShowDialog = true;
      this.$nextTick(() => {
        this.$refs.assessForm.clearValidate();
      })
      let res = await serviceFinishRecordsDetail(id);
      if (res.code == 1) {
        this.assessForm = Object.assign({}, this.assessForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    //刷新服务节点信息
    async _getFlowstepChildNodeList(){
      let res = await getFlowstepChildNodeList({
        serviceId: this.serviceId,
        operatorFlowStep: 6
      });
      if (res.code == 1) {
        this.form.childNodeList = res.data;
      }
    },
    //刷新尾款打款记录列表
    async getAssessList(){
      let res = await serviceFinishRecordsFinishRecordsList(this.serviceId);
      if (res.code == 1) {
        this.form.finishRecordsList = res.data;
      }
    },
    //尾款打款记录保存事件
    submitAssessForm() {
      this.$refs.assessForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessFlag == 'add'){
            serviceFinishRecordsAdd(this.assessForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessForm.resetFields();
                  this.assessShowDialog = false;
                  //刷新尾款打款记录列表
                  this.getAssessList();
                  //刷新服务节点信息
                  this._getFlowstepChildNodeList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }else{
            //编辑
            serviceFinishRecordsUpdate(this.assessForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessForm.resetFields();
                  this.assessShowDialog = false;
                  //刷新尾款打款记录列表
                  this.getAssessList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }
        }
      });
    }
  }
}

</script>
<style lang='scss' scoped>
.el-input,
.el-select,
.el-textarea {
  width: 76%;
}
.childNode-box{
  li{
    width: 180px;
    .circle{
      span{
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        color: #303133;
        border: 1px solid #303133;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .line{
        border: 1px solid #c0c4cc;
        width: calc(100% - 22px);
        height: 1px;
        left: calc(50% + 11px);
        top: 11px;
      }
    }
    &.active{
      color: #409eff;
      .circle span{
        color: #409eff;
        border: 1px solid #409eff;
      }
    }
  }
}
</style>
