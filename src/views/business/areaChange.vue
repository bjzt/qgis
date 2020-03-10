<template>
  <div style="margin: 20px">
    <!-- form start -->
    <el-form>
      <el-row>
        <el-col :span="12">
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
                        <el-option label="BLH" value="BLH"></el-option>
                        <el-option label="XYZ" value="XYZ"></el-option>
                        <el-option label="xyh" value="xyh"></el-option>
                      </el-select>
                      <el-select
                        size="mini"
                        v-if="item1.zb == 'BLH'"
                        v-model="item1.dd"
                        placeholder="请选择"
                      >
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
                    <el-form-item
                      v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'"
                      label-width="120px"
                      label="中央子午线"
                    >
                      <el-row>
                        <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                          <el-form-item prop="zw1">
                            <el-input ref="zw1" size="mini" v-model.number="item1.zw1">
                              <el-button slot="append" style="font-size:20px;padding:0px;">°</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                          <el-form-item prop="zw2">
                            <el-input ref="zw2" size="mini" v-model.number="item1.zw2">
                              <el-button slot="append" style="font-size:20px;padding:0px;">′</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                          <el-form-item prop="zw3">
                            <el-input ref="zw3" size="mini" v-model.number="item1.zw3">
                              <el-button slot="append" style="font-size:20px;padding:0px;">″</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      prop="x"
                      v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'"
                      label-width="120px"
                      label="x常数(km)"
                    >
                      <el-row>
                        <el-col :xs="18" :xl="18" :lg="18" :sm="18" :md="18">
                          <el-input ref="x" size="mini" v-model.number="item1.x"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      prop="y"
                      v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'"
                      label-width="120px"
                      label="y常数(km)"
                    >
                      <el-row>
                        <el-col :xs="18" :xl="18" :lg="18" :sm="18" :md="18">
                          <el-input ref="y" size="mini" v-model.number="item1.y"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      prop="t"
                      v-if="item1.zyzw=='高斯自定义' && item1.zb == 'xyh'"
                      label-width="120px"
                      label="投影面高(m)"
                    >
                      <el-row>
                        <el-col :xs="18" :xl="18" :lg="18" :sm="18" :md="18">
                          <el-input ref="t" size="mini" v-model="item1.t"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
                      <el-select
                        size="mini"
                        v-if="item2.zb == 'BLH'"
                        v-model="item2.dd"
                        placeholder="请选择"
                      >
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
                    <el-form-item
                      v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'"
                      label-width="120px"
                      label="中央子午线"
                    >
                      <el-row>
                        <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                          <el-form-item prop="zw1">
                            <el-input size="mini" v-model.number="item2.zw1">
                              <el-button
                                ref="zw1"
                                slot="append"
                                style="font-size:20px;padding:0px;"
                              >°</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                          <el-form-item prop="zw2">
                            <el-input ref="zw2" size="mini" v-model.number="item2.zw2">
                              <el-button slot="append" style="font-size:20px;padding:0">′</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                          <el-form-item prop="zw3">
                            <el-input ref="zw3" size="mini" v-model.number="item2.zw3">
                              <el-button slot="append" style="font-size:20px;padding:0">″</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      prop="x"
                      v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'"
                      label-width="120px"
                      label="x常数(km)"
                    >
                      <el-row>
                        <el-col :xs="18" :xl="18" :lg="18" :sm="18" :md="18">
                          <el-input ref="x" size="mini" v-model="item2.x"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      prop="y"
                      v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'"
                      label-width="120px"
                      label="y常数(km)"
                    >
                      <el-row>
                        <el-col :xs="18" :xl="18" :lg="18" :sm="18" :md="18">
                          <el-input ref="y" size="mini" v-model="item2.y"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>

                    <el-form-item
                      prop="t"
                      v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'"
                      label-width="120px"
                      label="投影面高(m)"
                    >
                      <el-row>
                        <el-col :xs="18" :xl="18" :lg="18" :sm="18" :md="18">
                          <el-input ref="t" size="mini" v-model="item2.t"></el-input>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- form end -->

    <el-row>
      <el-col :span="16">
        <el-row>
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-button @click="openProject=true" type="primary">打开项目</el-button>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="item1.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人" :label-width="formWdth">
              <el-select size="mini" v-model="thatUser" placeholder="请选择联系人" value-key="id">
                <el-option :label="`${customer.name}_${customer.phone}`" :value="customer"></el-option>
                <el-option
                  v-for="item in userLinkOption"
                  :key="item.id"
                  :label="item.label"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="短信验证" :label-width="formWdth">
              <el-input v-model="checkCode">
                <el-button @click="getCode" slot="append">{{content}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item :label-width="formWdth">
              <el-button @click="isImport=true;openMap=true;" type="primary">验证导入</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table
          :data="tableData"
          border
          height="250"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          size="mini"
          style="width: 100%"
        >
          <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
          <el-table-column prop="name" align="center" fixed width="100" label="点名">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.name"></el-input>
              <span v-else v-text="scope.row.name"></span>
            </template>
          </el-table-column>
          <el-table-column prop="oldX" align="center" :label="oldTable.x" width="130">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldX"></el-input>
              <span v-else v-text="scope.row.oldX"></span>
            </template>
          </el-table-column>
          <el-table-column prop="oldY" align="center" width="130" :label="oldTable.y">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldY"></el-input>
              <span v-else v-text="scope.row.oldY"></span>
            </template>
          </el-table-column>
          <el-table-column prop="oldH" align="center" width="130" :label="oldTable.h">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.oldH"></el-input>
              <span v-else v-text="scope.row.oldH"></span>
            </template>
          </el-table-column>
          <el-table-column prop="newX" align="center" width="130" :label="newTable.x">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newX"></el-input>
              <span v-else v-text="scope.row.newX"></span>
            </template>
          </el-table-column>
          <el-table-column prop="newY" align="center" width="130" :label="newTable.y">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newY"></el-input>
              <span v-else v-text="scope.row.newY"></span>
            </template>
          </el-table-column>
          <el-table-column prop="newH" align="center" width="130" :label="newTable.h">
            <template slot-scope="scope">
              <el-input size="mini" v-if="scope.row.status" v-model="scope.row.newH"></el-input>
              <span v-else v-text="scope.row.newH"></span>
            </template>
          </el-table-column>
          <el-table-column prop="x" align="center" label="残差x"></el-table-column>
          <el-table-column prop="y" align="center" label="残差y"></el-table-column>
          <el-table-column prop="rms" align="center" width="110" sortable label="平面PRMS"></el-table-column>
          <el-table-column prop="z" align="center" width="110" sortable label="高程HRMS"></el-table-column>
          <el-table-column prop="created" align="center" label="可用">
            <template slot-scope="scope">
              <span v-if="scope.row.isNotUse">粗差</span>
            </template>
          </el-table-column>
          <el-table-column prop="created" align="center" fixed="right" label="采用">
            <template slot-scope="scope">
              <div style="width:100%;height:23px" @click="scope.row.isUse = !scope.row.isUse">
                <span v-if="scope.row.isUse">√</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="created" align="center" width="150" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" @click="delItem(scope.$index)" type="danger">删除</el-button>
                <el-button
                  v-if="scope.row.status"
                  size="mini"
                  @click="scope.row.status=false"
                  type="success"
                >保存</el-button>
                <el-button v-else size="mini" @click="scope.row.status=true" type="success">编辑</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <el-form style="margin-top: 5px" size="mini">
          <el-row>
            <el-col :span="4">
              <el-form-item label-width="10px">
                <el-button @click="dialogVisible=true;setLieOption()" type="primary">导入</el-button>
                <el-button @click="addItem" type="success">添加一行</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="参数模型选择">
                <el-select v-model="model" @change="selectModel">
                  <el-option label="布尔莎七参数" :value="0"></el-option>
                  <el-option label="四参数" :value="1"></el-option>
                  <el-option disabled label="似大地水准面精化" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="内符合精度" :label-width="formWdth">
                <el-input v-model="sevenPar.fi"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="已知点等级" :label-width="formWdth">
                <el-cascader v-model="level" :options="levelList" @change="selectLevel"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="外符合精度" :label-width="formWdth">
                <el-input v-model="accuracy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="8" style="border: 1px solid rgba(0, 0, 0, .12)">
        <!-- 参数列表 start -->
        <h2 style="text-align: center">转换参数：{{modelName}}</h2>
        <el-form size="mini">
          <el-form-item style="margin:0" label="x平移(m) = " :label-width="labelWdth">
            <el-input v-model.number="sevenPar.dX"></el-input>
          </el-form-item>

          <el-form-item style="margin:0" label="y平移(m) = " :label-width="labelWdth">
            <el-input v-model.number="sevenPar.dY"></el-input>
          </el-form-item>

          <el-form-item
            v-if="model == 0"
            style="margin:0"
            label="z偏移(m) = "
            :label-width="labelWdth"
          >
            <el-input v-model.number="sevenPar.dZ"></el-input>
          </el-form-item>

          <el-form-item
            v-if="model == 1"
            style="margin:0"
            label="旋转量 dms = "
            :label-width="labelWdth"
          >
            <el-input v-model.number="sevenPar.Cita"></el-input>
          </el-form-item>

          <el-form-item v-if="model == 0" style="margin:0" label="βx旋转 = " :label-width="labelWdth">
            <el-input v-model.number="sevenPar.Cita_X"></el-input>
          </el-form-item>

          <el-form-item v-if="model == 0" style="margin:0" label="βy旋转 = " :label-width="labelWdth">
            <el-input v-model.number="sevenPar.Cita_Y"></el-input>
          </el-form-item>

          <el-form-item v-if="model == 0" style="margin:0" label="βz旋转 = " :label-width="labelWdth">
            <el-input v-model.number="sevenPar.Cita_Z"></el-input>
          </el-form-item>

          <el-form-item style="margin:0" label="S尺度因子(ppm) = " :label-width="labelWdth">
            <el-input v-model.number="sevenPar.k"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center; margin-top: 25px;margin-bottom: 12px">
          <el-button @click="submitValid(0)" size="big" type="success">粗差探测</el-button>

          <el-button @click="paramCE()" type="danger">参数归零</el-button>
          <el-button @click="submitValid(1)" type="primary">参数计算</el-button>

          <el-button @click="downloadPoint" type="warning">输出对点</el-button>
        </div>

        <!-- 参数列表 end -->
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="16">
        <el-tabs type="border-card">
          <el-tab-pane label="输入">
            <el-row>
              <el-col :span="12">
                <el-card style="width: 100%; padding: 0px">
                  <div slot="header" style="text-align: center">
                    <span>转换前</span>
                    <el-button-group style="float: right">
                      <el-button
                        size="small"
                        @click="dialogVisible1=true;setExportLie()"
                        type="primary"
                      >导入</el-button>
                      <el-button size="small" @click="openMapValue(1)" type="success">图显</el-button>
                    </el-button-group>
                  </div>
                  <el-table
                    height="250"
                    size="small"
                    :data="oldData"
                    border
                    style="width: 100%;margin: 0px"
                  >
                    <el-table-column prop="name" label="点名"></el-table-column>
                    <el-table-column prop="x" :label="oldTable.x"></el-table-column>
                    <el-table-column prop="y" :label="oldTable.y"></el-table-column>
                    <el-table-column prop="h" :label="oldTable.h"></el-table-column>
                  </el-table>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card style="width: 100%; padding: 0px">
                  <div slot="header" style="text-align: center">
                    <span>转换后</span>
                    <el-button-group style="float: right">
                      <el-button size="small" @click="computer" type="primary">计算</el-button>
                      <el-button size="small" @click="openMapValue(2)" type="success">图显</el-button>
                    </el-button-group>
                  </div>
                  <el-table
                    size="small"
                    height="250"
                    :data="newData"
                    border
                    style="width: 100%;margin: 0px"
                  >
                    <el-table-column prop="name" label="点名"></el-table-column>
                    <el-table-column prop="x" :label="newTable.x"></el-table-column>
                    <el-table-column prop="y" :label="newTable.y"></el-table-column>
                    <el-table-column prop="h" :label="newTable.h"></el-table-column>
                  </el-table>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="批量文件">
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
                    <!-- :on-success="handleSuccess" -->
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :multiple="true"
                      :action="`${baseUrl}/file/upload/fileToSave`"
                      :on-success="handleMultipleSuccess"
                      :headers="importHeaders"
                      :file-list="fileList"
                    >
                      <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-button
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    @click="submitExport"
                  >导出文件</el-button>
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
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="选择列">
                    <el-select v-model="lie">
                      <el-option
                        v-for="item in lieOptions"
                        :key="`${JSON.stringify(item)}`"
                        :label="item.label"
                        :value="item"
                      ></el-option>
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
              </el-row>
            </el-form>
            <div style="height: 300px; overflow: auto;">
              <table style="text-align: center;border-collapse: collapse;">
                <tr>
                  <th
                    style="border: 2px solid #cad9ea;color: #666;padding:5px"
                    v-for="(item,index) in lieList"
                    :key="index"
                    v-text="item.label"
                  ></th>
                </tr>
              </table>
            </div>
            <span slot="footer">
              <el-button size="mini" @click="dialogVisible1=false">取 消</el-button>
              <el-button size="mini" type="primary" @click="addDataToTable1()">确 定</el-button>
            </span>

            <el-dialog width="30%" title="编辑格式名" :visible.sync="innerVisible">
              <el-input v-model="format.name" placeholder="请输入格式名"></el-input>
              <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="innerVisible1 = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="saveFormat()">确 定</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="矢量文件">矢量文件</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <div style="width: 400px;margin: 10px auto">
          <el-button @click="exportVisible=true;symbol=',';setExportLie()" type="primary">输出</el-button>
          <el-button @click="exportVisibleKml=true" type="primary">输出kml</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 导入弹窗 Start -->
    <el-dialog title="输入数据" width="60%" :visible.sync="dialogVisible" :before-close="handleClose">
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
                :show-file-list="false"
                :on-success="handleSuccess"
                :headers="importHeaders"
              >
                <el-button type="success">上传数据</el-button>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item>
              <el-switch
                v-model="isTwoPoint"
                active-text="对点"
                inactive-text="覆盖"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
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
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择列">
              <el-select v-model="lie">
                <el-option
                  v-for="item in lieOptions"
                  :key="`${JSON.stringify(item)}`"
                  :label="item.label"
                  :value="item"
                ></el-option>
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
      <div style="height: 300px; overflow: auto;" v-if="showData.length == 0">
        <div v-for="(item,index) in dataList" :key="index" v-text="item"></div>
      </div>
      <div style="height: 300px; overflow: auto;" v-else>
        <table style="text-align: center;border-collapse: collapse;">
          <tr>
            <th style="border: 2px solid #cad9ea;color: #666;padding:5px">#</th>
            <th
              style="border: 2px solid #cad9ea;color: #666;padding:5px"
              v-for="(item,index) in lieList"
              :key="index"
              v-text="item.label"
            ></th>
          </tr>
          <tr
            v-for="(itemList,index) in showData"
            :key="index"
            :class="{select: itemList.isSelect}"
          >
            <td style="border: 2px solid #cad9ea;color: #666;padding:5px" v-text="index+1"></td>
            <td
              style="border: 2px solid #cad9ea;color: #666;padding:5px"
              v-for="(item,index) in itemList.dataList"
              :key="index"
              v-text="item"
            ></td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="addDataToTable()">确 定</el-button>
      </span>

      <el-dialog width="30%" title="编辑格式名" :visible.sync="innerVisible" append-to-body>
        <el-input v-model="format.name" placeholder="请输入格式名"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="innerVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="saveFormat()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <!-- 导入弹窗 end -->

    <!-- 导入弹窗 Start -->
    <el-dialog title="输入数据" width="60%" :visible.sync="dialogVisible1">
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
                :show-file-list="false"
                :on-success="handleSuccess"
                :headers="importHeaders"
              >
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
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择列">
              <el-select v-model="lie">
                <el-option
                  v-for="item in lieOptions"
                  :key="`${JSON.stringify(item)}`"
                  :label="item.label"
                  :value="item"
                ></el-option>
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
      <div style="height: 300px; overflow: auto;" v-if="showData.length == 0">
        <div v-for="(item,index) in dataList" :key="index" v-text="item"></div>
      </div>
      <div style="height: 300px; overflow: auto;" v-else>
        <table style="text-align: center;border-collapse: collapse;">
          <tr>
            <th style="border: 2px solid #cad9ea;color: #666;padding:5px">#</th>
            <th
              style="border: 2px solid #cad9ea;color: #666;padding:5px"
              v-for="(item,index) in lieList"
              :key="index"
              v-text="item.label"
            ></th>
          </tr>
          <tr
            v-for="(itemList,index) in showData"
            :key="index"
            :class="{select: itemList.isSelect}"
          >
            <td style="border: 2px solid #cad9ea;color: #666;padding:5px" v-text="index+1"></td>
            <td
              style="border: 2px solid #cad9ea;color: #666;padding:5px"
              v-for="(item,index) in itemList.dataList"
              :key="index"
              v-text="item"
            ></td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible1=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addDataToTable1()">确 定</el-button>
      </span>

      <el-dialog width="30%" title="编辑格式名" :visible.sync="innerVisible" append-to-body>
        <el-input v-model="format.name" placeholder="请输入格式名"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="innerVisible1 = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="saveFormat()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <!-- 导入弹窗 end -->

    <!-- 导出格式定义 start-->
    <el-dialog title="导出格式" width="60%" :visible.sync="exportVisible">
      <el-form size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="导出格式">
              <el-autocomplete
                class="inline-input"
                v-model="exportFormat"
                :fetch-suggestions="querySearch"
                placeholder="请输入导出的文件扩展名"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col>
            <table>
              <tr>
                <td
                  style="border: 2px solid black;padding:5px"
                  v-for="(item,index) of lieList"
                  :key="index"
                  v-text="item.label"
                ></td>
              </tr>
            </table>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="选择分隔符">
              <el-select v-model="symbol">
                <el-option
                  v-for="item in symbolOptions"
                  :key="item.value"
                  :label="`${item.label}  ${item.value}`"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择表头">
              <el-select v-model="header" @change="selectHeader" multiple placeholder="请选择">
                <el-option
                  v-for="item in headerOptions"
                  :key="`${JSON.stringify(item)}`"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择列">
              <el-select v-model="lie">
                <el-option
                  v-for="item in lieOptions"
                  :key="`${JSON.stringify(item)}`"
                  :label="item.label"
                  :value="item"
                ></el-option>
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
        </el-row>
      </el-form>
      <div style="text-align: center;height: 300px">
        <el-scrollbar class="scrollbar" style="height: 100%">
          <h2 v-if="header0">数据处理报告</h2>
          <table v-if="header0" class="table">
            <tr>
              <td>原始椭球</td>
              <td>{{item1.yqq}}</td>
              <td>目标椭球</td>
              <td>{{item2.yqq}}</td>
            </tr>
            <tr>
              <td>原始坐标</td>
              <td>{{item1.zb}}</td>
              <td>目标坐标</td>
              <td>{{item2.zb}}</td>
            </tr>
            <tr>
              <td>坐标格式</td>
              <td v-if="item1.zb=='BLH'">{{item1.dd}}</td>
              <td v-else>{{item1.zb}}</td>
              <td>坐标格式</td>
              <td v-if="item2.zb=='BLH'">{{item2.dd}}</td>
              <td v-else>{{item2.zb}}</td>
            </tr>
            <tr>
              <td>投影方式</td>
              <td>{{item1.zyzw}}</td>
              <td>投影方式</td>
              <td>{{item2.zyzw}}</td>
            </tr>
            <tr>
              <td>中央经线</td>
              <td v-if="'xyh'== item1.zb" v-text="`${item1.zw1}°${item1.zw2}′${item1.zw3}″`"></td>
              <td v-else>无</td>
              <td>中央经线</td>
              <td v-if="'xyh'== item2.zb" v-text="`${item2.zw1}°${item2.zw2}′${item2.zw3}″`"></td>
              <td v-else>无</td>
            </tr>
            <tr>
              <td>源X常数</td>
              <td v-if="item1.zb=='xyh'">{{item1.x}}</td>
              <td v-else>无</td>
              <td>源Y常数</td>
              <td v-if="item1.zb=='xyh'">{{item1.y}}</td>
              <td v-else>无</td>
            </tr>
            <tr>
              <td>目标X常数</td>
              <td v-if="item2.zb=='xyh'">{{item2.x}}</td>
              <td v-else>无</td>
              <td>目标Y常数</td>
              <td v-if="item2.zb=='xyh'">{{item2.y}}</td>
              <td v-else>无</td>
            </tr>
            <tr>
              <td>投影面高</td>
              <td v-if="item1.zb=='xyh'">{{item1.t}}</td>
              <td v-else>无</td>
              <td>投影面高</td>
              <td v-if="item2.zb=='xyh'">{{item1.t}}</td>
              <td v-else>无</td>
            </tr>
            <tr>
              <td>高程基准</td>
              <td>{{item1.mb}}</td>
              <td>高程基准</td>
              <td>{{item2.mb}}</td>
            </tr>
          </table>

          <table v-if="header1" class="table line">
            <tr>
              <td v-for="(item,index) in lieList" :key="index" v-text="item.label"></td>
            </tr>
          </table>

          <div v-for="(item,index) in newData" :key="index">
            <!-- `${item.name}${symbol}${item.x}${symbol}${item.y}${symbol}${item.h}` -->
            <div class="table" :style="{'text-align': 'left'}">{{printJson(item)}}</div>
          </div>
        </el-scrollbar>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="exportVisible=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="exportData">确认导出</el-button>
      </span>
    </el-dialog>
    <!-- 导出格式定义 end-->

    <!-- 导出kml格式定义 start-->
    <el-dialog title="导出kml" width="60%" :visible.sync="exportVisibleKml">
      <el-form size="mini">
        <el-row>
          <el-col :span="2">
            <el-image
              v-if="kmlValue.icon != null"
              style="width: 30px; height: 30px;background-color: #8cc4fd"
              :src="kmlValue.icon"
              fit="fill"
            ></el-image>
            <span v-else>未选择图标</span>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择图标">
              <el-select
                v-model="kmlValue.icon"
                @change="iconDefault"
                allow-create
                default-first-option
                filterable
              >
                <el-option
                  v-for="(item,index) in iconList"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                >
                  <el-image
                    v-if="item.value != null"
                    style="width: 30px; height: 30px;background-color: #8cc4fd"
                    :src="item.value"
                    fit="fill"
                  ></el-image>
                  <span>{{item.label}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="图标颜色">
              <el-color-picker v-model="kmlValue.iconColor"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="图标缩放">
              <el-input-number v-model.number="kmlValue.iconRatio" :step="0.1" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="图标不透明度">
              <el-input-number v-model.number="kmlValue.iconColorOpaque" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="字体颜色">
              <el-color-picker v-model="kmlValue.labelColor"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字体大小">
              <el-input-number v-model.number="kmlValue.labelRatio" :step="0.1" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="图标不透明度">
              <el-input-number v-model.number="kmlValue.labelColorOpaque" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="导出文件名" label-width="120px">
              <el-input v-model="kmlValue.name" placeholder="在这里输入文件名字，默认为时间命名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="exportVisibleKml=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="exportKml">确认导出</el-button>
      </span>
    </el-dialog>
    <!-- 导出kml格式定义 -->

    <!-- 打开工程 start-->
    <el-dialog title="打开历史项目" width="60%" :visible.sync="openProject">
      <el-form size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="选择历史项目">
              <el-cascader-panel @change="selectProject" :options="projectList"></el-cascader-panel>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="project.item1 != null">
            <el-form size="mini">
              <el-form-item label="源坐标 椭球参数" :label-width="labelWdth">
                <el-input v-model="project.item1.yqq" disabled></el-input>
              </el-form-item>
              <el-form-item v-if="project.item1.zyzw != null" :label-width="labelWdth" label="投影方式">
                <el-input v-model="project.item1.zyzw" disabled></el-input>
              </el-form-item>
              <el-form-item v-if="project.item1.zw1 != null" :label-width="labelWdth" label="中央子午线">
                <el-row>
                  <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                    <el-form-item prop="zw1">
                      <el-input ref="zw1" disabled v-model.number="project.item1.zw1"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                    <el-form-item prop="zw2">
                      <el-input ref="zw2" disabled v-model.number="project.item1.zw2"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                    <el-form-item prop="zw3">
                      <el-input ref="zw3" disabled v-model.number="project.item1.zw3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-if="project.item1.x != null" :label-width="labelWdth" label="x常数">
                <el-input v-model="project.item2.x" disabled></el-input>
              </el-form-item>
              <el-form-item v-if="project.item1.y != null" :label-width="labelWdth" label="y常数">
                <el-input v-model="project.item2.y" disabled></el-input>
              </el-form-item>
              <el-form-item v-if="project.item1.t != null" :label-width="labelWdth" label="投影高">
                <el-input v-model="project.item2.t" disabled></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8" v-if="project.item2 != null">
            <el-form-item label="目标坐标 椭球参数" :label-width="labelWdth">
              <el-input v-model="project.item2.yqq" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="project.item2.zyzw != null" :label-width="labelWdth" label="投影方式">
              <el-input v-model="project.item2.zyzw" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="project.item2.zw1 != null" :label-width="labelWdth" label="中央子午线">
              <el-row>
                <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                  <el-form-item prop="zw1">
                    <el-input ref="zw1" disabled v-model.number="project.item2.zw1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                  <el-form-item prop="zw2">
                    <el-input ref="zw2" disabled v-model.number="project.item2.zw2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="8" :xl="8" :lg="8" :sm="8" :md="8">
                  <el-form-item prop="zw3">
                    <el-input ref="zw3" disabled v-model.number="project.item2.zw3"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item v-if="project.item2.x != null" :label-width="labelWdth" label="x常数">
              <el-input v-model="project.item2.x" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="project.item2.y != null" :label-width="labelWdth" label="y常数">
              <el-input v-model="project.item2.y" disabled></el-input>
            </el-form-item>
            <el-form-item v-if="project.item2.t != null" :label-width="labelWdth" label="投影高">
              <el-input v-model="project.item2.t" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="openProject=false">取 消</el-button>
        <el-button size="mini" @click="usePrject()" type="primary">确认打开该工程</el-button>
      </span>
    </el-dialog>
    <!-- 打开工程 end-->

    <!-- 打开地图 start-->
    <el-dialog fullscreen @close="isImport=false" :visible.sync="openMap">
      <iframe id="mapHtml" scrolling="no" src="/gis/sgis/" style="width:100%;height:800px;"></iframe>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="openMap=false;isImport=false">取 消</el-button>
        <el-button
          size="mini"
          v-if="isImport"
          @click="getMapValue();isImport=false"
          type="primary"
        >确认导入点</el-button>
      </span>
    </el-dialog>
    <!-- 地图 -->
  </div>
</template>
<style lang="scss">
// .onLine {
//   .el-input-group__append {
//     padding: 0;
//   }
// }
.scrollbar {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.el-card__body {
  padding: 0px;
}
.select {
  background-color: bisque;
}
.line {
  margin-top: 5px;
  margin-bottom: 5px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
.table tr td {
  width: 120px;
  text-align: left;
}
</style>

<script>
import request from "@/utils/request";
import { getToken } from "@/utils/auth";
import { log } from "util";

export default {
  data() {
    var isnumber = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        var reg = /^-?\d{1,16}(?:\.\d{1,4})?$/; //小数点左边最高16位，小数点右边最多4位
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
        var reg = /^\d{1,16}(?:\.\d{1,4})?$/; //小数点左边最高16位，小数点右边最多4位
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正整数,小数点后可1到4位"));
        }
      }
    };
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      importHeaders: { "X-Token": getToken() },
      itemRules1: {
        name: [
          { required: true, trigger: ["blur", "change"], message: "不能为空" }
        ],
        zw1: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          { type: "number", trigger: ["blur", "change"], validator: isnumber }
        ],
        zw2: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            type: "number", //要检验的类型（number，email，date等）
            message: "只能输入0~60",
            min: 0,
            max: 60,
            trigger: ["blur", "change"]
          }
        ],
        zw3: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            type: "number", //要检验的类型（number，email，date等）
            message: "只能输入0~60",
            min: 0,
            max: 60,
            trigger: ["blur", "change"]
          }
        ],
        x: [
          { required: true, message: "请输入", trigger: "blur" },
          { type: "number", trigger: ["blur", "change"], validator: isnumber }
        ],
        y: [
          { required: true, message: "请输入", trigger: "blur" },
          { type: "number", trigger: ["blur", "change"], validator: isnumber }
        ],
        t: [
          { required: true, message: "请输入", trigger: "blur" },
          { type: "number", trigger: ["blur", "change"], validator: isnumber }
        ]
      },
      isTwoPoint: false,
      item1: {
        //源对象
        name: "",
        yqq: "CGCS2000",
        zb: "BLH",
        dd: "DD.MMSS",
        mb: "大地高",
        zyzw: "高斯自定义",
        zw1: 114,
        zw2: 0,
        zw3: 0,
        y: 500,
        x: 0,
        t: 0.0
      },
      filePath: null,
      item2: {
        //目标对象
        yqq: "CGCS2000",
        zb: "xyh",
        dd: "DD.MMSS",
        mb: "85国家高程",
        zyzw: "高斯自定义",
        zw1: 114,
        zw2: 0,
        zw3: 0,
        y: 500,
        x: 0,
        t: 0.0
      },
      isImport: false,
      oldTable: {
        x: "源大地纬度B",
        y: "源大地经度L",
        h: "源椭球高H"
      },
      newTable: {
        x: "目标平面坐标x",
        y: "目标平面坐标y",
        h: "目标高程h"
      },
      flag: true,
      model: 0, //所选的参数模型
      level: [1, 1], //中误差点等级
      levelList: [], //中误差的选项list
      modelName: "布尔莎七参数",
      formWdth: "100px",
      labelWdth: "130px",
      accuracy: null, //内符合精度
      tableData: [], //表数据
      sevenPar: {
        dX: 0,
        dY: 0,
        dZ: 0,
        Cita: 0,
        Cita_X: 0,
        Cita_Y: 0,
        Cita_Z: 0,
        k: 1
      }, //7参数
      template: null, //格式模板
      innerVisible: false,
      innerVisible1: false,
      dialogVisible: false,
      dialogVisible1: false,
      lieOptions: [], //列名
      levelData: {
        //点等级的数据
        p: 0.02,
        h: 0.04
      },
      checkCode: null, //验证码
      format: {
        type: 1
      },
      lie: {
        label: "点名",
        value: "0"
      },
      thatUser: {
        phone: ""
      }, //所选的手机号
      dataList: [], //上传的文件数据
      fileUrlList: [], // 上传文件返回的url
      start: 0, //开始计算的行
      lieList: [], //模板的列
      symbol: null, //分隔符
      symbolOptions: [], //分隔符
      showData: [],
      formatList: [], //所有用户拥有的模板
      customer: {},
      userLinkOption: [],
      oldData: [], //转换前数据
      newData: [], //转换后数据
      exportFormatList: [
        { value: "txt" },
        { value: "dat" },
        { value: "excel" }
      ], //导出的文件格式列表
      exportFormat: "",
      exportVisible: false, //导出的开关
      header: null, //表头项
      headerOptions: [
        { label: "参数设定", value: 0 },
        { label: "参数说明", value: 1 }
      ], //表头选项
      header0: false, //参数设定
      header1: false, //参数说明
      gg: false, //杆高
      exportVisibleKml: false, //导出kml的开关
      iconList: [
        { value: "http://www.qgisw.com/label/1.png", label: "不埋石图根点" },
        { value: "http://www.qgisw.com/label/2.png", label: "高程点" },
        { value: "http://www.qgisw.com/label/3.png", label: "埋石图根点" },
        { value: "http://www.qgisw.com/label/4.png", label: "平高点/导线点" },
        { value: "http://www.qgisw.com/label/5.png", label: "水准点" },
        { value: "http://www.qgisw.com/label/6.png", label: "天文点" },
        { value: "http://www.qgisw.com/label/7.png", label: "土堆上的导线点" },
        {
          value: "http://www.qgisw.com/label/8.png",
          label: "土堆上的埋石图根点"
        },
        { value: "http://www.qgisw.com/label/9.png", label: "卫星定位等级点" },
        { value: "http://www.qgisw.com/label/10.png", label: "像主点" }
      ], //图标库
      openProject: false, //打开工程
      projectList: [],
      project: {}, //当前所选工程
      isDataBase: false, //是否是数据库导入
      fileList: [], //批量上传的文件
      canClick: true, //添加canClick
      codeTime: 60, //按钮的倒计时
      content: "发送验证码", //按钮的内容
      kmlValue: {
        iconColor: "#FF0000",
        iconRatio: 0.8,
        iconColorOpaque: 100,
        labelColor: "#FFFFFF",
        labelRatio: 0.6,
        labelColorOpaque: 100
      }, //kml导出的设置
      openMap: false,
      fileList: []
    };
  },
  watch: {
    symbol(value) {
      this.showData = this.dataList.map(data => {
        let list = data.split(value);
        list[0] = list[0].trim();
        return {
          dataList: list,
          isSelect: false
        };
      });
    },
    start(index) {
      for (let i = 0; i < this.showData.length; i++) {
        this.showData[i].isSelect = false;
        if (i + 1 == index) {
          this.showData[i].isSelect = true;
        }
      }
    },
    lieOptions(value) {
      this.gg = false;
      for (let v in value) {
        if (v.value === "14") {
          this.gg = true;
        }
      }
    }
  },
  created() {
    this.fetchData();
    this.getUserLink();
    this.symbolOptions = [
      {
        label: "逗号",
        value: ","
      },
      {
        label: "空格",
        value: " "
      },
      {
        label: "斜杠",
        value: "/"
      },
      {
        label: "分号",
        value: ";"
      },
      {
        label: "等于号",
        value: "="
      },
      {
        label: "制表符",
        value: "\t"
      }
    ];
    this.levelList = [
      {
        label: "GPS-C级(大地三级)",
        value: 0,
        children: [
          { value: 0, label: "中误差" },
          { value: 1, label: "两倍限差" },
          { value: 2, label: "同精度2√2" }
        ]
      },
      {
        label: "D、E级(大地四级)",
        value: 1,
        children: [
          { value: 0, label: "中误差" },
          { value: 1, label: "两倍限差" },
          { value: 2, label: "同精度2√2" }
        ]
      },
      {
        label: "RTK图根控制",
        value: 2,
        children: [
          {
            value: 0,
            label: "平地",
            children: [
              {
                label: "1: 500",
                value: 500
              },
              {
                label: "1: 1000",
                value: 1000,
                children: [
                  { value: 0.5, label: "0.5(基本等高距)" },
                  { value: 1.0, label: "1.0(基本等高距)" }
                ]
              },
              {
                label: "1: 2000",
                value: 2000,
                children: [
                  { value: 1.0, label: "1.0(基本等高距)" },
                  { value: 0.5, label: "0.5(基本等高距)" }
                ]
              }
            ]
          },
          {
            value: 1,
            label: "丘陵",
            children: [
              {
                label: "1: 500",
                value: 500,
                children: [
                  { value: 1.0, label: "1.0(基本等高距)" },
                  { value: 0.5, label: "0.5(基本等高距)" }
                ]
              },
              {
                label: "1: 1000",
                value: 1000
              },
              {
                label: "1: 2000",
                value: 2000
              }
            ]
          },
          {
            value: 2,
            label: "山地",
            children: [
              {
                label: "1: 500",
                value: 500
              },
              {
                label: "1: 1000",
                value: 1000
              },
              {
                label: "1: 2000",
                value: 2000,
                children: [
                  { value: 2.0, label: "2.0(基本等高距)" },
                  { value: 2.5, label: "2.5(基本等高距)" }
                ]
              }
            ]
          },
          {
            value: 3,
            label: "高山地",
            children: [
              {
                label: "1: 500",
                value: 500
              },
              {
                label: "1: 1000",
                value: 1000
              },
              {
                label: "1: 2000",
                value: 2000,
                children: [
                  { value: 2.0, label: "2.0(基本等高距)" },
                  { value: 2.5, label: "2.5(基本等高距)" }
                ]
              }
            ]
          }
        ]
      }
    ];
    this.setLieOption();
  },
  methods: {
    submitExport() {
      request({
        url: this.baseUrl + "/file/upload/export",
        method: "post",
        data: {
          fileUrlList: this.fileUrlList,
          sevenPar: this.sevenPar,
          oldItem: this.item1,
          newItem: this.item2,
          symbol: this.symbol,
          lieList: this.lieList
        },
        responseType: "blob"
      }).then(res => {
        this.$refs.upload.clearFiles();
        this.fileUrlList = [];
        const { content, filename } = res;
        console.log(filename);
        const blob = new Blob([content], { type: "application/vnd.ms-excel" });
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = filename;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, filename);
        }
      });
    },
    fetchData() {
      this.getFormat();
      this.getAreaParamRecord();
    },
    //获取验证码
    getCode() {
      if (!this.canClick) return;
      request({
        url: "/userLink/linkCode",
        method: "get"
      }).then(data => {
        this.$message({
          type: "success",
          message: data.message
        });
      });
      this.canClick = false;
      this.content = this.codeTime + "s后重新发送";
      let clock = window.setInterval(() => {
        this.codeTime--;
        this.content = this.codeTime + "s后重新发送";
        if (this.codeTime < 0) {
          //当倒计时小于0时清除定时器
          window.clearInterval(clock);
          this.content = "重新发送验证码";
          this.codeTime = 60;
          this.canClick = true;
        }
      }, 1000);
    },
    setLieOption() {
      this.lieOptions = [
        { label: "点名", value: "0" },
        { label: this.oldTable.x, value: "1" },
        { label: this.oldTable.y, value: "2" },
        { label: this.oldTable.h, value: "3" },
        { label: this.newTable.x, value: "4" },
        { label: this.newTable.y, value: "5" },
        { label: this.newTable.h, value: "6" },
        { label: "编码", value: "7" },
        { label: "属性说明", value: "8" },
        { label: "其它", value: "9" },
        { label: "要素类型", value: "10" },
        { label: "原相对位置(间距边长)", value: "11" },
        { label: "检测相对位置(间距边长)", value: "12" }
      ];
    },
    setExportLie() {
      this.lieOptions = [
        { label: "点名", value: "0" },
        { label: "纬度/X", value: "1" },
        { label: "经度/Y", value: "2" },
        { label: "高程/Z", value: "3" },
        { label: "杆高", value: "14" },
        { label: "航向角(Phi/yaw)", value: "10" },
        { label: "俯仰角(Omega/Pitch)", value: "11" },
        { label: "翻滚角(Kappa/roll)", value: "12" },
        { label: "精度等级说明(SAlt)", value: "13" },
        { label: "编码", value: "7" },
        { label: "属性说明", value: "8" },
        { label: "其它", value: "9" }
      ];
    },
    getFormat() {
      request({
        url: `/accuracyFormat/${this.format.type}`,
        method: "get"
      }).then(res => {
        this.formatList = res.data;
      });
    },
    select1(value) {
      if (value == "xyh") {
        this.item1.mb = "85国家高程";
        this.oldTable = {
          x: "源平面坐标x",
          y: "源平面坐标y",
          h: "源高程h"
        };
      } else if (value == "BLH") {
        this.item1.mb = "大地高";
        this.oldTable = {
          x: "源大地纬度B",
          y: "源大地经度L",
          h: "源椭球高H"
        };
      } else if (value == "XYZ") {
        this.oldTable = {
          x: "源空间直角坐标X",
          y: "源空间直角坐标Y",
          h: "源空间直角坐标Z"
        };
      }
      this.setLieOption();
    },
    select2(value) {
      if (value == "xyh") {
        this.item2.mb = "85国家高程";
        this.newTable = {
          x: "目标平面坐标x",
          y: "目标平面坐标y",
          h: "目标高程h"
        };
      } else if (value == "BLH") {
        this.item2.mb = "大地高";
        this.newTable = {
          x: "目标大地纬度B",
          y: "目标大地经度L",
          h: "目标椭球高H"
        };
      } else if (value == "XYZ") {
        this.newTable = {
          x: "目标空间直角坐标X",
          y: "目标空间直角坐标Y",
          h: "目标空间直角坐标Z"
        };
      }
      this.setLieOption();
    },
    //选择参数模型
    selectModel(value) {
      this.paramCE();
      switch (value) {
        case 0:
          this.modelName = "布尔莎七参数";
          break;
        case 1:
          this.modelName = "四参数";
          break;
        case 2:
          this.modelName = "似大地水准面精化";
          break;
      }
    },
    //将中误差乘2
    mult(levelData) {
      levelData.p = levelData.p * 2;
      levelData.h = levelData.h * 2;
      return levelData;
    },
    tuj2(levelData) {
      levelData.p = levelData.p * 2 * Math.sqrt(2);
      levelData.h = levelData.h * 2 * Math.sqrt(2);
      return levelData;
    },
    //得到大地的中误差
    getDadi(value, levelData) {
      switch (value) {
        case 0: {
          this.levelData = levelData;
          break;
        }
        case 1: {
          this.levelData = this.mult(levelData);
          break;
        }
        case 2: {
          this.levelData = this.tuj2(levelData);
          break;
        }
      }
    },
    //选择点等级时，改变误差值
    selectLevel(value) {
      switch (value[0]) {
        case 0: {
          let levelData = { p: 0.01, h: 0.02 };
          this.getDadi(value[1], levelData);
          break;
        }
        case 1: {
          let levelData = { p: 0.01, h: 0.02 };
          this.getDadi(value[1], levelData);
          break;
        }
        case 2: {
          //图根控制
          let levelData = { p: 0.00007 };
          switch (
            value[1] //平地
          ) {
            case 0: {
              levelData.h = 0.5;
              levelData.p = value[2] * levelData.p;
              switch (value[2]) {
                case 500:
                  levelData.h = levelData.h / 12;
                  break;
                case 1000:
                case 2000: {
                  levelData.h = value[3] / 12;
                  break;
                }
              }
              this.levelData = levelData;
              break;
            }
            case 1: {
              levelData.h = 1.0;
              levelData.p = value[2] * levelData.p;
              switch (value[2]) {
                case 500: {
                  levelData.h = value[3] / 12;
                  break;
                }
                case 1000:
                case 2000:
                  levelData.h = levelData.h / 12;
                  break;
              }
              this.levelData = levelData;
              break;
            }
            case 2: {
              levelData.h = 1.0;
              levelData.p = value[2] * levelData.p;
              switch (value[2]) {
                case 500:
                case 1000:
                  levelData.h = levelData.h / 12;
                  break;
                case 2000: {
                  levelData.h = value[3] / 12;
                  break;
                }
              }
              this.levelData = levelData;
              break;
            }
            case 3: {
              levelData.p = value[2] * levelData.p;
              switch (value[2]) {
                case 500:
                  levelData.h = 1.0 / 12;
                  break;
                case 1000:
                  levelData.h = 2.0 / 12;
                  break;
                case 2000: {
                  levelData.h = value[3] / 12;
                  break;
                }
              }
              this.levelData = levelData;
              break;
            }
          }
          break;
        }
      }

      this.pointValid();
    },
    printJson(dto) {
      let str = "";
      for (let lie of this.lieList) {
        switch (lie.value) {
          case "0":
            str += dto.name;
            break; //点名
          case "1":
            str += dto.x;
            break; //源x
          case "2":
            str += dto.y;
            break; //源y
          case "3":
            str += dto.h;
            break; //源H
          // case "4": str += dto.newX;break
          // case "5": str += dto.newY;break
          // case "6": str += dto.newH;break
          case "7":
            str += dto.code;
            break; //编码
          case "8":
            str += dto.node;
            break; //备注
          case "9":
            str += dto.other;
            break; //其它
          case "10":
            str += dto.yaw;
            break;
          case "11":
            str += dto.pitch;
            break;
          case "12":
            str += dto.roll;
            break;
          case "13":
            str += dto.salt;
            break;
          case "14":
            str += dto.gh;
            break;
        }
        str += this.symbol;
      }

      str = str.substr(0, str.length - 1);
      return str;
    },
    //获取联系人
    getUserLink() {
      request({
        url: "/user/one",
        method: "get"
      }).then(res => {
        if (res.flag) {
          this.customer = res.data;
        }
      });
      request({
        url: "/userLink/all",
        method: "post",
        data: { status: 1 }
      }).then(data => {
        let userLink = data.data;
        userLink.map(link => {
          link.label = link.name + "_" + link.phone;
        });
        this.userLinkOption = userLink;
      });
    },
    addLie() {
      this.lieList.push(this.lie);
    },
    delLie() {
      if (this.lieList.length > 0) {
        this.lieList.pop();
      }
    },
    //添加参数table
    addItem() {
      this.tableData.push({
        status: true
      });
    },
    delItem(index) {
      let tempList = [];
      for (let i = 0; i < this.tableData.length; i++) {
        if (i != index) {
          tempList.push(this.tableData[i]);
        }
      }
      this.tableData = tempList;
    },
    //关闭提示
    handleClose(done) {
      this.dialogVisible = false;
    },
    //查询匹配项
    querySearch(queryString, cb) {
      var restaurants = this.exportFormatList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //数据上传成功
    handleSuccess(res) {
      if (res.flag) {
        this.dataList = res.data;
        this.showData = [];
        this.symbol = null;
        this.start = 0;
        this.lieList = [];
      }
    },
    //多个数据上传成功
    handleMultipleSuccess(res) {
      if (res.flag) {
        this.fileUrlList.push(res.data);
        console.log(this.fileUrlList);
      }
    },
    //选择格式
    changeFormat(index) {
      if (index != null) {
        let format = this.formatList[index];
        this.lieList = window.JSON.parse(format.lie);
        this.symbol = format.symbol;
      } else {
        this.lieList = [];
        this.symbol = null;
      }
    },
    //将选号的数据传到tabel里
    addDataToTable() {
      let newTableData = [];
      if (!this.isTwoPoint) {
        this.tableData = [];
      }
      let start = 0;
      if (this.start > 0) {
        start = this.start - 1;
      } else if (this.start < 0) {
        this.$message({
          type: "error",
          message: "开始行数错误"
        });
        return;
      }

      //循环数据
      for (let j = start; j < this.showData.length; j++) {
        let data = this.showData[j].dataList;
        let dto = { status: false, isUse: true };
        //循环列
        for (let i = 0; i < this.lieList.length; i++) {
          switch (this.lieList[i].value) {
            case "0":
              dto.name = data[i];
              break;
            case "1":
              dto.oldX = data[i];
              break;
            case "2":
              dto.oldY = data[i];
              break;
            case "3":
              dto.oldH = data[i];
              break;
            case "4":
              dto.newX = data[i];
              break;
            case "5":
              dto.newY = data[i];
              break;
            case "6":
              dto.newH = data[i];
              break;
            case "7":
              dto.code = data[i];
              break;
            case "8":
              dto.node = data[i];
              break;
            case "9":
              dto.other = data[i];
              break;
            case "10":
              dto.factorType = data[i];
              break;
            case "11":
              dto.oldLength = data[i];
              break;
            case "12":
              dto.newLength = data[i];
              break;
          }
        }
        if (!this.isTwoPoint) {
          this.tableData.push(dto);
        } else {
          for (let d of this.tableData) {
            if (d.name == dto.name) {
              newTableData.push(this.twoJsonMerge(d, dto));
            }
          }
        }
      }
      if (this.isTwoPoint) {
        this.tableData = newTableData;
      }
      this.showData = [];
      this.dataList = [];
      this.dialogVisible = false;
    },
    //将数据转入table中
    addDataToTable1() {
      let start = 0;
      if (this.start > 0) {
        start = this.start - 1;
      } else if (this.start < 0) {
        this.$message({
          type: "error",
          message: "开始行数错误"
        });
        return;
      }
      this.oldData = [];
      //循环数据
      for (let j = start; j < this.showData.length; j++) {
        let data = this.showData[j].dataList;
        let dto = {};
        //循环列
        for (let i = 0; i < this.lieList.length; i++) {
          switch (this.lieList[i].value) {
            case "0":
              dto.name = data[i];
              break;
            case "1":
              dto.x = data[i];
              break;
            case "2":
              dto.y = data[i];
              break;
            case "3":
              dto.h = data[i];
              break;
            case "4":
              dto.newX = data[i];
              break;
            case "5":
              dto.newY = data[i];
              break;
            case "6":
              dto.newH = data[i];
              break;
            case "7":
              dto.code = data[i];
              break;
            case "8":
              dto.node = data[i];
              break;
            case "9":
              dto.other = data[i];
              break;
            case "10":
              dto.yaw = data[i];
              break;
            case "11":
              dto.pitch = data[i];
              break;
            case "12":
              dto.roll = data[i];
              break;
            case "13":
              dto.salt = data[i];
              break;
            case "14":
              dto.gh = data[i];
              break;
          }
        }
        this.oldData.push(dto);
      }
      this.showData = [];
      this.dataList = [];
      this.dialogVisible1 = false;
    },
    //合并两个json，同key时 默认2将会覆盖1的值
    twoJsonMerge(json1, json2) {
      let length1 = 0,
        length2 = 0,
        jsonStr,
        str;
      for (let ever in json1) length1++;
      for (let ever in json2) length2++;
      if (length1 && length2) str = ",";
      else str = "";
      jsonStr = (
        window.JSON.stringify(json1).replace(/,}/, "}") +
        window.JSON.stringify(json2).replace(/,}/, "}")
      ).replace(/}{/, str);
      return window.JSON.parse(jsonStr);
    },
    //保存格式
    saveFormat() {
      (this.format.lie = window.JSON.stringify(this.lieList)),
        (this.format.symbol = this.symbol);

      request({
        url: "/accuracyFormat",
        method: "post",
        data: this.format
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.getFormat();
          this.innerVisible = false;
        }
      });
    },
    updateFormat() {
      let format = this.formatList[this.template];

      (format.lie = window.JSON.stringify(this.lieList)),
        (format.symbol = this.symbol);

      request({
        url: "/accuracyFormat",
        method: "put",
        data: format
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.getFormat();
        }
      });
    },
    delFormat() {
      if (this.template == null) {
        return;
      }
      //获取当前所选中的格式id
      let id = this.formatList[this.template].id;
      request({
        url: `/accuracyFormat/${id}`,
        method: "delete"
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.template = null;
          this.getFormat();
        }
      });
    },
    //提交表单中的数据到后台验证是否合格
    submitValid(flag) {
      if (this.tableData.length <= 0) {
        this.$message({
          type: "error",
          message: "没有数据"
        });
        return;
      }
      if (flag == 1) {
        let name = this.item1.name;
        name = name.replace(/\s+/g, "");
        console.log(name.length);
        if (name == null || name == "") {
          this.$message({
            type: "warning",
            message: "项目名不能为空"
          });
          return;
        }

        if (this.thatUser.id == null || this.thatUser.phone == "") {
          this.$message({
            type: "warning",
            message: "请选择联系人"
          });
          return;
        } else {
          this.item1.userLinkId = this.thatUser.id;
        }
      }

      if (!this.isDataBase) {
        let temp = this.tableData[0];
        if (
          temp.oldX == null ||
          temp.oldY == null ||
          temp.oldH == null ||
          temp.newX == null ||
          temp.newY == null ||
          temp.newH == null
        ) {
          this.$message({
            type: "error",
            message: "数据不完整"
          });
          return;
        }
      }

      request({
        url: `/areaParam/validData/${this.model}/${flag}`,
        method: "post",
        data: {
          data: this.tableData,
          oldItem: this.item1,
          newItem: this.item2,
          isDataBase: this.isDataBase
        }
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          });

          let vrmsSum = 0;
          let hrmsSum = 0;
          let num = 0;
          if (res.data.param != null) {
            this.sevenPar = res.data.param;
          }
          let dataList = res.data.data;

          let tempList = [];
          for (let i = 0; i < dataList.length; i++) {
            for (let dto of this.tableData) {
              //点名相等时
              if (dataList[i].name == dto.name) {
                if (dto.isUse != true) {
                  vrmsSum += dataList[i].z;
                  hrmsSum += dataList[i].rms;
                  num++;
                }
                dataList[i].x = dataList[i].x.toFixed(3);
                dataList[i].y = dataList[i].y.toFixed(3);
                dataList[i].z = dataList[i].z.toFixed(3);
                dataList[i].rms = dataList[i].rms.toFixed(3);
                //将结果合并
                tempList.push(this.twoJsonMerge(dto, dataList[i]));
                break;
              }
            }
          }
          //将结果返回
          this.tableData = tempList;
          this.pointValid();

          if (num >= 20) {
            let temp = (vrmsSum + hrmsSum) / (num * 2);
            this.accuracy = Math.sqrt(temp);
          } else if (num > 0) {
            this.accuracy = (vrmsSum + hrmsSum) / num;
          } else {
            this.accuracy = null;
          }
        }
      });
    },
    pointValid() {
      for (let data of this.tableData) {
        if (data.z > this.levelData.h || data.rms > this.levelData.p) {
          data.isNotUse = true;
        } else {
          data.isNotUse = false;
        }
      }
    },
    //根据7参数计算点
    computer() {
      if (this.oldData.length <= 0) {
        this.$message({
          type: "error",
          message: "没有数据"
        });
        return;
      }
      let sevenPar = this.sevenPar;
      if (
        sevenPar.dX == null ||
        sevenPar.dY == null ||
        sevenPar.dZ == null ||
        sevenPar.Cita_X == null ||
        sevenPar.Cita_Y == null ||
        sevenPar.Cita_Z == null ||
        sevenPar.k == null
      ) {
        this.$message({
          type: "error",
          message: "7参数不完整"
        });
        return;
      }

      request({
        url: "/areaParam/computer",
        method: "post",
        data: {
          data: this.oldData,
          sevenPar: sevenPar,
          oldItem: this.item1,
          newItem: this.item2
        }
      }).then(res => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          });

          let temp = [];
          this.newData = res.data;
          for (let data of this.newData) {
            for (let old of this.oldData) {
              if (old.name == data.name) {
                temp.push(this.twoJsonMerge(old, data));
              }
            }
          }
          this.newData = temp;
        }
      });
    },
    selectHeader(value) {
      this.header0 = false;
      this.header1 = false;

      for (let i of value) {
        if (i == 0) {
          this.header0 = true;
        }
        if (i == 1) {
          this.header1 = true;
        }
      }
    },
    exportData() {
      request({
        url: "/file/upload/areaParam/export",
        method: "post",
        data: {
          data: this.newData,
          header: this.header,
          symbol: this.symbol,
          oldItem: this.item1,
          newItem: this.item2,
          exportFormat: this.exportFormat
        },
        responseType: "blob"
      }).then(res => {
        const { content, filename } = res;

        const blob = new Blob([content]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = filename;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, filename);
        }
      });
    },
    //得到数据库中的点
    submitData(name) {
      let item1 = this.item(this.item1);
      let item2 = this.item(this.item2);

      item1.name = name;
      request({
        url: "/data/point",
        method: "post",
        data: {
          item1: item1,
          item2: item2
        }
      }).then(data => {
        this.tableData = data.data;
        this.isDataBase = true;
      });
    },
    item(item) {
      //深拷贝
      let item1 = JSON.parse(JSON.stringify(item));
      //选择规则
      if (item.zb != "BLH") {
        delete item1.dd;
      }
      if (item.zb != "xyh") {
        delete item1.zw1;
        delete item1.zw2;
        delete item1.zw3;
        delete item1.x;
        delete item1.y;
        delete item1.t;
        delete item1.zyzw;
      }
      return item1;
    },
    //输出对点到文件
    downloadPoint() {
      if (this.tableData[0].isNotUse == null) {
        return;
      }
      let data = {
        data: this.tableData,
        oldItem: this.item1,
        newItem: this.item2
      };
      if (this.model == 0) {
        data.sevenPar = this.sevenPar;
      } else if (this.model == 1) {
        delete data.sevenPar;
        data.fourPar = this.sevenPar;
      }
      request({
        url: "/file/upload/areaParam/exportPoint",
        method: "post",
        data: data,
        responseType: "blob"
      }).then(res => {
        const { content, filename } = res;
        const blob = new Blob([content]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = filename;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, filename);
        }
      });
    },
    //导出kml
    exportKml() {
      if (this.item2.yqq != "CGCS2000" && this.item2.yqq != "WGS84") {
        this.$message({
          type: "warning",
          message: "只有CGCS2000和WGS84才能导出kml !"
        });
        return;
      }
      if (this.newData.length == 0) {
        this.$message({
          type: "warning",
          message: "数据不能为空 !"
        });
        return;
      }
      request({
        url: "/file/upload/kml",
        method: "post",
        data: {
          data: this.newData,
          newItem: this.item2,
          kmlValue: this.kmlValue
        },
        responseType: "blob"
      }).then(res => {
        const { content, filename } = res;
        const blob = new Blob([content]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = filename;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, filename);
        }
      });
    },
    //归零
    paramCE() {
      this.sevenPar = {
        dX: 0,
        dY: 0,
        dZ: 0,
        Cita: 0,
        Cita_X: 0,
        Cita_Y: 0,
        Cita_Z: 0,
        k: 1
      };
    },
    //获取区域参数
    getAreaParamRecord() {
      request({
        url: "/areaParamRecord",
        method: "get"
      }).then(res => {
        if (res.flag) {
          let list = res.data;
          this.projectList = list.map(record => {
            record.label = record.name;
            record.value = record.jsonContent + " " + record.id;
            return record;
          });
        }
      });
    },
    selectProject(value) {
      let v = value[0].split(" ");
      let data = JSON.parse(v[0]);
      this.project = data;
    },
    usePrject() {
      this.item1 = JSON.parse(JSON.stringify(this.project.item1));
      this.item2 = JSON.parse(JSON.stringify(this.project.item2));
      this.sevenPar = JSON.parse(JSON.stringify(this.project.param));
      this.model = JSON.parse(JSON.stringify(this.project.model));
      this.openProject = false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getMapValue() {
      let map = this.$el.getElementsByTagName("iframe")[0].contentWindow;

      console.log(map.names);

      this.submitData(
        "Ata473,Ata456,Ata472,Ata484,Ata486,Ata455,Ata554,Ata495,Ata483"
      );
      map.location.reload(true);
      this.openMap = false;
    },
    openMapValue(type) {
      this.openMap = true;
      let map = this.$el.getElementsByTagName("iframe")[0].contentWindow;

      let data = null;
      if (type == 1) {
        data = JSON.stringify(this.oldData);
      } else if (type == 2) {
        data = JSON.stringify(this.newData);
      }
      map.setCoords(data);

      map.location.reload(true);
    },
    //图标的默认样式
    iconDefault(value) {
      switch (value) {
        case "http://www.qgisw.com/label/1.png":
        case "http://www.qgisw.com/label/2.png":
        case "http://www.qgisw.com/label/3.png":
        case "http://www.qgisw.com/label/4.png":
        case "http://www.qgisw.com/label/7.png":
        case "http://www.qgisw.com/label/8.png":
        case "http://www.qgisw.com/label/10.png": {
          this.kmlValue.iconColor = "#FF0000";
          this.kmlValue.iconRatio = 0.4;
          this.kmlValue.iconColorOpaque = 100;

          this.kmlValue.labelRatio = 0.4;
          this.kmlValue.labelColor = "#FFFFFF";
          this.kmlValue.labelColorOpaque = 100;
          break;
        }
        case "http://www.qgisw.com/label/5.png":
        case "http://www.qgisw.com/label/6.png":
        case "http://www.qgisw.com/label/9.png": {
          this.kmlValue.iconColor = "#FF0000";
          this.kmlValue.iconRatio = 0.8;
          this.kmlValue.labelRatio = 0.6;
          this.kmlValue.iconColorOpaque = 100;
          this.kmlValue.labelColorOpaque = 100;
          this.kmlValue.labelColor = "#FFFFFF";
          break;
        }
      }
    }
  }
};
</script>
