<template>
  <div style="margin: 20px">
    <el-row>
      <el-col :xs="24" :xl="18" :sm="14" :md="16">
        <el-form :inline="true">
          <el-form-item label-width="20px">
              <el-input v-model="map.name" size="small" placeholder="用户姓名">
                  <el-button slot="append" @click="selectByName" icon="el-icon-search"></el-button>
              </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :xl="6" :sm="8" :md="8">
        <el-button type="primary" @click="getList" size="small" icon="el-icon-refresh"></el-button>
        <el-button type="primary" @click="downloadTemplate" size="small">模板下载</el-button>
        <el-button type="primary" @click="linkPhoneVisible = true; linkPhone = {};isUpdate=false" size="small">申请联系人</el-button>
      </el-col>
    </el-row>
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
        prop="name"
        label="联系人姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系人电话"
        width="150">
      </el-table-column>
      <el-table-column prop="status" label="审核状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status==-1">未通过</span>
          <span v-if="scope.row.status==0">审核中</span>
          <span v-if="scope.row.status==1">已通过</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created"
        label="创建时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="created"
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="linkPhoneVisible=true;linkPhone=scope.row;isUpdate=true">修改</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
      title="联系人申请表"
      :visible.sync="linkPhoneVisible"
      width="300px"
      center>
      <el-form ref="linkPhone" :model="linkPhone" :rules="userLinkRules">
        <el-form-item prop="name" label="联系人姓名">
          <el-input ref="name" v-model="linkPhone.name" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系人手机号">
          <el-input ref="phone" v-model.number="linkPhone.phone" size="small"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input ref="code" v-model="linkPhone.code" size="small">
            <el-button slot="append" size="small" @click="getCode" v-text="content"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkPhoneVisible = false">取 消</el-button>
        <el-button type="primary" v-if="!isUpdate" @click="addLinkPhone">确 定</el-button>
        <el-button type="primary" v-else @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      tableData: [],
      linkPhone: {}, //联系人
      userLinkRules: {
        name: [{ required: true, trigger: 'blur', message: '不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '不能为空' }],
        phone: [{ required: true, trigger: 'blur', message: '不能为空' }, { type: 'number', message: '格式不正确'}]
      },
      isUpdate: false,
      listLoading: false,//数据加载等待动画
      canClick: true, //添加canClick
      codeTime: 60, //按钮的倒计时
      content: "发送验证码", //按钮的内容
      listQuery: {
        currentPage: 1,
        pageSize: 5,
      },
      total: 0,
      linkPhoneVisible: false, //弹窗默认关闭
      map: {
        name: ""
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
        url: "/userLink/list",
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
    //下载模板按钮
    downloadTemplate(){
      
    },
    //获取验证码
    getCode(){
      if (!this.canClick) return;
      request({
        url: "/userLink/linkCode",
        method: "get"
      }).then(data => {
        this.$message({
          type: "success",
          message: data.message
        })
      })
      this.canClick = false
      this.content = this.codeTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.codeTime --
        this.content = this.codeTime + 's后重新发送'
        if (this.codeTime < 0) {     //当倒计时小于0时清除定时器
        window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.codeTime = 60
          this.canClick = true
        }
      },1000);
    },
    addLinkPhone(){
      this.$refs.linkPhone.validate(valid => {
        if (valid) {
          request({
            url: "/userLink",
            method: "post",
            data: this.linkPhone
          }).then(data => {
            this.linkPhoneVisible = false
            this.getList()
          })
        }
      })
    },
    update(){
      this.linkPhone.status = 0
      delete this.linkPhone.created
      request({
        url: "/userLink",
        method: "put",
        data: this.linkPhone
      }).then(data => {
        this.linkPhoneVisible = false
        this.getList()
      })
    },
    del(id){
      request({
        url: `/userLink/${id}`,
        method: "delete"
      }).then(data => {
        this.$message({
          type: "success",
          message: data.message
        })
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
