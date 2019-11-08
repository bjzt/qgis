<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :span="20">
        <el-form :inline="true">
          <el-form-item label-width="20px">
              <el-input v-model="map.indexName" size="small" placeholder="用户姓名">
                  <el-button slot="append" @click="selectByName" icon="el-icon-search"></el-button>
              </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div style="position:absolute;right:20px;top:20px;z-index:9">
      <el-button type="primary" @click="getList" size="small" icon="el-icon-refresh"></el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading.body="listLoading" 
      element-loading-text="拼命加载中"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="主账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="indexName"
        label="负责人姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="文件名">
      </el-table-column>
      <el-table-column
        prop="fileType"
        label="数据类型">
      </el-table-column>
      <el-table-column
        prop="note"
        label="数据说明">
      </el-table-column>
      <el-table-column
        prop="fileSize"
        label="文件大小">
        <template slot-scope="scope">
            <span v-if="scope.row.fileSize != null"> {{scope.row.fileSize}}Mb </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==-1">未通过</span>
          <span v-if="scope.row.status==0">审核中</span>
          <span v-if="scope.row.status==1">已通过</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        label="上传时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" @click="scope.row.status = 1; update(scope.row)" size="mini">通过</el-button>
            <el-button type="success" @click="scope.row.status = -1; update(scope.row)" size="mini">否决</el-button>
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
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      tableData: [],
      listLoading: false,//数据加载等待动画
      listQuery: {
        currentPage: 1,
        pageSize: 5,
      },
      total: 0,
      linkPhoneVisible: false, //弹窗默认关闭
      map: {
        status: 0
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
        url: "/fileRecord/list/all",
        method: "post",
        params: this.listQuery,
        data: this.map
      }).then(data => {
        this.listLoading = false;
        this.tableData = data.data.rows;
        this.total = data.data.total;
      })
    },
    selectByName(){
      this.getList()
    },
    /**
     * 修改文件状态
     */
    update(fileRecord){    
      request({
        url: `/fileRecord`,
        method: "put",
        data: fileRecord
      }).then(data => {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        this.getList()
      })
    },
    addLinkPhone(){
      this.api({
        url: "/userLink",
        method: "post",
        data: this.linkPhone
      }).then(data => {
        this.linkPhoneVisible = false
        this.getList()
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    }
  }
}
</script>
