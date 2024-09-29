<template>
  <div class="padding-20">
    <el-page-header @back="goBack" content="服务洽谈详情"></el-page-header>
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

    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">拜访记录列表</span>
        <el-button type="primary" size="small" @click="assessVisitShowDialog = true; assessVisitFlag = 'add';">添加拜访记录</el-button>
      </div>
      <el-table :data="form.visitList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="visitTime" label="拜访时间" width="140" align="center"></el-table-column>
        <el-table-column prop="visitTitle" label="拜访主题" width="140" align="center"></el-table-column>
        <el-table-column prop="visitTypeText" label="拜访类型" align="center"></el-table-column>
        <el-table-column prop="visitContent" label="拜访内容" width="140" align="center"></el-table-column>
        <el-table-column prop="isPublicText" label="是否公开显示" width="140" align="center"></el-table-column>
        <el-table-column prop="feedback" label="客户反馈" width="140" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="expertName" label="专家人员姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="masterName" label="项目经理" width="180" align="center"></el-table-column>
        <el-table-column prop="partnerName" label="合伙人姓名" align="center"></el-table-column>
        <el-table-column prop="question" label="遇到问题" align="center"></el-table-column>
        <el-table-column prop="answer" label="解决问题描述" align="center"></el-table-column>
        <el-table-column prop="latentDemand" label="客户潜在需求" align="center"></el-table-column>
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

    <el-divider></el-divider>
    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">需求评估方案列表</span>
        <el-button type="primary" size="small" @click="handleAddAssess">添加需求评估方案</el-button>
      </div>
      <el-table :data="form.assessList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="assessTitle" label="需求评估方案名称" width="140" align="center"></el-table-column>
        <el-table-column prop="expectStartTime" label="预计开始时间" width="140" align="center"></el-table-column>
        <el-table-column prop="expectFinishTime" label="预计结束时间" width="140" align="center"></el-table-column>
        <el-table-column prop="actualStartTime" label="实际开始时间" width="140" align="center"></el-table-column>
        <el-table-column prop="actualFinishTime" label="实际结束时间" width="180" align="center"></el-table-column>
        <el-table-column prop="assessContent" label="需求评估介绍" width="180" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column prop="confirmStatusText" label="需求评估状态" width="180" align="center"></el-table-column>
        <el-table-column prop="expertName" label="专家姓名" align="center"></el-table-column>
        <el-table-column prop="masterName" label="项目负责人姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="partnerName" label="合伙人姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="operatorName" label="操作人姓名" width="140" align="center"></el-table-column>
        <el-table-column label="操作" width="280" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleAssessEdit(scope.row.id)"
            >修改</el-button>
            <el-button 
              type="text" 
              size="small" 
              @click="handleAssessRecordsAdd(scope.row.id)"
            >添加需求评估方案沟通记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-divider></el-divider>
    <div class="mb-10">
      <div class="mb-10">
        <span class="mr-30">需求评估方案沟通列表</span>
      </div>
      <el-table :data="form.assessRecordsList" border>
        <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
        <el-table-column prop="assessTitle" label="需求评估方案名称" width="140" align="center"></el-table-column>
        <el-table-column prop="communicationTime" label="需求评估沟通时间" width="140" align="center"></el-table-column>
        <el-table-column prop="communicationContent" label="需求评估沟通内容" width="140" align="center"></el-table-column>
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

    <el-dialog :title="assessFlag == 'add' ? '添加需求评估方案' : '修改需求评估方案'" :visible.sync="assessShowDialog" width="70%">
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
              <el-form-item label="需求评估方案名称" prop="assessTitle">
                <el-input
                  v-model="assessForm.assessTitle"
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
              <el-form-item label="评估方案确认时间" prop="confirmTime">
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
              <el-form-item label="评估方案状态" prop="confirmStatus">
                <el-select
                  v-model="assessForm.confirmStatus"
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
              <el-form-item label="附件" class="readonlyItem" prop="attachmentOssUrl">
                <input type="text" class="readonlyInput" v-model="assessForm.attachmentOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="small">上传附件</el-button>
                <el-button type="primary" size="small" v-if="assessForm.attachmentOssUrl" @click="handleDownLoad(assessForm.attachmentOssUrl)">查看</el-button>
                <input type="file" ref="assessRef" @change="getFile($event, assessForm, 'assessRef')" class="kio" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="需求评估介绍" prop="assessContent">
                <el-input
                  type="textarea"
                  v-model="assessForm.assessContent"
                  size="medium"
                  maxlength="200"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="assessForm.remark"
                  size="medium"
                  maxlength="200"
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

    <el-dialog :title="assessRecordsFlag == 'add' ? '添加需求评估方案沟通内容' : '修改需求评估方案沟通内容'" :visible.sync="assessRecordsShowDialog" width="70%">
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
              <el-form-item label="需求评估沟通时间" prop="communicationTime">
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
              <el-form-item label="需求评估沟通内容" prop="communicationContent">
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

    <el-dialog :title="assessVisitFlag == 'add' ? '添加拜访内容' : '修改拜访内容'" :visible.sync="assessVisitShowDialog" width="70%">
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
              <el-form-item label="拜访时间" prop="visitTime">
                <el-date-picker
                  suffix-icon="el-icon-date"
                  type="date"
                  placeholder="选择日期"
                  v-model="assessVisitForm.visitTime"
                  :picker-options="pickerOptions"
                  size="medium"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拜访主题" prop="visitTitle">
                <el-input
                  type="textarea"
                  v-model="assessVisitForm.visitTitle"
                  size="medium"
                  maxlength="200"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拜访类型" prop="visitType">
                <el-select
                  v-model="assessVisitForm.visitType"
                  clearable
                  placeholder="请选择">
                  <el-option label="线上" :value="1"></el-option>
                  <el-option label="线下" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拜访内容" prop="visitContent">
                <el-input
                  type="textarea"
                  v-model="assessVisitForm.visitContent"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
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
            <el-col :span="12">
              <el-form-item label="项目负责人名称" prop="masterId">
                <el-select
                  v-model="assessVisitForm.masterId"
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
              <el-form-item label="合伙人名称" prop="partnerId">
                <el-select
                  v-model="assessVisitForm.partnerId"
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
              <el-form-item label="是否公开显示" prop="isPublic">
                <el-select
                  v-model="assessVisitForm.isPublic"
                  clearable
                  placeholder="请选择">
                  <el-option label="公开" :value="1"></el-option>
                  <el-option label="不公开" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="遇到问题" prop="question">
                <el-input
                  type="textarea"
                  v-model="assessVisitForm.question"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解决问题描述" prop="answer">
                <el-input
                  type="textarea"
                  v-model="assessVisitForm.answer"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户反馈" prop="feedback">
                <el-input
                  v-model="assessVisitForm.feedback"
                  type="textarea"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户潜在需求" prop="latentDemand">
                <el-input
                  v-model="assessVisitForm.latentDemand"
                  type="textarea"
                  size="medium"
                  maxlength="500"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="附件" class="readonlyItem" prop="attachmentOssUrl">
                <input type="text" class="readonlyInput" v-model="assessVisitForm.attachmentOssUrl" placeholder="请上传" disabled />
                <el-button type="primary" size="small">上传附件</el-button>
                <el-button type="primary" size="small" v-if="assessVisitForm.attachmentOssUrl" @click="handleDownLoad(assessVisitForm.attachmentOssUrl)">查看</el-button>
                <input type="file" ref="assessVisitRef" @change="getFile($event, assessVisitForm, 'assessVisitRef')" class="kio" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注" prop="remark">
                <el-input
                  type="textarea"
                  v-model="assessVisitForm.remark"
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
  serviceNegotiationDetail,
  serviceNegotiationAdd,
  serviceNegotiationAssessList,
  serviceNegotiationAssessDetail,
  serviceNegotiationUpdateAssess,
  serviceNegotiationAddRecords,
  serviceNegotiationRecordsList,
  serviceNegotiationRecordsDetail,
  serviceNegotiationUpdateAssessRecords,
  serviceNegotiationAddVisit,
  serviceNegotiationVisitList,
  serviceNegotiationVisitDetail,
  serviceNegotiationUpdateVisit,
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
        assessTitle: '', //需求评估方案名称
        expectStartTime: '',
        expectFinishTime: '',
        actualStartTime: '',
        actualFinishTime: '',
        confirmTime: '', //确认时间
        confirmStatus: '', //需求评估状态
        excelFile: null,
        attachmentOssUrl: '', //附件
        expertId: '', //专家id
        assessContent: '', //需求评估介绍
        remark: '' //备注
      },
      assessRules: {
        'assessTitle': [
          {
            required: true,
            message: "需求评估方案名称不可为空",
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
            message: "需求评估确认时间不可为空",
            trigger: "change",
          },
        ],
        'confirmStatus': [
          {
            required: true,
            message: "需求评估状态不可为空",
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
            message: "附件不可为空",
            trigger: "change",
          },
        ],
      },

      assessRecordsShowDialog: false,
      assessRecordsFlag: 'add', //add 添加 edit 编辑
      assessRecordsForm: {
        serviceId: this.$route.params.id || '',
        id: '',
        assessId: '',
        communicationTime: '', //需求评估沟通时间
        excelFile: null,
        attachmentOssUrl: '', //附件
        expertId: '', //专家id
        communicationContent: '', //需求评估沟通内容
        modifyContent: '', //修改内容
        remark: '' //备注
      },
      assessRecordsRules: {
        'communicationTime': [
          {
            required: true,
            message: "需求评估沟通时间不可为空",
            trigger: "change",
          },
        ],
        'communicationContent': [
          {
            required: true,
            message: "需求评估沟通内容不可为空",
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
        "answer": "",
        "attachmentOssUrl": "",
        "expertId": null,
        "masterId": null,
        "partnerId": null,
        "feedback": "",
        "isPublic": "",
        "latentDemand": "",
        "question": "",
        "remark": "",
        "visitContent": "",
        "visitTime": "",
        "visitTitle": "",
        "visitType": ""
      },
      assessVisitRules: {
        'visitTime': [
          {
            required: true,
            message: "拜访时间不可为空",
            trigger: "change",
          },
        ],
        'visitTitle': [
          {
            required: true,
            message: "拜访主题不可为空",
            trigger: "blur",
          },
        ],
        'visitContent': [
          {
            required: true,
            message: "拜访内容不可为空",
            trigger: "blur",
          },
        ],
        'visitType': [
          {
            required: true,
            message: "拜访类型不可为空",
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
        'masterId': [
          {
            required: true,
            message: "项目负责人名称不可为空",
            trigger: "change",
          },
        ],
        'partnerId': [
          {
            required: true,
            message: "合伙人名称不可为空",
            trigger: "change",
          },
        ],
        'isPublic': [
          {
            required: true,
            message: "请选择是否公开显示",
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
      let res = await serviceNegotiationDetail(this.serviceId);
      if (res.code == 1) {
        this.form = res.data;
      }
    },
    //需求评估列表编辑
    async handleAssessEdit(id){
      this.assessFlag = 'edit';
      this.assessShowDialog = true;
      this.$nextTick(() => {
        this.$refs.assessForm.clearValidate();
      })
      let res = await serviceNegotiationAssessDetail(id);
      if (res.code == 1) {
        this.assessForm = Object.assign({}, this.assessForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //需求评估沟通记录列表编辑
    async handleAssessRecordsEdit(id){
      this.assessRecordsFlag = 'edit';
      this.assessRecordsShowDialog = true;
      this.$nextTick(() => {
        this.$refs.assessRecordsForm.clearValidate();
      })
      let res = await serviceNegotiationRecordsDetail(id);
      if (res.code == 1) {
        this.assessRecordsForm = Object.assign({}, this.assessRecordsForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //添加需求评估方案
    handleAddAssess(){
      this.assessShowDialog = true;
      this.assessFlag = 'add';
      this.$nextTick(() => {
        this.$refs.assessForm.resetFields();
        this.assessForm.id = '';
      })
    },
    //添加需求方案沟通记录
    handleAssessRecordsAdd(id){
      this.assessRecordsShowDialog = true;
      this.assessRecordsFlag = 'add';
      this.assessRecordsForm.assessId = id;
      this.$nextTick(() => {
        this.$refs.assessRecordsForm.resetFields();
        this.assessRecordsForm.id = '';
      })
    },
    //拜访记录列表编辑
    async handleVisitEdit(id){
      this.assessVisitFlag = 'edit';
      this.assessVisitShowDialog = true;
      this.$nextTick(() => {
        this.$refs.assessVisitForm.clearValidate();
      })
      let res = await serviceNegotiationVisitDetail(id);
      if (res.code == 1) {
        this.assessVisitForm = Object.assign({}, this.assessVisitForm, res.data);
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //上传文件
    async getFile(event, form, refName) {
      let fileVal = event.target.files[0];

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
        operatorFlowStep: 2
      });
      if (res.code == 1) {
        this.form.childNodeList = res.data;
      }
    },
    //刷新需求评估列表
    async getAssessList(){
      let res = await serviceNegotiationAssessList(this.serviceId);
      if (res.code == 1) {
        this.form.assessList = res.data;
      }
    },
    //刷新需求评估沟通记录列表
    async getAssessRecordsList(){
      let res = await serviceNegotiationRecordsList(this.serviceId);
      if (res.code == 1) {
        this.form.assessRecordsList = res.data;
      }
    },
    //刷新拜访记录列表
    async getAssessVisitList(){
      let res = await serviceNegotiationVisitList(this.serviceId);
      if (res.code == 1) {
        this.form.visitList = res.data;
      }
    },
    //需求评估保存事件
    submitAssessForm() {
      this.$refs.assessForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessFlag == 'add'){
            serviceNegotiationAdd(this.assessForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessForm.resetFields();
                  this.assessShowDialog = false;
                  //刷新需求评估列表
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
            serviceNegotiationUpdateAssess(this.assessForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessForm.resetFields();
                  this.assessShowDialog = false;
                  //刷新需求评估列表
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
    //需求评估沟通记录保存事件
    submitAssessRecordsForm() {
      this.$refs.assessRecordsForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessRecordsFlag == 'add'){
            serviceNegotiationAddRecords(this.assessRecordsForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessRecordsForm.resetFields();
                  this.assessRecordsShowDialog = false;
                  //刷新需求评估沟通记录列表
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
            serviceNegotiationUpdateAssessRecords(this.assessRecordsForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessRecordsForm.resetFields();
                  this.assessRecordsShowDialog = false;
                  //刷新需求评估沟通记录列表
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
    //拜访记录保存事件
    submitAssessVisitForm() {
      this.$refs.assessVisitForm.validate((valid) => {
        if (valid) {
          //添加
          if(this.assessVisitFlag == 'add'){
            serviceNegotiationAddVisit(this.assessVisitForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessVisitForm.resetFields();
                  this.assessVisitShowDialog = false;
                  //刷新拜访记录列表
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
            serviceNegotiationUpdateVisit(this.assessVisitForm).then((res) => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", () => {
                  this.$refs.assessVisitForm.resetFields();
                  this.assessVisitShowDialog = false;
                  //刷新拜访记录列表
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
