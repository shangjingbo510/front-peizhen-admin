<template>
  <div>
    <el-page-header @back="goBack" content="审核详情"></el-page-header>
    <el-divider></el-divider>
    <el-form
      ref="submitForm"
      :rules="rules"
      :model="form"
      label-width="140px"
      class="form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="审核内容说明">
            <el-input
              v-model="form.customer.remark"
              size="medium"
              maxlength="50"
              placeholder="请填写审核内容说明"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
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
  serviceProcessDetail,
  serviceProcessAudit
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      headerTitle: '编辑客户信息',
      id: this.$route.params.id,
      viewFlag: this.$route.query.flag == 'view' || false,
      form: {
        //客户信息
        customer: {
          address: "", //现居住地址
          annualIncome: null, //客户年收入
          birthDay: "",
          province: "",
          city: "",
          area: "", //客户所在区县编码
          credentialNo: "", //客户证件号
          credentialType: "", //客户证件类型 1 ID 2 PASS
          email: "",
          sex: "",
          emergencyContactName: "", //客户紧急联系人姓名
          emergencyContactPhone: "", //客户紧急联系人手机
          expectedAnnualIncome: null, //期望年收入：万元
          graduationInstitution: "", //客户毕业院校
          headerImg: "", //客户头像
          hobby: "", //兴趣爱好
          hometown: "", //客户籍贯
          level: "", //客户级别
          major: "", //客户院校专业
          education: "", //客户学历
          degree: "", //客户学位
          maritalStatus: "", //客户婚姻状态
          name: "", //客户姓名
          nation: "", //客户国籍
          orgCode: "", //客户所属机构编码
          partnerType: null, //客户类型
          phone: "", //客户手机号
          race: "", //客户民族
          recommendName: "", //客户推荐人姓名
          residenceAddress: "" //户籍地址
        },
        //家庭信息
        customerFamilyList: [
          {
            birthday: "",
            department: "", //家庭成员工作部门
            name: "", //家庭成员姓名
            position: "", //家庭成员工作职位
            relation: "", //家庭成员关系
            workUnit: "", //家庭成员工作单位
            credentialNo: "",
            credentialType: "",
            isHasGreenCard: "",
            isOtherNation: "",
            maritalStatus: "",
            phone: "",
            remark: ""
          },
        ],
        //资产配置
        customerAssetsList: [
          {
            isNomination: "", //是否代持：1是，0否
            itemName: "", //资产项名称
            itemType: "", //资产项类型
            itemValue: "", //资产数值
            remark: "", //备注
            shareholdingType: "", //持股形式
          },
        ]
      },
      rules: {
        'customer.name': [
          {
            required: true,
            message: "客户姓名不可为空",
            trigger: "blur",
          },
        ],
        'customer.credentialType': [
          {
            required: true,
            message: "证件不可为空",
            trigger: "change",
          }
        ],
        'customer.credentialNo': [
          {
            required: true,
            message: "证件号码不可为空",
            trigger: "blur",
          }
        ],
        'customer.annualIncome': [
          {
            required: true,
            message: "客户年收入不可为空",
            trigger: "blur",
          },
        ],
        'customer.province': [
          {
            required: true,
            validator: (rules, value, callback) => {
              let { city, area } = this.form.customer;
              if (!value || !city || !area) {
                return callback(new Error("请选择省市区"));
              }
              return callback();
            },
            trigger: "change",
          },
        ],
        'customer.address': [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur",
          },
        ],
        'customer.maritalStatus': [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        'customer.phone': [
          {
            required: true,
            message: "客户手机号不可为空",
            trigger: "blur",
          },
          {
            pattern: /^(1[3584]\d{9})$/,
            message: "请输入正确手机号",
          },
        ],
        'customer.graduationInstitution': [
          {
            required: true,
            message: "客户毕业学校不可为空",
            trigger: "blur",
          },
        ],
        'customer.major': [
          {
            required: true,
            message: "客户专业不可为空",
            trigger: "blur",
          },
        ],
        'customer.education': [
          {
            required: true,
            message: "客户学历不可为空",
            trigger: "blur",
          },
        ],
        'customer.partnerType': [
          {
            required: true,
            message: "客户类别不可为空",
            trigger: "change",
          },
        ],
        'customer.orgCode': [
          {
            required: true,
            message: "所属机构不可为空",
            trigger: "change",
          },
        ],
        'customer.recommendName': [
          {
            required: true,
            message: "推荐人姓名不可为空",
            trigger: "blur",
          },
        ]
      },
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted() {
    //如果是点击查看按钮进来的
    if(this.viewFlag){
      this.headerTitle = '查看客户';
    }
    //获取客户详细信息
    this.getDetail();
  },
  methods: {
    //获取客户详细信息
    async getDetail(){
      let res = await serviceProcessDetail(this.id);
      if(res.code == 1){
        this.form = res.data;
      }else{
        this.openMessage(res.message, "err");
      }
    },
    goBack() {
      window.history.back();
    },
    //审核
    async handleAudit(status){
      if(!this.form.customer.remark){
        return this.openMessage('请填写审核内容说明', "err");
      }
      let res = await serviceProcessAudit({
        auditContent: this.form.customer.remark,
        auditStatus: status,
        customerId: this.id
      })
      if(res.code == 1){
        this.openMessage(res.message, "suc");
      }else{
        this.openMessage(res.message, "err");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.el-input,
.el-select {
  width: 76%;
}
</style>
