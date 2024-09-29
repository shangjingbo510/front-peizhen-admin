import request from '@/utils/request'

// 获取省地区
export function getOrgProvinceList(data) {
  return request({
      url: '/base/address/listProvince',
      method: 'POST',
      data: data
  })
}
// 获取市
export function getOrgCityList(data) {
  return request({
      url: `/base/address/listCity/${data}`,
      method: 'POST'
  })
}
// 获取区县
export function getOrgAreaList(data) {
  return request({
      url: `/base/address/listArea/${data}`,
      method: 'POST'
  })
}

//根据枚举名称获取枚举信息
export function getEnum(data) {
  return request({
      url: '/base/enum/getEnum',
      method: 'GET',
      data
  })
}

//页面搜索区枚举管理
export function getEnumList() {
  return request({
      url: '/base/enum/getEnumList',
      method: 'GET'
  })
}

//上传图片服务口
export function ossUploadFile(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/oss/uploadFile',
      method: 'POST',
      data: formData
  })
}

//查询合伙人下拉列表
export function getPartnerList(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/base/option/partnerList',
      method: 'POST',
      data: formData
  })
}

//查询客户下拉列表
export function getCustomerList(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/base/option/customerList',
      method: 'POST',
      data: formData
  })
}

//查询专家下拉列表
export function getExpertList(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/base/option/expertList',
      method: 'POST',
      data: formData
  })
}

//查询项目经理或机构负责人下拉列表
export function getMasterList(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/base/option/masterList',
      method: 'POST',
      data: formData
  })
}

//查看业务类型下拉列表
export function getBusinessList(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/base/option/businessList',
      method: 'POST',
      data: formData
  })
}

//查看服务类别下拉列表
export function getServiceList(data) {
  let formData = new FormData();
  Object.keys(data).forEach(item => {
      formData.append(item, data[item]);
  })
  return request({
      url: '/base/option/serviceList',
      method: 'POST',
      data: formData
  })
}

//根据阶段显示节点列表
export function getChildNodeListByFlowStep(flowStep) {
  return request({
      url: '/base/option/childNodeList/' + flowStep,
      method: 'POST'
  })
}