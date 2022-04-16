<template>
  <div id="searchResult">
    <!-- 老人查询结果 -->
    <div id="oldBox" v-show="show">
      <div class="resultbox" style="width: 40%">
        <div class="boxtitle">
          <h3>基本信息</h3>
        </div>
        <div class="boxcontent">
          <img
            :src="image" 
            alt="老人头像" 
            style="width: 25%; float: left; margin-left: 5px; margin-top: 10%"
          />
          <!-- :inline="true" -->
          <div class="darkDialog" style="float: right; margin-right: 13px">
            <el-form ref="form" :model="form" size="mini" label-width="80px">
              <el-form-item label="姓名" label-width="40px" class="formInline">
                <el-input
                  v-model="form.name"
                  style="width: 80px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" label-width="40px" class="formInline">
                <el-input
                  v-model="form.sex"
                  style="width: 50px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄" label-width="40px" class="formInline">
                <el-input
                  v-model="form.age"
                  style="width: 50px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份号码">
                <el-input
                  v-model="form.id"
                  style="width: 250px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="家庭住址">
                <el-input
                  v-model="form.address"
                  style="width: 250px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input
                  v-model="form.contact"
                  style="width: 250px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="resultbox">
        <div class="boxtitle">
          <h3>身体健康数据</h3>
        </div>
        <div class="boxcontent">
          <oldhealthy />
        </div>
      </div>
      <div class="resultbox">
        <div class="boxtitle">
          <h3>家庭消费情况</h3>
        </div>
        <div class="boxcontent">
          <oldconsume />
        </div>
      </div>
    </div>

    <!-- 护工查询结果 -->
    <div id="workerBox" v-show="!show">
      <div class="resultbox" style="width: 40%">
        <div class="boxtitle">
          <h3>基本信息</h3>
        </div>
        <div class="boxcontent">
          <img
            :src="'http://'+ image" 
            alt="护工头像" 
            style="width: 25%; float: left; margin-left: 5px; margin-top: 10%"
          />
          <!-- :inline="true" -->
          <div class="darkDialog" style="float: right; margin-right: 13px">
            <el-form
              ref="workerform"
              :model="form"
              size="mini"
              label-width="80px"
            >
              <el-form-item label="姓名" label-width="40px" class="formInline">
                <el-input
                  v-model="workerform.name"
                  style="width: 80px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" label-width="40px" class="formInline">
                <el-input
                  v-model="workerform.sex"
                  style="width: 50px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄" label-width="40px" class="formInline">
                <el-input
                  v-model="workerform.age"
                  style="width: 50px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份号码">
                <el-input
                  v-model="workerform.id"
                  style="width: 250px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="护工号">
                <el-input
                  v-model="workerform.workerid"
                  style="width: 250px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input
                  v-model="workerform.contact"
                  style="width: 250px"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="resultbox">
        <div class="boxtitle">
          <h3>护工能力</h3>
        </div>
        <div class="boxcontent">
          <workerenvalu />
        </div>
      </div>
      <div class="resultbox">
        <div class="boxtitle">
          <h3>历史接单</h3>
        </div>
        <div class="boxcontent">
          <div class="darkTable">
            <el-table
              :data="OrderDataLine"
              style="width: 360px"
              height="190"
            >
              <el-table-column
                prop="id"
                label="序号"
                align="center"
                width="50"
              >
              </el-table-column>
              <el-table-column
                prop="order"
                label="订单编号"
                align="center"
                width="110"
              >
              </el-table-column>
              <el-table-column
                prop="type"
                label="服务类型"
                align="center"
                width="100%"
              >
              </el-table-column>
              <el-table-column
                prop="satisfaction"
                label="满意度"
                align="center"
                width="100%"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from 'common/js/Bus.js'
import Oldhealthy from './components/Oldhealthy'
import Oldconsume from './components/Oldconsume'
import Workerenvalu from './components/Workerenvalu'

// 获取老人个人具体信息
import { getElderlyInformationByUserid } from "network/query";
// 获取护工个人具体信息
import { getNursingWorkerInformationByNursingId } from "network/query";

export default {
  name: "searchingbox",
  components: { 
    Oldhealthy,
    Oldconsume,
    Workerenvalu
  },
  data() {
    return {
      show: true,
      form: {
        name: "",
        sex: "",
        age: "",
        id: "",
        address: "",
        contact: "",
      },
      image: '',
      workerform: {
        name: "",
        sex: "",
        age: "",
        id: "",
        workerid: "",
        contact: "",
      },
      OrderDataLine: [],
    };
  },
  mounted() {
    var that=this;
    // 根据选择角色显示下方具体用户信息
    bus.$on("character", function(value) {
      if (value == "老人") {
        that.show = true;
      }else if (value == "护工") {
        that.show = false;
      }
    })
    bus.$on("id", function(value) {
      if (value[1] == "老人") {
        that.getElderlyInformationByUserid(value[0])
      }else if (value[1] == "护工") {
        that.getNursingWorkerInformationByNursingId(value[0])
      }
    })
    // 清空老人个人信息
    bus.$on('oldSearch', function(params) {
      that.image = ""
      that.form.name = ""
      that.form.sex = ""
      that.form.age = ""
      that.form.id = ""
      that.form.address = ""
      that.form.contact = ""
    });
    bus.$on("queryold", function(params) {
      that.image = ""
      that.form.name = ""
      that.form.sex = ""
      that.form.age = ""
      that.form.id = ""
      that.form.address = ""
      that.form.contact = ""
    })
    // 清空护工个人信息
    bus.$on("queryworker", function(params) {
      that.image = "";
      that.workerform.name = "";
      that.workerform.sex = "";
      that.workerform.age = "";
      that.workerform.id = "";
      that.workerform.workerid = "";
      that.workerform.contact = "";
    })
    bus.$on('workerSearch', function(value) {
      that.image = "";
      that.workerform.name = "";
      that.workerform.sex = "";
      that.workerform.age = "";
      that.workerform.id = "";
      that.workerform.workerid = "";
      that.workerform.contact = "";
    })
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getNursingWorkerInformationByNursingId(id) {
      getNursingWorkerInformationByNursingId({"nursingId": id}).then(res => {
        // console.log(res)
        var that = this;
        if (res) {
          that.image = res.data.result[0].headPortrait
          that.workerform.name = res.data.result[0].nursingName
          that.workerform.sex = res.data.result[0].gender
          that.workerform.age = res.data.result[0].age
          that.workerform.id = res.data.result[0].idCardNumber
          that.workerform.workerid = res.data.result[0].nursingId
          that.workerform.contact = res.data.result[0].phoneNumber
          that.OrderDataLine = []
          var i = 1
          for (var i = 0; i < res.data.result[0].orderInformation.length; i++) {
            that.OrderDataLine.push({"id": i+1,
              "order": res.data.result[0].orderInformation[i].orderId, "type": res.data.result[0].orderInformation[i].serviceName,
              "satisfaction": res.data.result[0].orderInformation[i].evaluate})
            }
        }
      })
    },
    getElderlyInformationByUserid(id) {
      getElderlyInformationByUserid({"userid": id}).then(res => {
        var that = this;
        if (res) {
          that.image = res.data.result[0].headPortrait
          that.form.name = res.data.result[0].name
          that.form.sex = res.data.result[0].gender
          that.form.age = res.data.result[0].age
          that.form.id = res.data.result[0].idCardNumber
          that.form.address = res.data.result[0].address
          that.form.contact = res.data.result[0].phoneNumber
        }
      })
    }
  },
};
</script>

<style>
#searchResult {
  position: absolute;
  bottom: 0%;
  /* left: 0%; */
  right: 0%;
  height: 43%;
  width: 79.8%;
  background-color: #05305c;
  z-index: 10;
}
.resultbox {
  /* display: flex; */
  float: left;
  width: 30%;
  /* justify-content: space-between;
  align-content: space-between; */
}
.boxtitle {
  position: relative;
  float: left;
  width: 100%;
  height: 22.33%;
}
.boxtitle:before {
  content: "";
  position: absolute;
  top: 20%;
  bottom: -10.4%;
  width: 230px;
  height: 19px;
  background: url(~common/img/title_con.png) no-repeat;
  background-size: 100% 100%;
}
.boxtitle h3 {
  padding-left: 115px;
  margin-top: 2px;
  font-size: 0.5em;
}
.boxcontent {
  margin-top: 8%;
}
.formInline {
  float: left;
  padding-left: 10px;
}
</style>