<template>
  <div style="margin: 20px">
    <el-tabs type="card">
      <el-tab-pane label="按点计费折扣">
        <el-row>
          <el-col :span="20">
            <el-form :inline="true">
              <el-form-item label-width="20px">
                  <el-button size="small" @click="discount = {};dialogVisible = true;isCreate = true" type="success">添加新折扣</el-button>
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
            prop="discount"
            label="折扣"
            width="100">
          </el-table-column>
          <el-table-column
            prop="number"
            label="最低数据量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="updated"
            label="更新时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="id"
            label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click="discount=scope.row;dialogVisible=true;isCreate=false" size="mini" type="primary">修改</el-button>
                <el-button @click="del(scope.row.id)" size="mini" type="danger">删除</el-button>
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

        <el-dialog
          title="折扣信息"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form>
              <!-- :rules="customerRules" -->
            <el-form-item label="折扣">
                <el-input v-model="discount.discount"></el-input>
            </el-form-item>
        
            <el-form-item label="最低数据量">
                <el-input v-model.number="discount.number"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button v-if="isCreate" type="primary" @click="add">确 定</el-button>
            <el-button v-if="!isCreate" type="primary" @click="update">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="坐标单价设置">
        <el-form :model="point">
          <el-row>
            <el-col :xs="18" :xl="4" :lg="6" :sm="10" :md="8">
              <el-form-item label="坐标单价" :label-width="inputWidth">
                <el-input size="small" v-model="point.price">
                  <el-button size="small" slot="append">元</el-button>
                </el-input>
              </el-form-item>
            <!-- </el-col>
            <el-col :xs="24" :xl="8" :lg="8" :sm="18" :md="24"> -->
              <el-form-item label="最低消费点数" :label-width="inputWidth">
                <el-input size="small" v-model="point.number">
                  <el-button size="small" slot="append">个</el-button>
                </el-input>
              </el-form-item>
              <el-form-item :label-width="inputWidth">
                <el-button size="small" type="primary">修改</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
      discount: {},//折扣
      point: {},//点设置
      inputWidth: '100px',
      isCreate: true, 
      dialogVisible: false, 
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
        url: "/discount/list",
        method: "post",
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
     * 修改
     */
    update(){
      request({
        url: "/discount",
        method: "put",
        data: this.discount
      }).then(res => {
          if (res.flag) {
              this.$message({
              type: "success",
              message: res.message
          })
          this.dialogVisible = false
          this.getList()
          }
      })
    },
    add(){
      request({
        url: "/discount",
        method: "post",
        data: this.discount
      }).then(data => {
        if (res.flag) {
          this.$message({
            type: "success",
            message: res.message
          })
          this.dialogVisible = false
          this.getList()
        }
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
