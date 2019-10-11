<template>
  <div style="margin: 20px">
    <el-form :inline="true">
      <el-form-item label-width="20px">
          <el-input placeholder="公司名称">
              <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
      </el-form-item>
      <el-form-item>
          <el-button icon="el-icon-search"></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column
        prop="date"
        label="公司名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="充值前金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="本次充值金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="充值类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="充值时间">
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
      tatol: 100
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
