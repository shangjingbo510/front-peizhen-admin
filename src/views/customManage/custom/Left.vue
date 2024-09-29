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
          <el-form-item label="姓名" prop="customer.name">
            <el-input
              v-model="form.customer.name"
              size="medium"
              maxlength="30"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="customer.credentialType">
            <el-select
              v-model="form.customer.credentialType"
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
          <el-form-item label="证件号码" prop="customer.credentialNo">
            <el-input
              v-model="form.customer.credentialNo"
              size="medium"
              maxlength="50"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="customer.sex">
            <el-select
              v-model="form.customer.sex"
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
          <el-form-item label="年收入(万元)" prop="customer.annualIncome">
            <el-input
              v-model="form.customer.annualIncome"
              size="medium"
              maxlength="50"
              placeholder="请输入年收入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况" prop="customer.maritalStatus">
            <el-select
              v-model="form.customer.maritalStatus"
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
          <el-form-item label="手机号" prop="customer.phone">
            <el-input
              v-model="form.customer.phone"
              size="medium"
              maxlength="50"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯" prop="customer.hometown">
            <el-input
              v-model="form.customer.hometown"
              size="medium"
              maxlength="200"
              placeholder="请输入籍贯"
              :disabled="viewFlag"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在地区" prop="customer.province">
            <el-select
              class="w-150"
              v-model="form.customer.province"
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
              v-model="form.customer.city"
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
              v-model="form.customer.area"
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
          <el-form-item label="详细地址" prop="customer.address">
            <el-input
              v-model="form.customer.address"
              size="medium"
              maxlength="200"
              clearable
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>资产配置信息</h3>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in form.customerAssetsList" :key="index">
        <el-col :span="12">
          <el-form-item
            label="资产项类型"
            :prop="'customerAssetsList.' + index + '.itemType'"
            :rules="[
              { required: true, message: '请选择资产项类型', trigger: 'blur' },
            ]"
          >
            <el-select
              v-model="item.itemType"
              clearable
              size="medium"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enumList.AssetsTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="资产项名称"
            :prop="'customerAssetsList.' + index + '.itemName'"
            :rules="[
              { required: true, message: '请输入资产项名称', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="item.itemName"
              size="medium"
              maxlength="50"
              clearable
              placeholder="请输入资产项名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="资产数值"
            :prop="'customerAssetsList.' + index + '.itemValue'"
            :rules="[
              { required: true, message: '请输入资产数值', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="item.itemValue"
              size="medium"
              maxlength="50"
              clearable
              placeholder="请输入资产数值"
              oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="资产价值"
            :prop="'customerAssetsList.' + index + '.assetsValue'"
            :rules="[
              { required: false, message: '请输入资产价值', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="item.assetsValue"
              size="medium"
              maxlength="50"
              clearable
              placeholder="请输入资产价值"
              oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="持股形式"
            :prop="'customerAssetsList.' + index + '.shareholdingType'"
            :rules="[
              { required: true, message: '请选择持股形式', trigger: 'blur' },
            ]"
          >
            <el-select
              v-model="item.shareholdingType"
              clearable
              size="medium"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enumList.ShareHoldingTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="是否代持"
            :prop="'customerAssetsList.' + index + '.isNomination'"
            :rules="[{ required: true, message: '请选择', trigger: 'blur' }]"
          >
            <el-select
              v-model="item.isNomination"
              clearable
              size="medium"
              placeholder="请选择"
            >
              <el-option
                v-for="item in enumList.YesOrNoEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="补充说明"
            :prop="'customerAssetsList.' + index + '.remark'"
          >
            <el-input
              type="textarea"
              v-model="item.remark"
              size="medium"
              maxlength="500"
              clearable
              placeholder="请输入补充说明"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件" class="readonlyItem" :prop="'customerAssetsList.' + index + '.certificateOssUrl'">
            <input type="text" class="readonlyInput" v-model="item.certificateOssUrl" placeholder="请上传" disabled />
            <el-button type="primary" size="small" style="margin-right: 10px;">上传附件</el-button>
            <input type="file" :ref="'referenceUpload' + index" @change="getFile($event, item, index)" class="kio" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" ">
            <el-button
              type="primary"
              icon="el-icon-remove-outline"
              size="small"
              @click="handleDelCustomerAssets(index)"
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
              @click="handleAddCustomerAssets()"
              >增加</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
      <h3>家庭信息</h3>
      <el-divider></el-divider>
      <el-row v-for="(item, index) in form.customerFamilyList" :key="index">
        <el-col :span="12">
          <el-form-item label="关系" prop="relation">
            <el-select
              v-model="item.relation"
              clearable
              size="medium"
              placeholder="请选择"
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
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="item.phone"
              size="medium"
              maxlength="50"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型" prop="credentialType">
            <el-select
              v-model="item.credentialType"
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
          <el-form-item label="证件号码" prop="credentialNo">
            <el-input
              v-model="item.credentialNo"
              size="medium"
              maxlength="50"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况" prop="maritalStatus">
            <el-select
              v-model="item.maritalStatus"
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
          <el-form-item label="单位名称" prop="workUnit">
            <el-input
              v-model="item.workUnit"
              size="medium"
              maxlength="50"
              placeholder="请输入单位名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务名称" prop="position">
            <el-input
              v-model="item.position"
              size="medium"
              maxlength="30"
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
              @click="handleDelFamilyMembers(index)"
              >删除家庭成员</el-button
            >
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
              >新增家庭成员</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item class="text-center">
            <el-button size="medium" type="primary" @click="submitForm()"
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
import { customAdd } from "@/api/customManage";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
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
          residenceAddress: "", //户籍地址
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
            assetsValue: '', //资产价值
            remark: "", //备注
            shareholdingType: "", //持股形式
            certificateOssUrl: '', //附件
            excelFile: ''
          },
        ],
      },
      // 省市区列表数据
      proName: [],
      CityName: [],
      AreaName: [],
      rules: {
        "customer.name": [
          {
            required: true,
            message: "客户姓名不可为空",
            trigger: "blur",
          },
        ],
        "customer.credentialType": [
          {
            required: true,
            message: "证件不可为空",
            trigger: "change",
          },
        ],
        "customer.credentialNo": [
          {
            required: true,
            message: "证件号码不可为空",
            trigger: "blur",
          },
        ],
        "customer.annualIncome": [
          {
            required: true,
            message: "客户年收入不可为空",
            trigger: "blur",
          },
        ],
        "customer.province": [
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
        "customer.maritalStatus": [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        "customer.sex": [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        "customer.phone": [
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
        "customer.graduationInstitution": [
          {
            required: true,
            message: "客户毕业学校不可为空",
            trigger: "blur",
          },
        ],
        "customer.major": [
          {
            required: true,
            message: "客户专业不可为空",
            trigger: "blur",
          },
        ],
        "customer.education": [
          {
            required: true,
            message: "客户学历不可为空",
            trigger: "blur",
          },
        ],
        "customer.partnerType": [
          {
            required: true,
            message: "客户类别不可为空",
            trigger: "change",
          },
        ],
        "customer.orgCode": [
          {
            required: true,
            message: "所属机构不可为空",
            trigger: "change",
          },
        ],
        "customer.recommendName": [
          {
            required: true,
            message: "推荐人姓名不可为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      enumList: (state) => state.app.enumList,
    }),
  },
  mounted() {
    //获取所在省数据
    this.getProvinceData();
  },
  methods: {
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
      this.form.customer.city = ""; //所在市
      this.form.customer.area = ""; //所在县
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
        this.form.customer.area = ""; //所在县
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
    //添加资产配置信息
    handleAddCustomerAssets() {
      this.form.customerAssetsList.push({
        isNomination: "", //是否代持：1是，0否
        itemName: "", //资产项名称
        itemType: "", //资产项类型
        itemValue: "", //资产数值
        assetsValue: '', //资产价值
        remark: "", //备注
        shareholdingType: "", //持股形式
        certificateOssUrl: '', //附件
        excelFile: ''
      });
    },
    //删除资产配置信息
    handleDelCustomerAssets(index) {
      if (this.form.customerAssetsList.length > 1) {
        this.form.customerAssetsList.splice(index, 1);
      }
    },
    //添加家庭成员
    handleAddFamilyMembers(){
      this.form.customerFamilyList.push({
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
      })
    },
    //删除家庭成员
    handleDelFamilyMembers(index){
      if(this.form.customerFamilyList.length > 1){
        this.form.customerFamilyList.splice(index, 1);
      }
    },
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          customAdd(this.form).then((res) => {
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
