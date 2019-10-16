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
      <el-button type="primary" size="small" icon="el-icon-refresh"></el-button>
        <el-button type="primary" @click="downloadTemplate" size="small">模板下载</el-button>
        <el-button type="primary" @click="linkPhoneVisible = true; linkPhone = {}" size="small">申请联系人</el-button>
    </div>
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
        prop="name"
        label="联系人姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系人电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created"
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

    <el-dialog
      title="联系人申请表"
      :visible.sync="linkPhoneVisible"
      width="300px"
      center>
      <el-form>
        <el-form-item label="联系人姓名">
          <el-input v-model="linkPhone.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号">
          <el-input v-model="linkPhone.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkPhoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLinkPhone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      linkPhone: {}, //联系人
      currentPage: 5,
      tatol: 0,
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
    },
    selectByName(){
      // this.fetchData()
      console.log(`根据${this.map.name}查询`);
    },
    //下载模板按钮
    downloadTemplate(){
      
    },
    addLinkPhone(){
      this.linkPhone.status = '审核中'
      this.linkPhone.created = new Date()
      this.tableData.push(this.linkPhone)
      this.linkPhoneVisible = false
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
