<template>
  <div id="room">
    <div class="card">
      <!-- <el-row v-for="(page, index) in pages" :key="index"> -->
      <el-row>
        <!-- <el-col
          :span="4"
          v-for="(item, innerindex) in page"
          :key="item.ID"
          :offset="innerindex > 0 ? 2 :1"
        >-->
        <el-col
          v-for="(item, innerindex) in rooms"
          :key="item.ID"
          :xs="12"
          :sm="7"
          :md="6"
          :lg="6"
          :xl="4"
          :offset="innerindex >= 0 ? 1 :0"
        >
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>
                Room ID:
                <span class="building-style">{{ item.ID }}</span>
              </span>
              <br />
              <span>
                Room Name:
                <span class="building-style">{{item._NAME}}</span>
              </span>
            </div>
            <div class="text item">
              <i class="el-icon-s-custom"></i>
              {{'People ' + people }}
            </div>
            <div class="text item">
              <i class="el-icon-bicycle"></i>
              {{'Bike ' + bike }}
            </div>
            <div class="text item">
              <i class="el-icon-shopping-cart-1"></i>
              {{'Wheelchair ' + wheelchair }}
            </div>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="showRoom(item.ID)"
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
      currentDate: new Date(),
      rooms: [],
      people: '17/30',
      bike: '10/30',
      wheelchair: '2/10',
    };
  },
  mounted () {
    console.log('the id is:' + this.$route.params.id)

    this.$http({
      url: `https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/rooms/${this.$route.params.id}`,
      method: "get",
      crossdomain: true,
    })
      .then(response => (this.rooms = response.data))
      .catch(function (error) { // 请求失败处理
        console.log(error);
      });
  }
}
</script>

<style scoped>
#room {
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
  margin-bottom: 20px;
}

.building-style {
  color: #721d0d;
  font-weight: bold;
}
</style>

