<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="机构名称" prop="loginName">
            <el-select v-model="queryForm.orgCode" clearable placeholder="请选择" size="medium">
              <el-option
                v-for="item in orgList"
                :key="item.index"
                :label="`${item.orgCode}-${item.orgName}`"
                :value="item.orgCode"
                :superId="item.superId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构级别" prop="loginName">
            <el-input size="small" v-model="queryForm.loginName" placeholder="请选择"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="queryTable()">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>

    <div class="inline-bg"></div>

    <div class="table">
      <el-table :data="tableData" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="orgCode" label="机构编码" width="140"></el-table-column>
        <el-table-column prop="orgName" label="机构名称" width="140"></el-table-column>
        <el-table-column prop="enterprise" label="统一社会信用代码" width="180"></el-table-column>
        <el-table-column prop="orgRankName" label="机构级别" align="center"></el-table-column>
        <el-table-column prop="provinceName" label="所在省(直辖市)" width="140" align="center"></el-table-column>
        <el-table-column prop="cityName" label="所在市" align="center"></el-table-column>
        <el-table-column prop="areaName" label="所在县(区)" width="140" align="center"></el-table-column>
        <el-table-column prop="orgCertName" label="法人姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="orgCertTypeName" label="法人证件类型" width="120" align="center"></el-table-column>
        <el-table-column prop="orgCertNum" label="法人证件号码" width="180"></el-table-column>
        <el-table-column prop="orgPhone" label="联系手机" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="180"></el-table-column>
        <el-table-column prop="establishDate" label="成立时间" sortable align="center" width="120"></el-table-column>
        <el-table-column prop="stopDate" label="停业日期" sortable align="center" width="120"></el-table-column>
        <el-table-column prop="isStopName" label="停业标志" align="center" :formatter="bIsStop"></el-table-column>
        <el-table-column label="操作" width="160" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
              class="textBtn"
            >修改</el-button>
            <el-button
              type="text"
              @click="delItem(scope.row)"
              v-if="scope.row.orgRank != '00'"
              class="textBtn"
              style="color: #ff5b5b;"
            >删除</el-button>
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
            :page-size="queryForm.pageSize"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="修改机构信息" :visible.sync="editShow" width="40%">
      <el-form label-width="140px" ref="formEdit" :model="editItem" :rules="editRules">
        <el-row>
            <el-col :span="24">
              <el-form-item label="机构编码" prop="_orgCode">
                <el-input v-model="editItem._orgCode" size="medium" disabled>
                  <template slot="prepend">8600</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构名称" prop="orgName">
                <el-input size="medium" v-model="editItem.orgName" auto-complete="off" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构级别" prop="orgRank">
                <el-select
                  v-model="editItem.orgRank"
                  clearable
                  placeholder="请选择"
                  size="medium"
                >
                  <el-option
                    v-for="item in orgLevels"
                    :key="item.index"
                    :label="`${item.levelCode}-${item.levelName}`"
                    :value="item.levelCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="所在省" prop="province" class="need">
                <el-select
                  size="medium"
                  v-model="editItem.province"
                  placeholder="请选择"
                  clearable
                  disabled
                >
                  <el-option
                    v-for="item in proName"
                    :key="item.id"
                    :label="item.provinceName"
                    :value="item.provinceCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="所在市"
                prop="cityName"
                class="need"
                v-if="
                  editItem.orgRank == '01' ||
                  editItem.orgRank == '02' ||
                  editItem.orgRank == '03'
                "
              >
                <el-select size="medium" v-model="editItem.cityName" disabled>
                  <el-option
                    v-for="item in CityName"
                    :key="item.id"
                    :label="item.cityName"
                    :value="item.cityCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="所在县"
                prop="areaName"
                v-if="editItem.orgRank == '03'"
                class="need"
              >
                <el-select size="medium" v-model="editItem.areaName" disabled>
                  <el-option
                    v-for="item in AreaName"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.areaCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="统一社会信用代码" prop="enterprise">
                <el-input
                  size="medium"
                  v-model="editItem.enterprise"
                  maxlength="18"
                  placeholder="请输入统一社会信用代码"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="法人姓名" prop="orgCertName">
                <el-input size="medium" auto-complete="off" v-model="editItem.orgCertName" maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="法人证件类型" prop="orgCertType">
                <el-select v-model="editItem.orgCertType" clearable placeholder="请选择" size="medium">
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
            <el-col :span="24">
              <el-form-item label="法人证件号码" prop="orgCertNum">
                <el-input size="medium" v-model="editItem.orgCertNum" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="联系手机" prop="orgPhone">
                <el-input size="medium" auto-complete="off" v-model="editItem.orgPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址" prop="address">
                <el-input size="medium" auto-complete="off" v-model="editItem.address" maxlength="200"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="成立时间" prop="establishDate" v-if="editItem.orgRank != '00'">
                <el-date-picker
                  type="date"
                  size="medium"
                  placeholder="选择日期"
                  v-model="editItem.establishDate"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="停业标志" prop="isStop" v-if="editItem.orgRank != '00'">
                <!--1停用 0启用-->
                <el-select
                  v-model="editItem.isStop"
                  placeholder
                  size="medium"
                  @change="manpe(editItem.isStop)"
                >
                  <el-option :key="0" label="否" :value="0"></el-option>
                  <el-option :key="1" label="是" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="停业日期" prop="stopTime" v-if="editItem.orgRank != '00'">
                <el-date-picker
                  type="date"
                  size="medium"
                  placeholder="选择日期"
                  v-model="editItem.stopTime"
                  :disabled="styles"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        <div class="dialog-footer">
          <el-button type="button" size="medium" @click="editShow = false">取消</el-button>
          <el-button type="primary" size="medium" @click="submitForm">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrgProvinceList,
  getOrgCityList,
  getOrgAreaList
} from "@/api/common";
import { queryOrgList, orgExport, orgUpdate, orgRemove } from "@/api/orgManage";
import { mapState } from 'vuex';
import { exportExcelPost } from "@/utils/common";
export default {
  components: {},
  data() {
    return {
      queryForm: {
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      total: 0,
      orgList: [],
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
      editShow: false,
      // 省市区列表数据
      proName: [],
      CityName: [],
      AreaName: [],
      editRules: {
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
        orgType: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        superCode: [
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
      editItem: {
        id: '',
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
        superCode: '',
        orgCode: '',
        _orgCode: '',
        establishTime: '',
        orgCertName: '',
        orgPhone: '',
        orgCertType: '',
        orgCertNum: ''
      }
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList
    })
  },
  mounted(){
    this.queryTable();
    //获取所在省数据
    this.getProvinceData();
  },
  methods: {
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      queryOrgList(this.queryForm)
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
    //编辑机构
    handleEdit(row){
      this.editItem = row;
      this.editItem._orgCode = this.editItem.orgCode.slice(-3);
      this.editShow = true;
      this.$nextTick(() => {
        this.$refs.formEdit.clearValidate();
      })
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
      this.form.superCode = ''; //上级机构
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
      exportExcelPost(orgExport(), this.queryForm);
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          orgUpdate(this.editItem).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.editShow = false;
              this.queryTable();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        }
      });
    },
    //删除机构
    delItem(row){
      this.$confirm('即将删除该机构，是否确认？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await orgRemove(row.id);
          if (res.code == 1) {
            this.openMessage(res.message, "suc");
            this.editShow = false;
            this.queryTable();
          } else {
            this.openMessage(res.message, "err");
          }
        }).catch();
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
.tree-box{
  max-height: 400px;
  overflow: auto;
}
</style>
