<template>
  <div id="sensor">
    <div class="card">
      <el-row>
        <el-col
          v-for="(item, innerindex) in sensors"
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
                Radar ID:
                <span class="sensor-style">{{ item.ID }}</span>
              </span>
              <br />
              <span>
                Radar Name:
                <span class="building-style">{{item._NAME}}</span>
              </span>
            </div>
            <div class="text item">{{'Room : ' + item._RAUM_NAME }}</div>
            <div class="text item">Position : {{item.__POSITIONIN==0?'OUT':'IN' }}</div>
            <div class="text item">{{'UnifiedRadarID : ' + item._UNIFIEDRADARID }}</div>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="changeData(item)"
            >edit</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- dialog -->
    <el-dialog title="Edit the Radar" :visible.sync="dialogFormVisible">
      <!-- form to edit data -->
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="ID" prop="id">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="Building" prop="building">
          <el-select v-model="building" placeholder="Please Select a building">
            <el-option v-for="item in buildings" :key="item.ID" :label="item.NAME" :value="item.ID">
              <span style="float: left">{{ item.NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Room" prop="room">
          <el-select v-model="form.room" placeholder="Please Select a Room">
            <el-option
              v-for="itemRoom in rooms"
              :key="itemRoom.RAUM_ID"
              :label="itemRoom._RAUM_NAME"
              :value="itemRoom.RAUM_ID"
            >
              <span style="float: left">{{ itemRoom._RAUM_NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ itemRoom.RAUM_ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Position" prop="position">
          <el-radio-group v-model="form.position">
            <el-radio label="IN"></el-radio>
            <el-radio label="OUT"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="UnifiedRadarID" prop="unified_id">
          <el-input type="number" v-model="form.unified_id"></el-input>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('radarForm')">Add</el-button>
          <el-button @click="resetForm('radarForm')">Reset</el-button>
        </el-form-item>-->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="sendData">Confirm</el-button>
      </div>

      <!-- <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>-->
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {

    var checkNumber = (rule, value, callback) => {
      const regNumber = /^[+]{0,1}(\d+)$/

      if (regNumber.test(value)) {
        return callback()
      }

      callback(new Error('please enter the valid id'))
    }

    return {
      sensors: [],
      editForm: {},
      buildings: [],
      rooms: [],
      building: '',
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        room: '',
        position: '',
        unified_id: ''
      },
      formLabelWidth: '120px',
      rules: {
        // id: [
        //   { required: true, message: 'Please enter the radar id', trigger: 'blur' },
        //   { validator: checkNumber, trigger: 'blur' }
        // ],
        name: [
          { required: true, message: 'Please enter the radar name', trigger: 'blur' },
          { min: 3, max: 10, message: 'length between 3 and 10', trigger: 'blur' }
        ],
        room: [
          { required: true, message: 'Please select the room', trigger: 'change' }
        ],
        position: [
          { required: true, message: 'Please select ', trigger: 'change' }
        ],
        unified_id: [
          { required: true, message: 'Please enter the unified radar id', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    initRadar () {
      this.$http({
        url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/sensor",
        method: "get",
        crossdomain: true,
      })
        .then(response => (this.sensors = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    showDialog (id) {
      console.log("suoss" + id._NAME)
    },
    changeData (item) {
      console.log('the item is ' + item)
      this.dialogFormVisible = true;
      this.form.id = item.ID;
      this.form.name = item._NAME;
      //   this.form.room = item._RAUM_NAME;
      this.form.position = item.__POSITIONIN == 0 ? 'OUT' : 'IN';
      this.form.unified_id = item._UNIFIEDRADARID;
      console.log(this.form)

      this.$http({
        url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/building",
        method: "get",
        crossdomain: true,
      })
        .then(response => (this.buildings = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });

    },
    sendData () {

      console.log(this.form)
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          this.editForm.id = this.form.id;
          this.editForm.name = this.form.name;
          if (this.form.position === 'OUT') {
            this.editForm.in = 0;
            this.editForm.out = 1;
          } else {
            this.editForm.in = 1;
            this.editForm.out = 0;
          }
          this.editForm.unifiedid = parseInt(this.form.unified_id);
          this.editForm.room = this.form.room;
          console.log(this.editForm)

          const { data: res } = await this.$http.post('https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/edit_radar', this.editForm)
          console.log(res)
          if (res !== 'success') {
            this.$message.error('failed to edit radar')
          }

          this.$message.success('succeed to edit radar')
          this.initRadar()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.editForm = {}

      this.dialogFormVisible = false;
    }


  },
  watch: {
    building (val) {
      console.log(`Building changed: ${val}`);
      this.$http({
        url: `https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/rooms/${val}`,
        method: "get",
        crossdomain: true,
      })
        .then(response => (this.rooms = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });

      this.form.room = ''


    },
    immediate: true,
  },
  mounted () {

    this.initRadar()



  }
}
</script>

<style>
#sensor {
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

.sensor-style {
  color: #721d0d;
  font-weight: bold;
}
</style>
