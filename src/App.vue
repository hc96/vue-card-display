<template>
  <div id="app">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Building ID / Building Name</span>
        <el-button style="float: right; padding: 3px 0" type="text">see more</el-button>
      </div>
      <div class="text item">{{'People ' + people }}</div>
      <div class="text item">{{'Bike ' + bike }}</div>
      <div class="text item">{{'Wheelchair ' + wheelchair }}</div>
    </el-card>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data () {
    return {
      people: '17/30',
      bike: '10/30',
      wheelchair: '2/10'
    };
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
