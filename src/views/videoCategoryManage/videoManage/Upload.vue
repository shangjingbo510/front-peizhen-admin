<template>
  <div>
    <div>
      <el-page-header @back="goBack" :content="id?'视频修改':'视频上传'"></el-page-header>
      <el-divider></el-divider>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频标题" prop="title">
            <el-input size="small" v-model="form.title" placeholder="请输入" maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频类别" prop="categoryId">
            <el-select
              v-model="form.categoryId"
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
          <el-form-item label="视频缩略图" prop="imageUrl">
            <el-upload
              class="shareImg-uploader"
              action
              :auto-upload="false"
              list-type="picture"
              :show-file-list="false"
              :on-preview="handlePreTitImg"
              :on-remove="handleRemoveSrc"
              :on-change="changeonShare"
              :multiple="false"
              :before-upload="beforeAvatarUpload"
              accept="image/jpeg,image/jpg,image/png"
            >
              <img
                v-if="form.imageUrl"
                :src="form.imageUrl"
                class="shareImg"
              />
              <i v-else class="el-icon-plus shareImg-uploader-icon"></i>
            </el-upload>
            <div
              class="upload_tip inline"
              style="vertical-align: middle; margin-left: 20px"
            >
              <p>1、本类目上传图片比例为1:1。</p>
              <p>2、仅且必须上传一张照片。</p>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频上传" prop="videoUrl">
            <el-upload
              action
              :auto-upload="false"
              :show-file-list="false"
              :on-remove="handleRemoveVideo"
              :multiple="false"
              :before-upload="beforeUploadVideo"
              :on-change="changeonVideo"
              :disabled="uploadUnSuccessFlag"
            >
              <div style="position: relative">
                <el-input
                  ref="intFile"
                  size="medium"
                  readonly
                  style="width: 417px"
                  v-model="form.videoUrl"
                ></el-input>
                <el-button
                  style="
                    position: absolute;
                    top: 2px;
                  "
                  size="medium"
                  type="primary"
                  >浏览</el-button
                >
              </div>
            </el-upload>
            <div style="width: 417px">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="percentage"
              ></el-progress>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
              label="正文内容"
              size="small"
              prop="content"
            >
            <vue-ueditor-wrap
              v-model="form.content"
              :config="myConfig"
              @ready="ready"
              :destroy="true"
            ></vue-ueditor-wrap>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap';
import OSS from 'ali-oss';
import { randomString } from '@/utils/index';
import { ossUploadFile } from '@/api/common';
import { schoolCategoryList, schoolVideoDetail, schoolVideoAdd, schoolVideoUpdate } from "@/api/videoManage";
export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      id: this.$route.query.id || '',
      form: {
        id: '',
        title: '',
        categoryId: '',
        videoUrl: '',
        sharePicFile: null,
        imageUrl: "", //视频缩略图
        content: "",
      },
      categoryList: [],
      rules: {
        title: [
          {
            required: true,
            trigger: "blur",
            message: "请输入视频标题"
          }
        ],
        categoryId: [
          {
            required: true,
            trigger: "blur",
            message: "请选择视频类别"
          }
        ],
        imageUrl: [
          {
            required: true,
            trigger: "blur",
            message: "请上传缩略图"
          }
        ],
        videoUrl: [
          {
            required: true,
            trigger: "blur",
            message: "请上传视频"
          }
        ],
        content: [
          {
            required: true,
            trigger: "blur",
            message: "请输入视频正文内容"
          }
        ],
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
        enableAutoSave: false,
      },
      percentage: 0, //视频上传百分比
      uploadUnSuccessFlag: false, //上传是否成功标识
      setIntervalFun: null, //定时器
    };
  },
  mounted(){
    //获取视频分类
    this.getCategoryList();
    //如果有id说明是修改视频，否则是上传视频
    if(this.$route.query.id){
      //获取视频详情
      this.getVideoDetail();
    }else{

    }
  },
  methods: {
    //获取视频详情
    async getVideoDetail(){
      let res = await schoolVideoDetail(this.id);
      if(res.code == 1){
        this.form = Object.assign({}, this.form, res.data);
        console.log(this.form);
      }else{

      }
    },
    //获取视频分类
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
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg';
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.openMessage('上传头像图片只能是 JPG/PNG 格式!', 'war');
      }
      if (!isLt10M) {
        this.openMessage('上传头像图片大小不能超过 10MB!', 'war');
      }
      return isJPG && isLt10M;
    },
    //缩略图上传
    async changeonShare(file) {
      let res = await ossUploadFile({
        file: file.raw,
        businessType: 'banner'
      });
      if (res.code == 1) {
        this.form.imageUrl = res.data;
      } else {
       this.form.imageUrl = '';
        this.openMessage(res.message, 'err');
      }
    },
    handleRemoveSrc(file, fileList) {
      this.form.sharePicFile = null;
    },
    handleRemoveVideo(file, fileList) {
      this.form.videoUrl = '';
    },
    //获取promise返回的状态
    promiseState(p) {
      const t = {};
      return Promise.race([p, t]).then(
        (v) => (v === t ? 'pending' : 'fulfilled'),
        () => 'rejected'
      );
    },
    goBack() {
      window.history.back();
    },
    getBucketName(){
      let bucketName = 'jbt-member';
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

      } else if (process.env.NODE_ENV === 'uat') {
        //bucketName = 'jbt-member-uat';
        //uat上传有问题 所以先设置成测试环境得
        bucketName = 'jbt-member';
      } else if (process.env.NODE_ENV === 'ysc') {
        bucketName = 'jbt-member-ysc';
      } else if (process.env.NODE_ENV === 'production') {
        bucketName = 'jbt-member-on-line';
      }
      return bucketName;
    },
    //change 文件 函数
    changeonVideo(file, fileList) {
      if (
        [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb',
          'video/mov',
          'video/quicktime',
        ].indexOf(file.raw.type) === -1
      ) {
        // this.$refs.intFile.value = null;
        this.form.videoUrl = '';
        return this.openMessage('请上传正确的视频格式');
      }
      const isLimit2G = file.size / 1024 / 1024 < 2048;
      if (!isLimit2G) {
        this.$refs.intFile.value = null;
        this.form.videoUrl = '';
        return this.openMessage('文件大小最大支持2G，请重新上传!', 'war');
      }
      this.form.videoUrl = '';

      const client = new OSS({
        region: 'oss-cn-beijing', // 请设置成你的
        accessKeyId: '', // 请设置成你的
        accessKeySecret: '', // 请设置成你的
        bucket: this.getBucketName(), // 请设置成你的
        secure: true, // 上传链接返回支持https
      });
      // 获取后缀名
      const index = file.name.lastIndexOf('.');
      const suffix = file.name.substring(index, file.name.length);
      //生成30位随机字符串
      const ss = randomString(30);
      const fileName = 'familyOffice/video/' + ss + suffix;
      let result = client.multipartUpload(fileName, file.raw, {});

      this.percentage = 0;
      this.setIntervalFun = null;
      this.uploadUnSuccessFlag = true;
      this.setIntervalFun = setInterval(async () => {
        if(this.percentage < 95){
          this.percentage += 5;
        }
        let state = await this.promiseState(result);
        console.log(state, this.percentage);
        if (state === 'fulfilled') {
          this.percentage = 100;
          result.then((r) => {
            let url = r.res.requestUrls[0].split('?')[0];
            console.log(url)
            this.form.videoUrl = url;
            this.uploadUnSuccessFlag = false;
            clearInterval(this.setIntervalFun);
            this.setIntervalFun = null;
          });
        }
      }, 1000);
    },
    // 上传前函数
    beforeUploadVideo(file) {},
    ready(editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          //修改
          if(this.id){
            schoolVideoUpdate(this.form).then(res => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", ()=> {
                  this.$router.back();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            });
          }else{
            //添加
            delete this.form.id;
            schoolVideoAdd(this.form).then(res => {
              if (res.code == 1) {
                this.openMessage(res.message, "suc", ()=> {
                  this.$router.back();
                });
              } else {
                this.openMessage(res.message, "err");
              }
            })
          }
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.setIntervalFun);
    this.setIntervalFun = null;
  },
};
</script>
<style lang='scss' scoped>
.el-input,.el-select {
  width: 76%;
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
.shareImg-uploader {
  float: left;
}
.shareImg-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.shareImg-uploader .el-upload:hover {
  border-color: #409eff;
}
.shareImg-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #dee1e5;
}
.shareImg {
  width: 100px;
  height: 100px;
  display: block;
}
.upload_tip {
  font-size: 12px;
  color: #f20;
}
</style>
