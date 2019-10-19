<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :span="22">
        <el-form :inline="true">
          <el-form-item label-width="20px">
              <el-input size="small" v-model="map.companyName" placeholder="公司名称">
                  <el-button slot="append" @click="selectByName" icon="el-icon-search"></el-button>
              </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getList" size="small" icon="el-icon-refresh"></el-button>
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
        prop="companyName"
        label="公司名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="主账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        width="180"
        label="负责人姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="负责人电话">
      </el-table-column>
      <el-table-column
        prop="play"
        label="充值类型"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.play==1">按点按次支付</span>
          <span v-if="scope.row.play==2">包月</span>
          <span v-if="scope.row.play==3">包季</span>
          <span v-if="scope.row.play==4">包年</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="快递联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额"
        width="180">
      </el-table-column>
      <el-table-column
          prop="end"
          label="服务结束时间"
          width="180">
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
        companyName: "",
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
        url: "/user/list",
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
