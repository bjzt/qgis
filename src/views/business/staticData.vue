<template>
  <div style="margin: 20px">
    <div style="position:absolute;right:20px;top:20px;z-index:9">
      <el-button type="primary" size="small">模板下载</el-button>
      <el-button type="primary" size="small">上传文件</el-button>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
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
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tatol">
        </el-pagination>
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
