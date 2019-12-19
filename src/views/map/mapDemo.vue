<template>
  <div>
      <div id="viewDiv"></div>
      <div id="newmap"></div>
  </div>
</template>

<style scoped>
  @import url('http://js.arcgis.com/4.12/esri/css/main.css');

  #viewDiv {
    width: 100%;
    height: 800px;
  }
</style>

<script>
import request from '@/utils/request'
import esriLoader from 'esri-loader'

export default {
  data() {
    return {
    }
  },
  created() {
    this.fetchData()
  },
  mounted(){
    const options = {
      // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
      url: 'http://js.arcgis.com/4.7/init.js'
    }

    esriLoader.loadModules([ "esri/Map",'esri/views/MapView', "dojo/parser",], options)
    .then (([ Map, MapView, parser ]) => {
      const map = new Map ({
        backgroundColor: "#eee",
        basemap: "streets",
        logo: false,
        slider: false,
        zoom: 7,
        minZoom: 7,
      })
      parser.parse(); 
      const mapview = new MapView ({
        container: "viewDiv",
        map: map,
        zoom: 12,
        center: [ 102.7346125, 25.0563901 ]
      })
    }, reason => {
      console.log (reason);
    })
  },
  methods: {
    fetchData() {

    },

  }
}
</script>
