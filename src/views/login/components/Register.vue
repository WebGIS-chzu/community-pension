<template>
  <div id="register">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" show-password>
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="用户身份" prop="character">
        <el-radio-group
          v-model="ruleForm.character"
          v-for="(value, index) in users"
          :key="value.userId"
        >
          <el-radio
            :label="value.userRole"
            @change="getId(value.userId)"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { goRegister } from "network/register";

export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        character: "",
      },
      rules: {
        username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        character: [{ required: true, message: "请选择身份", trigger: "change" }],
      },
      inforegister: {
        username: "",
        password: "",
        roleid: "",
      },
      users: [
        {
          userId: 2,
          userRole: "老人",
        },
        {
          userId: 3,
          userRole: "护工",
        },
        {
          userId: 4,
          userRole: "监护人",
        },
      ],
      registerCode: "",
    };
  },
  methods: {
    getId(id) {
      console.log("当前index", id);
      this.inforegister.roleid = id;
      console.log("当前roleid", this.inforegister.roleid);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log("1", valid)
        if (valid) {
          // console.log("2", valid)
          this.inforegister.username = this.ruleForm.username;
          this.inforegister.password = this.ruleForm.pass;
          // console.log(this.inforegister)

          // 上传注册数据
          goRegister1(this.inforegister)
          // console.log(this.registerCode)
          setTimeout(function () {
            if (this.registerCode == 200) {
              alert("上传注册数据");
            } else {
              alert("上传数据失败");
            }
          }, 5000);
        } else {
          console.log("不能注册");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 网络请求相关方法
    // 上传注册数据
    goRegister1(params) {
      console.log("1")
      goRegister(params).then((res) => {
        this.registerCode = 200;
        console.log(res);
        console.log("registerCode", this.registerCode);
        console.log("go", params);
        console.log('hello')
      });
    },
  },
};
</script>

<style scoped></style>
