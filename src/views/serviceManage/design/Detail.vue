<template>
  <div class="padding-20">
    <el-page-header @back="goBack" content="服务设计详情"></el-page-header>
    <el-divider></el-divider>
    <el-form
      ref="submitForm"
      :model="form"
      label-width="140px"
      class="form"
    >
      <h3 class="title">服务基本信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="业务名称：">
            <span>{{form.serviceInfo.businessName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务标题：">
            <span>{{form.serviceInfo.serviceTitle}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务编码：">
            <span>{{form.serviceInfo.serviceCode}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人姓名：">
            <span>{{form.serviceInfo.applyName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务申请时间：">
            <span>{{form.serviceInfo.applyTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目经理名称：">
            <span>{{form.serviceInfo.masterName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <h3 class="title">客户基本信息</h3>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：">
            <span>{{form.customer.customer.name}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型：">
            <span>{{form.customer.customer.credentialTypeText}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码：">
            <span>{{form.customer.customer.credentialNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：">
            <span>{{form.customer.customer.sexText}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年收入：">
            <span>{{form.customer.customer.annualIncome}}万元</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="婚姻状况：">
            <span>{{form.customer.customer.marital}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号：">
            <span>{{form.customer.customer.phone}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="籍贯：">
            <span>{{form.customer.customer.hometown}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址：">
            <span>{{form.customer.customer.address}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <h3 class="title mb-30">子节点信息</h3>
    <div class="mb-30">
      <ul class="flex childNode-box">
        <li class="text-center" :class="item.isArrived == 1 ? 'active' : ''" v-for="(item, index) in form.childNodeList" :key="index">
          <div class="relative circle">
            <span>{{item.childNode}}</span>
            <div class="absolute line" v-if="index < form.childNodeList.length - 1"></div>
          </div>
          <p>{{item.childNodeText}}</p>
        </li>
      </ul>
    </div>

    <el-divider></el-divider>
    <!-- 尽职报告列表 -->
    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">尽职报告列表</span>
        <el-button type="primary" size="small" @click="handleDueReportAdd">添加尽职报告</el-button>
      </div>
      <el-table :data="form.dueReportList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="finishTime" label="尽调完成时间" align="center"></el-table-column>
        <el-table-column prop="expertName" label="专家姓名" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="operatorName" label="操作人" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" width="160" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleVisitEdit(scope.row.id)"
              class="textBtn"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 设计方案列表 -->
    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">设计方案列表</span>
        <el-button type="primary" size="small" @click="handlePlanAdd">添加设计方案</el-button>
      </div>
      <el-table :data="form.planList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="planName" label="方案名称" width="140" align="center"></el-table-column>
        <el-table-column prop="planDesc" label="方案简介描述" width="140" align="center"></el-table-column>
        <el-table-column prop="expectStartTime" label="预计开始时间" width="160" align="center"></el-table-column>
        <el-table-column prop="expectFinishTime" label="预计结束时间" width="160" align="center"></el-table-column>
        <el-table-column prop="actualStartTime" label="实际开始时间" width="160" align="center"></el-table-column>
        <el-table-column prop="actualFinishTime" label="实际结束时间" width="160" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="planConfirmStatusText" label="方案状态" width="180" align="center"></el-table-column>
        <el-table-column prop="confirmTime" label="方案确认时间" width="180" align="center"></el-table-column>
        <el-table-column prop="expertName" label="专家姓名" align="center"></el-table-column>
        <el-table-column prop="masterName" label="项目负责人姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="partnerName" label="合伙人姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column prop="operatorName" label="操作人姓名" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleAssessEdit(scope.row.id)"
              class="textBtn"
            >修改</el-button>
            <el-button
              type="text"
              @click="handlePlanRecordsAdd(scope.row.id)"
              class="textBtn"
            >添加方案沟通记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-divider></el-divider>
    <!-- 方案沟通记录列表 -->
    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">方案沟通记录列表</span>
      </div>
      <el-table :data="form.planRecordsList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="planName" label="方案名称" width="140" align="center"></el-table-column>
        <el-table-column prop="communicationTime" label="方案沟通时间" width="140" align="center"></el-table-column>
        <el-table-column prop="communicationContent" label="方案沟通内容" width="140" align="center"></el-table-column>
        <el-table-column prop="expertName" label="专家姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="masterName" label="项目负责人姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="partnerName" label="合伙人姓名" align="center"></el-table-column>
        <el-table-column prop="modifyContent" label="修改内容" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="operatorName" label="操作人姓名" align="center"></el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleAssessRecordsEdit(scope.row.id)"
              class="textBtn"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="assessFlag == 'add' ? '添加设计方案' : '修改设计方案'" :visible.sync="assessShowDialog" width="70%">
      <div class="padding-20">
        <el-form
          ref="assessForm"
          :rules="assessRules"
          :model="assessForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="方案名称" prop="planName">
                <el-input
                  v-model="assessForm.planName"
                  size="medium"
                  maxlength="50"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计开始时间" prop="expectStartTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessForm.expectStartTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计结束时间" prop="expectFinishTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessForm.expectFinishTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实际开始时间" prop="actualStartTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessForm.actualStartTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实际结束时间" prop="actualFinishTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessForm.actualFinishTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="方案确认时间" prop="confirmTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessForm.confirmTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="方案状态" prop="planConfirmStatus">
                <el-select
                  v-model="assessForm.planConfirmStatus"
                  clearable
                  placeholder="请选择"
                  size="medium"
                >
                  <el-option v-for="(item, index) in enumList.ConfirmStatusEnum" 
                    :key="index" 
                    :label="item.name" 
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="方案简介描述" prop="planDesc">
                <el-input
                  type="textarea"
                  v-model="assessForm.planDesc"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专家名称" prop="expertId">
                <el-select
                  v-model="assessForm.expertId"
                  filterable
                  clearable
                  placeholder="请输入">
                  <el-option
                    v-for="item in expertList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="方案附件" class="readonlyItem" prop="attachmentOssUrl">
                <input type="text" class="readonlyInput" v-model="assessForm.attachmentOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="small">上传附件</el-button>
                <el-button type="primary" size="small" v-if="assessForm.attachmentOssUrl" @click="handleDownLoad(assessForm.attachmentOssUrl)">查看</el-button>
                <input type="file" ref="assessRef" @change="getFile($event, assessForm, 'assessRef')" class="kio" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="assessForm.remark"
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
                <el-button size="small" @click="assessShowDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitAssessForm">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog :title="assessRecordsFlag == 'add' ? '添加方案沟通内容' : '修改方案沟通内容'" :visible.sync="assessRecordsShowDialog" width="70%">
      <div class="padding-20">
        <el-form
          ref="assessRecordsForm"
          :rules="assessRecordsRules"
          :model="assessRecordsForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="方案沟通时间" prop="communicationTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessRecordsForm.communicationTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专家名称" prop="expertId">
                <el-select
                  v-model="assessRecordsForm.expertId"
                  filterable
                  clearable
                  placeholder="请输入">
                  <el-option
                    v-for="item in expertList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="方案沟通内容" prop="communicationContent">
                <el-input
                  type="textarea"
                  v-model="assessRecordsForm.communicationContent"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="附件" class="readonlyItem" prop="attachmentOssUrl">
                <input type="text" class="readonlyInput" v-model="assessRecordsForm.attachmentOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="small">上传附件</el-button>
                <el-button type="primary" size="small" v-if="assessRecordsForm.attachmentOssUrl" @click="handleDownLoad(assessRecordsForm.attachmentOssUrl)">查看</el-button>
                <input type="file" ref="assessRecordsRef" @change="getFile($event, assessRecordsForm, 'assessRecordsRef')" class="kio" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="修改内容" prop="modifyContent">
                <el-input
                  v-model="assessRecordsForm.modifyContent"
                  type="textarea"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="assessRecordsForm.remark"
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
                <el-button size="small" @click="assessRecordsShowDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitAssessRecordsForm">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog :title="assessVisitFlag == 'add' ? '添加尽职报告' : '修改尽职报告'" :visible.sync="assessVisitShowDialog" width="70%">
      <div class="padding-20">
        <el-form
          ref="assessVisitForm"
          :rules="assessVisitRules"
          :model="assessVisitForm"
          label-width="140px"
          class="form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="尽调完成时间" prop="finishTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessVisitForm.finishTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专家名称" prop="expertId">
                <el-select
                  v-model="assessVisitForm.expertId"
                  filterable
                  clearable
                  placeholder="请输入">
                  <el-option
                    v-for="item in expertList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="附件" class="readonlyItem" prop="attachmentOssUrl">
                <input type="text" class="readonlyInput" v-model="assessVisitForm.attachmentOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="medium" style="margin-right: 10px;">上传附件</el-button>
                <input type="file" ref="assessVisitRef" @change="getFile($event, assessVisitForm, 'assessVisitRef')" class="kio" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="assessVisitForm.remark"
                  size="medium"
                  maxlength="50"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item class="text-center">
                <el-button size="small" @click="assessVisitShowDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="submitAssessVisitForm">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  ossUploadFile
} from "@/api/common";
import {
  servicePlansDetail,
  servicePlansAddPlan,
  servicePlansPlanList,
  servicePlansPlanDetail,
  servicePlansUpdatePlan,
  servicePlansAddPlanRecords,
  servicePlansPlanRecordsList,
  servicePlanRecordsDetail,
  servicePlansUpdatePlanRecords,
  servicePlansAddDueReport,
  servicePlansGetDueReportList,
  servicePlansGetDueReportDetail,
  servicePlansUpdateDueReport,
  getFlowstepChildNodeList
} from "@/api/service";
import { mapState } from 'vuex';
export default {
  data() {
    return {
      serviceId: this.$route.params.id || '',
      form: {},
      assessShowDialog: false,
      assessFlag: 'add', //add 添加 edit 编辑
      assessForm: {
        serviceId: this.$route.params.id || '',
        id: '',
        planName: '',
        expectStartTime: '',
        expectFinishTime: '',
        actualStartTime: '',
        actualFinishTime: '',
        confirmTime: '',
        planConfirmStatus: '',
        excelFile: null,
        attachmentOssUrl: '', //附件
        expertId: '', //专家id
        planDesc: '', //方案简介描述
        remark: '' //备注
      },
      assessRules: {
        'planName': [
          {
            required: true,
            message: "方案名称不可为空",
            trigger: "blur",
          },
        ],
        'expectStartTime': [
          {
            required: true,
            message: "预计开始时间不可为空",
            trigger: "change",
          },
        ],
        'expectFinishTime': [
          {
            required: true,
            message: "预计结束时间不可为空",
            trigger: "change",
          }
        ],
        'confirmTime': [
          {
            required: true,
            message: "方案确认时间不可为空",
            trigger: "change",
          }
        ],
        'planConfirmStatus': [
          {
            required: true,
            message: "方案状态不可为空",
            trigger: "change",
          }
        ],
        'planDesc': [
          {
            required: true,
            message: "方案简介描述不可为空",
            trigger: "blur",
          }
        ],
        'expertId': [
          {
            required: true,
            message: "专家名称不可为空",
            trigger: "change",
          },
        ]
      },

      assessRecordsShowDialog: false,
      assessRecordsFlag: 'add', //add 添加 edit 编辑
      assessRecordsForm: {
        serviceId: this.$route.params.id || '',
        id: '',
        planId: '', //方案id
        communicationTime: '', //设计方案沟通时间
        excelFile: null,
        attachmentOssUrl: '', //附件
        expertId: '', //专家id
        communicationContent: '', //设计方案沟通内容
        modifyContent: '', //修改内容
        remark: '' //备注
      },
      assessRecordsRules: {
        'communicationTime': [
          {
            required: true,
            message: "方案沟通时间不可为空",
            trigger: "change",
          },
        ],
        'communicationContent': [
          {
            required: true,
            message: "方案沟通内容不可为空",
            trigger: "blur",
          },
        ],
        'expertId': [
          {
            required: true,
            message: "专家名称不可为空",
            trigger: "change",
          },
        ],
        'modifyContent': [
          {
            required: true,
            message: "修改内容不可为空",
            trigger: "blur",
          },
        ],
      },

      assessVisitShowDialog: false,
      assessVisitFlag: 'add', //add 添加 edit 编辑
      assessVisitForm: {
        serviceId: this.$route.params.id || '',
        id: '',
        "attachmentOssUrl": "",
        "expertId": null,
        "finishTime": "",
        "remark": "",
      },
      assessVisitRules: {
        'finishTime': [
          {
            required: true,
            message: "尽调完成时间不可为空",
            trigger: "change",
          },
        ],
        'expertId': [
          {
            required: true,
            message: "专家名称不可为空",
            trigger: "change",
          },
        ],
        'attachmentOssUrl': [
          {
            required: true,
            message: "尽职报告附件不可为空",
            trigger: "change",
          },
        ]
      },
    };
  },
  computed: {
    ...mapState({
      enumList: state => state.app.enumList,
      expertList: state => state.app.expertList,
      partnerList: state => state.app.partnerList,
      masterList: state => state.app.masterList
    })
  },
  mounted() {
    //获取详情
    this.getDetail();
  },
  methods: {
    //获取详情
    async getDetail(){
      let res = await servicePlansDetail(this.serviceId);
      if (res.code == 1) {
        this.form = res.data;
      }
    },
    //添加设计方案
    handlePlanAdd(){
      this.assessShowDialog = true;
      this.assessFlag = 'add';
      this.$nextTick(() => {
        this.$refs.assessForm.resetFields();
        this.assessForm.id = '';
      })
    },
    //设计方案列表编辑
    async handleAssessEdit(id){
      this.assessFlag = 'edit';
      this.assessShowDialog = true;
      this.$nextTick(() => {
        this.$refs.assessForm.clearValidate();
      })
      let res = await servicePlansPlanDetail(id);
      if (res.code == 1) {
        this.assessForm = Object.assign({}, this.assessForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //添加方案沟通记录
    handlePlanRecordsAdd(id){
      this.assessRecordsForm.planId = id;
      this.assessRecordsShowDialog = true;
      this.assessRecordsFlag = 'add';
      this.$nextTick(() => {
        this.$refs.assessRecordsForm.resetFields();
        this.assessRecordsForm.id = '';
      })
    },
    //设计方案沟通记录列表编辑
    async handleAssessRecordsEdit(id){
      this.assessRecordsFlag = 'edit';
      this.assessRecordsShowDialog = true;
      this.$nextTick(() => {
        this.$refs.assessRecordsForm.clearValidate();
      })
      let res = await servicePlanRecordsDetail(id);
      if (res.code == 1) {
        this.assessRecordsForm = Object.assign({}, this.assessRecordsForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //添加尽职报告
    handleDueReportAdd(){
      this.assessVisitShowDialog = true;
      this.assessVisitFlag = 'add';
      this.$nextTick(() => {
        this.$refs.assessVisitForm.resetFields();
        this.assessVisitForm.id = '';
      })
    },
    //尽职报告列表编辑
    async handleVisitEdit(id){
      this.assessVisitFlag = 'edit';
      this.assessVisitShowDialog = true;
      let res = await servicePlansGetDueReportDetail(id);
      if (res.code == 1) {
        this.assessVisitForm = Object.assign({}, this.assessVisitForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //上传文件
    async getFile(event, form, refName) {
      let fileVal = event.target.files[0];
      let fileName = fileVal.name;
      let type = fileName
        .substring(fileName.lastIndexOf('.'), fileName.length)
        .toLowerCase();
      if (type != '.pdf') {
        this.openMessage('仅支持上传pdf格式');
        return;
      }else{
        let res = await ossUploadFile({
          businessType: 'certificate',
          file: fileVal
        })
        if(res.code == 1){
          form.excelFile = fileVal;
          form.attachmentOssUrl = res.data;
          this.$refs[refName].value = null;
        }else{
          form.excelFile = null;
          form.attachmentOssUrl = '';
          this.$refs[refName].value = null;
          this.openMessage(res.message, "err");
        }
      }
    },
    //下载附件
    handleDownLoad(url){
      window.open(url);
    },
    goBack() {
      this.$router.go(-1);
    },
    //刷新服务节点信息
    async _getFlowstepChildNodeList(){
      let res = await getFlowstepChildNodeList({
        serviceId: this.serviceId,
        operatorFlowStep: 4
      });
      if (res.code == 1) {
        this.form.childNodeList = res.data;
      }
    },
    //刷新设计方案列表
    async getAssessList(){
      let res = await servicePlansPlanList(this.serviceId);
      if (res.code == 1) {
        this.form.planList = res.data;
      }
    },
    //刷新设计方案沟通记录列表
    async getAssessRecordsList(){
      let res = await servicePlansPlanRecordsList(this.serviceId);
      if (res.code == 1) {
        this.form.planRecordsList = res.data;
      }
    },
    //刷新尽职报告列表
    async getAssessVisitList(){
      let res = await servicePlansGetDueReportList(this.serviceId);
      if (res.code == 1) {
        this.form.dueReportList = [res.data];
      }
    },
    //设计方案保存事件
    submitAssessForm() {
      this.$refs.assessForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessFlag == 'add'){
            servicePlansAddPlan(this.assessForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessForm.resetFields();
                  this.assessShowDialog = false;
                  //刷新设计方案列表
                  this.getAssessList();
                  //刷新服务节点信息
                  this._getFlowstepChildNodeList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }else{
            //编辑
            servicePlansUpdatePlan(this.assessForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessForm.resetFields();
                  this.assessShowDialog = false;
                  //刷新设计方案列表
                  this.getAssessList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }
        }
      });
    },
    //设计方案沟通记录保存事件
    submitAssessRecordsForm() {
      this.$refs.assessRecordsForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessRecordsFlag == 'add'){
            servicePlansAddPlanRecords(this.assessRecordsForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessRecordsForm.resetFields();
                  this.assessRecordsShowDialog = false;
                  //刷新设计方案沟通记录列表
                  this.getAssessRecordsList();
                  //刷新服务节点信息
                  this._getFlowstepChildNodeList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }else{
            //编辑
            servicePlansUpdatePlanRecords(this.assessRecordsForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessRecordsForm.resetFields();
                  this.assessRecordsShowDialog = false;
                  //刷新设计方案沟通记录列表
                  this.getAssessRecordsList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }
        }
      });
    },
    //尽职报告保存事件
    submitAssessVisitForm() {
      this.$refs.assessVisitForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessVisitFlag == 'add'){
            servicePlansAddDueReport(this.assessVisitForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessVisitForm.resetFields();
                  this.assessVisitShowDialog = false;
                  //刷新尽职报告列表
                  this.getAssessVisitList();
                  //刷新服务节点信息
                  this._getFlowstepChildNodeList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }else{
            //编辑
            servicePlansUpdateDueReport(this.assessVisitForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessVisitForm.resetFields();
                  this.assessVisitShowDialog = false;
                  //刷新尽职报告列表
                  this.getAssessVisitList();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }
        }
      });
    },
  }
}

</script>
<style lang='scss' scoped>
.el-input,
.el-select,
.el-textarea {
  width: 76%;
}
.childNode-box{
  li{
    width: 180px;
    .circle{
      span{
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        color: #303133;
        border: 1px solid #303133;
        border-radius: 50%;
        margin-bottom: 10px;
      }
      .line{
        border: 1px solid #c0c4cc;
        width: calc(100% - 22px);
        height: 1px;
        left: calc(50% + 11px);
        top: 11px;
      }
    }
    &.active{
      color: #409eff;
      .circle span{
        color: #409eff;
        border: 1px solid #409eff;
      }
    }
  }
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
      right: 148px;
      top: 4px;
      opacity: 0;
    }
  }
</style>
