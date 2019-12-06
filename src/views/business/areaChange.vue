<template>
  <div style="margin: 20px">
      <el-form>
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
                    <el-input ref="x" size="mini" v-model.number="item1.x"></el-input>
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
                    <el-input ref="t" size="mini" v-model="item1.t"></el-input>
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
                    <el-input ref="x" size="mini" v-model="item2.x"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item prop="y" v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'" label-width="120px" label="y常数(km)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="y" size="mini" v-model="item2.y"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              
              <el-form-item prop="t" v-if="item2.zyzw=='高斯自定义' && item2.zb == 'xyh'" label-width="120px" label="投影面高(m)">
                <el-row>
                  <el-col :xs="18" :xl="6" :lg="6" :sm="6" :md="8">
                    <el-input ref="t" size="mini" v-model="item2.t"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
        </div>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
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
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

    },

  }
}
</script>
