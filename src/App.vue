<template>
  <div id="app">
    <keep-alive :include="keepAlive" >
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import {
  getEnumList,
  getPartnerList,
  getCustomerList,
  getExpertList,
  getMasterList,
  getBusinessList
} from "@/api/common";
import { mapMutations } from 'vuex';
export default {
  name: 'App',
  computed: {
    keepAlive () {
      return this.$store.state.user.keepAlive
    }
  },
  created () {
    console.log('<=====================当前环境变量===========================>')
    console.log(process.env.NODE_ENV, process.env.VUE_APP_BASE_URL, process.env.VUE_APP_LOGIN_URL)
  },
  mounted(){
    //获取通用下拉选项筛选项
    this.getDropdownList();
    //获取合伙人下拉列表
    this._getPartnerList();
    //获取客户下拉列表
    this._getCustomerList();
    //获取专家下拉列表
    this._getExpertList();
    //获取机构负责人下拉列表
    this._getMasterList();
    //获取业务类型下拉列表
    this._getBusinessList();
  },
  methods: {
    ...mapMutations(['SET_ENUMLIST', 'SET_PARTNER_LIST', 'SET_CUSTOMER_LIST', 'SET_EXPERT_LIST', 'SET_MASTER_LIST', 'SET_BUSINESS_LIST']),
    //获取通用下拉选项筛选项
    async getDropdownList(){
      let res = await getEnumList();
      if (res.code == 1) {
        this.SET_ENUMLIST(res.data);
      }
    },
    //获取合伙人下拉列表
    async _getPartnerList(){
      let res = await getPartnerList({name: ''});
      if (res.code == 1) {
        this.SET_PARTNER_LIST(res.data);
      }
    },
    //获取客户下拉列表
    async _getCustomerList(){
      let res = await getCustomerList({name: ''});
      if (res.code == 1) {
        this.SET_CUSTOMER_LIST(res.data);
      }
    },
    //获取专家下拉列表
    async _getExpertList(){
      let res = await getExpertList({name: ''});
      if (res.code == 1) {
        this.SET_EXPERT_LIST(res.data);
      }
    },
    //获取机构负责人下拉列表
    async _getMasterList(){
      let res = await getMasterList({name: ''});
      if (res.code == 1) {
        this.SET_MASTER_LIST(res.data);
      }
    },
    //获取业务类型下拉列表
    async _getBusinessList(){
      let res = await getBusinessList({name: ''});
      if (res.code == 1) {
        this.SET_BUSINESS_LIST(res.data);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/css/index.css";
</style>
