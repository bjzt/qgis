<template>
  <div style="margin: 20px">
      <el-form :inline="true">
        <el-form-item label-width="300px">
          <span style="font-size: 30px">相机参数：</span>
        </el-form-item>
        <el-form-item label="选择相机">
          <el-select v-model="camera">
              <el-option label="自定义"></el-option>
            <el-option 
            v-for="item in cameraList" 
            :label="item.name"
            :value="item.id"
            :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    <el-form size="mini" :model="cameraItem">
      <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="影像宽度" :label-width="labelWidth">
              <el-input v-model="cameraItem.width">
                <template slot="append">pixels(像素)</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item label="传感器宽度" :label-width="labelWidth">
          <el-input v-model="cameraItem.sensorWidth">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item label="像元尺寸" :label-width="labelWidth">
          <el-input v-model="cameraItem.pixel">
            <template slot="append">μm(微米)</template>
          </el-input>
        </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item label="影像高度" :label-width="labelWidth">
          <el-input v-model="cameraItem.height">
            <template slot="append">pixels(像素)</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item label="传感器高度" :label-width="labelWidth">
          <el-input v-model="cameraItem.sensorHeight">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
        <el-form-item label="镜头焦距" :label-width="labelWidth">
          <el-input v-model="cameraItem.focalLength">
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
            <el-form-item :label-width="labelWidth">
              <el-button type="primary">根据范围计高程</el-button>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="高处高程" :label-width="labelWidth">
          <el-input v-model="oldItem.maxHeight">
            <template slot="append">m</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="低处高程" :label-width="labelWidth">
              <el-input v-model="oldItem.minHeight">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="测区平均高程" :label-width="labelWidth">
              <el-input v-model="oldItem.averageHeight">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="飞机类型" :label-width="labelWidth">
              <el-select v-model="oldItem.flexType">
                <el-option label="固定翼" :value="0"></el-option>
                <el-option label="多旋翼" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="oldItem.flexType == 0" :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航线航向外扩" :label-width="labelWidth">
              <el-input value="两条基线"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="采集数据" :label-width="labelWidth">
          <el-select v-model="oldItem.dataType">
            <el-option label="正射影像" :value="0"></el-option>
            <el-option label="倾斜影像" :value="1"></el-option>
            <el-option label="Lidar激光雷达" :value="2"></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="建筑物类型" :label-width="labelWidth">
              <el-select v-model="oldItem.bliudType">
                <el-option label="建筑物稀少" :value="0"></el-option>
                <el-option label="建筑物密集" :value="1"></el-option>
                <el-option label="高层建筑区" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="测区面积" :label-width="labelWidth">
              <el-input v-model="oldItem.area">
                <template slot="append">km</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="设计航带数" :label-width="labelWidth">
          <el-input v-model="oldItem.airStrips"></el-input>
        </el-form-item>
          </el-col>
          
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="盘旋半径" :label-width="labelWidth">
              <el-input v-model="oldItem.radius">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航向重叠" :label-width="labelWidth">
              <el-input v-model="oldItem.course">
                <template slot="append">%</template>
              </el-input>
              <el-slider :show-tooltip="false" v-model="value1.courseValue"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="旁向重叠" :label-width="labelWidth">
          <el-input v-model="oldItem.sideDirection">
              <template slot="append">%</template>
          </el-input>
          <el-slider :show-tooltip="false" v-model="value1.sideDirectionValue"></el-slider>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="地面分辨率" :label-width="labelWidth">
              <el-input v-model="oldItem.resolution">
                <template slot="append">cm</template>
              </el-input>
              <el-slider :show-tooltip="false" v-model="value1.resolutionValue" :min="50" :max="32000"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="飞行速度" :label-width="labelWidth">
              <el-input v-model="oldItem.speed">
                <template slot="append">m/s</template>
              </el-input>
              <el-slider :show-tooltip="false" v-model="value1.speedValue"></el-slider>
            </el-form-item>
          </el-col>
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
        <el-form-item label="高处地面分辨率" :label-width="labelWidth">
          <el-input v-model="oldItem.highResolution">
            <template slot="append">cm</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="低处地面分辨率" :label-width="labelWidth">
              <el-input v-model="oldItem.groundResolution">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="测图比例尺" :label-width="labelWidth">
              <el-input v-model="oldItem.scaleSurvey"></el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="图幅大小" :label-width="labelWidth">
              <el-input v-model="oldItem.mapSize">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="高出航向重叠" :label-width="labelWidth">
          <el-input v-model="oldItem.highCourse">
              <template slot="append">%</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="高出旁向重叠" :label-width="labelWidth">
              <el-input v-model.number="oldItem.highSideDirection">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航测比例尺" :label-width="labelWidth">
              <el-input v-model="oldItem.aerialSurvey"></el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="摄影基线" :label-width="labelWidth">
              <el-input v-model="oldItem.baseline">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="航线间距" :label-width="labelWidth">
          <el-input v-model="oldItem.routeSpacing">
              <template slot="append">m</template>
          </el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航拍间隔" :label-width="labelWidth">
              <el-input v-model="oldItem.spacing">
                <template slot="append">s</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="像控间距" :label-width="labelWidth">
              <el-input v-model="oldItem.ImgSpacing">
                <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>

      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="像点位移" :label-width="labelWidth">
              <el-input v-model="oldItem.displacement">
                <template slot="append">pixels</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
        <el-form-item label="基高比" :label-width="labelWidth">
          <el-input v-model="oldItem.basalRatio"></el-input>
        </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="照片张数" :label-width="labelWidth">
              <el-input v-model="oldItem.imgNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="大概飞行时间" :label-width="labelWidth">
              <el-input v-model="oldItem.flexTime">
                <!-- <template slot="append">m</template> -->
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="航线外扩" :label-width="labelWidth">
              <el-input v-model="oldItem.basalRatio">
                  <template slot="append">m</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="6" :lg="6" :sm="6" :md="6">
            <el-form-item label="曝光时间" :label-width="labelWidth">
              <el-input v-model="newItem.time">
                <template slot="prepend">1/</template>
                <template slot="append">s</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
    <div style="width: 120px; margin: auto">
      <el-button  @click="toReport" type="primary">生成报告</el-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      camera: null,
      cameraList: [],
      value1: {
        courseValue: 53,
        sideDirectionValue: 8,
        resolutionValue: 50,
        speedValue: 0
      },
      cameraItem: {},
      oldItem: {
        course: 60,
        sideDirection: 15,
        resolution: 50,
        speed: 18,
        radius: 150,
        flexType: 0,
        dataType: 0,
        bliudType: 0
      },
      newItem: {},
      labelWidth: '110px'
    }
  },
  watch:{
    value1: {
      deep: true,
      handler(val){
        this.oldItem.course = val.courseValue
        console.log(this.oldItem.course, val.courseValue);
        
        this.oldItem.sideDirection = val.sideDirectionValue
        this.oldItem.resolution = val.resolutionValue /100
        this.oldItem.speed = val.speedValue
        console.log(this.oldItem);
        
      }
    },
    oldItem: {
      deep: true,
      handler(value){
        if (value.flexType == 0) {
          this.oldItem.speed = 18
        }else if (value.flexType == 1) {
          this.oldItem.speed = 10
        }
        switch(value.dataType){
          case 0: {
            this.oldItem.course = 60
            this.oldItem.sideDirection = 15
            break
          }
          case 1:{
            switch(value.bliudType){
              case 0: {
                this.oldItem.course = 70
                this.oldItem.sideDirection = 70
                break
              }
              case 1: {
                this.oldItem.course = 80
                this.oldItem.sideDirection = 80
                break
              }
              case 2: {
                this.oldItem.course = 90
                this.oldItem.sideDirection = 90
                break
              }
            }
            break
          }
          case 2: {
            this.oldItem.course = 53
            this.oldItem.sideDirection = 8
            break
          }
        }
      }
    },
    camera(value){
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
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.getCamera()
    },
    getCamera(){
      request({
        url: "/data/camera",
        method: "get"
      }).then(data => {
        this.cameraList = data.data;
      })
    },
    toReport(){

    }
  }
}
</script>
