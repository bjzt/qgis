<template>
  <div style="margin: 20px">
    <el-form>
      <el-form-item label="基本信息">
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="120px" label="联系人(必填)">
                <el-select size="small" v-model="userLink.phone" placeholder="请选择">
                  <el-option
                    v-for="item in userLinkOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>联系人作为安全责任人，其手机接收短信验证码</span>
              </el-form-item>
              <el-form-item label-width="120px" label="项目名称(必填)">
                <el-input size="small" v-model="item1.name" placeholder="50字以内"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="源参数">
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="120px" label="源确球">
                <el-select size="small" v-model="item1.yqq" placeholder="请选择">
                  <el-option label="CGCS2000" value="CGCS2000"></el-option>
                  <el-option label="北京54" value="北京54"></el-option>
                  <el-option label="西安80" value="西安80"></el-option>
                  <el-option label="WGS84" value="WGS84"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="源坐标系">
                <el-select size="small" v-model="item1.zb" placeholder="请选择">
                  <el-option label="BLH" value="BLH"></el-option>
                  <el-option label="XYZ" value="XYZ"></el-option>
                  <el-option label="xyh" value="xyh"></el-option>
                </el-select>
                <el-select size="small" :disabled="item1.zb != 'BLH'" v-model="item1.dd" placeholder="请选择">
                  <el-option label="DD.MMSS" value="DD.MMSS"></el-option>
                  <el-option label="DD.DDDD" value="DD.DDDD"></el-option>
                  <el-option label="DD°MM'SS''" value="DD°MM'SS''"></el-option>
                  <el-option label="DD:MM:SS" value="DD:MM:SS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="原高程">
                <el-select size="small" v-model="item1.mb" placeholder="请选择">
                  <el-option label="85国家高程" value="85国家高程"></el-option>
                  <el-option label="56黄海高程" value="56黄海高程"></el-option>
                  <el-option label="大地高" value="大地高"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="item1.zb == 'xyh'" label-width="120px">
                <el-select size="small" v-model="item1.zyzw" placeholder="请选择">
                  <el-option label="高斯3度带" value="高斯3度带"></el-option>
                  <el-option label="高斯6度带" value="高斯6度带"></el-option>
                  <el-option label="高斯自定义" value="高斯自定义"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="中央子午线">
                <el-select size="small" :disabled="item1.zb == 'BLH'"  placeholder="请选择">
                  <el-option label="114"></el-option>
                </el-select>
                <el-select size="small" :disabled="item1.zb == 'BLH'" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
                <el-select size="small" :disabled="item1.zb == 'BLH'" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="x/N加常数(km)">
                <el-input size="small" :disabled="item1.zb == 'BLH'" v-model="item1.x" style="width:250px"></el-input>
              </el-form-item>
              <el-form-item label-width="120px" label="y/E加常数(km)">
                <el-input size="small" :disabled="item1.zb == 'BLH'" style="width:250px" v-model="item1.y"></el-input>
              </el-form-item>
              <el-form-item label-width="120px" label="投影面高(m)">
                <el-input size="small" :disabled="item1.zb == 'BLH'" style="width:250px" v-model="item1.t"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="目标参数">
        <div>
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="120px" label="目标确球">
                <el-select size="small" v-model="item2.yqq" placeholder="请选择">
                  <el-option label="CGCS2000" value="CGCS2000"></el-option>
                  <el-option label="北京54" value="北京54"></el-option>
                  <el-option label="西安80" value="西安80"></el-option>
                  <el-option label="WGS84" value="WGS84"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="目标坐标系">
                <el-select size="small" v-model="item2.zb" placeholder="请选择">
                  <el-option label="BLH" value="BLH"></el-option>
                  <el-option label="XYZ" value="XYZ"></el-option>
                  <el-option label="xyh" value="xyh"></el-option>
                </el-select>
                <el-select size="small" :disabled="item2.zb != 'BLH'" v-model="item2.dd" placeholder="请选择">
                  <el-option label="DD.MMSS" value="DD.MMSS"></el-option>
                  <el-option label="DD.DDDD" value="DD.DDDD"></el-option>
                  <el-option label="DD°MM'SS''" value="DD°MM'SS''"></el-option>
                  <el-option label="DD:MM:SS" value="DD:MM:SS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="目标高程">
                <el-select size="small" v-model="item2.mb" placeholder="请选择">
                  <el-option label="85国家高程" value="85国家高程"></el-option>
                  <el-option label="56黄海高程" value="56黄海高程"></el-option>
                  <el-option label="大地高" value="大地高"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="120px" v-if="item2.zb == 'xyh'">
                <el-select size="small" v-model="item2.zyzw" placeholder="请选择">
                  <el-option label="高斯3度带" value="高斯3度带"></el-option>
                  <el-option label="高斯6度带" value="高斯6度带"></el-option>
                  <el-option label="高斯自定义" value="高斯自定义"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="中央子午线">
                <el-select size="small" :disabled="item2.zb == 'BLH'" placeholder="请选择">
                  <el-option label="114"></el-option>
                </el-select>
                <el-select size="small" :disabled="item2.zb == 'BLH'" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
                <el-select size="small" :disabled="item2.zb == 'BLH'" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label-width="120px" label="投影面高(m)">
                <el-input size="small" :disabled="item2.zb == 'BLH'" style="width:250px" v-model="item2.t"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="数据上传" label-width="120px">
        <div>
          <el-switch
            v-model="fileUpload"
            active-text="上传文件"
            inactive-text="文本框输入">
          </el-switch>
          <el-form>
            <el-form-item label="文件格式" label-width="120px">
              <span v-text="name"></span>
            </el-form-item>
            <el-form-item v-if="fileUpload" label="上传文件" label-width="120px">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :file-list="fileList">
                <el-button size="mini">上传文件</el-button>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item v-if="fileUpload" label="数据上传地址" label-width="120px">
              
            </el-form-item> -->
            <el-form-item v-if="!fileUpload" label="坐标转换内容" label-width="120px">
              <el-input style="width:400px" v-model="content" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="手机号" label-width="120px">
              <span v-text="thisPhone"></span>
            </el-form-item>
            <el-form-item label="短信验证" label-width="120px">
              <el-input style="width:250px" v-model="checkcode" size="small"></el-input> <el-button size="small">发送验证码</el-button>
            </el-form-item>
            <el-form-item label-width="120px">
              <el-button type="primary" size="small">开始转换坐标</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-form-item>
      <el-form-item label="数据下载" label-width="120px">
        <div>
          <el-form>
            <el-form-item label="写入数据" label-width="120px">
              
            </el-form-item>
            <el-form-item label="转换处理" label-width="120px">
              
            </el-form-item>
            <el-form-item label-width="120px">
              <el-button type="primary" size="small">查询结果</el-button>
            </el-form-item>
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
        fileUpload: true,//文件上传与文本上传切换
        checkcode: '',//验证码
        thisPhone: '',//当前选择的手机号
        content: '',//文本内容
        name: "",
        fileList: [],
        userLinkOption: [],//联系人选项
        userLink: {
          phone: null
        },
        item1: { //源对象
          name: "",
          yqq: 'CGCS2000',
          zb: 'xyh',
          dd: 'DD.MMSS',
          mb: '大地高',
          zyzw: '高斯自定义',
          y: 500,
          x: 500,
          t: 0
        },
        item2: {//目标对象
          yqq: 'CGCS2000',
          zb: 'xyh',
          dd: 'DD.MMSS',
          mb: '大地高',
          zyzw: '高斯自定义',
          t: 0
        },
        map: {
          userId: "10",
          status: 1 //审核通过的联系人
        }
    }
  },
  watch:{
    item1: {
      deep: true,
      handler(newV){
        this.fetchData()
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
        case 'xyh': this.name = '点名,x,y,h.txt / 点名,y,x,h.dat';break;
        case 'XYZ': this.name = '点名,X,Y,Z.txt';break;
        case 'BLH': this.name = `点名,B(${this.item1.dd}),L(${this.item1.dd}),H,未修正的天线高.txt`;break;
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
          link.label = link.name 
          link.value = link.id
        })
        this.userLinkOption = userLink
        console.log(this.userLinkOption)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
