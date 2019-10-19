<template>
  <div style="margin: 20px;">
    <el-tabs type="card">
      <el-tab-pane label="基本信息">
        <el-form v-model="customInfo" size="small">
          <el-form-item label="公司名称" label-width="120px">
            <el-input v-model="customInfo.companyName"></el-input>
          </el-form-item>
          <el-form-item label="信用代码" label-width="120px">
            <el-input v-model="customInfo.credit"></el-input>
          </el-form-item>
          <el-form-item label="主账号" label-width="120px">
            <el-input v-model="customInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名" label-width="120px">
            <el-input v-model="customInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" label-width="120px">
            <el-input v-model="customInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="快递联系方式" label-width="120px">
            <el-input v-model="customInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="坐标转换支付" label-width="120px">
            <el-select disabled v-model="customInfo.play" placeholder="请选择">
              <el-option
                v-for="item in playList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="包年服务开始" label-width="120px">
            <el-input v-model="customInfo.start"></el-input>
          </el-form-item>
          <el-form-item label="包年服务结束" label-width="120px">
            <el-input v-model="customInfo.end"></el-input>
          </el-form-item>
          <el-form-item label="余额" label-width="120px">
            <el-input v-model="customInfo.balance"></el-input>
          </el-form-item>
          <h4 style="margin-left: 50px;color:red">上传营业执照、资质证书、开票信息，一般纳税人请提供一般纳税人证明</h4>
          <el-form-item label="公司文件" label-width="120px">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button size="mini">添加图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="预览" label-width="120px">
            <el-image
              v-for="item in this.customInfo.imagesList"
              :key="item"
              style="width: 100px; height: 100px"
              :src="item"
              fit="scale-down"></el-image>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      customInfo: {
        play: 1
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
        url: "/user/10",
        method: "get",
      }).then(data => {
        this.customInfo = data.data;
        if (this.customInfo.images != null) {
          this.customInfo.imagesList = this.customInfo.images.split(";")
        }
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
