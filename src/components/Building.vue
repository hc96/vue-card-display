<template>
  <div id="building">
    <h1>All Buildings</h1>
    <div class="card">
      <el-row>
        <el-col
          v-for="(item, innerindex) in buildings"
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
                Building ID:
                <span class="building-style">{{ item.ID }}</span>
              </span>
              <br />
              <span>
                Building Name:
                <span class="building-style">{{item.NAME}}</span>
              </span>
            </div>
            <div class="text item">{{'People ' + people +' (fake data)'}}</div>
            <div class="text item">{{'Bike ' + bike }}</div>
            <div class="text item">{{'Wheelchair ' + wheelchair }}</div>
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
  name: 'App',
  data () {
    return {
      people: '17/30',
      bike: '10/30',
      wheelchair: '2/10',
      buildings: [],
    };
  },
  methods: {
    showRoom (id) {
      console.log("suoss" + id.NAME)
      this.$router.push({
        name: 'room',
        params: {
          id: id.ID,
          name: id.NAME
        }
      })
    },


  },
  components: {
  },
  mounted () {
    this.$http({
      url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/building",
      method: "get",
      crossdomain: true,
    })
      .then(response => (this.buildings = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });


  }
}
</script>

<style>
#building {
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

.building-style {
  color: #721d0d;
  font-weight: bold;
}
</style>
