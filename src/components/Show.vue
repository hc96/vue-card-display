<template>
  <div id="show">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/sensor">
        <i class="el-icon-s-ticket"></i>
        <span>Radars</span>
      </el-menu-item>
      <el-menu-item index="/rhub">
        <i class="el-icon-cpu"></i>
        <span slot="title">Radar Hubs</span>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/sensor',
    };
  },
  methods: {
  }
}
</script>

<style scoped>
#show {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  margin-top: 60px;
}
</style>

