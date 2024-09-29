<template>
    <div>
        <div class="container">
            <video class="video" id="bgvid" playsinline="" autoplay muted loop="">
                <source src="@/assets/video/movie.mp4" type="video/mp4">
            </video>
            <div class="loginwrap">
                <div>
                    <h3 class="title">用户登录</h3>
                </div>
                <div class="log_con2">
                    <el-form label-position="left" label-width="0px" class="login-container">
                        <el-form-item style=" width: 300px;">
                            <el-input class="intwrap" type="text" v-model="submitForm.account" placeholder="用户名">
                                <i slot="prefix" class="icon-user"></i>
                            </el-input>
                        </el-form-item>

                        <el-form-item style="width: 300px;position: relative;">
                            <el-input class="intwrap" :type="pwdType" v-model="submitForm.password"
                                      autocomplete="new-password"
                                      placeholder="密码" @keyup.enter.native="LoginHandle">
                                <i slot="prefix" class="icon-password"></i>
                            </el-input>
                            <span class="show-pwd" @click="showPwd">
                                <svg-icon v-if="this.pwdType" icon-class="eye"/>
                                <svg-icon v-else icon-class="eye-open"/>
                            </span>
                        </el-form-item>

                        <div class="forgetword">
                            <span @click="handleForgetPwdBtn">忘记密码</span>
                        </div>

                        <el-form-item style="width: 300px;">
                            <el-button type="primary" style="width:100%;border-radius: 4px;" @click="LoginHandle">登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>

        <!-- 手机验证 弹框 -->
        <el-dialog title="手机验证" center :visible.sync="verifyDialogVisible" width="30%">
            <div class="dialog_form">
                <el-form :model="form" label-width="100px" :rules="rules" ref="verifyForm">
                    <el-form-item label="手机号" prop="userName">
                        <el-input size="small" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="verificationCode">
                        <el-input size="small" placeholder="请输入验证码" autocomplete="new-password"
                                  v-model="form.verificationCode">
                            <el-button class="custom-btn first-level" slot="append" v-if="!sendMsgDisabled"
                                       @click="sendVerCode">
                                发送验证码
                            </el-button>
                            <el-button class="custom-btn first-level" slot="append" v-if="sendMsgDisabled">{{ time
                                + '秒后重新获取' }}
                            </el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" size="medium" @click="verifyDialogVisible = false;centerDialogVisible = true;">上一步</el-button>
                <el-button type="primary" size="medium" @click="handleNext('verifyForm')">下一步</el-button>
              </span>
        </el-dialog>
        <!-- 重置密码 弹框 -->
        <el-dialog title="重置密码" center :visible.sync="showResetPassDialog" width="30%">
            <div class="dialog_form">
                <el-form :model="form" label-width="100px" :rules="rules" ref="resetForm">
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
                <el-button type="primary" size="medium" @click="onSubmit('resetForm')">确定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        verifySms,
        sendSms,
        resetPasswordSubmit
    } from '@/api/user';
    import {getToken, setToken} from '@/utils/auth';
    import {resetRouter} from "@/router";
    import { enCrypt } from '@/utils/crypto';

    export default {
        components: {},
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
                verifyDialogVisible: false, // 手机验证弹框标识
                showResetPassDialog: false, // 重置密码弹框标识
                submitForm: {
                    account: '',
                    password: ''
                },
                pwdType: 'password',
                time: 90, // 发送验证码倒计时
                sendMsgDisabled: false,
                disPhone: true, //手机验证按钮 禁用标识
                changePwdMode: {}, //修改密码方式
                form: {
                    userName: '', //用户名
                    verificationCode: "", //验证码
                    password: '', //新密码
                    confirmPassword: '', //确认密码
                },
                rules: {
                    userName: [
                        {required: true, message: '手机号不可为空', trigger: 'blur'},
                        {
                            message: "请输入正确的手机号",
                            pattern: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
                            trigger: "blur"
                        }
                    ],
                    verificationCode: [
                        {required: true, message: '验证码不可为空', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'},
                        {min: 8, message: '密码不能少于8位', trigger: 'blur'},
                    ],
                    confirmPassword: [
                        {required: true, message: '密码不可为空', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                }
            };
        },
        mounted() {
            
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            //登陆操作
            async LoginHandle() {
                if (this.submitForm.account && this.submitForm.password) {
                    let loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    let params = {
                        account: this.submitForm.account,
                        password: enCrypt(this.submitForm.password)
                    }
                    //重置路由及菜单
                    await resetRouter()
                    await this.$store.commit('permission/CLEAR_MENU')
                    await this.$store.commit('permission/CLEAR_PERMISSION')
                    try {
                        await this.$store.dispatch('Login', params)
                        loading.close();
                        this.$router.push('/');
                    } catch (e) {
                        loading.close();
                    }
                } else {
                    this.openMessage('用户名或密码不能为空', 'err')
                }
            },
            //点击忘记密码按钮
            async handleForgetPwdBtn() {
                if (this.submitForm.account) {
                    this.verifyDialogVisible = true;
                } else {
                    this.openMessage('请先输入账号', 'war')
                }
            },
            //点击手机验证按钮
            async phoneHandle() {
                this.verifyDialogVisible = true;
                this.$nextTick(() => {
                    this.$refs.verifyForm.resetFields();
                })
            },
            //发送验证码
            sendVerCode() {
                this.sendCodeHandle();
                let me = this;
                me.sendMsgDisabled = true;
                let interval = window.setInterval(function () {
                    if ((me.time--) <= 0) {
                        me.time = 90;
                        me.sendMsgDisabled = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
            },
            //发送验证码 请求
            async sendCodeHandle() {
                let res = await sendSms({
                    phone: this.form.userName,
                    businessType: 1
                })
                if (res.code === 1) {
                    this.openMessage(res.message, 'suc')
                } else {
                    this.openMessage(res.message, 'err')
                }
            },
            //手机验证 下一步按钮
            handleNext(form) {
                this.$refs[form].validate(async (valid) => {
                    if (valid) {
                        let params = {
                            phone: this.form.userName,
                            code: this.form.verificationCode,
                            businessType: 1
                        }
                        let res = await verifySms(params)
                        if (res.code === 1) {
                            // this.form.userId = res.data.userId;
                            // this.form.token = res.data.token;
                            //手机验证弹框标识
                            this.verifyDialogVisible = false;
                            //重置密码弹框标识
                            this.showResetPassDialog = true;
                            this.$nextTick(() => {
                                this.$refs.resetForm.resetFields();
                                this.$refs.resetForm.clearValidate();
                            })
                        } else {
                            this.openMessage(res.message, 'err')
                        }
                    }
                });
            },
            //重置密码 提交
            onSubmit(form) {
                this.$refs[form].validate(async (valid) => {
                    if (valid) {
                        let params = {
                            phone: this.form.userName,
                            newPassword: enCrypt(this.form.password),
                        }
                        let res = await resetPasswordSubmit(params);
                        if (res.code === 1) {
                            //重置过密码了标识
                            setToken('isResetPwdFlag', 1)
                            this.showResetPassDialog = false;
                            this.openMessage(res.message, 'suc')
                            location.reload()
                        } else {
                            this.openMessage(res.message, 'err')
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped lang='scss'>
    .intwrap {
        /deep/ .el-input__inner {
            border-radius: 0px !important;
            text-indent: 1em;
            background: transparent;
            outline: none;
            border: none;
            border-bottom: 1px solid #999;
            color: #fff;
        }

        .el-input__prefix {
            left: 16px;
        }

        .icon-user {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
            background: url("../../assets/images/user.png") no-repeat center;
            background-size: 100% 100%;
        }

        .icon-password {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
            background: url("../../assets/images/mima.png") no-repeat center;
            background-size: 100% 100%;
        }
    }

    /*.container {*/
    /*    !*min-height: 600px;*!*/
    /*    height: 100vh;*/
    /*    width: 100%;*/
    /*    background: url("../../assets/images/bg.png") no-repeat right center #000;*/
    /*    background-size: 100% 100%;*/
    /*    background-attachment: fixed;*/
    /*}*/

    .container{
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color:skyblue;
    }

    .container:before{
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        display: block;
        z-index: -1000;
        top: 0;
        left: 0;
        background: rgba(90,20,10,.2);
    }

    .video{
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        z-index: -9999;
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
        -webkit-transition: 1s opacity;
        transition: 1s opacity;
        background-color:skyblue;
    }

    .loginwrap {
        float: left;
        margin: 6% 0 0 8%;
        display: flex;
        flex-direction: column;
        padding: 40px 60px 30px;
        box-sizing: border-box;
        width: 431px;
        height: 522px;
        background: rgba(12, 14, 16, 0.1);
        /*box-shadow: inset 0px 0px 6px 0px rgba(97, 101, 114, 0.5);*/
        border-radius: 8px;
    }

    h3.title {
        margin: 50px 0;
        height: 36px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 36px;
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #C0C4CCFF;
        cursor: pointer;
        user-select: none;
    }

    .el-button--primary {
        color: #fff;
        background-color: #2E50FF;
        border-color: #2E50FF;
    }

    .forgetword {
        color: #fff;
        display: flex;
        justify-content: flex-end;
        font-size: 13px;
        margin: -10px 10px 30px 0;
    }

    .forgetword span {
        cursor: pointer;
    }

    .custom-btn.first-level {
        background-color: #2e80ff;
        border-color: #2e80ff;
        color: #fff;
        padding: 3px 10px;
        line-height: 24px;
        min-width: 48px;
        box-sizing: border-box;
    }
</style>
