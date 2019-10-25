<template>
  <div style="margin: 20px">
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox>
    </el-tree>
    <el-cascader v-model="data" :props="selectProps"></el-cascader>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      data: [],
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
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
      linkPhoneVisible: false, //弹窗默认关闭
      map: {
        companyName: "",
      }//查询条件
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    data(){
      console.log(this.data)
    }
  },
  methods: {
    fetchData() {
    },
    loadNode(node, resolve) {
      if(node.data == null){
        node.data = { id: 0 }
      }
      request({
        url: `/area`,
        method: "get",
        params: {
          parentId: node.data.id
        }
      }).then(res => {
        resolve(res.data)
      })
    }
  }
}
</script>
