<template>
  <div style="margin: 20px">
    
    <el-row>
      <el-col :span="22">
        <el-form :inline="true">
          <el-form-item label="关键字:">
              <el-input v-model="map.name" size="small" placeholder="公司名称/主账号"></el-input>
          </el-form-item>
          <el-form-item label="选择时间范围:">
              <el-date-picker
                v-model="map.date"
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button size="small" icon="el-icon-search" type="primary"></el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" icon="el-icon-refresh"></el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="conpanyName"
        label="公司名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="公司账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="使用人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="使用人电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="oldFile"
        label="源文件"
        width="180">
      </el-table-column>
      <el-table-column
        prop="newFile"
        label="转换文件"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created"
        label="转换时间">
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
      listQuery: {
        currentPage: 1,
        pageSize: 5,
      },
      total: 0,
      map: {
        date: []
      } //查询条件
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
        url: "/changeFileRecord/list",
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
