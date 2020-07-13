<template>
  <div id="radar">
    <div id="radarForm">
      <h1>Add a New Radar</h1>
      <el-form
        :model="radarForm"
        :rules="rules"
        ref="radarForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="id">
          <el-input v-model="radarForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="radarForm.name"></el-input>
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
          <el-select v-model="radarForm.room" placeholder="Please Select a Room">
            <el-option
              v-for="itemRoom in rooms"
              :key="itemRoom.ID"
              :label="itemRoom._RAUM_NAME"
              :value="itemRoom.ID"
            >
              <span style="float: left">{{ itemRoom._RAUM_NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ itemRoom.ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Position" prop="position">
          <el-radio-group v-model="radarForm.position">
            <el-radio label="IN"></el-radio>
            <el-radio label="OUT"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="UnifiedRadarID" prop="unified_id">
          <el-input type="number" v-model="radarForm.unified_id"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('radarForm')">Add</el-button>
          <el-button @click="resetForm('radarForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      addForm: {},
      buildings: [],
      rooms: [],
      building: '',
      radarForm: {
        id: '',
        name: '',
        room: '',
        position: '',
        unified_id: '',
      },
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
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert('submit!');
          this.addForm.name = this.radarForm.name;
          if (this.radarForm.position === 'OUT') {
            this.addForm.in = 0;
            this.addForm.out = 1;
          } else {
            this.addForm.in = 1;
            this.addForm.out = 0;
          }
          this.addForm.unifiedid = parseInt(this.radarForm.unified_id);
          this.addForm.room = this.radarForm.room;
          console.log(this.addForm)

          const { data: res } = await this.$http.post('https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/radar_data', this.addForm)
          console.log(res)
          if (res !== 'success') {
            this.$message.error('failed to add radar')
          }

          this.$message.success('succeed to add radar')

        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.addForm = {}
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
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

      this.radarForm.room = ''


    },
    immediate: true,
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

<style scoped>
#radar {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 80%;
  height: 80%;
  position: relative;
  margin: auto;
  background-color: white;
  padding: 20px;
  /* border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}

#radarForm {
  padding: 0px 50px 0 10px;
}
</style>

