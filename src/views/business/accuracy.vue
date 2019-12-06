<template>
  <div style="margin: 20px">
      <el-row>
        <el-col :span="4">
      <el-menu 
        :default-active="8"
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
            <el-select v-model="oldItem.detectionMode">
                <el-option label="同精度检测" :value="0"></el-option>
                <el-option label="高精度检测" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="测图比例尺:" :label-width="labelWidth">
            <el-select  v-model="oldItem.scaleSurvey">
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
            <el-select v-model="oldItem.hardType">
                <el-option label="一般地区" :value="0"></el-option>
                <el-option label="困难地区" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地形类别:" :label-width="labelWidth">
            <el-select v-model="oldItem.terrainType">
                <el-option label="平地" :value="0"></el-option>
                <el-option label="丘陵地" :value="1"></el-option>
                <el-option label="山地" :value="2"></el-option>
                <el-option label="高山地" :value="3"></el-option>
                
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等高距(米):" :label-width="labelWidth">
            <el-input v-model="oldItem. contourInterval"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="技术要求" :label-width="labelWidth">
            <el-row>
              <el-col :span="12">
                  <el-input v-model="oldItem.standard"></el-input>
              </el-col>
              <el-col :span="12">
                  <el-input v-model="oldItem.standardValue"></el-input>
              </el-col>
            </el-row>
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
            <el-button type="warning">随机检测数据</el-button>
            <el-button @click="dialogVisible=true;" type="success">导入数据</el-button>
            <el-button @click="computer()" type="primary">开始计算</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 绝对精度 -->
    <el-table
      :data="tableData"
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
      </el-table-column>
      <el-table-column
        prop="oldX"
        label="原测坐标x"
        width="150">
      </el-table-column>
      <el-table-column
        prop="oldY"
        label="原测坐标y"
        width="150">
      </el-table-column>
      <el-table-column
        prop="newX"
        label="检测坐标x"
        width="150">
      </el-table-column>
      <el-table-column
        prop="newY"
        label="检测坐标y"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="△x"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="△y"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="△L"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="pvv">
      </el-table-column>
    </el-table>


    <el-table
      :data="computeData"
      v-if="tabelType == 1"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      style="width: 100%">
      <el-table-column
        prop="factorType"
        label="主要地物总数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="参与中误差统计点数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="地物点位中误差"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="中误差限差"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="粗差个数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="粗差率"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="限差"
        width="150">
      </el-table-column>
    </el-table>
    <!-- 绝对精度 end-->

    <!-- 相对精度 -->
    <el-table
      :data="tableData"
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
      </el-table-column>
      <el-table-column
        prop="oldLength"
        label="原测相对位置(间距边长)"
        width="150">
      </el-table-column>
      <el-table-column
        prop="newLength"
        label="检测相对位置(间距边长)"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="较差(ds)"
        width="150">
      </el-table-column>
    </el-table>

    <el-table
      :data="computeData"
      v-if="tabelType == 2"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small">
      <el-table-column
        prop="factorType"
        label="相关边长总数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="参与中误差统计点数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="相关边长间距中误差"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="中误差限差"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="粗差个数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="粗差率"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="限差"
        width="150">
      </el-table-column>
    </el-table>
    <!-- 相对精度 end-->

    <!-- 高程精度 -->
    <el-table
      :data="tableData"
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
      </el-table-column>
      <el-table-column
        prop="oldH"
        label="原高程h"
        width="150">
      </el-table-column>
      <el-table-column
        prop="newX"
        label="检测坐标x"
        width="150">
      </el-table-column>
      <el-table-column
        prop="newY"
        label="检测坐标y"
        width="150">
      </el-table-column>
      <el-table-column
        prop="newH"
        label="检测高程h"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="较差(△h)"
        width="150">
      </el-table-column>
    </el-table>

    <el-table
      :data="computeData"
      v-if="tabelType == 3"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small">
      <el-table-column
        prop="factorType"
        label="等高线内插高程注记总数">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="参与中误差统计点数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="高程注记中误差"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="中误差限差"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="粗差个数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="粗差率"
        width="150">
      </el-table-column>
      <el-table-column
        prop="factorType"
        label="限差"
        width="150">
      </el-table-column>
    </el-table>
    <!-- 高程精度 end-->
    
    <!-- 结果tabel start-->
    <el-table
      :data="result"
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
            prop="created"
            align="center"
            label="数学基础评分">
        </el-table-column>
        <el-table-column
            align="center"
            label="平面精度Ms检">
          <el-table-column
            prop="created"
            align="center"
            label="绝对位置">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="相对位置">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="平面精度评分">
          </el-table-column>
        </el-table-column>
        <el-table-column
            align="center"
            label="高程精度Mh检">
          <el-table-column
            prop="created"
            align="center"
            label="高程注记">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="等高线内插高程注记">
          </el-table-column>
          <el-table-column
            prop="created"
            align="center"
            label="得分">
          </el-table-column>
          <el-table-column
            prop="created"
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
            <el-col :span="4">
              <el-form-item>
                <el-button @click="" type="primary">保存当前格式</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="选择格式">
                <el-select v-model="template">
                  <el-option label="自定义" :value="null"></el-option>
                  <el-option 
                    v-for="item in templateList" 
                    :label="item.name" 
                    :value="item.id" 
                    :key="item.id"
                    ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
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
      dialogVisible: false,
      isCollapse: false,
      lieOptions: [],//列名
      lie: {
          label: "点名",
          value: "0",
      },
      start: 0,//开始计算的行
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
      templateList: [],//所有用户拥有的模板
      oldItem: {},
      tableData: [],//数据列表
      labelWidth: '120px',
      result: [],//返回的结果
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
    selectMenu(index){
      for(let menu of this.menuAllList){
        if (index == menu.id) {
          this.tabelType = menu.type
        }
      }
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
    handleSuccess(res){
      if (res.flag) {
        this.dataList = res.data
        this.showData = []
        this.symbol = null
        this.start = 0
        this.lieList=[]
      }
    },
    handleClose(done) {
        this.dialogVisible = false
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       this.dialogVisible = false
    //     })
    //     .catch(_ => {});
    },
    //将选号的数据传到tabel里
    addDataToTable(){
      this.tableData = []
      let start = 0
      if (this.start > 0) {
        start = this.start -1
      }else if (this.start < 0) {
        this.$messages({
          type: "error",
          messages: "开始行数错误"
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
        }
        this.tableData.push(dto)
      }
      this.dialogVisible = false
    },
    //开始计算
    computer(){
      
    },
  }
}
</script>

<style scoped>
  .select {
    background-color: bisque
  }
</style>