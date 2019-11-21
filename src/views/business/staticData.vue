<template>
  <div style="margin: 20px">
    <div style="position:absolute;right:20px;top:20px;z-index:9">
      <el-button type="primary" size="small">模板下载</el-button>
      <el-button type="primary" @click="dialogVisible = true" size="small">上传</el-button>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="数据上传申请">
        <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%">
          <el-table-column
              prop="fileName"
              align="right"
              label="文件名">
          </el-table-column>
          <el-table-column
              prop="fileType"
              align="right"
              label="数据类型"
              width="100">
          </el-table-column>
          
          <el-table-column
              prop="note"
              align="right"
              label="数据说明">
          </el-table-column>
          <el-table-column
              prop="fileSize"
              align="right"
              label="文件大小">
              <template slot-scope="scope">
                <span v-if="scope.row.fileSize != null"> {{scope.row.fileSize}}Mb </span>
              </template>
          </el-table-column>
          <el-table-column
              prop="created"
              align="right"
              label="上传时间"
              width="180">
          </el-table-column>
          <el-table-column
              prop="note"
              align="right"
              label="操作">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">审核中</span>
              
              <el-button-group v-if="scope.row.status == 1" >
                <a :href="`${baseUrl}/file/upload/download?filePath=${scope.row.filePath}`" style="display: inline-block;">
                  <el-button size="mini" type="primary">下载</el-button>
                </a>
                <el-button size="mini" @click="del(scope.row.id)" type="danger">删除</el-button>
              </el-button-group>
              <el-button-group v-if="scope.row.status == -1" >
                <a :href="`${baseUrl}/file/upload/download?filePath=${scope.row.filePath}`" style="display: inline-block;">
                  <el-button size="mini" type="primary">下载</el-button>
                </a>
                <el-button size="mini" @click="del(scope.row.id)" type="danger">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="文件上传"
      :visible.sync="dialogVisible"
      width="500px">

      <el-form ref="file" :model="file">
        <el-form-item label="文件类型">
          <el-select v-model="file.fileType" placeholder="请选择文件类型">
            <el-option label="GNSS/PPK/PPP" value="GNSS/PPK/PPP"></el-option>
            <el-option label="PTK原始文件夹" value="PTK原始文件夹"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据说明">
          <el-input v-model="file.note" ></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="url"
        style="display: inline-block"
        :on-success="handlePreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :show-file-list="false"
        :data="file"
        :headers="importHeaders">
        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      url: process.env.VUE_APP_BASE_API+"/file/upload/file",
      importHeaders: {
        'X-Token': getToken()
      },
      baseUrl: process.env.VUE_APP_BASE_API,
      file: {},
      tableData: [],
      fileList: [],
      dialogVisible: false,
      listLoading: false,//数据加载等待动画
      listQuery: {
        currentPage: 1,
        pageSize: 5,
      },
      total: 0,
      map: {
        userId: ""
      }//查询条件
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.getList()
    },
    getList() {
      //查询列表
      this.listLoading = true;
      request({
        url: "/fileRecord/list",
        method: "post",
        params: this.listQuery,
        data: this.map
      }).then(data => {
        this.listLoading = false;
        this.tableData = data.data.rows;
        this.total = data.data.total;
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      this.dialogVisible = false
      this.getList()
    },
    //文件上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    del(id){
      request({
        url: `/fileRecord/${id}`,
        method: "delete"
      }).then(data => {
        if (data.flag) {
          this.getList()
          this.$message({
            type: "success",
            message: data.message
          })
        }
      })
    }
  }
}
</script>
