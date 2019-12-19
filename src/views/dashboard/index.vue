<template>
  <iframe id="iframe" height="100%" width="100%" src="https://www.osgeo.cn/list/ggeo"></iframe>
</template>

<script>
import request from '@/utils/request'

export default {
  mounted(){
    document.getElementById("iframe").height=0;
    document.getElementById("iframe").height = document.body.scrollHeight - 55;
  }
}
</script>
