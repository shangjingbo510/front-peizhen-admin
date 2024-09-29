<template>
  <div class="underwriting-orders">
    <el-row>
      <el-form
        ref="queryForm"
        :model="queryForm"
        label-width="120px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item
              label="资讯标题："
              size="small"
              prop="title"
            >
              <el-input size="medium" v-model="queryForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
                label="发布状态："
                size="small"
                prop="publicStatus"
              >
              <el-select
                v-model="queryForm.publicStatus"
                clearable
                size="medium"
                placeholder="请选择"
              >
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="handleQuery()"
                class="btn"
                >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="mb-30">
            <el-col :span="6">
                <el-button type="primary" size="small" @click="handleAddProd()"
                >新增资讯</el-button>
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
          label="资讯标题"
          prop="title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="资讯图片"
          align="center"
        >
            <template slot-scope="scope">
              <img :src="scope.row.imageUrl" width="80" height="80" />
            </template>
        </el-table-column>
        <el-table-column
          label="资讯简介"
          prop="brief"
          align="center"
        ></el-table-column>
        <el-table-column
          label="发布状态"
          prop="publicStatusText"
          align="center"
        ></el-table-column>
        <el-table-column
          label="操作人"
          prop="operator"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleView(scope.row.id)"
              >查看</el-button>
            <el-button size="mini" type="text" @click="handleEdit(scope.row)"
              >修改</el-button>
            <el-button
              type="text"
              @click="handleUpdateStatus(scope.row)"
              size="mini"
            >{{scope.row.publicStatus == 0 ? '启用' : '禁用'}}</el-button>
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

    <!-- 新增、查看、修改资讯模态框 -->
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
              label="资讯标题："
              size="small"
              prop="title"
            >
              <el-input size="medium" v-model="viewForm.title" :disabled="flag == 'view'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="资讯简介："
              size="small"
              prop="brief"
            >
              <el-input size="medium" v-model="viewForm.brief" :disabled="flag == 'view'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资讯图片：" size="small" prop="imageUrl">
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
                v-if="viewForm.imageUrl"
                :src="viewForm.imageUrl"
                class="titImg"
              />
              <i v-else class="el-icon-plus titImg-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="资讯内容："
              size="small"
              prop="content"
            >
              <vue-ueditor-wrap
                v-model="viewForm.content"
                :config="myConfig"
                @ready="ready"
                :destroy="true"
                :disabled="flag == 'view'"
              ></vue-ueditor-wrap>
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
import VueUeditorWrap from 'vue-ueditor-wrap';
import Pagination from "@/components/Pagination";
import { informationList, informationAdd, informationUpdate, informationUpdateStatus, informationDetail, informationDelete } from "@/api/news";
import { ossUploadFile } from '@/api/common';
export default {
  components: {
    Pagination,
    VueUeditorWrap
  },
  data() {
    return {
      queryForm: {
        title: '',
        publicStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      myConfig: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: process.env.VUE_APP_BASE_URL + '/ueditor/ueditorUpload',
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: './static/UEditor/',
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 340,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 关闭自动保存
        enableAutoSave: false
      },
      list: [],
      total: 0,
      modalTitle: '新增资讯',
      flag: 'add', //标识
      viewForm: {
        id: '',
        title: '',
        brief: '',
        content: '',
        imageUrl: '',
        publicStatus: '' //发布状态
      },
      viewFormRules: {
        'title': [
          { required: true, message: "请输入资讯标题", trigger: "blur" },
        ],
        'brief': [
          { required: true, message: "请输入资讯简介", trigger: "change" },
        ],
        'content': [
          { required: true, message: "请输入资讯内容", trigger: "change" },
        ],
        'imageUrl': [
          { required: true, message: "请上传资讯图片", trigger: "change" },
        ],
      },
      showDetailModalDialog: false
    };
  },
  mounted() {
    //获取资讯数据
    this.handleQuery();
  },
  methods: {
    handleQuery(){
      this.queryForm.pageNum = 1;
      this.queryForm.pageSize = 10;
      this.queryList();
    },
    async queryList() {
      let res = await informationList(this.queryForm);
      if (res.code == 1) {
        this.list = res.data.list;
        this.total = res.data.total;
      } else {
        this.list = [];
        this.total = 0;
        this.openMessage(res.message, "err");
      }
    },
    //新增资讯
    handleAddProd(){
      this.showDetailModalDialog = true;
      this.modalTitle = '新增资讯';
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
        this.viewForm.imageUrl = res.data;
      } else {
       this.viewForm.imageUrl = '';
        this.openMessage(res.message, 'err');
      }
    },
    //资讯保存
    handleSave(){
      this.$refs.viewForm.validate(async valid => {
        if(valid){
          if(this.flag == 'add'){
            this.viewForm.id = '';
            let res = await informationAdd(this.viewForm);
            if(res.code == 1){
              this.queryList();
              this.showDetailModalDialog = false;
              this.openMessage(res.message, 'suc');
            }else{
              this.openMessage(res.message, 'err');
            }
          }else if(this.flag == 'edit'){
            let res = await informationUpdate(this.viewForm);
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
    //查看资讯详情
    async handleView(id) {
      this.showDetailModalDialog = true;
      this.modalTitle = '查看资讯';
      this.flag = 'view';
      this.$nextTick(() => {
        this.$refs.viewForm.clearValidate();
      })
      let res = await informationDetail(id);
      if (res.code == 1) {
        this.viewForm = res.data;
      } else {
        this.openMessage(res.message, "err");
      }
    },
    //修改资讯弹框
    async handleEdit(row) {
      this.showDetailModalDialog = true;
      this.modalTitle = '修改资讯';
      this.flag = 'edit';
      this.$nextTick(() => {
        this.$refs.viewForm.clearValidate();
      })
      let res = await informationDetail(row.id);
      if (res.code == 1) {
        this.viewForm = res.data;
      } else {
        this.openMessage(res.message, "err");
      }
    },
    //启用、禁用
    async handleUpdateStatus(row){
      let res = await informationUpdateStatus({
        id: row.id,
        status: row.publicStatus == 1 ? 0 : 1
      });
      if(res.code == 1){
        this.queryList();
        this.openMessage(res.message, "suc");
      }else{
        this.openMessage(res.message, "err");
      }
    },
    //删除
    handleDelete(id) {
        this.$confirm(
          "确定删除该资讯吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(async () => {
            let res = await informationDelete(id);
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
    },
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    myInit() {
      window.UE.registerUI(123);
    },
    //获取文档内容
    getContent: function () {
      let content = this.$refs.ueditor.getUEContent();
    },
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
