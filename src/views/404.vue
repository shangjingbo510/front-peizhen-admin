<template>
  <div style="text-align: center;height: 100vh;">
      <img class="wrap_img" src="../assets/images/404web@2x.png" alt="">
    <p>抱歉，您访问的页面找不到</p>
    <el-button style="margin-top:20px;" type="primary" @click="goBack">返回首页</el-button>
  </div>
</template>

<script>

  export default {
    name: 'NotFound',
    methods:{
        goBack(){
            this.$router.push({path:"/"});
        }
    }
  }
</script>
<style scoped lang="scss">
.wrap_img{
  width: 1000px;
  height: 680px;
  margin-top:60px;
}
p{
  font-size: 20px;
  color: #303133;
}
</style>
