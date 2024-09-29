<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="loginName">
            <el-input size="small" v-model="form.loginName" placeholder="请输入用户名" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="密码" prop="_password">
            <el-input size="small" type="password" v-model="form._password" placeholder="请输入密码" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input size="small" type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input size="small" v-model="form.realName" maxlength="30" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="mail">
            <el-input size="small" v-model="form.mail" placeholder="请输入正确的邮箱，以备找回密码" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号" prop="cellphone">
            <el-input
              size="small"
              v-model="form.cellphone"
              placeholder="请输入，后续可通过手机验证修改登录密码"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构权限" prop="orgId">
            <el-select v-model="form.orgId" clearable placeholder="请选择" size="small">
              <el-option v-for="item in orgList" :key="item.orgCode" :label="item.orgCode+'-'+item.orgName" :value="item.orgCode"></el-option>
            </el-select>
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
import { enCrypt } from '@/utils/crypto';
import { queryOrgAll, addUser } from "@/api/userManage";
export default {
  data() {
    return {
      form: {
        loginName: "",
        _password: '',
        password: '',
        confirmPassword: '',
        realName: "",
        mail: "",
        cellphone: "",
        orgId: '' //机构编码
      },
      orgList: [],
      rules: {
        loginName: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不可为空"
          }
        ],
        realName: [
          {
            required: true,
            trigger: "blur",
            message: "姓名不可为空"
          },
          {
            min: 2,
            max: 20,
            message: "请输入2-20位姓名",
            trigger: "blur"
          }
        ],
        _password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不可为空"
          }
        ],
        confirmPassword: [
          {
            required: true,
            trigger: "blur",
            message: "请再次输入密码"
          }
        ],
        mail: [
          {
            required: true,
            message: "邮箱不可为空",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
            pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
          }
        ],
        cellphone: [
          {
            required: true,
            message: "手机号不可为空",
            trigger: "blur"
          },
          {
            message: "请输入正确的手机号",
            pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            trigger: "blur"
          }
        ],
        orgId: [
          {
            required: true,
            trigger: "change",
            message: "请选择机构权限"
          }
        ]
      }
    };
  },
  mounted(){
    //获取机构权限列表
    this._initOrg();
  },
  methods: {
    //获取机构权限列表
    async _initOrg(){
      let res = await queryOrgAll();
      if(res.code == 1){
        this.orgList = res.data;
      }else{
        this.orgList = [];
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.password = enCrypt(this.form._password);
          addUser(this.form).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc", () => {
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
</style>
