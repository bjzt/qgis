<template>
  <div style="margin: 20px">
    <el-form>
      <el-form-item label="基本信息">
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label-width="120px" label="联系人(必填)">
                <el-select size="small" placeholder="请选择">
                </el-select>
                <span>联系人作为安全责任人，其手机接收短信验证码</span>
              </el-form-item>
              <el-form-item label-width="120px" label="项目名称(必填)">
                <el-input size="small" placeholder="50字以内"></el-input>
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
                <el-select size="small" placeholder="请选择">
                  <el-option label="CGCS200"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="源坐标系">
                <el-select size="small" placeholder="请选择">
                  <el-option label="BLH"></el-option>
                </el-select>
                <el-select size="small" placeholder="请选择">
                  <el-option label="DD.MMS"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="120px" label="中央子午线">
                <el-select size="small" placeholder="请选择">
                  <el-option label="114"></el-option>
                </el-select>
                <el-select size="small" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
                <el-select size="small" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="原高程">
                <el-select size="small" placeholder="请选择">
                  <el-option label="大地高"></el-option>
                </el-select>
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
                <el-select size="small" placeholder="请选择">
                  <el-option label="CGCS200"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="目标坐标系">
                <el-select size="small" placeholder="请选择">
                  <el-option label="xyh"></el-option>
                </el-select>
                <el-select size="small" placeholder="请选择">
                  <el-option label="DD.MMS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" label="目标高程">
                <el-select size="small" placeholder="请选择">
                  <el-option label="大地高"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="120px" label="中央子午线">
                <el-select size="small" placeholder="请选择">
                  <el-option label="高斯3度带"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="120px" >
                <el-select size="small" placeholder="请选择">
                  <el-option label="114"></el-option>
                </el-select>
                <el-select size="small" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
                <el-select size="small" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label-width="120px" label="投影面高(m)">
                <el-select size="small" placeholder="请选择">
                  <el-option label="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="数据上传" label-width="120px">
        <div>
          <el-switch
            v-model="fileUpload"
            active-text="文件上传"
            inactive-text="文本上传">
          </el-switch>
          <el-form>
            <el-form-item label="文件格式" label-width="120px">
              
            </el-form-item>
            <el-form-item label="上传文件" label-width="120px">
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
                <el-button size="mini">上传文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="数据上传地址" label-width="120px">
              
            </el-form-item>
            <el-form-item label="手机号" label-width="120px">
              
            </el-form-item>
          </el-form>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
        fileUpload: true
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
