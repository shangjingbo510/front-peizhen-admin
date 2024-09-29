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
      <h3 class="title">基本信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="partnerInfo.name">
            <el-input
              v-model="form.partnerInfo.name"
              size="medium"
              maxlength="50"
              placeholder="请输入姓名"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="partnerInfo.credentialType">
            <el-select
              v-model="form.partnerInfo.credentialType"
              clearable
              placeholder="请选择"
              size="medium"
              :disabled="viewFlag"
            >
              <el-option
                v-for="item in enumList.CredentialTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码" prop="partnerInfo.credentialNo">
            <el-input
              v-model="form.partnerInfo.credentialNo"
              size="medium"
              maxlength="50"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item label="性别" prop="partnerInfo.sex">
            <el-select
              v-model="form.partnerInfo.sex"
              clearable
              placeholder="请选择"
              size="medium"
              :disabled="viewFlag"
            >
              <el-option
                v-for="item in enumList.SexEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年收入(万元)" prop="partnerInfo.annualIncome">
            <el-input
              v-model="form.partnerInfo.annualIncome"
              size="medium"
              maxlength="50"
              placeholder="请输入年收入"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况" prop="partnerInfo.maritalStatus">
            <el-select
              v-model="form.partnerInfo.maritalStatus"
              clearable
              size="medium"
              placeholder="请选择"
              :disabled="viewFlag"
            >
              <el-option 
                v-for="item in enumList.MaritalStatusEnum" 
                :key="item.value" 
                :label="item.name" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="partnerInfo.phone">
            <el-input
              v-model="form.partnerInfo.phone"
              size="medium"
              maxlength="50"
              placeholder="请输入手机号"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="partnerInfo.hometown">
            <el-input
              v-model="form.partnerInfo.hometown"
              size="medium"
              maxlength="50"
              placeholder="请输入籍贯"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在地区" prop="partnerInfo.province">
            <el-select
              class="w-150"
              v-model="form.partnerInfo.province"
              placeholder="请选择"
              size="medium"
              clearable
              :disabled="viewFlag"
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
            <el-select
              v-model="form.partnerInfo.city"
              @change="handleCityChange"
              size="medium"
              clearable
              :disabled="viewFlag"
              class="w-150">
              <el-option
                v-for="item in CityName"
                :key="item.cityCode"
                :label="item.cityName"
                :value="item.cityCode"
              ></el-option>
            </el-select>
            <el-select
              v-model="form.partnerInfo.area"
              size="medium"
              clearable
              :disabled="viewFlag"
              class="w-150">
              <el-option
                v-for="item in AreaName"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址" prop="partnerInfo.address">
            <el-input
              v-model="form.partnerInfo.address"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="爱好" prop="partnerInfo.hobby">
            <el-input
              v-model="form.partnerInfo.hobby"
              size="medium"
              maxlength="30"
              clearable
              placeholder="请输入爱好"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合伙人类别" prop="partnerInfo.partnerType">
            <el-select
              v-model="form.partnerInfo.partnerType"
              clearable
              placeholder="请选择"
              size="medium"
              :disabled="viewFlag"
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
          <el-form-item label="合伙人级别" prop="partnerInfo.level">
            <el-select
              v-model="form.partnerInfo.level"
              clearable
              placeholder="请选择"
              size="medium"
              :disabled="viewFlag"
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
          <el-form-item label="所属机构" prop="partnerInfo.orgCode">
            <el-select
              v-model="form.partnerInfo.orgCode"
              clearable
              placeholder="请选择"
              size="medium"
              :disabled="viewFlag"
            >
              <el-option
                v-for="item in orgList"
                :key="item.orgCode"
                :label="item.orgCode + '-' + item.orgName"
                :value="item.orgCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="推荐人" prop="partnerInfo.recommendName">
            <el-input
              v-model="form.partnerInfo.recommendName"
              size="medium"
              maxlength="50"
              :disabled="viewFlag"
              placeholder="请输入推荐人姓名"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>教育信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="毕业学校" prop="partnerInfo.graduationInstitution">
            <el-input
              v-model="form.partnerInfo.graduationInstitution"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入毕业学校"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业" prop="partnerInfo.major">
            <el-input
              v-model="form.partnerInfo.major"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入专业"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历" prop="partnerInfo.education">
            <el-select
              v-model="form.partnerInfo.education"
              clearable
              :disabled="viewFlag"
              size="medium"
              placeholder="请选择"
            >
              <el-option 
                v-for="item in enumList.QualificationEnum" 
                :key="item.value" 
                :label="item.name" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="form.partnerInfo.education > 4">
          <el-form-item label="学位" prop="partnerInfo.degree">
            <el-input
              v-model="form.partnerInfo.degree"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入学位"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>工作经历</h3>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in form.workExperienceList" :key="index">
        <el-col :span="12">
          <el-form-item label="起始时间" :prop="'workExperienceList.' + index + '.startTime'" :rules="[{required: true, message: '请选择起始时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="item.startTime"
              :picker-options="pickerOptions"
              size="medium"
              value-format="yyyy-MM-dd"
              :disabled="viewFlag"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="终止时间" :prop="'workExperienceList.' + index + '.endTime'" :rules="[{required: true, message: '请选择起始时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="item.endTime"
              :picker-options="pickerOptions"
              size="medium"
              value-format="yyyy-MM-dd"
              :disabled="viewFlag"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位名称" :prop="'workExperienceList.' + index + '.workUnit'" :rules="[{required: true, message: '请输入单位名称',trigger: 'blur'}]">
            <el-input
              v-model="item.workUnit"
              size="medium"
              maxlength="50"
              clearable
              placeholder="请输入单位名称"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门名称" :prop="'workExperienceList.' + index + '.department'" :rules="[{required: true, message: '请输入部门名称',trigger: 'blur'}]">
            <el-input
              v-model="item.department"
              size="medium"
              maxlength="50"
              clearable
              placeholder="请输入部门名称"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务名称" :prop="'workExperienceList.' + index + '.position'" :rules="[{required: true, message: '请输入职务名称',trigger: 'blur'}]">
            <el-input
              v-model="item.position"
              size="medium"
              maxlength="50"
              clearable
              placeholder="请输入职务名称"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-remove-outline"
              size="small"
              @click="handleDelWorkExperience(index)"
              :disabled="viewFlag"
              >删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              size="small"
              @click="handleAddWorkExperience()"
              :disabled="viewFlag"
              >增加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>家庭信息</h3>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in form.familyMembersList" :key="index">
        <el-col :span="12">
          <el-form-item label="关系" prop="relation">
            <el-select
              v-model="item.relation"
              clearable
              size="medium"
              placeholder="请选择"
              :disabled="viewFlag"
            >
              <el-option 
                v-for="item in enumList.RelationEnum" 
                :key="item.value" 
                :label="item.name" 
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="item.name"
              size="medium"
              maxlength="50"
              placeholder="请输入姓名"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="item.birthday"
              :picker-options="pickerOptions"
              size="medium"
              value-format="yyyy-MM-dd"
              :disabled="viewFlag"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位名称" prop="workUnit">
            <el-input
              v-model="item.workUnit"
              size="medium"
              maxlength="50"
              placeholder="请输入单位名称"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务名称" prop="position">
            <el-input
              v-model="item.position"
              size="medium"
              maxlength="50"
              placeholder="请输入职务名称"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-remove-outline"
              size="small"
              @click="handleDelFamilyMembers(index)"
              :disabled="viewFlag"
              >删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              size="small"
              @click="handleAddFamilyMembers()"
              :disabled="viewFlag"
              >增加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="审核内容说明">
            <el-input
              v-model="form.audit.auditContent"
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
  getOrgProvinceList,
  getOrgCityList,
  getOrgAreaList
} from "@/api/common";
import {
  partnerDetail,
  partnerAudit
} from "@/api/partnerManage";
import { queryOrgAll } from "@/api/userManage";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      headerTitle: '编辑合伙人',
      id: this.$route.params.id,
      viewFlag: this.$route.query.flag == 'view' || false,
      form: {
        //合伙人信息
        partnerInfo: {
          address: "", //现居住地址
          annualIncome: null, //合伙人年收入
          birthDay: "",
          province: "",
          city: "",
          area: "", //合伙人所在区县编码
          credentialNo: "", //合伙人证件号
          credentialType: "", //合伙人证件类型 1 ID 2 PASS
          email: "",
          sex: "",
          emergencyContactName: "", //合伙人紧急联系人姓名
          emergencyContactPhone: "", //合伙人紧急联系人手机
          expectedAnnualIncome: null, //期望年收入：万元
          graduationInstitution: "", //合伙人毕业院校
          headerImg: "", //合伙人头像
          hobby: "", //兴趣爱好
          hometown: "", //合伙人籍贯
          level: "", //合伙人级别
          major: "", //合伙人院校专业
          education: "", //合伙人学历
          degree: "", //合伙人学位
          maritalStatus: "", //合伙人婚姻状态
          name: "", //合伙人姓名
          nation: "", //合伙人国籍
          orgCode: "", //合伙人所属机构编码
          partnerType: null, //合伙人类型
          phone: "", //合伙人手机号
          race: "", //合伙人民族
          recommendName: "", //合伙人推荐人姓名
          residenceAddress: "" //户籍地址
        },
        //家庭信息
        familyMembersList: [
          {
            birthday: "",
            department: "", //家庭成员工作部门
            name: "", //家庭成员姓名
            position: "", //家庭成员工作职位
            relation: "", //家庭成员关系
            workUnit: "", //家庭成员工作单位
          },
        ],
        //工作经历
        workExperienceList: [
          {
            certifierName: "", //证明人姓名
            certifierPhone: "", //证明人电话
            startTime: "",
            endTime: "",
            position: "", //职务名称
            subordinateNumber: null, //管理下属人数
            workUnit: "", //单位名称
            department: "", //部门名称
          },
        ],
        //审核信息
        audit: {
          auditContent: '',
          auditStatus: '',
          auditor: ''
        }
      },
      orgList: [], //机构列表数据
      // 省市区列表数据
      proName: [],
      CityName: [],
      AreaName: [],
      rules: {
        'partnerInfo.name': [
          {
            required: true,
            message: "合伙人姓名不可为空",
            trigger: "blur",
          },
        ],
        'partnerInfo.credentialType': [
          {
            required: true,
            message: "证件不可为空",
            trigger: "change",
          }
        ],
        'partnerInfo.credentialNo': [
          {
            required: true,
            message: "证件号码不可为空",
            trigger: "blur",
          }
        ],
        'partnerInfo.sex': [
          {
            required: true,
            message: "性别不可为空",
            trigger: "blur",
          }
        ],
        'partnerInfo.annualIncome': [
          {
            required: true,
            message: "合伙人年收入不可为空",
            trigger: "blur",
          },
        ],
        'partnerInfo.province': [
          {
            required: true,
            validator: (rules, value, callback) => {
              let { city, area } = this.form.partnerInfo;
              if (!value || !city || !area) {
                return callback(new Error("请选择省市区"));
              }
              return callback();
            },
            trigger: "change",
          },
        ],
        'partnerInfo.maritalStatus': [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        'partnerInfo.phone': [
          {
            required: true,
            message: "合伙人手机号不可为空",
            trigger: "blur",
          },
          {
            pattern: /^(1[3584]\d{9})$/,
            message: "请输入正确手机号",
          },
        ],
        'partnerInfo.graduationInstitution': [
          {
            required: true,
            message: "合伙人毕业学校不可为空",
            trigger: "blur",
          },
        ],
        'partnerInfo.major': [
          {
            required: true,
            message: "合伙人专业不可为空",
            trigger: "blur",
          },
        ],
        'partnerInfo.education': [
          {
            required: true,
            message: "合伙人学历不可为空",
            trigger: "blur",
          },
        ],
        'partnerInfo.partnerType': [
          {
            required: true,
            message: "合伙人类别不可为空",
            trigger: "change",
          },
        ],
        'partnerInfo.level': [
          {
            required: true,
            message: "合伙人级别不可为空",
            trigger: "change",
          },
        ],
        'partnerInfo.orgCode': [
          {
            required: true,
            message: "所属机构不可为空",
            trigger: "change",
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
      this.headerTitle = '查看合伙人';
    }
    //获取合伙人详细信息
    this.getDetail();
    //获取机构列表
    this._initOrg();
    //获取所在省数据
    this.getProvinceData();
  },
  methods: {
    //获取合伙人详细信息
    async getDetail(){
      let res = await partnerDetail(this.id);
      if(res.code == 1){
        this.form = res.data;
        if(this.form.partnerInfo.province){
          //获取市数据
          this.getCityData(this.form.partnerInfo.province);
        }
        if(this.form.partnerInfo.city){
          //获取县数据
          this.getAreaData(this.form.partnerInfo.city);
        }
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //获取机构列表
    async _initOrg() {
      let res = await queryOrgAll();
      if (res.code == 1) {
        this.orgList = res.data;
      } else {
        this.orgList = [];
      }
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
      this.form.partnerInfo.city = ""; //所在市
      this.form.partnerInfo.area = ""; //所在县
      this.AreaName = this.CityName = [];
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
    //市改变事件
    handleCityChange(val) {
      if (val) {
        this.form.partnerInfo.area = ""; //所在县
        this.AreaName = [];
        //获取县数据
        this.getAreaData(val);
      }
    },
    //获取县数据
    async getAreaData(code) {
      let res = await getOrgAreaList(code);
      if (res.code == 1) {
        this.AreaName = res.data;
      } else {
        this.AreaName = [];
      }
    },
    goBack() {
      window.history.back();
    },
    //添加工作经历
    handleAddWorkExperience(){
      this.form.workExperienceList.push({
        certifierName: "", //证明人姓名
        certifierPhone: "", //证明人电话
        startTime: "",
        endTime: "",
        position: "", //职务名称
        subordinateNumber: null, //管理下属人数
        workUnit: "", //单位名称
        department: "", //部门名称
      })
    },
    //删除工作经历
    handleDelWorkExperience(index){
      if(this.form.workExperienceList.length > 1){
        this.form.workExperienceList.splice(index, 1);
      }
    },
    //添加家庭成员
    handleAddFamilyMembers(){
      this.form.familyMembersList.push({
        birthday: "",
        department: "", //家庭成员工作部门
        name: "", //家庭成员姓名
        position: "", //家庭成员工作职位
        relation: "", //家庭成员关系
        workUnit: "", //家庭成员工作单位
      })
    },
    //删除家庭成员
    handleDelFamilyMembers(index){
      if(this.form.familyMembersList.length > 1){
        this.form.familyMembersList.splice(index, 1);
      }
    },
    //审核
    async handleAudit(status){
      if(!this.form.audit.auditContent){
        return this.openMessage('请填写审核内容说明', "err");
      }
      let res = await partnerAudit({
        auditContent: this.form.audit.auditContent,
        auditStatus: status,
        partnerId: this.id
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
