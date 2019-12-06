<template>
  <div style="margin: 20px">
    <div style="position:absolute;right:20px;top:20px;z-index:9">
      <el-input size="mini" v-model="pointName">
        <el-button type="primary" slot="append" @click="submitData" size="small">名单下载</el-button>
      </el-input>
    </div>
    <el-form ref="data">
      <el-form-item label="基本信息">
        <div>
          <el-row>
            <el-col :xs="24" :xl="12" :lg="18" :sm="24" :md="24" >
              <el-form-item label-width="120px" label="联系人(必填)">
                <el-select size="mini" v-model="thisPhone" placeholder="请选择">
                  <el-option :label="`${customer.name}_${customer.phone}`" :value="customer.phone"></el-option>
                  <el-option
                    v-for="item in userLinkOption"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>联系人作为安全责任人，其手机接收短信验证码</span>
              </el-form-item>
              <el-form-item label-width="120px" label="项目名称(必填)">
                <el-input size="mini" v-model="item1.name" show-word-limit maxlength="50" placeholder="50字以内"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="源参数">
        <div class="onLine">
          <el-form :model="item1" ref="item1" :rules="itemRules1">
          <el-row>
            <el-col :xs="24" :xl="8" :lg="8" :sm="18" :md="24">
              <el-form-item label-width="120px" label="源确球">
                <el-select size="mini" v-model="item1.yqq" placeholder="请选择">
                  <el-option label="CGCS2000" value="CGCS2000"></el-option>
                  <el-option label="北京54" value="北京54"></el-option>
                  <el-option label="西安80" value="西安80"></el-option>
                  <el-option label="WGS84" value="WGS84"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="源坐标系">
                <el-select size="mini" @change="select1" v-model="item1.zb" placeholder="请选择">
                  <el-option label="BLH" value="BLH" ></el-option>
                  <el-option label="XYZ" value="XYZ"></el-option>
                  <el-option label="xyh" value="xyh"></el-option>
                </el-select>
                <el-select size="mini" v-if="item1.zb == 'BLH'" v-model="item1.dd" placeholder="请选择">
                  <el-option label="DD.MMSS" value="DD.MMSS"></el-option>
                  <el-option label="DD.DDDD" value="DD.DDDD"></el-option>
                  <el-option label="DD°MM′SS″" value="DD°MM′SS″"></el-option>
                  <el-option label="DD:MM:SS" value="DD:MM:SS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="原高程">
                <el-select size="mini" v-model="item1.mb" placeholder="请选择">
                  <el-option label="85国家高程" value="85国家高程"></el-option>
                  <el-option label="56黄海高程" value="56黄海高程"></el-option>
                  <el-option label="大地高" value="大地高"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :xl="12" :lg="12" :sm="18" :md="24">
              <el-form-item v-if="item1.zb == 'xyh'" label-width="120px">
                <el-select size="mini" v-model="item1.zyzw" placeholder="请选择">
                  <el-option label="高斯3度带" value="高斯3度带"></el-option>
                  <el-option label="高斯6度带" value="高斯6度带"></el-option>
                  <el-option label="高斯自定义" value="高斯自定义"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'" label-width="120px" label="中央子午线">
                <el-row>
                  <el-col :xs="8" :xl="6" :lg="6" :sm="6" :md="6">
                    <el-form-item prop="zw1">
                      <el-input ref="zw1" size="mini"  v-model.number="item1.zw1">
                        <el-button slot="append" style="font-size:20px;padding:0px;">°</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :xl="6" :lg="6" :sm="6" :md="6">
                    <el-form-item prop="zw2">
                    <el-input ref="zw2" size="mini" v-model.number="item1.zw2">
                      <el-button slot="append" style="font-size:20px;padding:0px;">′</el-button>
                    </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :xl="6" :lg="6" :sm="6" :md="6">
                    <el-form-item prop="zw3">
                    <el-input ref="zw3" size="mini" v-model="item1.zw3">
                      <el-button slot="append" style="font-size:20px;padding:0px;">″</el-button>
                    </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="x" v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'" label-width="120px" label="x常数(km)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="x" size="mini" v-model.number="item1.x" ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="y" v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'" label-width="120px" label="y常数(km)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="y" size="mini" v-model.number="item1.y"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="t" v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'" label-width="120px" label="投影面高(m)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="t" size="mini" v-model.number="item1.t"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
        </div>
      </el-form-item>

      <el-form-item label="目标参数">
        <div class="onLine">
          <el-form :model="item2" ref="item2" :rules="itemRules1">
          <el-row>
            <el-col :xs="24" :xl="8" :lg="8" :sm="18" :md="24">
              <el-form-item label-width="120px" label="目标确球">
                <el-select size="mini" v-model="item2.yqq" placeholder="请选择">
                  <el-option label="CGCS2000" value="CGCS2000"></el-option>
                  <el-option label="北京54" value="北京54"></el-option>
                  <el-option label="西安80" value="西安80"></el-option>
                  <el-option label="WGS84" value="WGS84"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="目标坐标系">
                <el-select size="mini" @change="select2" v-model="item2.zb" placeholder="请选择">
                  <el-option label="BLH" value="BLH"></el-option>
                  <el-option label="XYZ" value="XYZ"></el-option>
                  <el-option label="xyh" value="xyh"></el-option>
                </el-select>
                <el-select size="mini" v-if="item2.zb == 'BLH'" v-model="item2.dd" placeholder="请选择">
                  <el-option label="DD.MMSS" value="DD.MMSS"></el-option>
                  <el-option label="DD.DDDD" value="DD.DDDD"></el-option>
                  <el-option label="DD°MM′SS″" value="DD°MM′SS″"></el-option>
                  <el-option label="DD:MM:SS" value="DD:MM:SS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="目标高程">
                <el-select size="mini" v-model="item2.mb" placeholder="请选择">
                  <el-option label="85国家高程" value="85国家高程"></el-option>
                  <el-option label="56黄海高程" value="56黄海高程"></el-option>
                  <el-option label="大地高" value="大地高"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :xl="12" :lg="12" :sm="18" :md="24">
              <el-form-item label-width="120px" v-if="item2.zb == 'xyh'">
                <el-select size="mini" v-model="item2.zyzw" placeholder="请选择">
                  <el-option label="高斯3度带" value="高斯3度带"></el-option>
                  <el-option label="高斯6度带" value="高斯6度带"></el-option>
                  <el-option label="高斯自定义" value="高斯自定义"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'" label-width="120px" label="中央子午线">
                <el-row>
                  <el-col :xs="8" :xl="6" :lg="6" :sm="8" :md="6">
                    <el-form-item prop="zw1">
                    <el-input size="mini" v-model.number="item2.zw1">
                      <el-button ref="zw1" slot="append" style="font-size:20px;padding:0px;">°</el-button>
                    </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :xl="6" :lg="6" :sm="8" :md="6">
                    <el-form-item prop="zw2">
                    <el-input size="mini" v-model.number="item2.zw2">
                      <el-button slot="append" style="font-size:20px;padding:0">′</el-button>
                    </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :xl="6" :lg="6" :sm="8" :md="6">
                    <el-form-item prop="zw3">
                    <el-input size="mini" v-model="item2.zw3">
                      <el-button slot="append" style="font-size:20px;padding:0">″</el-button>
                    </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="x" v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'" label-width="120px" label="x常数(km)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="x" size="mini" v-model.number="item2.x"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="y" v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'" label-width="120px" label="y常数(km)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="y" size="mini" v-model.number="item2.y"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              
              <el-form-item prop="t" v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'" label-width="120px" label="投影面高(m)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="t" size="mini" v-model.number="item2.t"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
        </div>
      </el-form-item>
      <el-form-item label="数据上传">
        <div>
          <el-row>
            <el-col :xs="24" :xl="18" :lg="18" :sm="18" :md="24">
                <el-form-item label-width="80px">
                  
                  <el-switch
                    v-model="fileUpload"
                    @change="point.number=0"
                    active-text="上传文件"
                    inactive-text="文本框输入">
                  </el-switch>
                  
                </el-form-item>
                <el-form-item label="文件格式" label-width="100px">
                  <span v-text="name" ></span>
                </el-form-item>
                <el-form-item v-if="fileUpload" label="上传文件" label-width="120px">
                  <el-upload
                  
                    class="upload-demo"
                    :action="uploadUrl"
                    :on-success="success"
                    :data="{item1: JSON.stringify(item1), item2: JSON.stringify(item2)}"
                    :headers="importHeaders"
                    :show-file-list="false">
                    <el-button size="mini">上传文件</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item v-if="fileUpload" label="待转换文件" label-width="120px">
                  <span v-text="filePath"></span>
                </el-form-item>
                <el-form-item v-if="!fileUpload" label="坐标转换内容">
                  <el-row>
                  <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
                  <el-input placeholder="请按照txt的格式来写" v-model="text" size="mini" :autosize="{ minRows: 2}" type="textarea" :rows="3"></el-input>
                  <el-button size="mini" @click="uploadText">上传文本</el-button>
                  </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="手机号" label-width="120px">
                  <span v-text="thisPhone"></span>
                </el-form-item>
                <el-form-item label="结算方式" label-width="120px">
                  <el-switch
                    v-model="flag"
                    active-text="按时间计费"
                    inactive-text="按点按次计费">
                  </el-switch>
                </el-form-item>
                <el-form-item label-width="120px">
                  <span v-if="point.number != null && !flag"> 价格预览 {{point.number}}个点,{{price}} 元</span>
                </el-form-item>
                <el-row>
                  <el-col :xs="24" :xl="8" :lg="8" :sm="18" :md="8">
                    <el-form-item label="短信验证" label-width="120px">
                      <el-input v-model="checkcode" size="mini">
                        <el-button slot="append" size="mini" @click="getCode">{{content}}</el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label-width="120px">
                  <el-button type="primary" @click="commit" size="mini">开始转换坐标</el-button>
                </el-form-item>
            </el-col>
          </el-row>
          
        </div>
      </el-form-item>
      <el-form-item label="数据下载">
        <div>
          <el-row>
            <el-col :xs="24" :xl="18" :sm="18" :md="24">
              <el-form-item label="写入数据" label-width="120px">
                <span style="color:red" v-text="textError"></span>
              </el-form-item>
              <el-form-item label="转换处理" label-width="120px">
                <span v-text="res"></span>
              </el-form-item>
              <el-form-item label-width="120px">
                <a v-if="downloadPath != null" :href="`${baseUrl}/file/upload/download?filePath=${downloadPath}`">
                  <el-button type="primary" size="mini">查询结果</el-button>
                </a>
                <el-button v-else type="primary" size="mini">查询结果</el-button>
              </el-form-item>
              </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
.onLine {
  .el-input-group__append {
    padding: 0;
  }
}

</style>

<script>
import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export default {
  data() {
    var isnumber = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
            var reg = /^-?\d{1,16}(?:\.\d{1,4})?$/;//小数点左边最高16位，小数点右边最多4位
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error("输入正确的数字,小数点后可1到4位"));
            }
        }
    };
    var isNumber = (rule, value, callback) => {
        if (!value) {
            callback();
        } else {
            var reg = /^\d{1,16}(?:\.\d{1,4})?$/;//小数点左边最高16位，小数点右边最多4位
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error("请输入正整数,小数点后可1到4位"));
            }
        }
    };
    return {
      customer: {
        name: "admin",
        phone: "123456"
      },
      point: {
        number: null
      },
      itemRules1: {
        name: [{ required: true, trigger: 'blur', message: '不能为空' }],
        zw1: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '只能是数字'}],
        zw2: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '只能是数字'}],
        zw3: [{ required: true, trigger: 'blur', validator: isNumber }],
        x: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '只能是数字'}],
        y: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '只能是数字'}],
        t: [{ required: true, trigger: 'blur', validator: isnumber }]
      },
      config:{},//系统的配置
      discountList: [], //折扣配置
      flag: true,
      uploadUrl: `${process.env.VUE_APP_BASE_API}/file/upload/changeFile`,
      importHeaders: {
        'X-Token': getToken()
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      fileUpload: true,//文件上传与文本上传切换
      checkcode: '',//验证码
      thisPhone: '',//当前选择的手机号
      text: '',//文本内容
      name: "",
      filePath: "",
      userLinkOption: [],//联系人选项
      userLink: {
        phone: null
      },
      canClick: true,
      content: "获取验证码",
      codeTime: 60,
      item1: { //源对象
        name: "",
        yqq: 'CGCS2000',
        zb: 'BLH',
        dd: 'DD.MMSS',
        mb: '大地高',
        zyzw: '高斯自定义',
        zw1: 114,
        zw2: 0,
        zw3: 0,
        y: 500,
        x: 0,
        t: 0.0
      },
      filePath: null,
      item2: {//目标对象
        yqq: 'CGCS2000',
        zb: 'xyh',
        dd: 'DD.MMSS',
        mb: '85国家高程',
        zyzw: '高斯自定义',
        zw1: 114,
        zw2: 0,
        zw3: 0,
        y: 500,
        x: 0,
        t: 0.0
      },
      pointName: "",
      textError: "",
      map: {
        status: 1 //审核通过的联系人
      },
      message: "",
      res: "",
      downloadPath: null //处理完成后的文件路径
    }
  },
  watch:{
    item1: {
      deep: true,
      handler(newV){
        switch(this.item1.zb){
        case 'xyh': this.name = '点名,x,y,h.txt / 点名,,y,x,h.dat';break;
        case 'XYZ': this.name = '点名,X,Y,Z.txt';break;
        case 'BLH': this.name = `点名,B(${this.item1.dd}),L(${this.item1.dd}),H,未修正的天线高.txt`;break;
        }
      }
    },
    text(newText){
      let points = newText.split("\n") 
      this.point.number = points.length
    },
    thisPhone(newV){
      this.userLink.phone = newV
    }
  },
  computed: {
    price(){
      for(let discount of this.discountList){
        console.log(discount);
        
        if(this.point.number >= discount.number){
          if (discount.price == null) {
            return this.point.number * this.config.price * discount.discount;
          }else {
            return discount.price;
          }
          
        } 
      }
      
    }
  },
  created() {
    this.fetchData()
    this.getUserLink()
  },
  methods: {
    fetchData() {
      switch(this.item1.zb){
        case 'xyh': this.name = '点名,x,y,h.txt / 点名,,y,x,h.dat';break;
        case 'XYZ': this.name = '点名,X,Y,Z.txt';break;
        case 'BLH': this.name = `点名,B(${this.item1.dd}),L(${this.item1.dd}),H,未修正的天线高.txt`;break;
      }
      //获取系统设置
      request({
        url: "/data/config",
        method: "get"
      }).then(res => {
        if (res.flag) {
          this.config = res.data
        }
      })
      //获取折扣配置
      request({
        url: "/discount",
        method: "get"
      }).then(data => {
        this.discountList = data.data;
      })
      request({
        url: "/user/one",
        method: "get"
      }).then(res => {
        if (res.flag) {
          this.customer = res.data
        }
      })
    },
    //获取验证码
    getCode(){
      if (!this.canClick) return;
      if (this.thisPhone=="" || this.thisPhone== null) {
        this.$message({
          type: "warning",
          message: "请选择联系人"
        })
        return;
      }
      if (this.point.number == null && this.flag) {
        this.$message({
          type: "warning",
          message: "请上传待转换的文件"
        })
        return;
      } else if (!this.flag && this.point.number == null) {
        this.$message({
          type: "warning",
          message: "请填写坐标内容"
        })
        return;
      }
      request({
        url: "/changeFileRecord/fileCode",
        method: "get",
        params: {
          phone: this.thisPhone
        }
      }).then(data => {
        this.$message({
          type: "success",
          message: data.message
        })
      })
      this.canClick = false
      this.content = this.codeTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.codeTime --
        this.content = this.codeTime + 's后重新发送'
        if (this.codeTime < 0) {     //当倒计时小于0时清除定时器
        window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.codeTime = 60
          this.canClick = true
        }
      },1000);
    },
    select1(value){
      if (value == 'xyh') {
        this.item1.mb = '85国家高程'
      }else if (value == 'BLH'){
        this.item1.mb = '大地高'
      }
    },
    select2(value){
      if (value == 'xyh') {
        this.item2.mb = '85国家高程'
      }else if (value == 'BLH'){
        this.item2.mb = '大地高'
      }
    },
    getUserLink(){
      request({
        url: "/userLink/all",
        method: "post",
        data: this.map
      }).then(data => {
        let userLink = data.data;
        userLink.map(link => {
          link.label = link.name +"_" + link.phone
          link.value = link.phone
        })
        this.userLinkOption = userLink
      })
    },
    //文件上传成功的回调函数
    success(res,file, fileList){
      if (res.flag) {
        this.point.number = res.data.size;
        this.filePath = res.data.filePath;
        this.textError = "数据上传成功！"
        if (res.data.isKD) {
          this.textError += " 三度带 "+ res.data.三度带
          this.textError += ",六度带 " + res.data.六度带
        }else {
          this.$message({
            type: "success",
            message: res.message
          })
        }
        
      }else{
        this.textError = res.message
        this.filePath = res.message
        this.$message({
          type: "error",
          message: res.message
        })
      }
    },
    //上传文本内容
    uploadText(){
      // this.commit(this.text)
    },
    //提交表单
    commit(){
      if (!/^\S/.test(this.item1.name) ) {
        this.$message({
          type: "error",
          message: "项目名不能为空"
        })
        return
      }
      this.downloadPath = null
      let item1 = this.item(this.item1)
      let item2 = this.item(this.item2)
      
      item1.filePath = this.filePath
      item1.code = this.checkcode
      if (!this.fileUpload) {
        item1.text = this.text
      }
      this.res = "正在转换中"
      request({
        url: "/changeFileRecord",
        method: "post",
        data: {
          item1: item1,
          item2: item2
        }
      }).then(res => {
        this.$message({
          type: "success",
          message: res.message
        })
        if (res.flag) {
          this.downloadPath = res.data.url
          this.res = res.message
        }else {
          this.textError = res.message
        }
      }).catch(err => {
        this.textError = err
      })
      
    },
    item(item){
      //深拷贝
      let item1 = JSON.parse(JSON.stringify(item))
      //选择规则
      if (item.zb != 'BLH') {
        delete item1.dd
      }
      if (item.zb != 'xyh') {
        delete item1.zw1
        delete item1.zw2
        delete item1.zw3
        delete item1.x
        delete item1.y
        delete item1.t
        delete item1.zyzw
      }
      return item1
    },
    submitData(){
      let item1 = this.item(this.item1)
      let item2 = this.item(this.item2)

      item1.name = this.pointName
      request({
        url: "/data/point",
        method: "post",
        data: {
          item1: item1,
          item2: item2
        },
        responseType: 'blob'
      }).then(data => {
        const content = data
        const blob = new Blob([content])
        const fileName = '名单.txt'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
  }
}
</script>
