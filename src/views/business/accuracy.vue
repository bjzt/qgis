<template>
  <div style="margin: 20px">
      <el-row>
        <el-col :span="4">
      <el-menu 
        default-active="132"
        @select="selectMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse">
        <navigation-item  v-for="menu in menuList" :key="menu.id" :item="menu" />
      </el-menu>
      </el-col>

      <el-col :span="20">
    <el-form size="mini" :model="oldItem">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称:" :label-width="labelWidth">
            <el-input v-model="oldItem.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产单位:" :label-width="labelWidth">
            <el-input v-model="oldItem.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="仪器设备名称、型号:" label-width="150px">
            <el-input v-model="oldItem.machineName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仪器编号:" :label-width="labelWidth">
            <el-input v-model="oldItem.machineNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="图号:" :label-width="labelWidth">
            <el-input v-model="oldItem.mapNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="图名:" :label-width="labelWidth">
            <el-input v-model="oldItem.mapName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="质量子元素:" :label-width="labelWidth">
            <el-select v-model="oldItem.subelement">
                <el-option label="平面精度" :value="0"></el-option>
                <el-option label="高程精度" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="检测方式:" :label-width="labelWidth">
            <el-select v-model="oldItem.detectionMode" @change="changeDetectionModel">
                <el-option label="同精度检测" :value="0"></el-option>
                <el-option label="高精度检测" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="测图比例尺:" :label-width="labelWidth">
            <el-select  v-model="oldItem.scaleSurvey" @change="selectScale">
              <template slot="prepend">1：</template>
              <el-option 
              v-for="item of scaleSurvey"
              :key="item.value"
              :label="`1: ${item.value}`"
              :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="困难等级:" :label-width="labelWidth">
            <el-select v-model="oldItem.hardType" @change="selectHardType">
                <el-option label="一般地区" :value="0"></el-option>
                <el-option label="困难地区" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地形类别:" :label-width="labelWidth">
            <el-select v-model="oldItem.terrainType" @change="selectTerrain">
                <el-option label="平地" :value="0"></el-option>
                <el-option label="丘陵地" :value="1"></el-option>
                <el-option label="山地" :value="2"></el-option>
                <el-option label="高山地" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等高距(米):" :label-width="labelWidth">
            <el-select v-model="oldItem.contourInterval" @change="selectContourInterval">
              <el-option
                v-for="(item, index) in contourInterval"
                :key="index"
                :value="item"
                :label="item"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="技术要求" :label-width="labelWidth">
            <el-row>
              <el-col :span="12">
                <el-input v-model="oldItem.standard" disabled></el-input>
              </el-col>
              <el-col :span="12">
                <el-input v-model.number="oldItem.standardValue"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item label="点类别" :label-width="labelWidth">
            <el-select v-model="oldItem.pointType" @change="selectPointType">
              <el-option label="加密点" :value="0"></el-option>
              <el-option label="注记点" :value="1"></el-option>
              <el-option label="等高线" :value="2"></el-option>
              <el-option label="地物点" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="点级别" :label-width="labelWidth">
            <el-select v-model="oldItem.pointLevel" @change="selectLevel">
              <el-option label="B" :value="0"></el-option>
              <el-option label="C" :value="1"></el-option>
              <el-option label="D" :value="2"></el-option>
              <el-option label="E" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="测量规范" :label-width="labelWidth">
            <el-select v-model="oldItem.specification">
              <el-option label="航空摄影测量规范" :value="0"></el-option>
              <el-option label="工程测量规范" :value="1"></el-option>
              <el-option label="城市测量规范" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="检查项:" :label-width="labelWidth">
            <el-input v-model="oldItem.model"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label-width="labelWidth">
            <el-button @click="randomVisible = true" type="warning">随机检测数据</el-button>
            <el-button @click="dialogVisible=true;" type="success">导入数据</el-button>
            <el-button @click="computer()" type="primary">开始计算</el-button>
            <el-button @click="getWord()" type="success">导出当前检查项的数据</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 绝对精度 -->
    <el-table
      :data="tableData"
      border
      v-if="tabelType == 1"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="factorType"
        label="要素类型"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.factorType"></el-input>
          <span v-else v-text="scope.row.factorType"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="oldX"
        label="原测坐标x"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldX"></el-input>
          <span v-else v-text="scope.row.oldX"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="oldY"
        label="原测坐标y"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldY"></el-input>
          <span v-else v-text="scope.row.oldY"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newX"
        label="检测坐标x"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newX"></el-input>
          <span v-else v-text="scope.row.newX"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newY"
        label="检测坐标y"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newY"></el-input>
          <span v-else v-text="scope.row.newY"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="x_C"
        label="△x"
        width="150">
        <template slot-scope="scope">
          <span v-text="scope.row.x_C"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="y_C"
        label="△y"
        width="150">
        <template slot-scope="scope">
          <span v-text="scope.row.y_C"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="l_C"
        label="△L"
        width="150">
        <template slot-scope="scope">
          <span v-text="scope.row.l_C"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pvv"
        label="pvv">
        <template slot-scope="scope">
          <span v-text="scope.row.pvv"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        label="可用">
        <template slot-scope="scope">
          <span v-if="scope.row.isNotUse">粗差</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        fixed="right"
        label="采用">
        <template  slot-scope="scope">
          <div style="width:100%;height:23px" @click="scope.row.isUse = !scope.row.isUse">
            <span v-if="scope.row.isUse">√</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        width="150"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="delItem(scope.$index)" type="danger">删除</el-button>
            <el-button v-if="scope.row.status" size="mini" @click="scope.row.status=false" type="success">保存</el-button>
            <el-button v-else size="mini" @click="scope.row.status=true" type="success">编辑</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>


    <el-table
      :data="computeData"
      border
      v-if="tabelType == 1"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      style="width: 100%">
      <el-table-column
        prop="count"
        label="主要地物总数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="joinCount"
        label="参与中误差统计点数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.joinCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pointError"
        label="地物点位中误差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.pointError}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="errorDiffe"
        label="中误差限差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.errorDiffe}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notUseNumber"
        label="粗差个数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.notUseNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notUseScale"
        label="粗差率"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.notUseScale}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="diffe"
        label="限差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.diffe}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 绝对精度 end-->

    <!-- 相对精度 -->
    <el-table
      :data="tableData"
      border
      v-if="tabelType == 2"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
        prop="factorType"
        label="要素类型"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.factorType"></el-input>
          <span v-else v-text="scope.row.factorType"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="oldLength"
        label="原测相对位置(图上距离)"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldLength"></el-input>
          <span v-else v-text="scope.row.oldLength"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newLength"
        label="检测相对位置(实测距离)"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newLength"></el-input>
          <span v-else v-text="scope.row.newLength"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="length_C"
        label="较差(ds)"
        width="150">
        <template slot-scope="scope">
          <span v-text="scope.row.length_C"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isNotUse"
        align="center"
        label="可用">
        <template slot-scope="scope">
          <span v-if="scope.row.isNotUse">粗差</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="isUse"
        align="center"
        fixed="right"
        label="采用">
        <template  slot-scope="scope">
          <div style="width:100%;height:23px" @click="scope.row.isUse = !scope.row.isUse">
            <span v-if="scope.row.isUse">√</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        width="150"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="delItem(scope.$index)" type="danger">删除</el-button>
            <el-button v-if="scope.row.status" size="mini" @click="scope.row.status=false" type="success">保存</el-button>
            <el-button v-else size="mini" @click="scope.row.status=true" type="success">编辑</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :data="computeData"
      border
      v-if="tabelType == 2"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small">
      <el-table-column
        prop="count"
        label="相关边长总数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="joinCount"
        label="参与中误差统计点数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.joinCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pointError"
        label="相关边长间距中误差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.pointError}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="errorDiffe"
        label="中误差限差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.errorDiffe}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notUseNumber"
        label="粗差个数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.notUseNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notUseScale"
        label="粗差率"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.notUseScale}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="diffe"
        label="限差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.diffe}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 相对精度 end-->

    <!-- 高程精度 -->
    <el-table
      :data="tableData"
      border
      v-if="tabelType == 3"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
        prop="factorType"
        label="要素类型"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.factorType"></el-input>
          <span v-else v-text="scope.row.factorType"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="oldH"
        label="原高程h"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldH"></el-input>
          <span v-else v-text="scope.row.oldH"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newX"
        label="检测坐标x"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newX"></el-input>
          <span v-else v-text="scope.row.newX"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newY"
        label="检测坐标y"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newY"></el-input>
          <span v-else v-text="scope.row.newY"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newH"
        label="检测高程h"
        width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newH"></el-input>
          <span v-else v-text="scope.row.newH"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="h_C"
        label="较差(△h)"
        width="150">
        <template slot-scope="scope">
          <span v-text="scope.row.h_C"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        label="可用">
        <template slot-scope="scope">
          <span v-if="scope.row.isNotUse">粗差</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        fixed="right"
        label="采用">
        <template  slot-scope="scope">
          <div style="width:100%;height:23px" @click="scope.row.isUse = !scope.row.isUse">
            <span v-if="scope.row.isUse">√</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        align="center"
        width="150"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="delItem(scope.$index)" type="danger">删除</el-button>
            <el-button v-if="scope.row.status" size="mini" @click="scope.row.status=false" type="success">保存</el-button>
            <el-button v-else size="mini" @click="scope.row.status=true" type="success">编辑</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      border
      :data="computeData"
      v-if="tabelType == 3"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small">
      <el-table-column
        prop="count"
        width="150"
        label="等高线内插高程注记总数">
        <template  slot-scope="scope">
          <span>{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="joinCount"
        label="参与中误差统计点数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.joinCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pointError"
        label="高程注记中误差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.pointError}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="errorDiffe"
        label="中误差限差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.errorDiffe}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notUseNumber"
        label="粗差个数"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.notUseNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="notUseScale"
        label="粗差率"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.notUseScale}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="diffe"
        label="限差"
        width="150">
        <template  slot-scope="scope">
          <span>{{scope.row.diffe}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 高程精度 end-->
    
    <!-- 结果tabel start-->
    <el-table
      :data="result"
      border
      size="small"
      :header-cell-style="{background:'#eef1f6',color:'#606266', 'border-color': '#C1CDCD '}"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="图幅号">
      </el-table-column>
      <el-table-column
        align="center"
        label="数学精度">
        <el-table-column
            prop="mathScore"
            align="center"
            label="数学基础评分">
        </el-table-column>
        <el-table-column
            align="center"
            label="平面精度Ms检">
          <el-table-column
            prop="absolute"
            align="center"
            label="绝对位置">
          </el-table-column>
          <el-table-column
            prop="absoluteScore"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="relative"
            align="center"
            label="相对位置">
          </el-table-column>
          <el-table-column
            prop="relativeScore"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="planeScore"
            align="center"
            label="平面精度评分">
          </el-table-column>
        </el-table-column>
        <el-table-column
            align="center"
            label="高程精度Mh检">
          <el-table-column
            prop="elevation"
            align="center"
            label="高程注记">
          </el-table-column>
          <el-table-column
            prop="elevationScore"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="contour"
            align="center"
            label="等高线内插高程注记">
          </el-table-column>
          <el-table-column
            prop="contourScore"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="altitudeScore"
            align="center"
            label="高程精度评分">
          </el-table-column>
        </el-table-column>
        <el-table-column
            prop="created"
            align="center"
            label="数学精度评分">
          </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 结果tabel end-->
      </el-col>
      </el-row>

    <el-dialog
        title="输入数据"
        width="60%"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <el-form size="mini">
          <el-row>
            <el-col :span="3">
              <el-form-item>
                <el-button @click="innerVisible=true;" type="primary">保存当前格式</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择格式">
                <el-select @change="changeFormat" v-model="template">
                  <el-option label="自定义" :value="null"></el-option>
                  <el-option 
                    v-for="(item,index) in formatList"
                    :label="item.name"
                    :value="index"
                    :key="index"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button @click="updateFormat" type="success">更新当前格式</el-button>
                <el-button @click="delFormat" type="danger">删除当前格式</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-upload
                  class="upload-demo"
                  :action="`${baseUrl}/file/upload/fileToText`"
                  :on-change="handleChange"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :headers="importHeaders">
                  <el-button type="success">上传数据</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="选择分隔符">
                <el-select v-model="symbol">
                  <el-option 
                  v-for="item in symbolOptions" 
                  :key="item.value"
                  :label="`${item.label}  ${item.value}`"
                  :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择列">
                <el-select v-model="lie">
                  <el-option 
                  v-for="item in lieOptions" 
                  :key="item.value"
                  :label="item.label"
                  :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button-group>
                <el-button type="primary" @click="addLie">添加列</el-button>
                <el-button type="danger" @click="delLie">删除列</el-button>
                </el-button-group>
              </el-form-item>
            </el-col>
            
            <el-col :span="6">
              <el-form-item label="选择开始行">
                <el-input-number v-model="start"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div v-if="showData.length == 0">
            <div v-for="item in dataList" :key="item" v-text="item"></div>
        </div>
        <div v-else>
            <table style="text-align: center;border-collapse: collapse;">
              <tr>
                <th style="border: 2px solid #cad9ea;color: #666;padding:5px">#</th>
                <th style="border: 2px solid #cad9ea;color: #666;padding:5px" v-for="item in lieList" :key="item.value" v-text="item.label"></th>
              </tr>
              <tr v-for="(itemList,index) in showData" :key="index" :class="{select: itemList.isSelect}">
                <td style="border: 2px solid #cad9ea;color: #666;padding:5px" v-text="index+1"></td>
                <td style="border: 2px solid #cad9ea;color: #666;padding:5px" v-for="item in itemList.dataList" :key="item" v-text="item"></td>
              </tr>
            </table>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="addDataToTable()">确 定</el-button>
      </span>
      <el-dialog
        width="30%"
        title="编辑格式名"
        :visible.sync="innerVisible"
        append-to-body>
        <el-input v-model="format.name" placeholder="请输入格式名"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="innerVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="saveFormat()">确 定</el-button>
      </span>
      </el-dialog>
    </el-dialog>

    <el-dialog
    title="随机的比例"
    :visible.sync="randomVisible"
    width="30%">
      <el-form size="mini">
        <el-form-item label="优于中误差" :label-width="labelWidth">
          <el-input-number v-model="group.min" :min="0" :max="100-group.max-group.ordinary"></el-input-number>
        </el-form-item>
        <el-form-item label="大于中误差" :label-width="labelWidth">
          <el-input-number v-model="group.ordinary" :min="0" :max="100-group.max-group.min"></el-input-number>
        </el-form-item>
        <el-form-item label="粗差" :label-width="labelWidth">
          <el-input-number v-model="group.max" :min="0" :max="5"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="randomVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="randomData()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import navigationItem from '../../components/navigation'
export default {
  components: { navigationItem },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      importHeaders: { 'X-Token': getToken() },
      listLoading: false,
      total: 0,
      template: null,//格式模板
      tabelType: 1,
      innerVisible: false,
      dialogVisible: false,
      isCollapse: false,
      lieOptions: [],//列名
      lie: {
        label: "点名",
        value: "0",
      },
      format: {
        type: 0
      },
      start: 0,//开始计算的行
      computeData: [],//计算的结果
      lieList: [],//模板的列
      scaleSurvey: [{ value: 500 },{ value: 1000 },{ value: 2000 },{ value: 5000 },
      { value: 10000 },{ value: 25000 },{ value: 50000 },{ value: 100000 },
      { value: 250000 },{ value: 500000 },{ value: 1000000 }],//测图比例尺
      symbol: null,//分隔符
      symbolOptions: [],//分隔符
      showData: [],
      dataList: [],//上传的文件数据
      menuList: [],//格式化后的算法菜单列表
      menuAllList: [],//所有的菜单
      formatList: [],//所有用户拥有的模板
      oldItem: {
        detectionMode: 0,
        standardValue: null
      },
      tableData: [],//数据列表
      labelWidth: '120px',
      result: [],//返回的结果
      standard: {},//菜单的特色
      contourInterval: [],//等高距的值
      randomVisible: false,//
      group: { //随机分组
        min: 65,
        ordinary: 30,
        max: 5
      },
    }
  },
  created() {
    this.fetchData()
    this.lieOptions = [{
          label: "点名",
          value: "0",
      },{
          label: "原测北坐标",
          value: "1",
      },{
          label: "原测东坐标",
          value: "2",
      },{
          label: "原测高程",
          value: "3",
      },{
          label: "检测北坐标",
          value: "4",
      },{
          label: "检测东坐标",
          value: "5",
      },{
          label: "检测高程",
          value: "6",
      },{
          label: "编码",
          value: "7",
      },{
          label: "属性说明",
          value: "8",
      },{
          label: "其它",
          value: "9",
      },{
          label: "要素类型",
          value: "10",
      },{
          label: "原相对位置(间距边长)",
          value: "11",
      },{
          label: "检测相对位置(间距边长)",
          value: "12",
      }]
    this.symbolOptions = [{
          label: "逗号",
          value: ","
      },{
          label: "空格",
          value: " ",
      },{
          label: "斜杠",
          value: "/",
      },{
          label: "分号",
          value: ";",
      },{
          label: "等于号",
          value: "=",
      }]
  },
  watch: {
    symbol(value){
      this.showData = this.dataList.map(data => {
        return {
          dataList: data.split(value),
          isSelect: false
        }
      }) 
    },
    start(index){
      for(let i=0;i<this.showData.length;i++){
        this.showData[i].isSelect = false
        if (i+1 == index) {
            this.showData[i].isSelect = true
        }
      }
    }
  },
  methods: {
    fetchData() {
      this.getMenuList()
      this.getFormat()
    },
    getFormat(){
      request({
        url: `/accuracyFormat/${this.format.type}`,
        method: "get"
      }).then(res => {
        this.formatList = res.data
      })
    },
    getMenuList() {
      //查询列表
      request({
        url: "/menu/list",
        method: "get"
      }).then(data => {
        this.menuList = data.data;
      })

      request({
        url: "/menu/all",
        method: "get"
      }).then(data => {
        this.menuAllList = data.data;
      })
    },
    //选中菜单
    selectMenu(index, indexPath){
      this.oldItem.standardValue = null
      let name = "";
      
      indexPath.pop()
      
      this.formatTable
      for(let i of indexPath){
        for(let menu of this.menuAllList){
          if (i == menu.id) {
            name += menu.name+"-"
          }
        }
      }
      for(let menu of this.menuAllList){
        if (index == menu.id) {
          this.tabelType = menu.type
          this.oldItem.model = name + menu.name;

          this.standard.id = index
          this.standard.name = menu.name
          if (this.standard != null) {
            this.$set(this.oldItem,'standard', menu.standard)
          }
        }
      }
    },
    //将表格格式化
    formatTable(){
      this.tableData = this.tableData.map(item => {
        item.isUse = true
        item.status = false
        item.isNotUse = false
      })
    },
    //表格删除
    delItem(index){
      
      let tempList = []
      for(let i=0;i<this.tableData.length;i++){
        if (i != index) {
          tempList.push(this.tableData[i])
        }
      }
      this.tableData = tempList
    },
    addLie(){
      this.lieList.push(this.lie)
    },
    delLie(){
      if (this.lieList.length > 0) {
        this.lieList.pop()
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    //数据上传成功
    handleSuccess(res){
      if (res.flag) {
        this.dataList = res.data
        this.showData = []
        this.symbol = null
        this.start = 0
        this.lieList=[]
      }
    },
    //关闭提示
    handleClose(done) {
      this.dialogVisible = false
    },
    //选择格式
    changeFormat(index){
      if (index != null) {
        let format = this.formatList[index]
        this.lieList = window.JSON.parse(format.lie)
        this.symbol = format.symbol
      }else {
        this.lieList = []
        this.symbol = null
      }
    },
    //将选号的数据传到tabel里
    addDataToTable(){
      this.tableData = []
      let start = 0
      if (this.start > 0) {
        start = this.start -1
      }else if (this.start < 0) {
        this.$message({
          type: "error",
          message: "开始行数错误"
        })
        return
      }
      
      //循环数据
      for (let j=start;j< this.showData.length;j++){
        let data = this.showData[j].dataList
        let dto = {}
        //循环列
        for (let i=0;i< this.lieList.length;i++) {
          switch(this.lieList[i].value){
            case "0": dto.name = data[i];break
            case "1": dto.oldX = data[i];break
            case "2": dto.oldY = data[i];break
            case "3": dto.oldH = data[i];break
            case "4": dto.newX = data[i];break
            case "5": dto.newY = data[i];break
            case "6": dto.newH = data[i];break
            case "7": dto.code = data[i];break
            case "8": dto.node = data[i];break
            case "9": dto.other = data[i];break
            case "10": dto.factorType = data[i];break
            case "11": dto.oldLength = data[i];break
            case "12": dto.newLength = data[i];break
          }
          dto.isUse = true
          dto.status = false
          dto.isNotUse = false
        }
        this.tableData.push(dto)
      }
      this.dialogVisible = false
    },
    //随机点
    randomData(){
      if (this.oldItem.standardValue == null) {
        this.$message({
          type: "warning",
          message: "请选择检测项！"
        })
        return
      }
      
      let size = this.dataList.length * (this.group.ordinary /100.0)
      let maxSize = this.dataList.length * (this.group.max /100.0)
      let minSize = this.dataList.length - size - maxSize
      let minIndex=0,index=0,maxIndex = 0
      let maxOption = 0.33333
      let option = 0.6666666
      let temp = []
      for (let item of this.tableData){
        let flag = true;
        let rand = Math.random();
        if (rand < maxOption && flag) {
          if (maxIndex < maxSize) {
            let {max} = this.randomNumber(this.oldItem.standardValue)
            item.newX = item.oldX - max
            max = this.randomNumber(this.oldItem.standardValue).max
            item.newY = item.oldY - max
            max = this.randomNumber(this.oldItem.standardValue).max
            item.newH = item.oldH - max
            item.newLength = item.oldLength - max
            flag = false;
            maxIndex++
          }else {
            maxOption = 0
          }
        }
        if (rand > option && flag) {
          if (index < size) {
            let ordinary = this.randomNumber(this.oldItem.standardValue).ordinary
            item.newX = item.oldX - ordinary
            ordinary = this.randomNumber(this.oldItem.standardValue).ordinary
            item.newY = item.oldY - ordinary
            ordinary = this.randomNumber(this.oldItem.standardValue).ordinary
            item.newH = item.oldH - ordinary
            item.newLength = item.oldLength - ordinary
            flag = false;
            index++
          }else {
            option = 1
          }
        }
        if (rand > maxOption && rand < option && flag) {
          if (minIndex < minSize) {
            let min = this.randomNumber(this.oldItem.standardValue).min
            item.newX = item.oldX - min
            min = this.randomNumber(this.oldItem.standardValue).min
            item.newY = item.oldY - min
            min = this.randomNumber(this.oldItem.standardValue).min
            item.newH = item.oldH - min
            min = this.randomNumber(this.oldItem.standardValue).min
            item.newLength = item.oldLength - min
            flag = false;
            minIndex++
          }
        }
        item.newX = item.newX.toFixed(3)
        item.newY = item.newY.toFixed(3)
        item.newH = item.newH.toFixed(3)
        
        temp.push(item)
      }
      this.tableData = temp
      this.randomVisible =false
    },
    getWord(){
      let data = {
        name: "",
        detectionMode: this.oldItem.detectionMode,
        notUseNumber: this.computeData[0].notUseNumber,
        notUseScale: this.computeData[0].notUseScale,
        pointError: this.computeData[0].pointError,
        error: this.oldItem.standardValue,
        mapNumber: this.oldItem.mapNumber,
        pointList: this.tableData
      }
      request({
        url: "/file/upload/word",
        method: "post",
        data: data,
        responseType: 'blob'
      }).then(res => {
        const {content, filename} = res
        const blob = new Blob([content])
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = filename
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, filename)
        }
      })
    },
    randomNumber(number){
      let min = this.randomNum(0, number * 0.3+ number)
      let ordinary = this.randomNum(number-number * 0.4, number+number * 0.7)
      let max = this.randomNum(number * 2, 2* number + number * 0.4)

      if (Math.random() > 0.5) {
        min = 0-min
      }
      if (Math.random() > 0.5) {
        ordinary = 0-ordinary
      }
      if (Math.random() > 0.5) {
        max = 0-max
      }
      return {min:min, ordinary: ordinary, max: max}
    },
    randomNum(minNum, maxNum) {
      return Math.random() * ( maxNum - minNum ) + minNum;
    },
    //开始计算
    computer(){
      if (this.tableData.length <= 0) {
        return
      }
      
      switch (this.tabelType) {
        case 1: {
          let temp = this.tableData[0]
          if (temp.oldX == null || temp.oldY == null || temp.newX == null || temp.newY == null) {
            return
          }
          let templist = []
          let joinCount = 0
          let notUseNumber = 0
          let l_sum = 0
          let diffe = this.oldItem.standardValue * 2;
          if (this.oldItem.detectionMode == 0) {
            diffe = this.oldItem.standardValue * 2 * Math.sqrt(2)
          }
          for(let item of this.tableData){
            if (item.isUse) {
              item.x_C = item.oldX - item.newX
              item.y_C = item.oldY - item.newY
              item.l_C = Math.pow(item.x_C, 2) + Math.pow(item.y_C, 2)
              item.l_C = Math.sqrt(item.l_C)
              item.pvv = Math.pow(item.l_C, 2)
              item.x_C = item.x_C.toFixed(3)
              item.y_C = item.y_C.toFixed(3)
              item.l_C = item.l_C.toFixed(3)
              if (item.l_C > diffe) {
                item.isNotUse = true
                notUseNumber++
              }else {
                item.isNotUse = false
              }
              item.pvv = item.pvv.toFixed(6)
              joinCount++
              l_sum = Number(item.l_C) + l_sum
            }
            templist.push(item)
          }
          this.tableData = templist
          
          
          if (joinCount <= 20) {
            l_sum = l_sum / joinCount
          }

          this.computeData = [{
            count: this.tableData.length,
            joinCount: joinCount,
            notUseNumber: notUseNumber,
            diffe: diffe.toFixed(4),
            pointError: l_sum.toFixed(4),
            errorDiffe: this.oldItem.standardValue,
            notUseScale: notUseNumber / joinCount * 100
          }]
          break
        }
        case 2: {
          let temp = this.tableData[0]
          if (temp.oldLength == null || temp.newLength == null) {
            return
          }
          let templist = []
          let joinCount = 0
          let notUseNumber = 0
          let l_sum = 0
          let diffe = this.oldItem.standardValue * 2;
          if (this.oldItem.detectionMode == 0) {
            diffe = this.oldItem.standardValue * 2 * Math.sqrt(2)
          }
          for(let item of this.tableData){
            if (item.isUse) {
              item.length_C = item.oldLength - item.newLength
              if (item.length_C > diffe) {
                item.isNotUse = true
                notUseNumber++
              }else {
                item.isNotUse = false
              }
              item.length_C = item.length_C.toFixed(3)
              joinCount++
              l_sum = Number(item.length_C) + l_sum
            }
            templist.push(item)
          }
          this.tableData = templist

          if (joinCount <= 20) {
            l_sum = l_sum / joinCount
          }
          this.computeData = [{
            count: this.tableData.length,
            joinCount: joinCount,
            notUseNumber: notUseNumber,
            diffe: diffe.toFixed(4),
            pointError: l_sum.toFixed(4),
            errorDiffe: this.oldItem.standardValue,
            notUseScale: notUseNumber / joinCount * 100
          }]
          
          break
        }
        case 3: {
          let temp = this.tableData[0]
          if (temp.oldH == null || temp.newH == null) {
            return
          }
          let templist = []
          let joinCount = 0
          let notUseNumber = 0
          let l_sum = 0
          let diffe = this.oldItem.standardValue * 2;
          if (this.oldItem.detectionMode == 0) {
            diffe = this.oldItem.standardValue * 2 * Math.sqrt(2)
          }
          for(let item of this.tableData){
            if (item.isUse) {
              item.h_C = 0
              item.h_C = item.oldH - item.newH
              
              if (item.h_C > diffe) {
                item.isNotUse = true
                notUseNumber++
              }else {
                item.isNotUse = false
              }
              item.h_C = item.h_C.toFixed(3)
              joinCount++
              l_sum = Number(item.h_C) + l_sum
            }
            
            templist.push(item)
          }
          this.tableData = templist

          if (joinCount <= 20) {
            l_sum = l_sum / joinCount
          }
          this.computeData = [{
            count: this.tableData.length,
            joinCount: joinCount,
            notUseNumber: notUseNumber,
            diffe: diffe.toFixed(4),
            pointError: l_sum.toFixed(4),
            errorDiffe: this.oldItem.standardValue,
            notUseScale: notUseNumber / joinCount * 100
          }]
          console.log(this.computeData);
          
          break
        }
      }
      this.$forceUpdate()
      this.getResult()
    },
    getResult(){
      switch (this.tabelType) {
        case 1: {
          console.log(this.computeData);
          let absoluteScore;
          if (this.computeData[0].notUseScale > 5) {
            absoluteScore = "不合格"
          }else {
            let error = this.computeData[0].pointError
            if (error > 0.3) {
              absoluteScore = 60 + 40 / (this.oldItem.standardValue * 0.7) * (this.oldItem.standardValue - error)
            }else {
              absoluteScore = 100
            }
            absoluteScore = Math.floor(absoluteScore * 10) / 10
          }
          
          if (this.result.length == 0) {
            this.result.push({})
          }
          let json = {
            name: this.oldItem.mapName,
            absolute: this.standard.name,
            absoluteScore: absoluteScore
          }
          this.result = [this.twoJsonMerge(this.result[0], json)]
          break
        }
        case 2: {
          let relativeScore;
          if (this.computeData[0].notUseScale > 5) {
            relativeScore = "不合格"
          }else {
            let error = this.computeData[0].pointError
            if (error > 0.3) {
              relativeScore = 60 + 40 / (this.oldItem.standardValue * 0.7) * (this.oldItem.standardValue - error)
            }else {
              relativeScore = 100
            }
            relativeScore = Math.floor(relativeScore * 10) / 10
          }
          if (this.result.length == 0) {
            this.result.push({})
          }
          let json = {
            name: this.oldItem.mapName,
            relative: this.standard.name,
            relativeScore: relativeScore
          }
          this.result = [this.twoJsonMerge(this.result[0], json)]
          break
        }
        case 3: {
          let relativeScore;
          if (this.computeData[0].notUseScale > 5) {
            relativeScore = "不合格"
          }else {
            let error = this.computeData[0].pointError
            if (error > 0.3) {
              relativeScore = 60 + 40 / (this.oldItem.standardValue * 0.7) * (this.oldItem.standardValue - error)
            }else {
              relativeScore = 100
            }
            relativeScore = Math.floor(relativeScore * 10) / 10
          }
          if (this.result.length == 0) {
            this.result.push({})
          }
          let json = {}
          switch  (this.oldItem.pointType) {
            case 0:
            case 1: {
              json = {
                name: this.oldItem.mapName,
                elevation: this.standard.name,
                elevationScore: relativeScore
              }
              break
            }
            case 2: {
              json = {
                name: this.oldItem.mapName,
                contour: this.standard.name,
                contourScore: relativeScore
              }
              break
            }
          }
          this.result = [this.twoJsonMerge(this.result[0], json)]
          break
        }
      }
      if (this.result[0].absoluteScore != null || this.result[0].relativeScore != null) {
        let planeScore = 0
        if (this.result[0].relativeScore != null) {
          planeScore += this.result[0].relativeScore * 0.1
        }
        if (this.result[0].absoluteScore != null) {
          planeScore += this.result[0].absoluteScore * 0.1
        }

        this.result[0].planeScore = planeScore
      }
      this.$forceUpdate()
    },
    //合并两个json，同key时 默认2将会覆盖1的值
    twoJsonMerge(json1,json2){
      let length1 = 0,length2 = 0,jsonStr,str;
      for(let ever in json1) length1++;
      for(let ever in json2) length2++;
      if(length1 && length2)str = ',';
      else str = '';
      jsonStr = ((window.JSON.stringify(json1)).replace(/,}/,'}') + (window.JSON.stringify(json2)).replace(/,}/,'}')).replace(/}{/,str);
      return window.JSON.parse(jsonStr);
    },
    //保存格式
    saveFormat(){
      this.format.lie= window.JSON.stringify(this.lieList),
      this.format.symbol= this.symbol
      
      request({
        url: "/accuracyFormat",
        method: "post",
        data: this.format
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          })
          this.getFormat()
          this.innerVisible = false
        }
      })
    },
    updateFormat(){
      let format = this.formatList[this.template]

      format.lie=window.JSON.stringify(this.lieList),
      format.symbol= this.symbol
      
      request({
        url: "/accuracyFormat",
        method: "put",
        data: format
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          })
          this.getFormat()
        }
      })
    },
    delFormat(){
      if (this.template == null) {

        return
      }
      //获取当前所选中的格式id
      let id = this.formatList[this.template].id
      request({
        url: `/accuracyFormat/${id}`,
        method: "delete"
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          })
          this.template = null
          this.getFormat()
        }
      })
    },
    changeDetectionModel(){

    },
    //测图比例尺
    selectScale(){
      this.menu72()
    },
    //困难级别
    selectHardType(value){
      
    },
    //地形类别
    selectTerrain(){
      this.menu72()
    },
    //点等级
    selectLevel(value){
    },
    //点类别
    selectPointType(value){
      this.menu72()
    },
    selectContourInterval(value){
      if (this.standard.id == 72) {
        this.menu72(false)
      }
    },
    menu72(flag){
      if (flag == null) {
        flag = true
      }
      this.oldItem.standard = "中误差"
      if (this.oldItem.terrainType != null && this.oldItem.scaleSurvey != null) {
        switch (this.oldItem.scaleSurvey) {
          case 500:
            switch (this.oldItem.terrainType) {
              case 0: 
                this.contourInterval = [0.5];
                this.$set(this.oldItem,'contourInterval',0.5)
                break;
              case 1: 
                this.contourInterval = [1.0, 0.5];
                this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 2: 
                this.contourInterval = [1.0];
                this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 3: 
                this.contourInterval = [1.0];
                this.$set(this.oldItem,'contourInterval',1.0)
                break;
            }
            break;
          case 1000:
            switch (this.oldItem.terrainType) {
              case 0: 
                this.contourInterval = [0.5, 1.0];
                this.$set(this.oldItem,'contourInterval',0.5)
                break;
              case 1: 
                this.contourInterval = [1.0];
                this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 2: 
                  this.contourInterval = [1.0];
                  this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 3: 
                this.contourInterval = [2.0];
                this.$set(this.oldItem,'contourInterval',2.0)
                break;
            }
            break;
            case 2000:
            switch (this.oldItem.terrainType) {
              case 0: 
                this.contourInterval = [ 1.0, 0.5];
                this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 1:
                  this.contourInterval = [1.0];
                  this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 2: 

                  this.contourInterval = [2.0, 2.5];
                  this.$set(this.oldItem,'contourInterval',2.0)
                break;
              case 3: 
                this.contourInterval = [2.0, 2.5];
                this.$set(this.oldItem,'contourInterval',2.0)
                break;
            }
            break;
          case 5000:
          case 10000:
            switch (this.oldItem.terrainType) {
              case 0: 
                this.contourInterval = [1.0];
                this.$set(this.oldItem,'contourInterval',1.0)
                break;
              case 1: 
                this.contourInterval = [2.5];
                this.$set(this.oldItem,'contourInterval', 2.5)
                break;
              case 2: 
                this.contourInterval = [5.0];
                this.$set(this.oldItem,'contourInterval',5.0)
                break;
              case 3: 
                this.contourInterval = [5.0];
                this.$set(this.oldItem,'contourInterval',5.0)
                
        
                break;
            }
            break;
          case 25000:
            switch (this.oldItem.terrainType) {
              case 0: 

                  this.contourInterval = [5.0, 2.5];
                  this.$set(this.oldItem,'contourInterval',5.0)
               
                break;
              case 1: 

                  this.contourInterval = [5];
                  this.$set(this.oldItem,'contourInterval', 5)
                
                
                break;
              case 2: 

                  this.contourInterval = [10];
                  this.$set(this.oldItem,'contourInterval',10)
                
                break;
              case 3: 

                  this.contourInterval = [10];
                  this.$set(this.oldItem,'contourInterval', 10)

                
                break;
            }
            break;
          case 50000:
            switch (this.oldItem.terrainType) {
              case 0: 
                this.contourInterval = [10, 5];
                this.$set(this.oldItem,'contourInterval',10)
                break;
              case 1: 
                this.contourInterval = [10];
                this.$set(this.oldItem,'contourInterval', 10)
                break;
              case 2: 
                this.contourInterval = [20];
                this.$set(this.oldItem,'contourInterval',20)
                break;
              case 3: 
                  this.contourInterval = [20];
                  this.$set(this.oldItem,'contourInterval',20)
                break;
            }
            break;
          case 100000:
            switch (this.oldItem.terrainType) {
              case 0: 
                  this.contourInterval = [20, 10];
                  this.$set(this.oldItem,'contourInterval',20)
                break;
              case 1: 
                  this.contourInterval = [20];
                  this.$set(this.oldItem,'contourInterval', 20)
                break;
              case 2: 
                  this.contourInterval = [40];
                  this.$set(this.oldItem,'contourInterval',40)
                break;
              case 3: 
                  this.contourInterval = [40];
                  this.$set(this.oldItem,'contourInterval',40)
                break;
            }
            break;
        }
      }
    }
  }
}
</script>

<style scoped>
  .select {
    background-color: bisque
  }
</style>