<template>
  <div>
    <el-form :model="queryForm" label-width="80px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="loginName">
            <el-input size="small" v-model="queryForm.loginName" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="realName">
            <el-input size="small" v-model="queryForm.realName" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="启用状态" prop="status" placeholder="请选择">
            <el-select size="small" v-model="queryForm.status" clearable>
              <el-option label="启用" value="1">启用</el-option>
              <el-option label="停用" value="0">停用</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构权限" prop="orgId" placeholder="请选择">
            <el-select v-model="queryForm.orgId" clearable placeholder="请选择" size="small">
              <el-option v-for="item in orgList" :key="item.orgCode" :label="item.orgCode+'-'+item.orgName" :value="item.orgCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="queryTable()">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="inline-bg"></div>

    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="loginName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="realName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="statusText" label="用户状态" align="center"></el-table-column>
        <el-table-column prop="orgName" label="机构权限" align="center"></el-table-column>
        <el-table-column prop="mail" label="邮箱" align="center" width="180"></el-table-column>
        <el-table-column prop="cellphone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建日期" align="center"></el-table-column>
        <el-table-column prop="expireTime" label="停用日期" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="updateInfo(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
         <el-button type="primary" class="export" size="small" @click="toExport">导出</el-button>
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePageSize($event)"
            @current-change="changepageNum($event)"
            :current-page="queryForm.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="修改系统用户" :visible.sync="editShow" width="50%">
      <el-form label-width="80px" :rules="rules" ref="formEdit" :model="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="loginName">
              <el-input v-model="editForm.loginName" disabled size="small" placeholder="用户名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="_password">
              <el-input size="small" type="password" v-model="editForm._password" placeholder="请输入密码" maxlength="30" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input size="small" type="password" v-model="editForm.confirmPassword" placeholder="请再次输入密码" maxlength="30" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="realName">
              <el-input v-model="editForm.realName" size="small" placeholder="姓名" maxlength="30" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="editForm.mail" size="small" placeholder="邮箱" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构权限" prop="orgId">
              <el-select v-model="editForm.orgId" clearable placeholder="请选择" size="small">
                <el-option v-for="item in orgList" :key="item.orgCode" :label="item.orgCode+'-'+item.orgName" :value="item.orgCode"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="cellphone">
              <el-input placeholder="手机号" size="small" v-model="editForm.cellphone" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select size="small" v-model="editForm.status" placeholder="请选择状态">
                <el-option :key="1" label="启用" :value="1">启用</el-option>
                <el-option :key="0" label="停用" :value="0">停用</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建日期">
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="editForm.createDate"
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="停用日期" prop="slockDate" ref="slockDateValid">
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="editForm.slockDate"
                :disabled="slockDateDisabled"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="dialog-footer">
          <el-button size="medium" type="button" @click="editShow = false">取消</el-button>
          <el-button size="medium" type="primary" @click="submitForm()">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { enCrypt } from '@/utils/crypto';
import { queryOrgAll, userList, userListExport, updateUser } from "@/api/userManage";
import { exportExcelPost } from "@/utils/common";
export default {
  components: {},
  data() {
    return {
      queryForm: {
        loginName: "",
        realName: "",
        status: "",
        orgId: '', //机构编码
        pageNum: 1,
        pageSize: 10
      },
      orgList: [],
      tableLoading: false,
      tableData: [],
      total: 0,
      editShow: false,
      editForm: {
        loginName: "",
        password: '',
        _password: '',
        confirmPassword: '',
        realName: "",
        mail: "",
        cellphone: "",
        orgId: '',
        status: "",
        createDate: "",
        slockDate: ""
      },
      rules: {
        loginName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名"
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
        realName: [
          {
            required: true,
            trigger: "blur",
            message: "姓名不可为空"
          },
          {
            min: 2,
            max: 50,
            message: "请输入2-50位姓名",
            trigger: "blur"
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
            message: "请选择机构权限",
            trigger: "change"
          }
        ]
      },
      slockDateDisabled: true,
      pickerOptions: {
        disabledDate: time => {
          return (
            time.getTime() <
            new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          );
        }
      }
    };
  },
  mounted(){
    //获取机构权限列表
    this._initOrg();
    this.queryTable();
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
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      userList(this.queryForm)
        .then(res => {
          if (res.code == 1) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else {
            this.tableData = [];
            this.total = 0;
            this.openMessage(res.message, "err");
          }
        })
        .catch(err => {
          console.log("err");
        })
        .finally(() => {
          this.tableLoading = false;
          this.update = false;
        });
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changepageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    //导出
    toExport() {
      exportExcelPost(userListExport(), this.queryForm);
    },
    //编辑
    updateInfo(row) {
      this.editForm = Object.assign({}, row, {
        _password: row.password,
        confirmPassword: row.password
      });
      this.editShow = true;
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          this.editForm.password = enCrypt(this.editForm._password);
          updateUser(this.editForm).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.editShow = false;
              this.queryTable();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    "editForm.status"(newVal) {
      if (newVal === 1) {
        this.slockDateDisabled = true;
        this.rules.slockDate[0].required = false;
        this.editForm.slockDate = "";
        setTimeout(() => {
          this.$refs.slockDateValid.clearValidate();
        }, 100);
      } else {
        this.slockDateDisabled = false;
        this.rules.slockDate[0].required = true;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.el-input,
.el-select,
.el-date-picker {
  width: 76%;
}
</style>
