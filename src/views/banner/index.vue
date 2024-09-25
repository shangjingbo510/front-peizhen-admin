<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新增轮播" name="first">
      <AddBanner v-if="activeName == 'first'"/>
    </el-tab-pane>
    <el-tab-pane label="轮播列表" name="second">
      <BannerList v-if="activeName == 'second'"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import AddBanner from "./add.vue";
  import BannerList from "./list.vue";
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
