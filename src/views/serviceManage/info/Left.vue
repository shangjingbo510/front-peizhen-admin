<template>
  <div class="padding-20">
    <el-form
      ref="submitForm"
      :rules="rules"
      :model="form"
      label-width="140px"
      class="form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="业务类型" prop="businessId">
            <el-select
              v-model="form.businessId"
              filterable
              clearable
              @change="handleBusinessChange"
              placeholder="请输入">
              <el-option
                v-for="item in businessList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务类别" prop="serviceCategoryIdList">
            <el-select
              v-model="form.serviceCategoryIdList"
              filterable
              clearable
              multiple
              placeholder="请输入">
              <el-option
                v-for="item in serviceList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务标题" prop="serviceTitle">
            <el-input
              v-model="form.serviceTitle"
              size="medium"
              maxlength="50"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合伙人名称" prop="partnerId">
            <el-select
              v-model="form.partnerId"
              filterable
              clearable
              placeholder="请输入">
              <el-option
                v-for="item in partnerList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户名称" prop="customerId">
            <el-select
              v-model="form.customerId"
              filterable
              clearable
              placeholder="请输入">
              <el-option
                v-for="item in customerList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目负责人" prop="masterId">
            <el-select
              v-model="form.masterId"
              filterable
              clearable
              placeholder="请输入">
              <el-option
                v-for="item in masterList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务需求描述" prop="serviceContent">
            <el-input
              type="textarea"
              v-model="form.serviceContent"
              size="medium"
              maxlength="500"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
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
  getServiceList
} from "@/api/common";
import {
  serviceApply
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      loading: false,
      form: {
        serviceTitle: '', //申请服务标题
        customerId: '', //客户id
        partnerId: '', //合伙人id
        masterId: '', //项目负责人ID
        serviceContent: '', //服务需求描述
        businessId: '', //家办业务ID
        serviceCategoryIdList: [] //服务类别 多选
      },
      serviceList: [],
      rules: {
        'serviceTitle': [
          {
            required: true,
            message: "服务标题不可为空",
            trigger: "blur",
          },
        ],
        'customerId': [
          {
            required: true,
            message: "客户不可为空",
            trigger: "change",
          }
        ],
        'partnerId': [
          {
            required: true,
            message: "合伙人不可为空",
            trigger: "change",
          }
        ],
        'masterId': [
          {
            required: true,
            message: "项目负责人不可为空",
            trigger: "change",
          },
        ],
        'businessId': [
          {
            required: true,
            message: "业务类型不可为空",
            trigger: "change",
          },
        ],
        'serviceCategoryIdList': [
          {
            required: true,
            message: "服务类别不可为空",
            trigger: "change",
          },
        ]
      },
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList,
      partnerList: state => state.app.partnerList,
      customerList: state => state.app.customerList,
      expertList: state => state.app.expertList,
      masterList: state => state.app.masterList,
      businessList: state => state.app.businessList
    })
  },
  mounted() {
    
  },
  methods: {
    //业务类型改变事件
    handleBusinessChange(val){
      this.form.serviceCategoryIdList = [];
      if(val){
        this._getServiceList(val);
      }else{
        this.serviceList = [];
      }
    },
    //获取服务类别下拉列表
    async _getServiceList(val){
      let res = await getServiceList({name: '', businessId: val});
      if (res.code == 1) {
        this.serviceList = res.data;
      }else{
        this.serviceList = [];
      }
    },
    submitForm() {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          serviceApply(this.form).then((res) => {
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
  }
};
</script>
<style lang='scss' scoped>
.el-input,
.el-select,
.el-textarea {
  width: 76%;
}
</style>
