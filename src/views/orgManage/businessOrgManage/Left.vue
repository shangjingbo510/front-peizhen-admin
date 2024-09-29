<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="140px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构编码" prop="_orgCode">
            <el-input v-model="form._orgCode" size="medium" maxlength="3" placeholder="请输入三位数字">
              <template slot="prepend">{{ selsf }}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构名称" prop="orgName">
            <el-input v-model="form.orgName" size="medium" maxlength="50" placeholder="请输入机构名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构级别" prop="orgRank">
            <!-- @change="inter(form.orgRank)" -->
            <el-select
              v-model="form.orgRank"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="(item,index) in orgLevels"
                :key="index"
                :label="`${item.levelCode}-${item.levelName}`"
                :value="item.levelCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所在省" class="need" prop="province">
            <el-select
              v-model="form.province"
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
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="所在市"
            class="need"
            prop="city"
          >
            <el-select v-model="form.city" @change="handleCityChange" size="medium">
              <el-option
                v-for="item in CityName"
                :key="item.cityCode"
                :label="item.cityName"
                :value="item.cityCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所在县" class="need" prop="area">
            <el-select v-model="form.area" size="medium">
              <el-option
                v-for="item in AreaName"
                :key="item.areaCode"
                :label="item.areaName"
                :value="item.areaCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" prop="enterprise">
            <el-input
              v-model="form.enterprise"
              size="medium"
              maxlength="18"
              placeholder="请输入统一社会信用代码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人姓名" prop="orgCertName">
            <el-input v-model="form.orgCertName" size="medium" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人证件类型" prop="orgCertType">
            <el-select v-model="form.orgCertType" clearable placeholder="请选择" size="medium">
              <el-option
                v-for="item in enumList.CredentialTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人证件号码" prop="orgCertNum">
            <el-input v-model="form.orgCertNum" size="medium" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系手机" prop="orgPhone">
            <el-input v-model="form.orgPhone" size="medium" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" size="medium" maxlength="200"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="成立时间" prop="establishDate">
            <el-date-picker
              suffix-icon="el-icon-date"
              type="date"
              placeholder="选择日期"
              v-model="form.establishDate"
              :picker-options="pickerOptions"
              size="medium"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">保存</el-button>
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
import { orgAdd } from "@/api/orgManage";
import { queryOrgAll } from '@/api/userManage';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      selsf: '8600',
      form: {
        isStop: 0,
        address: '',
        area: '',
        city: '',
        cityName: '',
        orgName: '',
        orgRank: '',
        province: '',
        provinceName: '',
        enterprise: '',
        superId: '',
        orgCode: '',
        establishTime: '',
        orgCertName: '',
        orgPhone: '',
        orgCertType: '',
        orgCertNum: ''
      },
      orgList: [], //上级机构列表数据
      //机构级别
      orgLevels: [
      {
        levelName: '总公司',
        levelCode: '00'
      },
      {
        levelName: '分公司',
        levelCode: '01'
      }],
      // 省市区列表数据
      proName: [],
      CityName: [],
      AreaName: [],
      rules: {
        orgName: [
          {
            required: true,
            message: '机构名称不可为空',
            trigger: 'blur'
          }
        ],
        _orgCode: [
          {
            required: true,
            message: '机构编码不可为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 3,
            message: '长度须为3个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9]+$/,
            message: '请输入数字'
          }
        ],
        enterprise: [
          {
            required: false,
            message: '统一社会信用代码不可为空',
            trigger: 'blur'
          },
          {
            min: 18,
            max: 18,
            message: '长度须为18个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '统一社会信用代码由数字字母组成'
          }
        ],
        orgRank: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        province: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        area: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        superId: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        orgCertName: [
          {
            required: false,
            message: '机构负责人不可为空',
            trigger: 'blur'
          },
          {
            min: 2,
            message: '请输入不少于2个字符',
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z\u4e00-\u9fa5]+$/,
            message: '请输入正确机构负责人'
          }
        ],
        orgPhone: [
          {
            required: false,
            message: '机构电话不可为空',
            trigger: 'blur'
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,
            message: '请输入正确机构电话'
          }
        ]
      },
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted(){
    //获取上级机构列表
    // this._initOrg();
    //获取所在省数据
    this.getProvinceData();
  },
  methods: {
    //获取上级机构列表
    async _initOrg(){
      let res = await queryOrgAll();
      if(res.code == 1){
        this.orgList = res.data;
      }else{
        this.orgList = [];
      }
    },
    //获取所在省数据
    async getProvinceData(){
      let res = await getOrgProvinceList()
      if(res.code == 1){
        this.proName = res.data;
      }
    },
    //省改变事件
    handleProvinceChange(val){
      if(val){
        //获取市数据
        this.getCityData(val);
      }
      this.form.city = ''; //所在市
      this.form.area = ''; //所在县
      this.AreaName = this.CityName = [];
      this.form.superId = ''; //上级机构
      this.orgList = [];
    },
    //获取市数据
    async getCityData(code){
      let res = await getOrgCityList(code)
      if(res.code == 1){
        this.CityName = res.data;
      }else{
        this.CityName = [];
      }
    },
    //市改变事件
    handleCityChange(val){
      if(val){
        this.form.area = ''; //所在县
        this.AreaName = [];
        //获取县数据
        this.getAreaData(val);
      }
    },
    //获取县数据
    async getAreaData(code){
      let res = await getOrgAreaList(code)
      if(res.code == 1){
        this.AreaName = res.data;
      }else{
        this.AreaName = [];
      }
    },
    //机构级别 change
    inter(code) {
      this.$set(this.form, 'superId', '');
      if (code == '01' && this.form.province) {
        this.selsf = this.baseOrgId + this.form.province;
        this.form.city = null;
        this.form.area = null;
      } else if (code == '02' && this.form.city) {
        this.selsf = this.baseOrgId + this.form.city;
        this.form.area = null;
        this.$set(this.form, 'orgType', '');
      } else if (code == '03' && this.form.area) {
        this.selsf = this.baseOrgId + this.form.area;
        this.$set(this.form, 'orgType', '');
      } else {
        this.selsf = this.baseOrgId;
        this.$set(this.form, 'orgType', '');
      }
      // this.orginit();
    },
    //查询上级机构集合
    orginit() {
      let formData = new FormData();
      formData.append('orgRank', this.form.orgRank);
      formData.append('city', this.form.city);
      fetch(getPartentOrgListById, formData).then(res => {
        if (res.success === 'success') {
          this.orgSups = JSON.parse(res.msg);
        } else {
          this.orgSups = [];
        }
      });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.orgCode = this.selsf + this.form._orgCode;
          orgAdd(this.form).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc", ()=> {
                location.reload();
              });
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.el-input,.el-select {
  width: 76%;
}
.tree-box{
  max-height: 400px;
  overflow: auto;
}
</style>
