<template>
  <div style="margin: 20px">
    <el-tabs type="card">
      <el-tab-pane label="按点计费折扣">
        <el-row>
          <el-col :span="20">
            <el-form :inline="true">
              <el-form-item label-width="20px">
                <el-select v-model="service">
                  <el-option 
                  v-for="(item,index) in serviceList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label-width="20px">
                  <el-button size="small" @click="discount = {};dialogVisible = true;isCreate = true" type="success">添加新折扣</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div style="position:absolute;right:20px;top:20px;z-index:9">
          <el-button type="primary" @click="getList" size="small" icon="el-icon-refresh"></el-button>
        </div>
        <el-row> 
          <el-col :xs="24" :xl="16" :lg="16" :sm="24" :md="24">
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
                prop="price"
                label="价格"
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
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form v-if="service==0" :model="config">
              <el-row>
                <el-col :xs="18" :xl="18" :lg="18" :sm="24" :md="24">
                  <h2 style="text-align: center">在线坐标转换</h2>
                  <el-form-item label="单位价格" :label-width="inputWidth">
                    <el-input size="small" v-model="config.price">
                      <el-button size="small" slot="append">元</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="最大上传点数量" :label-width="inputWidth">
                    <el-input size="small" v-model="config.maxPointNumber">
                      <el-button size="small" slot="append">个</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="最大跨度" :label-width="inputWidth">
                    <el-input size="small" v-model="config.maxKD">
                      <el-button size="small" slot="append">km</el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item :label-width="inputWidth">
                    <el-button size="small" type="primary">修改</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-dialog
          title="折扣信息"
          :visible.sync="dialogVisible"
          width="50%">
          <el-form>
              <!-- :rules="customerRules" -->
            <el-form-item label="折扣">
                <el-input v-model="discount.discount"></el-input>
            </el-form-item>

            <el-form-item label="价格">
                <el-input v-model="discount.price"></el-input>
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
      inputWidth: '110px',
      service: 0,
      serviceList: [],
      isCreate: true, 
      dialogVisible: false, 
      listLoading: false,//数据加载等待动画
      listQuery: {
        currentPage: 1,
        pageSize: 5,
      },
      config: {},
      total: 0,
      linkPhoneVisible: false, //弹窗默认关闭
      map: {
        name: "",
        status: 0
      }//查询条件
    }
  },
  watch:{
    service(){
      this.getList()
    }
  },
  created() {
    this.fetchData()
    this.serviceList = [{
      label: "在线转换",
      value: 0
    },{
      label: "验证导入",
      value: 1
    },{
      label: "参数计算",
      value: 2
    },{
      label: "区域计算",
      value: 3
    },{
      label: "航空设计",
      value: 4
    },{
      label: "精度检测",
      value: 5
    },]
  },
  methods: {
    fetchData() {
      this.getList()
      this.getConfig()
    },
    getConfig(){
      request({
        url: "/data/config",
        method: "get",
      }).then(data => {
        this.config = data.data;
      })
    },
    getList() {
      //查询列表
      this.listLoading = true;
      request({
        url: `/discount/list/${this.service}`,
        method: "post",
        params: this.listQuery,
      }).then(data => {
        this.listLoading = false;
        this.tableData = data.data.rows;
        this.total = data.data.total;
      })
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
        url: `/discount/${this.service}`,
        method: "post",
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
    del(id){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        request({
          url: `/discount/${id}`,
          method: "delete"
        }).then(res => {
          if (res.flag) {
            this.$message({
              type: "success",
              message: res.message
            })
            this.getList()
          }
        })
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
