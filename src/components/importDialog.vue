<template>
    <!-- 导入弹窗 Start -->
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
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :headers="importHeaders">
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
                  inactive-color="#ff4949">
                </el-switch>
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
                  :key="`${JSON.stringify(item)}`"
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
        <div style="height: 300px; overflow: auto;" v-if="showData.length == 0">
            <div v-for="(item,index) in dataList" :key="index" v-text="item"></div>
        </div>
        <div style="height: 300px; overflow: auto;" v-else>
            <table style="text-align: center;border-collapse: collapse;">
              <tr>
                <th style="border: 2px solid #cad9ea;color: #666;padding:5px">#</th>
                <th style="border: 2px solid #cad9ea;color: #666;padding:5px" v-for="(item,index) in lieList" :key="index" v-text="item.label"></th>
              </tr>
              <tr v-for="(itemList,index) in showData" :key="index" :class="{select: itemList.isSelect}">
                <td style="border: 2px solid #cad9ea;color: #666;padding:5px" v-text="index+1"></td>
                <td style="border: 2px solid #cad9ea;color: #666;padding:5px" v-for="(item,index) in itemList.dataList" :key="index" v-text="item"></td>
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
    <!-- 导入弹窗 end -->
</template>
<style lang="scss">
.select{
  background-color: bisque
}
</style>
<script>
export default {
  name: 'importDialog',
  props: {
    dialogVisible: {//弹窗开关
      type: Boolean,
      required: true
    },
    symbol: {//分隔符
      type: Number,
      required: true
    },
    start: {//开始行
      type: Number,
      required: true
    },
    baseUrl: {//baseUrl
      type: String,
      required: true
    },
    dataLis: {//原始数据
      type: Array,
      required: true
    },
    showData: {//格式化后的数据
      type: Array,
      required: true
    },
    lieOptions: {//列选择项
      type: Array,
      required: true
    },
    symbolOptions: {//分割符选择项
      type: Array,
      required: true
    },
    formatList: {//格式的选择项
      type: Array,
      required: true
    }
  },
  methods:{
    
  }
}
</script>