<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :span="20">
        <el-form :inline="true">
          <el-form-item label-width="20px">
              <el-input placeholder="用户姓名">
                  <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" size="small" icon="el-icon-refresh"></el-button>
        <el-button type="primary" size="small">模板下载</el-button>
        <el-button type="primary" size="small">申请联系人</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="small"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="date"
        label="联系人姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="联系人电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="审核状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 5,
      tatol: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
