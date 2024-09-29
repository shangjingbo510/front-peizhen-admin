<template>
  <div class="padding-20">
    <el-page-header @back="goBack" content="客户信息审核"></el-page-header>
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
            <el-button size="small" type="primary" @click="handleAudit(2)">审核不通过</el-button>
            <el-button size="small" type="primary" @click="handleAudit(1)">审核通过</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  serviceStartDetail,
  serviceStartAudit
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      serviceId: this.$route.params.id || '',
      form: {},
      checkForm: {
        auditContent: '' //审核内容
      }
    };
  },
  computed: {
    ...mapState({
      // enumList: state => state.app.enumList,
      expertList: state => state.app.expertList,
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
      let res = await serviceStartDetail(this.serviceId);
      if (res.code == 1) {
        this.form = res.data;
      }
    },
    //审核
    async handleAudit(status){
      if(!this.checkForm.auditContent){
        return this.openMessage('请填写审核内容说明', "err");
      }
      let res = await serviceStartAudit({
        auditContent: this.checkForm.auditContent,
        auditStatus: status,
        customerId: this.form.customer.customerId,
        serviceId: this.serviceId
      })
      if(res.code == 1){
        this.openMessage(res.message, "suc");
        this.goBack();
      }else{
        this.openMessage(res.message, "err");
      }
    },
    goBack() {
      this.$router.go(-1);
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
</style>
