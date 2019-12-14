<template> 
  <div v-if="item.children">
    <template v-if="item.children.length == 0">        
      <el-menu-item :index="`${item.id}`">
        {{item.name}}
      </el-menu-item>
    </template>
    <el-submenu v-else :index="`${item.id}`">
      <template slot="title" >
        {{item.name}}
      </template>
      <template v-for="child in item.children">        
        <navigation-item  v-if="child.children&&child.children.length>0"
            :item="child"
            :key="child.id"/>
            <el-menu-item v-else :key="child.id" :index="`${child.id}`">
            {{child.name}}        
        </el-menu-item>      
      </template>   
    </el-submenu>  
  </div>
</template>

<script>
export default {
  name: 'navigationItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  } 
}
</script>