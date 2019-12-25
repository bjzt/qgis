<template>
  <div style="margin: 20px">
    <el-form :inline="true">
      <h2>基本信息：</h2>
      <el-form-item  label="联系人">
        <el-select size="mini" v-model="oldItem.phone" placeholder="请选择">
          <el-option :label="`${customer.name}_${customer.phone}`" :value="customer.phone"></el-option>
          <el-option
            v-for="item in userLinkOption"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>联系人手机接收短信验证码</span>
      </el-form-item>
      <el-form-item label="项目名称(必填)">
        <el-input size="mini" v-model="oldItem.name" style="width: 200px" show-word-limit maxlength="50" placeholder="50字以内"></el-input>
      </el-form-item>
    </el-form>

      <el-form :inline="true">
        <el-form-item label-width="300px">
          <span style="font-size: 30px">相机参数：</span>
        </el-form-item>
        <el-form-item label="选择相机">
          <el-select v-model="camera" @change="cameraChange">
              <el-option label="自定义" :value="null"></el-option>
            <el-option 
            v-for="item in cameraList" 
            :label="item.name"
            :value="item.id"
            :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    <el-form size="mini" ref="cameraForm" :rules="aviationRules" :model="cameraItem">
      <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="width" label="影像宽度" :label-width="labelWidth">
              <el-input v-model.number="cameraItem.width">
                <template slot="append">pixels(像素)</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item prop="sensorWidth" label="传感器宽度" :label-width="labelWidth">
          <el-input v-model.number="cameraItem.sensorWidth">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item prop="pixel" label="像元尺寸" :label-width="labelWidth">
          <el-input v-model.number="cameraItem.pixel">
            <template slot="append">μm(微米)</template>
          </el-input>
        </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item prop="height" label="影像高度" :label-width="labelWidth">
          <el-input v-model.number="cameraItem.height">
            <template slot="append">pixels(像素)</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item prop="sensorHeight" label="传感器高度" :label-width="labelWidth">
          <el-input v-model.number="cameraItem.sensorHeight">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item prop="focalLength" label="镜头焦距" :label-width="labelWidth">
          <el-input v-model.number="cameraItem.focalLength">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <h2>输入参数：</h2>
    <el-form size="mini" :model="oldItem">
      <el-row>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="高处高程" :label-width="labelWidth">
            <el-input v-model.number="oldItem.maxHeight">
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="低处高程" :label-width="labelWidth">
            <el-input v-model.number="oldItem.minHeight">
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="测区平均高程" :label-width="labelWidth">
            <el-input v-model.number="oldItem.averageHeight">
              <template slot="append">m</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item :label-width="labelWidth" label="曝光时间">
            <el-input v-model.number="oldItem.time">
              <template slot="prepend">1/</template>
              <template slot="append">s</template> 
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="飞机类型" :label-width="labelWidth">
            <el-select v-model.number="oldItem.flexType" @change="typeChange">
              <el-option label="固定翼" :value="0"></el-option>
              <el-option label="多旋翼" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="oldItem.flexType == 0" :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="航线航向外扩" :label-width="labelWidth">
            <el-input value="2">
              <template slot="append">条基线</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="采集数据" :label-width="labelWidth">
            <el-select v-model="oldItem.dataType" @change="dataChange">
              <el-option label="正射影像" :value="0"></el-option>
              <el-option label="倾斜影像" :value="1"></el-option>
              <el-option label="Lidar激光雷达" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item v-if="oldItem.flexType == 1" label="建筑物类型" :label-width="labelWidth">
            <el-select v-model="oldItem.buildType" @change="buildChange">
              <el-option label="建筑物稀少" :value="0"></el-option>
              <el-option label="建筑物密集" :value="1"></el-option>
              <el-option label="高层建筑区" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item v-if="oldItem.flexType == 1" label="倾斜镜头角度" :label-width="labelWidth">
            <el-input v-model.number="oldItem.tiltAngle">
              <template slot="append">度</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item v-if="oldItem.flexType == 0"  label="地形类型" :label-width="labelWidth">
            <el-select v-model="oldItem.terrainType" @change="buildChange">
              <el-option label="平地" :value="0"></el-option>
              <el-option label="丘陵" :value="2"></el-option>
              <el-option label="山地" :value="1"></el-option>
              <el-option label="高山地" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="航向重叠" :label-width="labelWidth">
            <el-input v-model.number="oldItem.course">
              <template slot="append">%</template>
            </el-input>
            <el-slider :show-tooltip="false" v-model="value.courseValue"></el-slider>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="旁向重叠" :label-width="labelWidth">
            <el-input v-model.number="oldItem.sideDirection">
                <template slot="append">%</template>
            </el-input>
            <el-slider :show-tooltip="false" v-model="value.sideDirectionValue"></el-slider>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="地面分辨率" :label-width="labelWidth">
            <el-input v-model.number="oldItem.resolution">
              <template slot="append">cm</template>
            </el-input>
            <el-slider :show-tooltip="false" v-model="value.resolutionValue" :min="50" :max="10000"></el-slider>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
          <el-form-item label="飞行速度" :label-width="labelWidth">
            <el-input v-model.number="oldItem.speed">
              <template slot="append">m/s</template>
            </el-input>
            <el-slider :show-tooltip="false" v-model="value.speedValue"></el-slider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align:center">
        <el-button type="primary">根据范围计高程</el-button>
      </el-row>
    </el-form>
    <h2>计算参数：</h2>
    <el-form size="mini" :model="newItem">
      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="绝对航高" :label-width="labelWidth">
              <el-input v-model="newItem.height">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="相对航高" :label-width="labelWidth">
          <el-input v-model="newItem.relativeHeight">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="低处地面分辨率" :label-width="labelWidth">
              <el-input v-model="newItem.groundResolution">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="测图比例尺" :label-width="labelWidth">
              <el-input v-model="newItem.scaleSurvey"></el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="图幅大小" :label-width="labelWidth">
              <el-input v-model="newItem.mapSize">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="高处航向重叠" :label-width="labelWidth">
          <el-input v-model="newItem.highCourse">
              <template slot="append">%</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="高处旁向重叠" :label-width="labelWidth">
              <el-input v-model.number="newItem.highSideDirection">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航测比例尺" :label-width="labelWidth">
              <el-input v-model="newItem.aerialSurvey"></el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="摄影基线" :label-width="labelWidth">
              <el-input v-model="newItem.baseline">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="航线间距" :label-width="labelWidth">
          <el-input v-model="newItem.routeSpacing">
              <template slot="append">m</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航拍间隔" :label-width="labelWidth">
              <el-input v-model="newItem.spacing">
                <template slot="append">s</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item v-if="oldItem.flexType == 0" label="高程控制间隔" :label-width="labelWidth">
              <el-input v-model="newItem.elevationControlSpacing">
                <template slot="append">条基线</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="oldItem.flexType == 1" label="有差分控制间距" :label-width="labelWidth">
              <el-input v-model="newItem.elevationControlSpacing">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="像点位移" :label-width="labelWidth">
              <el-input v-model="newItem.displacement">
                <template slot="append">pixels</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="基高比" :label-width="labelWidth">
              <el-input v-model="newItem.basalRatio"></el-input>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item v-if="oldItem.flexType == 0" label="平面控制间隔" :label-width="labelWidth">
              <el-input v-model="newItem.planeControlPitch">
                <template slot="append">条基线</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="oldItem.flexType == 1" label="无差分控制间距" :label-width="labelWidth">
              <el-input v-model="newItem.planeControlPitch">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航线外扩" :label-width="labelWidth">
              <el-input v-model="newItem.routeOutward">
                  <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航线角度" :label-width="labelWidth">
              <el-input v-model="newItem.basalAngle">
                  <template slot="append">度</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="飞行方向" :label-width="labelWidth">
              <el-input v-model="newItem.flightDirection"></el-input>
            </el-form-item>
          </el-col>
          
      </el-row>
    </el-form>
    <div style="width: 220px; margin: auto">
      <el-button @click="compute" type="primary">点击计算</el-button>
      <el-button v-if="computButton" @click="toReport" type="success">生成报告</el-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
// import BMap from 'BMap'

export default {
  data() {
    return {
      camera: null,
      cameraList: [],
      customer: {},
      userLinkOption: [],
      value: {
        courseValue: 75,
        sideDirectionValue: 65,
        resolutionValue: 1800,
        speedValue: 18
      },
      computButton: false,
      standardOldItemValue: {
        time: 1250,
        course: 75,
        sideDirection: 65,
        speed: 18
      },
      cameraItem: {},
      oldItem: {
        course: 75,
        sideDirection: 65,
        resolution: 18,
        speed: 18,
        flexType: 0,
        dataType: 0,
        buildType: 0,
        terrainType: 0,
        time: 1250,
        cd: null
      },
      newItem: {},
      labelWidth: '110px',
       aviationRules: {
        width: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}],
        sensorWidth: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}],
        pixel: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}],
        height: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}],
        sensorHeight: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}],
        focalLength: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}]
      },
    
    }
  },
  watch:{
    value: {
      deep: true,
      handler(val){
        this.oldItem.course = val.courseValue
        this.oldItem.sideDirection = val.sideDirectionValue
        this.oldItem.resolution = val.resolutionValue /100
        this.oldItem.speed = val.speedValue
      }
    },
    oldItem: {
      deep: true,
      handler(val){
        let standard = this.standardOldItemValue
        if (val.speed < standard.speed) {
          this.$message({
            type: "warning",
            message: "建议飞行速度根据出厂飞行速度范围设置，以免失速坠机风险"
          })
        }
        if (val.time > standard.time) {
          this.$message({
            type: "warning",
            message: "请根据相机出厂曝光时间范围设定，航测通常使用 1/1000 s"
          })
        }
        if (val.dataType == 0) {
          if (val.course < standard.course) {
            this.$message({
              type: "warning",
              message: "建议无人机航向重叠度：70% ~ 80%"
            })
          }
          if (val.sideDirection < standard.sideDirection) {
            this.$message({
              type: "warning",
              message: "建议无人机旁向重叠度：65% ~ 80%"
            })
          }
        }else if(val.dataType == 1){
          if (val.course < standard.course || val.sideDirection < standard.sideDirection) {
            this.$message({
              type: "warning",
              message: `建议无人机倾斜摄影重叠度：${standard.course}%`
            })
          }
        }
      }
    }
  },
  created() {
    this.fetchData()
    this.getUserLink()
  },
  mounted(){
    this.getCity()
  },
  methods: {
    fetchData() {
      this.getCamera()
    },
    getCity(){
      const geolocation = new BMap.Geolocation();
      let that = this
      geolocation.getCurrentPosition(function getinfo(position){
        let city = position.address.city;             //获取城市信息
        let province = position.address.province;     //获取省份信息
        that.oldItem.city = city
        console.log(province, city);
        
      }, function(e) {
        this.LocationCity = "定位失败"
      }, {provider: 'baidu'});        
    },
    getCamera(){
      request({
        url: "/data/camera",
        method: "get"
      }).then(data => {
        this.cameraList = data.data;
      })
    },
    cameraChange(value){
      if (value == null) {
        this.cameraItem = {}
        return
      }
      
      for (let item of this.cameraList){
        if (value == item.id) {
          this.cameraItem.width = item.width
          this.cameraItem.height = item.height
          this.cameraItem.sensorWidth = item.sensorWidth
          this.cameraItem.sensorHeight = item.sensorHeight
          this.cameraItem.pixel = item.pixel
          this.cameraItem.focalLength = item.focalLength
        }
      }
    },
    typeChange(value){
      if (value == 0) {
        this.standardOldItemValue.speed = 18
        this.oldItem.speed = 18
        this.standardOldItemValue.time = 1250
        this.oldItem.time = 1250
        this.standardOldItemValue.resolutionValue = 1800
        this.oldItem.resolution = 18
      }else if (value == 1) {
        this.standardOldItemValue.speed = 10
        this.oldItem.speed = 10
        this.standardOldItemValue.time = 1000
        this.oldItem.time = 1000
        this.standardOldItemValue.resolutionValue = 150
        this.oldItem.resolution = 1.5
      }
    },
    dataChange(value){
      switch(value){
        case 0: {
          this.standardOldItemValue.course = 75
          this.standardOldItemValue.sideDirection = 65
          this.value.courseValue = 75
          this.value.sideDirectionValue = 65
          break
        }
        case 1:{
          this.buildChange(this.oldItem.buildType)
          break
        }
        case 2: {
          this.standardOldItemValue.course = 53
          this.standardOldItemValue.sideDirection = 8
          this.value.courseValue = 53
          this.value.sideDirectionValue = 8
          break
        }
      }
    },
    buildChange(value){
      if (this.oldItem.dataType == 1) {
        switch(value){
          case 0: {
            this.standardOldItemValue.course = 70
            this.standardOldItemValue.sideDirection = 70
            this.value.courseValue = 70
            this.value.sideDirectionValue = 70
            break
          }
          case 1: {
            this.standardOldItemValue.course = 80
            this.standardOldItemValue.sideDirection = 80
            this.value.courseValue = 80
            this.value.sideDirectionValue = 80
            break
          }
          case 2: {
            this.standardOldItemValue.course = 90
            this.standardOldItemValue.sideDirection = 90
            this.value.courseValue = 90
            this.value.sideDirectionValue = 90
            break
          }
        }
      }
    },
    getUserLink(){
      request({
        url: "/userLink/all",
        method: "post",
        data: {
          status: 1
        }
      }).then(data => {
        let userLink = data.data;
        userLink.map(link => {
          link.label = link.name +"_" + link.phone
          link.value = link.phone
        })
        this.userLinkOption = userLink
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
    compute(){
      
      let json = {
        camera: this.cameraItem,
        oldItem: this.oldItem
      }
      request({
        url: "/aviation/camera",
        method: "post",
        data: json
      }).then(res => {
        if (res.flag) {
          this.newItem = res.data
        }
        this.computButton = true

        if ((this.newItem.highCourse < 35 && this.newItem.highCourse != null) || (this.newItem.highSideDirection < 15 && this.newItem.highSideDirection != null)) {
          this.$message({
            type: "warning",
            message: "重叠度不够，请重新设计"
          })
        }
        if (this.newItem.displacement > 0.5) {
          this.$message({
            type: "warning",
            message: "像点位移造成相片运动模糊,一般控制在1/2的像素，最好是1/4个像素"
          })
        }
        if (this.newItem.groundResolution > 20) {
          if (this.oldItem.maxHeight - this.oldItem.minHeight > this.newItem.relativeHeight / 4.0) {
            this.$message({
              type: "warning",
              message: "地面分辨率大于20cm,分区地形高差不应大于1/4相对航高"
            })
          }
        }else {
          if (this.oldItem.maxHeight - this.oldItem.minHeight > this.newItem.relativeHeight / 6.0) {
            this.$message({
              type: "warning",
              message: "地面分辨率小于20cm,分区地形高差不应大于1/6相对航高"
            })
          }
        }
      })
    },
    toReport(){

    }
  }
}
</script>
