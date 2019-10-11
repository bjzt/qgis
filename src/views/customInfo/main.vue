<template>
  <div style="margin: 20px">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息">
        <el-form size="mini">
          <el-form-item label="公司名称" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="信用代码" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="主账号" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="负责人姓名" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="快递联系方式" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="坐标转换支付" label-width="120px">
            <el-select v-model="value" placeholder="请选择">
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> -->
              <el-option label="按次按点结算"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="包年服务开始" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="包年服务结束" label-width="120px">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="余额" label-width="120px">
            <el-input></el-input>
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
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button size="mini">添加图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="预览" label-width="120px">
            <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              fit="scale-down"></el-image>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    }
  }
}
</script>
