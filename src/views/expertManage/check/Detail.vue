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
          <el-form-item label="姓名" prop="expertInfo.name">
            <el-input
              v-model="form.expertInfo.name"
              size="medium"
              maxlength="50"
              placeholder="请输入姓名"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="expertInfo.credentialType">
            <el-select
              v-model="form.expertInfo.credentialType"
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
          <el-form-item label="证件号码" prop="expertInfo.credentialNo">
            <el-input
              v-model="form.expertInfo.credentialNo"
              size="medium"
              maxlength="50"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="expertInfo.sex">
            <el-select
              v-model="form.expertInfo.sex"
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
          <el-form-item label="年收入(万元)" prop="expertInfo.annualIncome">
            <el-input
              v-model="form.expertInfo.annualIncome"
              size="medium"
              maxlength="50"
              placeholder="请输入年收入"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况" prop="expertInfo.maritalStatus">
            <el-select
              v-model="form.expertInfo.maritalStatus"
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
          <el-form-item label="手机号" prop="expertInfo.phone">
            <el-input
              v-model="form.expertInfo.phone"
              size="medium"
              maxlength="50"
              placeholder="请输入手机号"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="expertInfo.hometown">
            <el-input
              v-model="form.expertInfo.hometown"
              size="medium"
              maxlength="50"
              placeholder="请输入籍贯"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在地区" prop="expertInfo.province">
            <el-select
              class="w-150"
              v-model="form.expertInfo.province"
              placeholder="请选择"
              size="medium"
              clearable
              @change="handleProvinceChange"
              @clear="clearProvinceHandle"
              :disabled="viewFlag"
            >
              <el-option
                v-for="item in proName"
                :key="item.provinceCode"
                :label="item.provinceName"
                :value="item.provinceCode"
              ></el-option>
            </el-select>
            <el-select
              v-model="form.expertInfo.city"
              @change="handleCityChange"
              :disabled="viewFlag"
              size="medium"
              clearable
              class="w-150">
              <el-option
                v-for="item in CityName"
                :key="item.cityCode"
                :label="item.cityName"
                :value="item.cityCode"
              ></el-option>
            </el-select>
            <el-select
              v-model="form.expertInfo.area"
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
          <el-form-item label="详细地址" prop="expertInfo.address">
            <el-input
              v-model="form.expertInfo.address"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="专家类别" prop="expertInfo.memberType">
            <el-select
              v-model="form.expertInfo.memberType"
              clearable
              :disabled="viewFlag"
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
          <el-form-item label="所属机构" prop="expertInfo.orgName">
            <el-input
              v-model="form.expertInfo.orgName"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入所属机构"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专家分类" prop="expertInfo.expertType">
            <el-select
              v-model="form.expertInfo.expertType"
              clearable
              placeholder="请选择"
              size="medium"
              :disabled="viewFlag"
            >
              <el-option
                v-for="item in enumList.ExpertTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="擅长领域" prop="expertInfo.speciality">
            <el-input
              v-model="form.expertInfo.speciality"
              size="medium"
              maxlength="200"
              clearable
              placeholder="请输入专家擅长领域"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>教育信息</h3>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in form.educationExperienceList" :key="index">
        <el-col :span="12">
          <el-form-item label="毕业学校" :prop="'educationExperienceList.' + index + '.university'" :rules="[{required: true, message: '请输入毕业学校',trigger: 'blur'}]">
            <el-input
              v-model="item.university"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入毕业学校"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业" :prop="'educationExperienceList.' + index + '.major'" :rules="[{required: true, message: '请输入专业',trigger: 'blur'}]">
            <el-input
              v-model="item.major"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入专业"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始时间" :prop="'educationExperienceList.' + index + '.startTime'" :rules="[{required: true, message: '请选择开始时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="item.startTime"
              :picker-options="pickerOptions"
              :disabled="viewFlag"
              size="medium"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" :prop="'educationExperienceList.' + index + '.endTime'" :rules="[{required: true, message: '请选择结束时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="item.endTime"
              :picker-options="pickerOptions"
              :disabled="viewFlag"
              size="medium"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="获得荣誉" :prop="'educationExperienceList.' + index + '.honor'" :rules="[{required: true, message: '请输入获得荣誉',trigger: 'blur'}]">
            <el-input
              v-model="item.honor"
              size="medium"
              maxlength="50"
              clearable
              :disabled="viewFlag"
              placeholder="请输入荣誉"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="荣誉证书" class="readonlyItem" :prop="'educationExperienceList.' + index + '.certificateOssUrl'" :rules="[{required: true, message: '请上传荣誉证书',trigger: 'change'}]">
            <input type="text" class="readonlyInput" v-model="item.certificateOssUrl" placeholder="请上传" disabled />
            <el-button 
              type="primary" 
              size="medium" 
              style="margin-right: 10px;"
              :disabled="viewFlag"
            >上传荣誉证书</el-button>
            <input type="file" :ref="'referenceUpload' + index" @change="getFile($event, item, index)" class="kio" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-remove-outline"
              size="small"
              :disabled="viewFlag"
              @click="handleDelEducation(index)"
              >删除教育信息</el-button>
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
              :disabled="viewFlag"
              @click="handleAddEducation()"
              >新增教育信息</el-button>
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
  getOrgAreaList,
  ossUploadFile
} from "@/api/common";
import {
  expertDetail,
  expertAudit
} from "@/api/expertManage";
import { queryOrgAll } from "@/api/userManage";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      headerTitle: '编辑专家',
      checkList: [],
      id: this.$route.params.id,
      viewFlag: this.$route.query.flag == 'view' || false,
      form: {
        //专家信息
        expertInfo: {
          address: "", //现居住地址
          annualIncome: null, //专家年收入
          birthDay: "",
          province: "",
          city: "",
          area: "", //专家所在区县编码
          credentialNo: "", //专家证件号
          credentialType: "", //专家证件类型 1 ID 2 PASS
          email: "",
          sex: "",
          emergencyContactName: "", //专家紧急联系人姓名
          emergencyContactPhone: "", //专家紧急联系人手机
          expectedAnnualIncome: null, //期望年收入：万元
          graduationInstitution: "", //专家毕业院校
          headerImg: "", //专家头像
          hobby: "", //兴趣爱好
          hometown: "", //专家籍贯
          level: "", //专家级别
          major: "", //专家院校专业
          education: "", //专家学历
          degree: "", //专家学位
          maritalStatus: "", //专家婚姻状态
          name: "", //专家姓名
          nation: "", //专家国籍
          orgName: "", //专家所属机构编码
          partnerType: null, //专家类型
          phone: "", //专家手机号
          race: "", //专家民族
          recommendName: "", //专家推荐人姓名
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
        ]
      },
      orgList: [], //机构列表数据
      // 省市区列表数据
      proName: [],
      CityName: [],
      AreaName: [],
      rules: {
        'expertInfo.name': [
          {
            required: true,
            message: "专家姓名不可为空",
            trigger: "blur",
          },
        ],
        'expertInfo.credentialType': [
          {
            required: true,
            message: "证件不可为空",
            trigger: "change",
          }
        ],
        'expertInfo.credentialNo': [
          {
            required: true,
            message: "证件号码不可为空",
            trigger: "blur",
          }
        ],
        'expertInfo.annualIncome': [
          {
            required: true,
            message: "专家年收入不可为空",
            trigger: "blur",
          },
        ],
        'expertInfo.province': [
          {
            required: true,
            validator: (rules, value, callback) => {
              let { city, area } = this.form.expertInfo;
              if (!value || !city) {
                return callback(new Error("请选择省市区"));
              }
              return callback();
            },
            trigger: "change",
          },
        ],
        'expertInfo.maritalStatus': [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        'expertInfo.phone': [
          {
            required: true,
            message: "专家手机号不可为空",
            trigger: "blur",
          },
          {
            pattern: /^(1[3584]\d{9})$/,
            message: "请输入正确手机号",
          },
        ],
        'expertInfo.graduationInstitution': [
          {
            required: true,
            message: "专家毕业学校不可为空",
            trigger: "blur",
          },
        ],
        'expertInfo.major': [
          {
            required: true,
            message: "专家专业不可为空",
            trigger: "blur",
          },
        ],
        'expertInfo.education': [
          {
            required: true,
            message: "专家学历不可为空",
            trigger: "blur",
          },
        ],
        'expertInfo.memberType': [
          {
            required: true,
            message: "专家类别不可为空",
            trigger: "change",
          },
        ],
        'expertInfo.orgName': [
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
      this.headerTitle = '查看专家';
    }
    //获取所在省数据
    this.getProvinceData();
    //获取专家详细信息
    this.getDetail();
  },
  methods: {
    //获取专家详细信息
    async getDetail(){
      let res = await expertDetail(this.id);
      if(res.code == 1){
        this.form = res.data;
        this.form.educationExperienceList.forEach(item => {
          this.$set(item, 'fileName', '');
          this.$set(item, 'excelFile', null);
        })

        if(this.form.expertInfo.province){
          //获取市数据
          this.getCityData(this.form.expertInfo.province);
        }
        if(this.form.expertInfo.city){
          //获取县数据
          this.getAreaData(this.form.expertInfo.city);
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
      this.form.expertInfo.city = ""; //所在市
      this.form.expertInfo.area = ""; //所在县
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
        this.form.expertInfo.area = ""; //所在县
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
    //保存
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          expertUpdate(this.form).then((res) => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc", () => {
                location.reload();
              });
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      });
    },
    //审核
    async handleAudit(status){
      if(!this.form.audit.auditContent){
        return this.openMessage('请填写审核内容说明', "err");
      }
      let res = await expertAudit({
        auditContent: this.form.audit.auditContent,
        auditStatus: status,
        expertId: this.id
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
