<template>
  <div class="underwriting-orders">
    <el-row>
      <el-form
        ref="queryForm"
        :model="queryForm"
        label-width="120px"
      >
        <el-row class="mb-30">
            <el-col :span="6">
                <el-button type="primary" size="small" @click="handleAddProd()"
                >新增轮播图</el-button>
            </el-col>
        </el-row>
      </el-form>
    </el-row>

    <el-row>
      <el-table :data="list" max-height="500">
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="图片"
          align="center"
        >
            <template slot-scope="scope">
              <img :src="scope.row.bannerUrl" width="80" height="80" />
            </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleView(scope.row.id)"
              >详情</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.row)"
              >修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row.id)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="pagination-bar">
          <Pagination
            :total="total"
            :currentPage="queryForm.pageNum"
            :page-size="queryForm.pageSize"
            @sizeChange="changePageSize($event)"
            @currentChange="changeCurrentPage($event)"
          >
          </Pagination>
        </el-col>
      </el-row>
    </el-row>

    <!-- 新增、查看、修改轮播图模态框 -->
    <el-dialog
      :title="modalTitle"
      :visible.sync="showDetailModalDialog"
      width="60%"
    >
      <el-form
        label-width="160px"
        :model="viewForm"
        :rules="viewFormRules"
        ref="viewForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="标题："
              size="small"
              prop="title"
            >
              <el-input size="medium" v-model="viewForm.title" :disabled="flag == 'view'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="描述："
              size="small"
              prop="bannerDesc"
            >
              <el-input size="medium" v-model="viewForm.bannerDesc" :disabled="flag == 'view'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片：" size="small" prop="bannerUrl">
              <el-upload
              class="titImg-uploader"
              action=""
              :auto-upload="false"
              list-type="picture"
              :show-file-list="false"
              :on-change="handleThumbChange"
              :multiple="false"
               :disabled="flag == 'view'"
              accept="image/jpeg,image/jpg,image/png"
            >
              <img
                v-if="viewForm.bannerUrl"
                :src="viewForm.bannerUrl"
                class="titImg"
              />
              <i v-else class="el-icon-plus titImg-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="8">
            <el-form-item size="small">
              <el-button
                type="button"
                size="small"
                @click="showDetailModalDialog = false"
                >{{ flag == 'view' ? '关闭' : '取消'}}</el-button>
              <el-button
                type="primary"
                size="small"
                @click="handleSave()"
                v-if="flag != 'view'"
                >保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { bannerList, bannerAdd, bannerUpdate, bannerUpdateStatus, bannerDetail, bannerDelete } from "@/api/banner";
import { ossUploadFile } from '@/api/common';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      that: this,
      queryForm: {
        pageNum: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      modalTitle: '新增轮播图',
      flag: 'add', //标识
      viewForm: {
        id: '',
        title: '',
        bannerDesc: '',
        bannerUrl: '',
        status: '' //业务状态
      },
      viewFormRules: {
        'title': [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        'bannerDesc': [
          { required: true, message: "请输入描述", trigger: "change" },
        ],
        'bannerUrl': [
          { required: true, message: "请上传轮播图图片", trigger: "change" },
        ],
      },
      showDetailModalDialog: false
    };
  },
  mounted() {
    //获取轮播图数据
    this.handleQuery();
  },
  methods: {
    handleQuery(){
      this.queryForm.pageNum = 1;
      this.queryForm.pageSize = 10;
      this.queryList();
    },
    async queryList() {
      let res = await bannerList(this.queryForm);
      if (res.code == 1) {
        this.list = res.data.list;
        this.total = res.data.total;
      } else {
        this.list = [];
        this.total = 0;
        this.openMessage(res.message, "err");
      }
    },
    //新增轮播图
    handleAddProd(){
      this.showDetailModalDialog = true;
      this.modalTitle = '新增轮播图';
      this.flag = 'add';
      this.$nextTick(() => {
        this.$refs.viewForm.resetFields();
        this.$refs.viewForm.clearValidate();
      })
    },
    //图片上传
    async handleThumbChange(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        return this.openMessage('图片大小不能超过 10MB!', 'war');
      }
      let res = await ossUploadFile({ 
        file: file.raw,
        businessType: 'banner'
      });
      if (res.code == 1) {
        this.viewForm.bannerUrl = res.data;
      } else {
       this.viewForm.bannerUrl = '';
        this.openMessage(res.message, 'err');
      }
    },
    //轮播图保存
    handleSave(){
      this.$refs.viewForm.validate(async valid => {
        if(valid){
          if(this.flag == 'add'){
            this.viewForm.id = '';
            let res = await bannerAdd(this.viewForm);
            if(res.code == 1){
              this.queryList();
              this.showDetailModalDialog = false;
              this.openMessage(res.message, 'suc');
            }else{
              this.openMessage(res.message, 'err');
            }
          }else if(this.flag == 'edit'){
            let res = await bannerUpdate(this.viewForm);
            if(res.code == 1){
              this.queryList();
              this.showDetailModalDialog = false;
              this.openMessage(res.message, 'suc');
            }else{
              this.openMessage(res.message, 'err');
            }
          }
        }
      })
    },
    //查看轮播图详情
    async handleView(id) {
      this.showDetailModalDialog = true;
      this.modalTitle = '查看轮播图';
      this.flag = 'view';
      this.$nextTick(() => {
        this.$refs.viewForm.clearValidate();
      })
      let res = await bannerDetail(id);
      if (res.code == 1) {
        this.viewForm = res.data;
      } else {
        this.openMessage(res.message, "err");
      }
    },
    //修改轮播图弹框
    async handleEdit(row) {
      this.showDetailModalDialog = true;
      this.modalTitle = '修改轮播图';
      this.flag = 'edit';
      this.$nextTick(() => {
        this.$refs.viewForm.clearValidate();
      })
      let res = await bannerDetail(row.id);
      if (res.code == 1) {
        this.viewForm = res.data;
      } else {
        this.openMessage(res.message, "err");
      }
    },
    //删除
    handleDelete(id) {
        this.$confirm(
          "确定删除该轮播图吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(async () => {
            let res = await bannerDelete(id);
            if (res.code == 1) {
              this.queryList();
              this.openMessage(res.message, "suc");
            } else {
              this.openMessage(res.message, "err");
            }
          })
          .catch();
    },
    changePageSize(val) {
      if (val) {
        this.queryForm.pageSize = val;
        this.queryList();
      }
    },
    changeCurrentPage(val) {
      if (val) {
        this.queryForm.pageNum = val;
        this.queryList();
      }
    }
  },
};
</script>

<style scoped lang="scss">
.el-input,
.el-select,
.el-date-editor {
  width: 100%;
}

.underwriting-orders {
  background: #ffffff;
  margin-bottom: 29px;
  border-radius: 6px;
  padding: 24px 43px 22px;

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #333333;
  }
  .image{
    max-width: 90%;
    height: 100%;
  }
}
.titImg-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.titImg-uploader .el-upload:hover {
  border-color: #409eff;
}
.titImg-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px dashed #dee1e5;
}
.titImg {
  width: 120px;
  height: 80px;
  display: block;
}
</style>
