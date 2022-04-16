<template>
  <div id="login">
    <video autoplay muted loop class="fillWidth">
      <source src="./bg.mp4" type="video/mp4" />
    </video>
    <div class="title">城市社区智慧养老服务与管理系统</div>
    <el-card class="box-card">
      <el-row>
        <el-col >
          <div class="logintitle">
            <span>登录</span>
          </div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col :span="20" :offset="1">
          <div>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="40px"
              class="demo-ruleForm"
            >
              <el-form-item prop="account">
                <img src="./account.png" />
                <el-input v-model="ruleForm.account"></el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <img src="./pass.png" />
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                >
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="验证码" prop="confirm">
                <el-input
                  v-model="ruleForm.confirm"
                  placeholder="请输入验证码"
                  style="width: 140px">
                </el-input>
                <el-button @click="getCode" class="confirm">
                  {{ confirm }}
                </el-button>
              </el-form-item> -->
              <el-form-item>
                <el-button
                  type="primary"
                  @click.prevent="submitForm('ruleForm')"
                  class="titleButton"
                  >登录</el-button
                >
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-link :underline="false" class="register" @click="register">注册用户</el-link> -->
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";
import { goLogin } from "network/login";

export default {
  name: "Login",
  data() {
    var checkaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validataConfirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "admin",
        // checkPass: "",
        account: "admin",
        confirm: "",
      },
      rules: {
        account: [{ validator: checkaccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        confirm: [{ validator: validataConfirm, trigger: "blur" }],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
      },
      confirm: "获取验证码",
      submit: "",
      loginCode: 0,
      infologin: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    // 获取验证码数据
    // this.getConfirm();
    // 获取登录信息
  },
  methods: {
    async submitForm(formName) {
      var that = this;
      this.$refs[formName].validate(async (valid) => {
        this.infologin.username = this.ruleForm.account;
        this.infologin.password = this.ruleForm.pass;
        // this.infologin = JSON.stringify(this.infologin);
        console.log(this.infologin);
        // 获取登录信息
        // console.log("验证", this.confirm)
        // console.log(this.ruleForm.confirm)
        await this.goLogin(this.infologin);
        // if (this.ruleForm.confirm === this.confirm) {
        //   this.goLogin(this.infologin);
        //   console.log("验证成功");
        // }else {
        //   console.log("验证失败");
        // }
        if (valid) {
          console.log("this.loginCode", this.loginCode);
          if (this.loginCode == 200) {
            alert("登录成功");
            this.$router.push("/dataPanel");
          } else {
            alert("登录失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      if (this.$route.path != "/register") {
        this.$router.replace("/register");
      }
    },
    // 生成随机4个数的验证码
    getCode() {
      var all =
        "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
      var b = "";
      for (var i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * 62);
        b += all.charAt(index);
      }
      this.confirm = b;
      // console.log(this.confirm)
    },
    // getPath() {
    //   console.log(this.$route.path);
    // },
    // 网络请求相关方法
    // 登录验证
    async goLogin(params) {
      var that = this;
      console.log("params", params);
      that.loginCode = 200;
      // await goLogin(params).then((res) => {
      //   console.log("res1111", res)
      //   window.localStorage.setItem("user", res.data.message)
      //   that.loginCode = res.data.code;
      // });
    },
  },
  // Watch: {
  //   $route: "getPath",
  // },
};
</script>

<style scoped>
#login {
  /* margin: 0px;
  background: url(bg_logion.jpg) no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed; */

  /* background: url(bg.mp4) no-repeat;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: cover; */
}
.fillWidth {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
}
.box-card {
  position: absolute;
  left: 34%;
  bottom: 23%;
  width: 484px;
  /* margin: 200px 200px; */
  /* opacity: 0.85; */
  background-color: transparent;
}

.logintitle {
  text-align: center;
  color: #fff;
}

.confirm {
  margin-left: 10px;
}

.register {
  margin-left: 40px;
}

@font-face {
  src: url("~common/font/KuHei.ttf");
  font-family: "KuHei";
}
/* 系统名称 */
.title {
  position: absolute;
  top: 15%;
  left: 28.5%;
  font-family: KuHei;
  font-size: 44px;
  color: #fff;
  text-align: center;
}
.titleButton {
  /* position: absolute; */
  cursor: pointer;
  /* left: 50%; */
  transform: translate(-50%, 0);
  /* margin-top: 130px; */
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border: 3px solid #fff;
  text-transform: uppercase;
  /* padding: 10px 20px; */
  transition: 0.4s linear;
  width: 100px;
  margin-left: 160px;
  background-color: transparent;
}
.titleButton:hover {
  color: black;
  background: #fff;
  border: 3px solid transparent;
}
::v-deep .box-card .el-input__inner {
  
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;

}
img {
  height: 24px;
  margin-bottom: -2%;
  margin-right: 10px;
}
.el-input{
  width: 290px;
}
</style>
