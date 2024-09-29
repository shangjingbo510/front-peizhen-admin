import request from '@/utils/request'

//添加服务类别
export function serviceCategoryAdd(data) {
    return request({
        url: '/serviceCategory/add',
        method: 'POST',
        data
    })
}

//服务类别列表
export function serviceCategoryList(data) {
    return request({
        url: '/serviceCategory/list',
        method: 'POST',
        data
    })
}

//更新服务类别
export function serviceCategoryUpdate(data) {
    return request({
        url: '/serviceCategory/update',
        method: 'POST',
        data
    })
}

//更新服务类别状态
export function serviceCategoryUpdateStatus(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/serviceCategory/updateStatus',
        method: 'POST',
        data: formData
    })
}

//服务类别删除
export function serviceCategoryDelete(id) {
    return request({
        url: '/serviceCategory/delete/' + id,
        method: 'POST'
    })
}

//服务类别详情
export function serviceCategoryDetail(id) {
    return request({
        url: '/serviceCategory/detail/' + id,
        method: 'POST'
    })
}

//---------------------------电子合同模板管理-------------------------------------
//新增合同模板
export function contractTemplateAdd(data) {
    return request({
        url: '/contractTemplateManage/add',
        method: 'POST',
        data
    })
}

//合同模板列表
export function contractTemplateList(data) {
    return request({
        url: '/contractTemplateManage/list',
        method: 'POST',
        data
    })
}

//更新合同模板
export function contractTemplateUpdate(data) {
    return request({
        url: '/contractTemplateManage/update',
        method: 'POST',
        data
    })
}

//更新合同模板状态
export function contractTemplateUpdateStatus(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/contractTemplateManage/updateStatus',
        method: 'POST',
        data: formData
    })
}

//合同模板删除
export function contractTemplateDelete(id) {
    return request({
        url: '/contractTemplateManage/delete/' + id,
        method: 'POST'
    })
}

//合同模板详情
export function contractTemplateDetail(id) {
    return request({
        url: '/contractTemplateManage/detail/' + id,
        method: 'POST'
    })
}

//---------------------------客户服务申请-------------------------------------
//服务申请
export function serviceApply(data) {
    return request({
        url: '/serviceApply/apply',
        method: 'POST',
        data
    })
}

//更新服务内容
export function serviceUpdateApply(data) {
    return request({
        url: '/serviceApply/updateApply',
        method: 'POST',
        data
    })
}

//服务申请详情
export function serviceApplyDetail(id) {
    return request({
        url: '/serviceApply/detail/' + id,
        method: 'POST'
    })
}

//服务信息列表查询
export function serviceList(data) {
    return request({
        url: '/serviceSearch/list',
        method: 'POST',
        data
    })
}

//服务信息查看详情
export function serviceSearchDetail(id) {
    return request({
        url: '/serviceSearch/detail/' + id,
        method: 'POST'
    })
}


//---------------------------服务信息审核-------------------------------------
//服务信息审核列表
export function serviceProcessList(data) {
    return request({
        url: '/serviceProcess/list',
        method: 'POST',
        data
    })
}

//服务审核详情
export function serviceProcessDetail(id) {
    return request({
        url: '/serviceProcess/detail/' + id,
        method: 'POST'
    })
}

//服务审核
export function serviceProcessAudit(data) {
    return request({
        url: '/serviceProcess/audit',
        method: 'POST',
        data
    })
}

//---------------------------服务启动管理-------------------------------------
//客户服务登记列表
export function serviceStartList(data) {
    return request({
        url: '/serviceStart/list',
        method: 'POST',
        data
    })
}

//客户服务登记详情
export function serviceStartDetail(id) {
    return request({
        url: '/serviceStart/detail/' + id,
        method: 'POST'
    })
}

//客户服务信息审核
export function serviceStartAudit(data) {
    return request({
        url: '/serviceStart/audit',
        method: 'POST',
        data
    })
}


//---------------------------服务洽谈管理-------------------------------------
//添加需求评估
export function serviceNegotiationAdd(data) {
    return request({
        url: '/serviceNegotiation/addAssess',
        method: 'POST',
        data
    })
}

//添加需求评估沟通记录
export function serviceNegotiationAddRecords(data) {
    return request({
        url: '/serviceNegotiation/addAssessRecords',
        method: 'POST',
        data
    })
}

//添加拜访记录
export function serviceNegotiationAddVisit(data) {
    return request({
        url: '/serviceNegotiation/addVisit',
        method: 'POST',
        data
    })
}

//查看需求评估详情
export function serviceNegotiationAssessDetail(id) {
    return request({
        url: '/serviceNegotiation/assessDetail/' + id,
        method: 'POST'
    })
}

//查看需求评估列表
export function serviceNegotiationAssessList(serviceId) {
    return request({
        url: '/serviceNegotiation/assessList/' + serviceId,
        method: 'POST'
    })
}

//查看需求评估沟通记录详情
export function serviceNegotiationRecordsDetail(id) {
    return request({
        url: '/serviceNegotiation/assessRecordsDetail/' + id,
        method: 'POST'
    })
}

//查看需求评估沟通记录列表
export function serviceNegotiationRecordsList(id) {
    return request({
        url: '/serviceNegotiation/assessRecordsList/' + id,
        method: 'POST'
    })
}

//服务洽谈服务详情
export function serviceNegotiationDetail(serviceId) {
    return request({
        url: '/serviceNegotiation/detail/' + serviceId,
        method: 'POST'
    })
}

//服务洽谈阶段列表
export function serviceNegotiationList(data) {
    return request({
        url: '/serviceNegotiation/list',
        method: 'POST',
        data
    })
}

//更新需求评估
export function serviceNegotiationUpdateAssess(data) {
    return request({
        url: '/serviceNegotiation/updateAssess',
        method: 'POST',
        data
    })
}

//更新需求评估沟通记录
export function serviceNegotiationUpdateAssessRecords(data) {
    return request({
        url: '/serviceNegotiation/updateAssessRecords',
        method: 'POST',
        data
    })
}

//更新拜访记录
export function serviceNegotiationUpdateVisit(data) {
    return request({
        url: '/serviceNegotiation/updateVisit',
        method: 'POST',
        data
    })
}

//查看拜访记录详情
export function serviceNegotiationVisitDetail(id) {
    return request({
        url: '/serviceNegotiation/visitDetail/' + id,
        method: 'POST'
    })
}

//查看拜访记录列表
export function serviceNegotiationVisitList(serviceId) {
    return request({
        url: '/serviceNegotiation/visitList/' + serviceId,
        method: 'POST'
    })
}

//---------------------------服务签约管理-------------------------------------
//服务签约阶段列表
export function serviceSignList(data) {
    return request({
        url: '/serviceSign/list',
        method: 'POST',
        data
    })
}

//创建电子合同
export function serviceSignCreateEleContract(data) {
    return request({
        url: '/serviceSign/createEleContract',
        method: 'POST',
        data
    })
}

//查看服务合同详情
export function serviceEleContractSignDetail(id) {
    return request({
        url: '/serviceSign/signDetail/' + id,
        method: 'POST'
    })
}

//查看服务合同签署详情
export function serviceSignDetail(id) {
    return request({
        url: '/serviceSign/detail/' + id,
        method: 'POST'
    })
}

//合同签署审核
export function serviceSignAudit(data) {
    return request({
        url: '/serviceSign/audit',
        method: 'POST',
        data
    })
}

//记录首付款结款信息
export function serviceSignFirstPayRecords(data) {
    return request({
        url: '/serviceSign/firstPayRecords',
        method: 'POST',
        data
    })
}

//---------------------------服务设计管理-------------------------------------
//添加方案
export function servicePlansAddPlan(data) {
    return request({
        url: '/servicePlans/addPlan',
        method: 'POST',
        data
    })
}

//添加方案沟通记录
export function servicePlansAddPlanRecords(data) {
    return request({
        url: '/servicePlans/addPlanRecords',
        method: 'POST',
        data
    })
}

//查看方案沟通记录
export function servicePlansPlanRecordsList(serviceId) {
    return request({
        url: '/servicePlans/planRecordsList/' + serviceId,
        method: 'POST'
    })
}

//服务洽谈服务详情
export function servicePlansDetail(serviceId) {
    return request({
        url: '/servicePlans/detail/' + serviceId,
        method: 'POST'
    })
}

//服务设计阶段列表
export function servicePlansList(data) {
    return request({
        url: '/servicePlans/list',
        method: 'POST',
        data
    })
}

//查看方案详情
export function servicePlansPlanDetail(id) {
    return request({
        url: '/servicePlans/planDetail/' + id,
        method: 'POST'
    })
}

//查看方案列表
export function servicePlansPlanList(id) {
    return request({
        url: '/servicePlans/planList/' + id,
        method: 'POST'
    })
}

//查看方案沟通记录详情
export function servicePlanRecordsDetail(id) {
    return request({
        url: '/servicePlans/planRecordsDetail/' + id,
        method: 'POST'
    })
}

//更新方案
export function servicePlansUpdatePlan(data) {
    return request({
        url: '/servicePlans/updatePlan',
        method: 'POST',
        data
    })
}

//更新方案沟通记录
export function servicePlansUpdatePlanRecords(data) {
    return request({
        url: '/servicePlans/updatePlanRecords',
        method: 'POST',
        data
    })
}

//添加尽职报告
export function servicePlansAddDueReport(data) {
    return request({
        url: '/servicePlans/addDueReport',
        method: 'POST',
        data
    })
}

//更新尽职报告
export function servicePlansUpdateDueReport(data) {
    return request({
        url: '/servicePlans/updateDueReport',
        method: 'POST',
        data
    })
}

//查看尽职报告
export function servicePlansGetDueReportList(id) {
    return request({
        url: '/servicePlans/getDueReport/' + id,
        method: 'POST'
    })
}

//查看尽职报告详情
export function servicePlansGetDueReportDetail(id) {
    return request({
        url: '/servicePlans/getDueReportDetail/' + id,
        method: 'POST'
    })
}

//---------------------------服务实施管理-------------------------------------
//方案实施服务列表
export function servicePlansExecuteList(data) {
    return request({
        url: '/servicePlansExecute/list',
        method: 'POST',
        data
    })
}

//方案实施服务详情
export function servicePlansExecuteDetail(serviceId) {
    return request({
        url: '/servicePlansExecute/detail/' + serviceId,
        method: 'POST'
    })
}

//添加实施方案计划
export function servicePlansExecuteAddPlanExecute(data) {
    return request({
        url: '/servicePlansExecute/addPlanExecute',
        method: 'POST',
        data
    })
}

//添加方案实施跟踪记录
export function servicePlansExecuteAddPlanTrack(data) {
    return request({
        url: '/servicePlansExecute/addPlanTrack',
        method: 'POST',
        data
    })
}

//方案实施方案计划详情
export function servicePlansExecutePlanExecuteDetial(id) {
    return request({
        url: '/servicePlansExecute/planExecuteDetial/' + id,
        method: 'POST'
    })
}

//查看实施方案计划列表
export function servicePlansExecutePlanExecuteList(serviceId) {
    return request({
        url: '/servicePlansExecute/planExecuteList/' + serviceId,
        method: 'POST'
    })
}

//方案实施跟踪记录详情
export function servicePlansExecuteplanTrackDetail(id) {
    return request({
        url: '/servicePlansExecute/planTrackDetail/' + id,
        method: 'POST'
    })
}

//查看方案实施跟踪记录列表
export function servicePlansExecuteplanTrackList(id) {
    return request({
        url: '/servicePlansExecute/planTrackList/' + id,
        method: 'POST'
    })
}

//更新实施方案计划
export function servicePlansExecuteUpdatePlanExecute(data) {
    return request({
        url: '/servicePlansExecute/updatePlanExecute',
        method: 'POST',
        data
    })
}

//更新方案实施跟踪记录
export function servicePlansExecuteUpdatePlanTrack(data) {
    return request({
        url: '/servicePlansExecute/updatePlanTrack',
        method: 'POST',
        data
    })
}

//---------------------------服务达成管理-------------------------------------
//服务达成阶段服务列表
export function serviceFinishRecordsList(data) {
    return request({
        url: '/serviceFinishRecords/list',
        method: 'POST',
        data
    })
}

//服务洽谈服务详情
export function recordsDetail(serviceId) {
    return request({
        url: '/serviceFinishRecords/detail/' + serviceId,
        method: 'POST'
    })
}

//添加尾款打款记录
export function serviceFinishRecordsAdd(data) {
    return request({
        url: '/serviceFinishRecords/add',
        method: 'POST',
        data
    })
}

//查看尾款打款记录详情
export function serviceFinishRecordsDetail(id) {
    return request({
        url: '/serviceFinishRecords/finishRecordsDetail/' + id,
        method: 'POST'
    })
}

//查看尾款打款记录列表
export function serviceFinishRecordsFinishRecordsList(serviceId) {
    return request({
        url: '/serviceFinishRecords/finishRecordsList/' + serviceId,
        method: 'POST'
    })
}

//更新尾款打款记录
export function serviceFinishRecordsUpdate(data) {
    return request({
        url: '/serviceFinishRecords/update',
        method: 'POST',
        data
    })
}

//服务节点更新查询接口
export function getFlowstepChildNodeList(data) {
    let formData = new FormData();
    Object.keys(data).forEach(item => {
        formData.append(item, data[item]);
    })
    return request({
        url: '/serviceSearch/getFlowstepChildNodeList',
        method: 'POST',
        data: formData
    })
}