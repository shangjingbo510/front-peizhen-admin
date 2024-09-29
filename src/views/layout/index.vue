<template>
    <div class="app-wrapper">
        <!-- DOM结构有待优化 -->
        <el-container style="height: 100%;">
            <!-- header -->
            <el-header>
                <div style="background-color: #F2F3F5;margin-left:30px;">
<!--                    <img class="log" src="@/assets/images/logo.png"/>-->
                    人和家办管理系统
                </div>

                <div class="avatar-wrapper">
                    <img class="head-img" src="@/assets/images/headImg.png" />
                    <span class="username mr-10">{{userName}}</span>
                    <img class="logout-img" src="@/assets/images/password-icon.png" />
                    <span class="username mr-10 cursor-btn" @click="handleChangePwd">修改密码</span>
                    <span class="username cursor-btn" @click="logout" style="border-right: none;">
                        <img class="logout-img" src="@/assets/images/logout.png" />
                        退出登录
                    </span>
                </div>
            </el-header>

            <div class="dashboard">
                <!-- 左侧菜单 -->
                <el-aside>
                    <sidebarNav />
                </el-aside>
                <!-- 正文内容 -->
                <el-main class="self-el-main-container">
                    <router-view :key="key"></router-view>
                </el-main>
            </div>
        </el-container>

        <!-- 修改密码 弹框 -->
        <el-dialog title="修改密码" center :visible.sync="changePasswordDialog" width="30%">
            <div class="dialog_form">
                <el-form :model="form" label-width="100px" label-position="left" :rules="rules" ref="resetForm">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input size="small" type="password" autocomplete="new-password" v-model="form.oldPassword"
                                  minlength="8" maxlength="16" placeholder="请输入原密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input size="small" type="password" autocomplete="new-password" v-model="form.password"
                                  minlength="8" maxlength="16" placeholder="英文（区分大小写）+ 数字，至少8位"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input size="small" type="password" autocomplete="new-password"
                                  v-model="form.confirmPassword" maxlength="16"
                                  placeholder="请再次确认新密码"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <span class="red mr-10">保存后需重新登录</span>
                <el-button type="primary" size="medium" @click="onSubmit('resetForm')">保存</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import sidebarNav from './components/sidebar/index'
    import {mapState} from 'vuex'
    import ResizeMixin from './mixin/ResizeHandler'
    import { getToken } from '@/utils/auth'
    import { changePasswordSubmit } from "@/api/user";
    import { enCrypt } from '@/utils/crypto';

    export default {
        name: 'Layout',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    oldPassword: '', //原密码
                    password: '', //新密码
                    confirmPassword: '', //确认密码
                },
                changePasswordDialog: false, //修改密码弹框标识
                rules: {
                    oldPassword: [
                        {required: true, message: '原密码不可为空', trigger: 'blur'},
                        {min: 8, message: '原密码不能少于8位', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '新密码不可为空', trigger: 'blur'},
                        {min: 8, message: '新密码不能少于8位', trigger: 'blur'},
                    ],
                    confirmPassword: [
                        {required: true, message: '密码不可为空', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                }
            }
        },
        components: {
            sidebarNav
        },
        mounted() {

        },
        mixins: [ResizeMixin],
        computed: {
            ...mapState('permission', ['permissionList']),
            key(){
              return this.$route.path + Math.random();
            },
            userName() {
                return getToken('userName')
            }
        },
        methods: {
            handleChangePwd(){
              this.changePasswordDialog = true;
              this.$nextTick(() => {
                  this.$refs.resetForm.resetFields();
                  this.$refs.resetForm.clearValidate();
              })
            },
            //修改密码保存
            onSubmit(form) {
                this.$refs[form].validate(async (valid) => {
                    if (valid) {
                        let params = {
                            oldPassword: enCrypt(this.form.oldPassword),
                            newPassword: enCrypt(this.form.password)
                        }
                        let res = await changePasswordSubmit(params);
                        if (res.code === 1) {
                            this.changePasswordDialog = false;
                            this.openMessage(res.message, 'suc')
                        } else {
                            this.openMessage(res.message, 'err')
                        }
                    }
                });
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    // 为了重新实例化vue-router对象 避免bug
                    window.location.reload()
                })
            }
        }
    }

</script>

<style lang="scss">
    .app-wrapper {
        height: 100%;

        .el-container {
            // height: 100%;
        }

        .el-dialog__footer {
            /*padding: 0;*/
            .footer-line {
                padding: 6px 30px;
                display: flex;
                justify-content: space-between;
            }
        }

        .el-dialog__body {
            padding: 13px 20px;
        }

        .imgDiv {
            text-align: center;
            margin-top: 95px;
            margin-bottom: 75px;
        }

        .imgDiv img {
            width: 50px;
            height: 50px;
        }

    }

    .app-wrapper .el-header {
        height: 55px !important;
        padding: 0;
        line-height: 55px;
        display: flex;
        background-color: #F2F3F5;
        color: #303133;
        position: relative;

        .log {
            width: 132px;
            height: 48px;
            margin: 6px 16px;
            padding: 6px;
        }

        .log-text {
            // font-size: 30px;
            font-size: 25px;
            margin-left: 20px;
        }

        .avatar-wrapper {
            line-height: 55px;
            position: absolute;
            right: 30px;

            .user-avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                vertical-align: middle;
            }

            .logout-img {
                width: 20px;
                height: 20px;
                vertical-align: middle;
                margin-left: 10px;
            }
            .head-img{
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin-right: 5px;
            }

            .username {
                font-size: 14px;
                color: #303133;
                border-right: 1px solid #ddd;
                padding-right: 10px;
            }
            .cursor-btn {
                cursor: pointer;
            }

            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }

    .app-wrapper .el-aside {
        width: 80px !important;
        background: #001A42;
        font-size: 12px;
        box-sizing: border-box;
    }

    .dashboard {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        .el-aside {
            z-index: 99;
            width: 200px !important;
            height: calc(100vh - 55px);

            .el-menu {
                border-right: none;
            }

            /deep/ .el-menu-item-group__title {
                padding: 0;
            }
        }
    }

.self-el-main-container {
    background: #f1f5ff;
    width: calc(100vw - 200px);
    height: calc(100vh - 80px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 30px;
}
</style>
