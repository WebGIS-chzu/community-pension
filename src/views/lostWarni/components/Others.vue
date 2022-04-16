<template>
  <div id="others">
    <!-- 地图上方 -->
    <h3 class="clearfix threebox">
      <dl class="fl">
        <dt>走失人数</dt>
        <animate-number
          from="0"
          :to="this.lostNumber"
          id="pc-data"
          class="unit-video"
          :key="this.lostNumber"
        />
      </dl>
      <dl class="fl">
        <dt>监控数量</dt>
        <animate-number
          from="0"
          :to="this.monitorQuantity"
          id="pc-data"
          class="unit-video"
          :key="this.monitorQuantity"
        />
      </dl>
      <dl class="fl">
        <dt>社区人员</dt>
        <animate-number
          from="0"
          :to="this.CommunityPersonnel"
          id="pc-data"
          class="unit-video"
          :key="this.CommunityPersonnel"
        />
      </dl>
      <dl class="fl">
        <dt>警察人数</dt>
        <animate-number
          from="0"
          :to="this.policeNumber"
          id="pc-data"
          class="unit-video"
          :key="this.policeNumber"
        />
      </dl>
    </h3>
    <!-- 左上角 -->
    <div class="lossbox">
      <div style="background: rgba(11, 23, 63, 0.3); width:100%; height: 100%">
        <div class="content">
          <!-- 头像 -->
          <img class="liImgLeft" :src="lostOld.head_portrait"/>
          <div class="boxText">
            <p>姓名：</p>
            <p>性别：</p>
            <p>年龄：</p>
          </div>
          <div class="boxText">
            <p>{{ lostOld.name }}</p>
            <p>{{ lostOld.gender }}</p>
            <p>{{ lostOld.age }}</p>
          </div>
        </div>
        <div class="boxText bottomText">
          <p>用户ID：{{ lostOld.userid }}</p>
          <p>走失时间：{{ lostOld.lostDate }}</p>
          <p>居住地址：{{ lostOld.address }}</p>
        </div>
        <div class="relationship">
          <relationship />
        </div>
      </div>
    </div>
    <!-- 右上角 -->
    <div class="policebox">
      <div class="content">
        <!-- 头像 -->
        <img class="liImgLeft" src="~common/img/police.png" />
        <div class="boxText">
          <p>姓名：</p>
          <p>值班处：</p>
          <p>联系方式：</p>
        </div>
        <div class="boxText">
          <p>江峰</p>
          <p>清荷社区警务室</p>
          <p>18855061603</p>
        </div>
      </div>
      <el-button class="callbtn" type="primary" plain>一键呼叫</el-button>
    </div>
    <!-- 下方 -->
    <div class="darkDialog darkTable lost-person">
      <el-table 
        :data="lostData" 
        height="250"
        :row-class-name="tableRowClassName">
        <el-table-column
          prop="name"
          label="姓名"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="50px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="50px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="homeAddress"
          label="走失地址"
          width="160px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lostTime"
          label="走失时间"
          width="130px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="查看走失轨迹"
          width="110px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="btnMissing(scope)" class="missing">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="emergencyContact"
          label="紧急联系人"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="find"
          label="是否已找回"
          width="110px"
          align="center"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.find"
              placeholder="请选择"
              @change="Changefindoption(scope)"
            >
              <el-option
                v-for="item in findoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    <!-- </el-dialog> -->
    </div>
    <!-- 内置：已找到选项弹框 -->
    <el-dialog
      title="老人已找回信息"
      :modal-append-to-body="false"
      :visible.sync="InnerFindDialogVisible"
      width="35%"
      center
      class="darkDialog"
    >
      <el-form :inline="true" :model="InnerFindForm" style="margin-left: 2%">
        <el-form-item label="姓名">
          <el-input
            v-model="InnerFindForm.name"
            style="width: 180px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="InnerFindForm.age"
            style="width: 180px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="找回时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="InnerFindForm.date"
                style="width: 185px"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">.</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-time-picker
                placeholder="选择时间"
                v-model="InnerFindForm.time"
                style="width: 185px"
                format="HH:mm"
                value-format="HH:mm"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="找回地点">
          <el-input v-model="InnerFindForm.address" class="address"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" center>
        <el-button @click="InnerFindDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Retrieved"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 内置：未找到选项弹框 -->
    <el-dialog
      title="老人未找回信息"
      :modal-append-to-body="false"
      :visible.sync="InnerNotFindDialogVisible"
      width="35%"
      center
      class="darkDialog"
    >
      <el-form :inline="true" :model="InnerNotFindForm" style="margin-left: 2%">
        <el-form-item label="姓名">
          <el-input
            v-model="InnerNotFindForm.name"
            style="width: 180px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input
            v-model="InnerNotFindForm.age"
            style="width: 180px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="寻找时间">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="InnerNotFindForm.date"
                value-format="yyyy-MM-dd"
                style="width: 185px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">.</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-time-picker
                placeholder="选择时间"
                v-model="InnerNotFindForm.time"
                style="width: 185px"
                format="HH:mm"
                value-format="HH:mm"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="寻找地点">
          <el-input v-model="InnerNotFindForm.address" class="address"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" center>
        <el-button @click="InnerNotFindDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="NotRetrieved"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 视频 -->
    <videos />

    <!-- 右下角 -->
    <!-- <div class="main clearfix">
      <div class="aside-left fr"> -->
        <div class="bottom1 left-bottom">
          <div class="bottom-in darkTable lossTable">
            <h3 style="padding: 20px 0px 0px 30px">走失老人寻找情况</h3>
            <el-table
              ref="filterTable"
              :data="tableData"
              height="250"
              style="margin-left: 3px"
            >
              <el-table-column
                width="100px"
                prop="date"
                label="时间"
                sortable
                column-key="date"
                :filters="[
                  { text: '2022-01', value: '2022-01' },
                  { text: '2022-02', value: '2022-02' },
                  { text: '2022-03', value: '2022-03' },
                  { text: '2022-04', value: '2022-04' },
                ]"
                :filter-method="filterHandler"
              >
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="70px">
              </el-table-column>
              <el-table-column
                prop="address"
                label="寻找地址"
                :formatter="formatter"
              >
              </el-table-column>
            </el-table>
          </div>
        <!-- </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import bus from "common/js/Bus.js";
import axios from 'axios'

import { getLostTypeInformation, getBelostUserInformation } from "network/lostwarning"
import { insertLostFindInformationByUserid, getLostFindInformation } from "network/lostwarning"
import Videos from "./Videos";
import Relationship from "./Relationship"

export default {
  name: "Others",
  // 引用vue reload方法
  inject: ['reload'],
  data() {
    return {
      // 地图上方
      lostNumber: 0,
      monitorQuantity: 0,
      CommunityPersonnel: 0,
      policeNumber: 0,

      // 走失老人登记
      dialogFormVisible: false,
      registerForm: {
        name: "",
        age: "",
        address: "",
        date: "",
        time: "",
        contactor: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入走失老人姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入走失老人年龄", trigger: "blur" },
          { min: 2, max: 3, message: "长度在 2 到 3 个字符", trigger: "blur" },
        ],
        address: [
          {
            required: true,
            message: "请选择走失老人居住地址",
            trigger: "change",
          },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择走失日期",
            trigger: "change",
          },
        ],
        time: [
          {
            type: "date",
            required: true,
            message: "请选择走失时间",
            trigger: "change",
          },
        ],
        contactor: [
          {
            required: true,
            message: "请填写用户ID",
            trigger: "blur",
          },
        ],
      },

      // 查看走失人数
      lostData: [],
      findoptions: [
        {
          value: "no",
          label: "否",
        },
        {
          value: "yes",
          label: "是",
        },
      ],
      // 内置已找到选项弹框
      InnerFindDialogVisible: false,
      InnerFindForm: {
        name: "",
        age: "",
        date: "",
        time: "",
        address: "",
      },
      InnerNotFindDialogVisible: false,
      InnerNotFindForm: {
        name: "",
        age: "",
        date: "",
        time: "",
        address: "",
      },
      lostOld: {
        "head_portrait": "",
        "name": "",
        "gender": "",
        "age": "",
        "userid": "",
        "lostDate": "",
        "address": "",
      },
      // 走失老人寻找情况
      tableData: [
        {
          date: "01-05 17:59",
          name: "王小虎",
          address: "已确认不在xxx地",
        },
        {
          date: "01-18 17:59",
          name: "王小虎",
          address: "已确认不在xxx地",
        },
        {
          date: "02-04 17:59",
          name: "王小虎",
          address: "已确认不在xxx地",
        },
        {
          date: "03-02 17:59",
          name: "王小虎",
          address: "已确认不在xxx地",
        },
        {
          date: "03-02 17:59",
          name: "王小虎",
          address: "已确认不在xxx地",
        },
        {
          date: "03-02 17:59",
          name: "王小虎",
          address: "已确认不在xxx地",
        },
      ],
      index: 0,
      lostInfos: [],
    };
  },
  components: {
    Videos,
    Relationship,
  },
  mounted() {
    var that = this;
    // 从后台获取上方标签数据
    that.getLostTypeInformation();
    that.getBelostUserInformation();
    this.getLostFindInformation();
  },
  methods: {
    // 从后台获取上方标签数据
    getLostTypeInformation() {
      var that = this;
      getLostTypeInformation().then(res => {
        // console.log("res", res)
        if(res) {
          that.lostNumber = parseInt(res.data.result[0].value)
          that.monitorQuantity = parseInt(res.data.result[1].value)
          that.CommunityPersonnel = parseInt(res.data.result[2].value)
          that.policeNumber = parseInt(res.data.result[3].value)
        }
      })
    },
    // 从后台获取走失人员信息
    getBelostUserInformation() {
      getBelostUserInformation().then(res => {
        var that = this;
        if(res) {
          that.lostInfos = res.data.result
          var dt = new Date();
          var y=dt.getFullYear();
          var mt=dt.getMonth()+1;
          var day=dt.getDate();
          var h=dt.getHours();//获取时
          var m=dt.getMinutes();//获取分
          var t = y+"/"+mt+"/"+day+" "+h+":"+m;

          var t1 = mt+"-"+day+" "+h+":"+m;
          that.lostOld.head_portrait = that.lostInfos[0].head_portrait
          that.lostOld.name = that.lostInfos[0].name
          that.lostOld.gender = that.lostInfos[0].gender
          that.lostOld.age = that.lostInfos[0].age
          that.lostOld.userid = that.lostInfos[0].userid
          that.lostOld.lostDate = t
          that.lostOld.address = that.lostInfos[0].address

          that.lostData = []
          for (var i = 0; i < that.lostInfos.length; i++){
            that.lostData.push({"name": that.lostInfos[i].name, "sex": that.lostInfos[i].gender,
              "age": that.lostInfos[i].age, "homeAddress": that.lostInfos[i].address, 
              "lostTime": t, "emergencyContact": that.lostInfos[i].emergency_contact,
              fin: ""})
          }
          // console.log("that.lostData", that.lostData)
        }
      })
    },
    // 表格点击后高亮显示
    tableRowClassName({row, rowIndex}) {
      if (this.index == rowIndex) {
        return 'highrow'
      }else {
        return 'normalrow'
      }
    },
    // 向地图发送走失路径
    async btnMissing(params) {
      this.index = params.$index
      // var road = [118.7879991531372,32.04960695092777]
      var path = [require("../public/img/市场.mp4"), 
        require("../public/img/小区.mp4"), require("../public/img/小区3.mp4")]
        var road = {}
      if (this.lostInfos[params.$index].roadLocation) {   // 判断点坐标是否存在，数据不完全，之后可以删除这个判断条件
        await axios.get('http://' + this.lostInfos[params.$index].roadLocation).then(res => {
          road = res.data
        })
      }
      // console.log("road", road)
      var list = [road, path, params.row]
      bus.$emit("info", params.row)
      bus.$emit("lostlist", list);
    },
    // 获取未找到老人列表
    getLostFindInformation() {
      getLostFindInformation().then(res => {
        var that = this
        that.tableData = []
        if (res) {
          for (var i = 0; i < res.data.result.length; i++) {
            var date = res.data.result[i].date.slice(5, 16)
            // console.log("date", date)
            var address = ""
            if (res.data.result[i].lostState == "是") {
              address = '在' + res.data.result[i].find_location + '找回'
            }else if (res.data.result[i].lostState == "否") {
              address = '不在' + res.data.result[i].find_location
            }
            that.tableData.push({"date": date, "name": res.data.result[i].name, 
              "address": address})
          }
        }
      })
    },
    // 找回老人后的处理
    Retrieved() {
      this.InnerFindDialogVisible = false
      var row = this.index
      var findInfo = {
        "userid": this.lostInfos[row].userid,
        "name": this.lostInfos[row].name,
        "age": this.lostInfos[row].age,
        "date": this.InnerFindForm.date+ " "+ this.InnerFindForm.time,
        "lostState": "是",
        "find_location": this.InnerFindForm.address
      }
      insertLostFindInformationByUserid(findInfo).then(res => {
        var that = this
        if(res) {
          console.log("删除老人数据")
          //在方法中调用
          that.reload()
        }
      })
    },
    // 没有找回老人后的处理
    NotRetrieved() {
      this.InnerNotFindDialogVisible = false
      var row = this.index
      var findInfo = {
        "userid": this.lostInfos[row].userid,
        "name": this.lostInfos[row].name,
        "age": this.lostInfos[row].age,
        "date": this.InnerNotFindForm.date+ " "+ this.InnerNotFindForm.time,
        "lostState": "否",
        "find_location": this.InnerNotFindForm.address
      }
      insertLostFindInformationByUserid(findInfo).then(res => {
        var that = this
        if(res) {
          console.log("加载老人数据")
          //在方法中调用
          that.reload()
        }
      })
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterHandler(value, row, column) {
      const property = row.date.substr(0, 2);
      return property === value.substr(5, 2);
    },
    // 走失老人登记
    // 居住地址
    handleChange(value) {
      // console.log(value);
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("登记成功!");
          // console.log(this.registerForm);
          this.dialogFormVisible = false;
        } else {
          alert("登记失败!");
          // console.log(this.registerForm);
          return false;
        }
      });
    },
    // 取消
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },

    // 查看走失人数
    Changefindoption(scope) {
      // 选项为“是”
      this.index = scope.$index
      if (scope.row.find == "yes") {
        this.InnerFindDialogVisible = true;
        this.InnerFindForm.name = scope.row.name;
        this.InnerFindForm.age = scope.row.age;
      }
      // 选项为“否”
      else {
        this.InnerNotFindDialogVisible = true;
        this.InnerNotFindForm.name = scope.row.name;
        this.InnerNotFindForm.age = scope.row.age;
      }
    }
  },
};
</script>

<style scoped>
@import "../public/css/others.css";
.lost-person {
  position: absolute;
  width: auto;
  height: 35%;
  bottom: 11%;
  left: 23%;
  border: #1a3f72 solid 2px;
  background: rgba(11, 23, 63, 0.3);
}
::v-deep .el-table .highrow {
  background-color: rgb(14, 252, 255, 0.5) !important;
}
::v-deep .el-table .normalrow {
  background: rgb(5, 49, 94, 0) !important;
}
.address {
  width: 380px;
}
/* .search-situation{
  position: absolute;
  bottom: 11%;
} */
</style>