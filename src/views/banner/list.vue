<template>
  <div style="width: 100%">
    <!--tab切换-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新建轮播图" name="first">新建轮播图</el-tab-pane>
      <el-tab-pane label="轮播列表" name="second">轮播列表</el-tab-pane>
    </el-tabs>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <el-table-column
        prop="bannerTitle"
        label="轮播标题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="bannerUrl"
        label="轮播图片"
        width="120">
      </el-table-column>
      <el-table-column
        prop="bannerDesc"
        label="轮播描述"
        width="120">
      </el-table-column>
      <el-table-column
        prop="operatTime"
        label="操作时间"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
    :hide-on-single-page="false"
    :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

    data() {
      return {
        currentPage: 3,
        total:20,
        tableData: [{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        },{
          operatTime: '2016-05-02',
          bannerTitle: '王小虎',
          bannerUrl: '王小虎',
          bannerDesc: '上海市普陀区金沙江路 1518 弄'
        } ]
      }
    }
  }
</script>
