<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :span="20">
        <el-form :inline="true">
          <el-form-item label-width="20px">
              <el-input v-model="map.name" size="small" placeholder="用户姓名">
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
        prop="operation"
        label="操作"
        width="180">
      </el-table-column>
      <el-table-column
        prop="method"
        label="方法"
        width="180">
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" width="180">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="创建时间">
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
        name: "",
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
        url: "/log/list",
        method: "get",
        params: this.listQuery,
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
     * 修改联系人状态
     */
    update(userLink){
      request({
        url: `/userLink`,
        method: "put",
        data: userLink
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
      this.linkPhone.userId = '10'
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
