<template>
  <div>
    <el-form :model="queryForm" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频标题" prop="title">
            <el-input size="small" v-model="queryForm.title" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="视频类别" prop="categoryId">
            <el-select
              v-model="queryForm.categoryId"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布状态" prop="publicStatus">
            <el-select
              v-model="queryForm.publicStatus"
              clearable
              placeholder="请选择"
              size="medium"
            >
              <el-option
                v-for="item in publicStatusOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" size="small" @click="queryTable()">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="inline-bg"></div>

    <div class="table">
      <div class="mb-10">
        <el-button type="primary" size="small" @click="handleUploadVideo">上传视频</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="title" label="视频标题" align="center"></el-table-column>
        <el-table-column prop="categoryId" label="视频类别" align="center"></el-table-column>
        <el-table-column label="缩略图" align="center">
          <template slot-scope="scope">
              <img :src="scope.row.imageUrl" width="150" height="150" />
          </template>
        </el-table-column>
        <el-table-column prop="videoUrl" label="视频地址" align="center"></el-table-column>
        <el-table-column prop="publicStatusText" label="发布状态" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row.id)" size="small">修改</el-button>
            <el-button type="text" @click="handleAction(scope.row)" size="small">{{scope.row.publicStatus == 1 ? '下架' : '发布'}}</el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
         <!-- <el-button type="primary" class="export" size="small" @click="toExport">导出</el-button> -->
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="changePageSize($event)"
            @current-change="changepageNum($event)"
            :current-page="queryForm.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { schoolCategoryList, schoolVideoList, schoolVideoUpdateStatus, schoolVideoDelete } from "@/api/videoManage";
export default {
  components: {},
  data() {
    return {
      queryForm: {
        title: '',
        categoryId: '',
        publicStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      tableLoading: false,
      tableData: [],
      publicStatusOptions: [{
        name: '已发布',
        code: '1'
      },
      {
        name: '未发布',
        code: '0'
      }
      ],
      total: 0,
      editShow: false,
      editForm: {
        id: '',
        menuName: "",
        remarks: "",
        idArr: []
      },
      rules: {
        menuName: [
          {
            required: true,
            trigger: "blur",
            message: "请输入菜单名称"
          },
          {
            pattern: /^[\u4e00-\u9fa5]{0,}$/,
            message: '请输入中文'
          }
        ]
      },
      categoryList: [],
    };
  },
  mounted(){
    this.queryTable();
    this.getCategoryList();
  },
  methods: {
    async getCategoryList(){
      let res = await schoolCategoryList({
        "pageNum": 1,
        "pageSize": 100
      });
      if(res.code == 1){
        this.categoryList = res.data.list;
      }else{
        this.categoryList = [];
      }
    },
    //查询
    queryTable(pageNum = 1) {
      this.queryForm.pageNum = pageNum;
      this.tableLoading = true;
      schoolVideoList(this.queryForm)
        .then(res => {
          if (res.code == 1) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else {
            this.tableData = [];
            this.total = 0;
            this.openMessage(res.message, "err");
          }
        })
        .catch(err => {
          console.log("err");
        })
        .finally(() => {
          this.tableLoading = false;
          this.update = false;
        });
    },
    //上传视频
    handleUploadVideo(){
      this.$router.push({
        path: '/videoManage/upload'
      })
    },
    changePageSize(val) {
      this.queryForm.pageSize = val;
      this.queryTable(this.queryForm.pageNum);
    },
    changepageNum(val) {
      this.queryForm.pageNum = val;
      this.queryTable(this.queryForm.pageNum);
    },
    //编辑
    async handleEdit(id) {
      this.$router.push({
        path: '/videoManage/upload',
        query: {
          id
        }
      })
    },
    //发布、下架
    async handleAction(row){
      let res = await schoolVideoUpdateStatus({
        id: row.id,
        status: row.publicStatus == 1 ? 0 : 1
      });
      if(res.code == 1){
        this.queryTable();
        this.openMessage(res.message, "suc");
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //删除
    handleDelete(id){
      this.$confirm('确定删除该视频吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await schoolVideoDelete(id);
          if(res.code == 1){
            this.queryTable();
            this.openMessage(res.message, "suc");
          }else{
            this.openMessage(res.message, "err");
          }
        }).catch();
    },
    submitForm() {
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          schoolVideoUpdateStatus(this.editForm).then(res => {
            if (res.code == 1) {
              this.openMessage(res.message, "suc");
              this.editShow = false;
              this.queryTable();
            } else {
              this.openMessage(res.message, "err");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.el-input,
.el-select,
.el-date-picker {
  width: 76%;
}
.tree-box{
  max-height: 400px;
  overflow: auto;
}
</style>
