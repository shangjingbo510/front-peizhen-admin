<template>
  <div class="org-manage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="业务机构新增" name="first">
            <Left v-if="activeName=='first'" />
        </el-tab-pane>
        <el-tab-pane label="业务机构管理" name="second">
            <Right v-if="activeName=='second'" />
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Left from "./Left.vue";
import Right from "./Right.vue";
  export default {
    data() {
      return {
        activeName: 'second'
      }
    },
    mounted() {

    },
    methods: {
        handleClick(e){

        }
    },
    components: {
      Left,
      Right
    }
  }

</script>

<style lang="scss" scoped>
  .org-manage {
    .el-tabs .el-tabs__header .el-tabs__nav {
      padding-top: 24px;
      padding-bottom: 10px;
    }

    .el-tabs .el-tabs__header {
      margin: 0;
    }

    .el-tabs {
      background-color: #fff;
    }

  }
</style>
