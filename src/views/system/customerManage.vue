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
          <el-form-item>
            <el-button @click="customer={};dialogVisible=true;isCreate=true" size="small" type="primary">创建用户</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="recharge" size="small" type="success">充值</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="playService" size="small" type="success">购买服务</el-button>
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
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
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

    <el-dialog
      title="用户数据"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="customer" :model="customer" :rules="customerRules">
        <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="text" label="用户名" :label-width="labelWidth">
              <el-input ref="text" :disabled="!isCreate" v-model="customer.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="money" label="手机号" :label-width="labelWidth">
              <el-input ref="money" :disabled="!isCreate" v-model="customer.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="邮箱" :label-width="labelWidth">
              <el-input :disabled="!isCreate" v-model="customer.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="text" label="负责人" :label-width="labelWidth">
              <el-input ref="text" :disabled="!isCreate" v-model="customer.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="text" label="公司名称" :label-width="labelWidth">
              <el-input ref="text" :disabled="!isCreate" v-model="customer.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="money" label="余额" :label-width="labelWidth">
              <el-input ref="money" :disabled="!isCreate" v-model.number="customer.balance"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" v-if="!isCreate" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="服务范围" :label-width="labelWidth">
            <!-- <el-input v-model="customer.address"></el-input> -->
            <el-cascader v-model="data" :props="selectProps"></el-cascader>
          </el-form-item>
          </el-col>
        
          <el-col :xs="24" v-if="!isCreate" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="计费方式" :label-width="labelWidth">
              <el-switch
                :disabled="isCreate"
                v-model="flag"
                active-text="按时间计费"
                inactive-text="按点按次计费">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="!isCreate" :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <!-- <el-button v-if="flag" slot="append" @click="selectDateFormat">月</el-button> -->
            <el-form-item v-if="!flag" label="购买次数" :label-width="labelWidth">
              <el-input :disabled="isCreate" v-model="customer.playNumber"></el-input>
              <span>折扣 无</span>
            </el-form-item>
            <el-form-item v-if="flag" label="购买时间" :label-width="labelWidth">
              <el-input :disabled="isCreate" v-model="customer.playDate">
                <el-button slot="append" @click="selectDateFormat">月</el-button>
              </el-input>
              <span>时间最少一个月</span>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <div v-if="!isCreate" style="color:red;margin:10px;font-size:32px">120元</div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCustom">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="用户充值"
      :visible.sync="chargeDialogVisible"
      width="50%">
      <el-form ref="customer" :model="customer" :rules="customerRules">
        <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="公司名称" :label-width="labelWidth">
              <el-input disabled v-model="customer.companyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="手机号" :label-width="labelWidth">
              <el-input disabled v-model.number="customer.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item label="余额" :label-width="labelWidth">
              <el-input disabled v-model="customer.balance"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :xl="8" :lg="8" :sm="8" :md="8">
            <el-form-item prop="money" label="充值金额" :label-width="labelWidth">
              <el-input ref="money" v-model.number="customer.money"></el-input>
            </el-form-item>
          </el-col>
          
          
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chargeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="charge">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      customerRules: {
        money: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}],
        text: [{ required: true, trigger: 'blur', message: '不能为空' }]
      },
      flag: false,
      tableData: [],
      labelWidth: '80px',
      isCreate: true,//是否创建用户
      listLoading: false,//数据加载等待动画
      multipleSelection: [],//被选中的项
      dialogVisible: false,//对话框默认关闭
      chargeDialogVisible: false,
      customer: {},
      selectProps:{
        lazy: true,
        multiple: true, 
        checkStrictly: true,
        lazyLoad(node, resolve) {
          
          if(node.level == 0){
            node.data = { id: 0}
          }
          request({
            url: `/area`,
            method: "get",
            params: {
              parentId: node.data.id
            }
          }).then(res => {
            let nodes = res.data
            nodes.map(node => {
              node.value = node.id
              node.label = node.name
            })
            resolve(nodes)
          })
        }
      },
      playList: [{
        label: '按次按点结算',
        value: 1
      },{
        label: '包月结算',
        value: 2
      },{
        label: '包季结算',
        value: 3
      },{
        label: '包年结算',
        value: 4
      }],
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
    //table发生选中事件时
    handleSelectionChange(val){
      this.multipleSelection = val;    
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
    },
    //创建用户
    createCustom(){
      this.$refs.customer.validate(valid => {
        if (valid) {
          this.customer.password = "123456"
          request({
            url: "user/register",
            method: "post",
            data: this.customer
          }).then(res => {
            this.$message({
              type: "success",
              message: res.message
            })
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    //充值
    recharge(){
      if(this.multipleSelection.length != 1){
        this.$message({
          type: "warning",
          message: "只能选中一个用户充值"
        })
        return
      }
      this.customer = this.multipleSelection[0]
      this.chargeDialogVisible = true
    },
    //充值实现
    charge(){
      this.$refs.customer.validate(valid => {
        if (valid) {
          request({
            url: "/user/charge",
            method: "post",
            data: {
              userId: this.customer.id,
              money: this.customer.money
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: res.message
            })
            this.getList()
            this.chargeDialogVisible = false
          })
        }else {
          return false
        }
      })
    },
    //购买服务
    playService(){
      if(this.multipleSelection.length != 1){
        this.$message({
          type: "warning",
          message: "只能选中一个用户"
        })
        return
      }
      this.customer = this.multipleSelection[0]
      this.dialogVisible = true
      this.isCreate = false
    }
  }
}
</script>
