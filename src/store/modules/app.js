const state = {
  enumList: {
    MaritalStatusEnum: [], //婚姻状态
    QualificationEnum: [], //学历
    RelationEnum: [], //关系
    PartnerLevelEnum: [], //合伙人类别
    AuditStatusEnum: [], //审核状态
  },
  customerList: [], //查看客户下拉列表
  expertList: [], //查看专家下拉列表
  masterList: [], //查看项目经理下拉列表
  partnerList: [], //查看合伙人下拉列表
  businessList: [], //查看业务类型下拉列表
}

const mutations = {
  SET_ENUMLIST: (state, enumList) => {
    state.enumList = enumList;
  },
  SET_CUSTOMER_LIST: (state, list) => {
    state.customerList = list;
  },
  SET_EXPERT_LIST: (state, list) => {
    state.expertList = list;
  },
  SET_MASTER_LIST: (state, list) => {
    state.masterList = list;
  },
  SET_PARTNER_LIST: (state, list) => {
    state.partnerList = list;
  },
  SET_BUSINESS_LIST: (state, list) => {
    state.businessList = list;
  }
}

const actions = {
  enumListAction({ commit }, enumList) {
    commit('SET_ENUMLIST', enumList)
  }
}

export default {
  state,
  mutations,
  actions
}
