<template>
  <div id="rhub">
    <div class="card">
      <el-row>
        <el-col
          v-for="(item, innerindex) in rhubs"
          :key="item.ID"
          :xs="12"
          :sm="9"
          :md="6"
          :lg="6"
          :xl="4"
          :offset="innerindex >= 0 ? 1 :0"
        >
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>
                Radar Hub ID:
                <span class="rhub-style">{{ item.ID }}</span>
              </span>
              <br />
              <span>
                Radar Hub Name:
                <span class="building-style">{{item._NAME}}</span>
              </span>
            </div>
            <div class="text item">{{'Building : ' + item.NAME }}</div>
            <div class="text item">{{'Radar System : ' + item._SYSTEM_NAME }}</div>
            <div class="text item">{{'PI ID : ' + item._PI_ID }}</div>
            <div class="text item">{{'Secure ID : ' + item._SECUREID }}</div>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="showRoom(item)"
            >see more</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      rhubs: [],
    };
  },
  methods: {
    showDialog (id) {
      console.log("suoss" + id._NAME)
    },


  },
  mounted () {
    this.$http({
      url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/rhub",
      method: "get",
      crossdomain: true,
    })
      .then(response => (this.rhubs = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });


  }
}
</script>

<style>
#rhub {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}

/* .card {
  margin: auto;
} */

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
  width: 300px;
  margin-bottom: 40px;
}

.rhub-style {
  color: #721d0d;
  font-weight: bold;
}
</style>
