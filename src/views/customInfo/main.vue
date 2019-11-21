<template>
  <div style="margin: 20px;">
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <el-form v-model="customInfo" size="small">
          <el-form-item label="公司名称" label-width="120px">
            <span v-text="customInfo.companyName"></span>
          </el-form-item>
          <el-form-item label="信用代码" label-width="120px">
            <span  v-text="customInfo.credit"></span>
          </el-form-item>
          <el-form-item label="主账号" label-width="120px">
            <span v-text="customInfo.username"></span>
          </el-form-item>
          <el-form-item label="负责人姓名" label-width="120px">
            <span v-text="customInfo.name"></span>
          </el-form-item>
          <el-form-item label="负责人电话" label-width="120px">
            <span v-text="customInfo.phone"></span>
          </el-form-item>
          <el-form-item label="服务范围" label-width="120px">
            <table>
              <tr v-for="userArea of customInfo.userArea" :key="userArea.id">
                <td style="padding-right: 10px">{{userArea.areaName}}</td>
                <td>{{userArea.end}}</td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item label="余额" label-width="120px">
            <span v-text="customInfo.balance"></span>
          </el-form-item>
          <h4 style="margin-left: 50px;color:red">上传营业执照、资质证书、开票信息，一般纳税人请提供一般纳税人证明</h4>
          <el-form-item label="公司文件" label-width="120px">
            <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :show-file-list="false"
              :headers="importHeaders"
              :on-success="success">
              <el-button size="mini">添加图片</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
          <el-form-item label="预览" label-width="120px">
            <!-- <img v-for="item in this.customInfo.imagesList" :src="item" :key="item" /> -->
            <el-image
              v-for="item in customInfo.imagesList"
              :key="item"
              style="width: 100px; height: 100px"
              :src="item"
              @mouseover="showDel(item)"
              :preview-src-list="customInfo.imagesList"
              fit="scale-down"></el-image>
              <br/>
              <div style="display: inline-block;width: 100px;text-align: center"  v-for="item in customInfo.imagesList" :key="item">
                <span style="display: none;" :ref="item"><el-button  size="mini" type="danger" @click="changedel(item)">删除</el-button></span>
              </div>
          </el-form-item>
        </el-form>
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_BASE_API+"/file/upload/img",
      importHeaders: {
        'X-Token': getToken()
      },
      customInfo: {
        userArea: [{
          play: 1
        }]
      },
      playList: [{
        label: '按次按点结算',
        value: 1
      },{
        label: '包月结算',
        value: 2
      },{
        label: '包季结算',
        value: 3
      },{
        label: '包年结算',
        value: 4
      }],
      fileList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.getUser()
    },
    getUser(){
      request({
        url: "/user/one",
        method: "get",
      }).then(data => {
        this.customInfo = data.data;
        if (this.customInfo.images != null) {
          
          let imgList = this.customInfo.images.split(";")
          this.customInfo.imagesList = []
          for (let img of imgList){
            this.customInfo.imagesList.push(`${process.env.VUE_APP_BASE_API}/file/upload/download?filePath=${img}`)
          }
        }      
      })
    },
    //图片上传成功
    success(res, file, fileList) {
      if (res.flag) {
        this.$message({
          type:"success",
          message: res.message
        })
        this.getUser()
      }
    },
    showDel(key){
      let mask = this.$refs[key][0];
      
      if(mask.style.display == 'none') {
        mask.style.display = 'inline-block';
      }else {
        mask.style.display = 'none';
      }
    },
    changedel(url){
      let base = `${process.env.VUE_APP_BASE_API}/file/upload/download?filePath=`
      url = url.substring(base.length)
      request({
        url: `/user/image?filePath=${url}`,
        method: "delete"
      }).then(data => {
        if (data.flag) {
          this.$message({
            type:"success",
            message: data.message
          })
          this.getUser()
        }
      })
    }
  }
}
</script>
