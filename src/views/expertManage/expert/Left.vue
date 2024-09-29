<template>
  <div class="padding-20">
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
              maxlength="30"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="头像" size="small" prop="expertInfo.headerImg">
              <el-upload
              class="titImg-uploader"
              action=""
              :auto-upload="false"
              list-type="picture"
              :show-file-list="false"
              :on-change="handleThumbChange"
              :multiple="false"
              accept="image/jpeg,image/jpg,image/png"
            >
              <img
                v-if="form.expertInfo.headerImg"
                :src="form.expertInfo.headerImg"
                class="titImg"
              />
              <i v-else class="el-icon-plus titImg-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="expertInfo.credentialType">
            <el-select
              v-model="form.expertInfo.credentialType"
              clearable
              placeholder="请选择"
              size="medium"
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
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="expertInfo.hometown">
            <el-input
              v-model="form.expertInfo.hometown"
              size="medium"
              maxlength="200"
              placeholder="请输入籍贯"
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
              maxlength="200"
              clearable
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
              placeholder="请输入专业"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开始时间" :prop="'educationExperienceList.' + index + '.startTime'" :rules="[{required: true, message: '请选择开始时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="month"
              placeholder="选择日期"
              v-model="item.startTime"
              size="medium"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" :prop="'educationExperienceList.' + index + '.endTime'" :rules="[{required: true, message: '请选择结束时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="month"
              placeholder="选择日期"
              v-model="item.endTime"
              size="medium"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="获得荣誉" :prop="'educationExperienceList.' + index + '.honor'">
            <el-input
              type="textarea"
              v-model="item.honor"
              size="medium"
              maxlength="200"
              clearable
              placeholder="请输入荣誉"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="荣誉证书" class="readonlyItem" :prop="'educationExperienceList.' + index + '.certificateOssUrl'">
            <input type="text" class="readonlyInput" v-model="item.certificateOssUrl" placeholder="请上传" disabled />
            <el-button type="primary" size="medium" style="margin-right: 10px;">上传荣誉证书</el-button>
            <input type="file" :ref="'referenceUpload' + index" @change="getFile($event, item, index)" class="kio" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-remove-outline"
              size="small"
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
              type="month"
              placeholder="选择日期"
              v-model="item.startTime"
              size="medium"
              value-format="yyyy-MM"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="终止时间" :prop="'workExperienceList.' + index + '.endTime'" :rules="[{required: true, message: '请选择终止时间',trigger: 'change'}]">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="month"
              placeholder="选择日期"
              v-model="item.endTime"
              size="medium"
              value-format="yyyy-MM"
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
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门名称" :prop="'workExperienceList.' + index + '.department'" :rules="[{required: true, message: '请输入部门名称',trigger: 'blur'}]">
            <el-input
              v-model="item.department"
              size="medium"
              maxlength="30"
              clearable
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务名称" :prop="'workExperienceList.' + index + '.position'" :rules="[{required: true, message: '请输入职务名称',trigger: 'blur'}]">
            <el-input
              v-model="item.position"
              size="medium"
              maxlength="30"
              clearable
              placeholder="请输入职务名称"
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
              >增加</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item class="text-center">
            <el-button size="small" type="primary" @click="submitForm()"
              >保存</el-button>
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
  expertAdd
} from "@/api/expertManage";
import { queryOrgAll } from "@/api/userManage";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      recommendOptions: [],
      loading: false,
      checkList: [],
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
          orgName: "", //专家所属机构
          memberType: null, //专家类别
          expertType: '', //专家分类
          speciality: '', //擅长领域
          phone: "", //专家手机号
          race: "", //专家民族
          recommendName: "", //专家推荐人姓名
          residenceAddress: "" //户籍地址
        },
        //教育信息
        educationExperienceList: [
          {
            university: "", //毕业院校
            major: "", //专家院校专业
            pedigree: "", //专家系别
            honor: '', //获取荣誉
            startTime: '', //开始时间
            endTime: '', //结束时间
            certificateOssUrl: '', //证书
            excelFile: ''
          }
        ],
        //专家资质证书
        certificateList: [
          {
            certificateDesc: "", //资质证书描述
            certificateOssUrl: "" //资质证书
          }
        ],
        //工作经历
        workExperienceList: [
          {
            certificateOssUrl: "", //工作当中获取的荣誉证书
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
            message: "证件类型不可为空",
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
        'expertInfo.sex': [
          {
            required: true,
            message: "性别不可为空",
            trigger: "change",
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
              if (!value || !city || !area) {
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
            message: "婚姻状况不可为空",
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
        'expertInfo.expertType': [
          {
            required: true,
            message: "专家分类不可为空",
            trigger: "change",
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
    //头像上传
    async handleThumbChange(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        return this.openMessage('图片大小不能超过 10MB!', 'war');
      }
      let res = await ossUploadFile({ 
        file: file.raw,
        businessType: 'expertHeadImg'
      });
      if (res.code == 1) {
        this.form.expertInfo.headerImg = res.data;
      } else {
        this.form.expertInfo.headerImg = '';
        this.openMessage(res.message, 'err');
      }
    },
    //上传文件
    async getFile(event, item, index) {
      let fileVal = event.target.files[0];

      let res = await ossUploadFile({
        businessType: 'certificate',
        file: fileVal
      })
      if(res.code == 1){
        item.excelFile = fileVal;
        item.certificateOssUrl = res.data;
        this.$refs['referenceUpload' + index].value = null;
      }else{
        item.excelFile = null;
        item.certificateOssUrl = '';
        this.$refs['referenceUpload' + index].value = null;
        this.openMessage(res.message, "err");
      }
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
    //添加教育经历
    handleAddEducation(){
      this.form.educationExperienceList.push({
        university: "", //毕业院校
        major: "", //专家院校专业
        pedigree: "", //专家系别
        honor: '', //获取荣誉
        startTime: '', //开始时间
        endTime: '', //结束时间
        certificateOssUrl: '', //证书
        excelFile: ''
      })
    },
    //删除教育经历
    handleDelEducation(index){
      if(this.form.educationExperienceList.length > 1){
        this.form.educationExperienceList.splice(index, 1);
      }
    },
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          expertAdd(this.form).then((res) => {
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
  },
  watch: {
    checkList(val){
      this.form.expertInfo.hobby = val.join(',');
    }
  }
};
</script>
<style lang='scss' scoped>
.el-input,
.el-select {
  width: 76%;
}
.titImg-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.titImg-uploader .el-upload:hover {
  border-color: #409eff;
}
.titImg-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px dashed #dee1e5;
}
.titImg {
  width: 120px;
  height: 80px;
  display: block;
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
