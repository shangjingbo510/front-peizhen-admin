<template>
  <div class="nav-bar">
    <a href="javascript: void(0)" @click="$emit('backTrigger')">
      <img class="back-icon" src="../../assets/images/back-icon.png" alt="">
      返回
    </a>
    <span class="vertical-line" v-if="navText"></span>
    <a class="main-nav" href="javascript: void(0)">{{navText}}</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      navText: {
        type: String,
        default: ''
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang='scss'>
  .nav-bar {
    display: flex;
    align-items: center;
    padding: 14px 4px 0;
    border-bottom: 1px solid #EBEDF2;
    color: #5C5E62;
    a {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      font-size: 16px;
    }

    .main-nav {
      color: #2E80FF;
    }

    .vertical-line {
      width: 1px;
      height: 24px;
      background: #DEE1E5;
      border-radius: 1px;
    }

    .back-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
</style>
