<template>
  <div id="searchingbox">
    <div class="main clearfix aside">
      <div class="left clearfix fl">
        <div class="con_top clearfix">
          <h3>信息查询</h3>
          <div class="aside_con clearfix">
            <!-- 身份选择 -->
            <el-radio-group
              v-model="radio1"
              size="small"
              style="margin-bottom: 30px"
              @change="showInfo(radio1)"
            >
              <el-radio-button label="老人"></el-radio-button>
              <el-radio-button label="护工"></el-radio-button>
            </el-radio-group>

            <!-- 老人的div -->
            <div class="theOldBox" v-show="radio1 == '老人'">
              <el-form
                ref="oldForm"
                :model="oldForm"
                label-width="82px"
                :label-position="'left'"
                class="myform"
                size="small"
              >
                <el-form-item label="姓名" prop="oldName">
                  <el-input v-model="oldForm.oldName"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="oldId">
                  <el-input
                    v-model="oldForm.oldId"
                    maxlength="18"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-form-item label="居住地址" prop="address">
                  <el-cascader
                    v-model="oldForm.address"
                    :options="addressOptions"
                    @change="handleChange"
                    clearable
                    expand-trigger="hover"
                    style="width: 100%"
                  ></el-cascader>
                </el-form-item>
                <el-row >
                  <el-col :span="6">
                    <el-form-item label="血压" prop="bloodPressureMin">
                      <el-input
                        v-model="oldForm.bloodPressureMin"
                        placeholder="100"
                        style="width: 85px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" :offset="2">
                    <el-form-item label="">
                      <i class="el-icon-minus"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="bloodPressureMax">
                      <el-input
                        v-model="oldForm.bloodPressureMax"
                        placeholder="200"
                        style="width: 85px"
                      ></el-input>   
                    </el-form-item>                 
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="心率" prop="heartRateMin">
                      <el-input
                        v-model="oldForm.heartRateMin"
                        placeholder="60"
                        style="width: 85px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" :offset="2">
                    <el-form-item label="">
                      <i class="el-icon-minus"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="heartRateMax">
                      <el-input
                        v-model="oldForm.heartRateMax"
                        placeholder="200"
                        style="width: 85px"
                      ></el-input> 
                    </el-form-item>                 
                  </el-col>
                </el-row>
                <el-form-item>
                  <el-button @click="oldSearch('oldForm')">查询</el-button>
                  <el-button @click="resetForm('oldForm')">清空</el-button>
                </el-form-item>
              </el-form>
            </div>

            <!-- 护工的div -->
            <div class="theWorkerBox" v-show="radio1 == '护工'">
              <el-form
                ref="workerForm"
                :model="workerForm"
                label-width="82px"
                :label-position="'left'"
                class="myform"
                size="small"
              >
                <el-form-item label="姓名" prop="workerName">
                  <el-input v-model="workerForm.workerName"></el-input>
                </el-form-item>
                <el-form-item label="护工号" prop="workerId">
                  <el-input
                    v-model="workerForm.workerId"
                    maxlength="18"
                    show-word-limit
                  ></el-input>
                </el-form-item>
                <el-row >
                  <el-col :span="6">
                    <el-form-item label="累计接单量" prop="amountMax">
                      <el-input
                        v-model="workerForm.amountMax"
                        placeholder="100"
                        style="width: 75px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-form-item label="">
                      <i class="el-icon-minus"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="bloodPressureMax">
                      <el-input
                        v-model="oldForm.bloodPressureMax"
                        placeholder="200"
                        style="width: 85px"
                      ></el-input>   
                    </el-form-item>                 
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="6">
                    <el-form-item label="评分" prop="evaluateMin">
                      <el-input
                        v-model="workerForm.evaluateMin"
                        placeholder="0"
                        style="width: 75px"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-form-item label="">
                      <i class="el-icon-minus"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="evaluateMax">
                      <el-input
                        v-model="workerForm.evaluateMax"
                        placeholder="100"
                        style="width: 75px"
                      ></el-input> 
                    </el-form-item>                 
                  </el-col>
                </el-row>
                <el-form-item>
                  <el-button @click="workerSearch()">查询</el-button>
                  <el-button @click="resetForm('workerForm')">清空</el-button>
                </el-form-item>
              </el-form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from 'common/js/Bus.js'

// 获取老人居住地址
import { getElderlyAddress } from "network/query";
// 获取老人位置信息
import { queryElderlyByCondition } from "network/query";
// 获取护工位置信息
import { queryNursingWorkerByCondition } from "network/query";

export default {
  name: "searchingbox",
  data() {
    return {
      oldForm: {
        oldName: "",
        oldId: "",
        address: "",
        bloodPressureMin: "",
        bloodPressureMax: "",
        heartRateMin: "",
        heartRateMax: "",
      },
      workerForm: {
        workerName: "",
        workerId: "",
        address: "",
        amountMin: "",
        amountMax: "",
        evaluateMin: "",
        evaluateMax: "",
      },
      radio1: "老人",
      addressOptions: [],
      sendWorker: {
        "name":"",
        "nursingId":"",
        "orderNumberMin": "",
        "orderNumberMax": "",
        "evaluateMin": null,
        "evaluateMax": null
      },
      sendOld: {
        "name": "",
        "idCardNumber": "",
        "address": "",
        "heartRateMin": "",
        "heartRateMax": "",
        "bloodPressureMin": "",
        "bloodPressureMax": "",
      },
    };
  },
  mounted() {
    var that = this;
    that.getElderlyAddress()
  },
  methods: {
    // 隐藏个人信息模块
    showInfo(character) {
      var that = this;
      // console.log(character)
      bus.$emit("character", character)
      // 当发生角色 切换时，清空表格
      if (character == "老人") {
        that.workerForm.workerName = ""
        that.workerForm.workerId =  ""
        that.workerForm.address =  ""
        that.workerForm.amountMin = ""
        that.workerForm.amountMax = ""
        that.workerForm.evaluateMin = ""
        that.workerForm.evaluateMax = ""
        that.queryElderlyByCondition({
          "name": "",
          "idCardNumber": "",
          "address": "",
          "heartRateMin": "",
          "heartRateMax": "",
          "bloodPressureMin": "",
          "bloodPressureMax": "",
        })
      }else if (character == "护工") {
        that.oldForm.oldName =  ""
        that.oldForm.oldId = ""
        that.oldForm.address =  ""
        that.oldForm.bloodPressureMin = ""
        that.oldForm.bloodPressureMax = ""
        that.oldForm.heartRateMin =  ""
        that.oldForm.heartRateMax =  ""
        that.queryNursingWorkerByCondition({
          "name": "",
          "idCardNumber": "",
          "address": "",
          "heartRateMin": "",
          "heartRateMax": "",
          "bloodPressureMin": "",
          "bloodPressureMax": "",
        })
      }
      bus.$emit("showinfo",false)
    },
    oldSearch() {
      var that = this;
      if (that.oldForm.address) {
        that.sendOld.address = ""
        for (var i = 0; i < that.oldForm.address.length; i++) {
          that.sendOld.address += that.oldForm.address[i]
        }
      }
      that.sendOld.name = that.oldForm.oldName,
      that.sendOld.idCardNumber = that.oldForm.oldId,
      that.sendOld.heartRateMin = that.oldForm.bloodPressureMin,
      that.sendOld.heartRateMax = that.oldForm.bloodPressureMax,
      that.sendOld.bloodPressureMin = that.oldForm.heartRateMin,
      that.sendOld.bloodPressureMax = that.oldForm.heartRateMax,
      that.queryElderlyByCondition(that.sendOld)
      bus.$emit('oldSearch', true);
    },
    workerSearch() {
      var that = this;
      
      that.sendWorker.name = that.workerForm.workerName
      that.sendWorker.nursingId = that.workerForm.workerId
      that.sendWorker.orderNumberMin = that.workerForm.amountMin
      that.sendWorker.orderNumberMax = that.workerForm.orderNumberMax
      that.sendWorker.evaluateMin = that.workerForm.evaluateMin
      that.sendWorker.evaluateMax = that.workerForm.evaluateMax
      that.queryNursingWorkerByCondition(that.sendWorker)
      // console.log("查询护工", this.workerForm);
      bus.$emit('workerSearch', true);
    },
    // 老人居住地址切换
    handleChange(value) {
      // console.log("value", value)
      // console.log(value[0]+","+value[1]+","+value[2]);
    },
    // 获取老人居住地址
    getElderlyAddress() {
      var that = this;
      that.addressOptions = []
      getElderlyAddress().then(res => {
        if (res) {
          that.addressOptions = that.changeTree(res.data.result)
        }
      })
    },
    changeTree(val) {
      let arr = [];
      if (val.length !== 0) {
        val.forEach(item => {
          let obj = {};
          obj.value= item.name;
          obj.label = item.name;
          if (item.value) {
            if (item.value.length >= 1) {
              obj.children = this.changeTree(item.value);
            }
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    // 清空所填写的值
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取护工位置
    queryNursingWorkerByCondition(sendWorker) {
      var that = this;
      queryNursingWorkerByCondition(sendWorker).then(res => {
        if (res) {
          bus.$emit("queryworker", res.data.result)
        }
      })
    },
    // 获取老人位置
    queryElderlyByCondition(sendOld) {
      var that = this;
      queryElderlyByCondition(sendOld).then(res => {
        if (res) {
          bus.$emit("queryold", res.data.result)
        }
      })
    }
  },
};
</script>

<style>
@import "../public/css/searchingbox.css";
</style>