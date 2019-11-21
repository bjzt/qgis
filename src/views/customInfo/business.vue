<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :span="22">
        <el-form :inline="true">
          <el-form-item label-width="20px">
              <el-input v-model="map.name" placeholder="公司名称">
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
        prop="oldBalance"
        label="操作前金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nowMoney"
        label="本次消费金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="playLabel"
        label="充值类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created"
        width="180"
        label="充值时间">
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注">
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
      playEnum: [],//支付方式 枚举
      tableData: [],
      linkPhone: {}, //联系人
      listLoading: false,//数据加载等待动画
      listQuery: {
        currentPage: 1,
        pageSize: 5,
      },
      total: 0,
      linkPhoneVisible: false, //弹窗默认关闭
      map: {
        name: "",
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
        url: "/userOrder/list",
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
