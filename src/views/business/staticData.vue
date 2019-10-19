<template>
  <div style="margin: 20px">
    <div style="position:absolute;right:20px;top:20px;z-index:9">
      <el-button type="primary" size="small">模板下载</el-button>
      <el-button type="primary" size="small">上传文件</el-button>
    </div>
    <el-tabs type="card">
      <el-tab-pane label="GNSS数据申请">
        <el-table
        :data="tableData"
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%">
          <el-table-column
              prop="filename"
              align="right"
              label="文件名">
          </el-table-column>
          <el-table-column
              prop="created"
              align="right"
              label="上传时间">
          </el-table-column>
          <el-table-column
              prop="note"
              align="right"
              label="操作">
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
    }
  }
}
</script>
