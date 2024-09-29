<template>
  <div class="padding-20">
    <el-page-header @back="goBack" content="查看客户服务信息详情"></el-page-header>
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
    <h3 class="title mb-30">服务阶段信息</h3>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in form.serviceFlowList" :key="index" :timestamp="item.flowStepText" placement="top">
          <el-card>
            <p :class="subItem.isArrived == 1 ? 'active' : ''" v-for="(subItem, subIndex) in item.childNodeList" :key="subIndex">{{subItem.childNodeText}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {
  serviceSearchDetail
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      serviceId: this.$route.params.id || '',
      form: {}
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted() {
    //获取详情
    this.getDetail();
  },
  methods: {
    //获取详情
    async getDetail(){
      let res = await serviceSearchDetail(this.serviceId);
      if (res.code == 1) {
        this.form = res.data;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    //刷新服务节点信息
    async _getFlowstepChildNodeList(){
      let res = await getFlowstepChildNodeList({
        serviceId: this.serviceId,
        operatorFlowStep: 4
      });
      if (res.code == 1) {
        this.form.childNodeList = res.data;
      }
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
.block{
  p{
    &.active{
      color: #409eff;
    }
  }
}
</style>
