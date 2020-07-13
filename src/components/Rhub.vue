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
              @click="changeData(item)"
            >edit</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- dialog -->
    <el-dialog title="Edit the Radar Hub" :visible.sync="dialogFormVisible">
      <!-- form to edit data -->
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="ID" prop="id">
          <el-input type="number" v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="PI ID" prop="pi_id">
          <el-input type="number" v-model="form.pi_id"></el-input>
        </el-form-item>
        <el-form-item label="Secure ID" prop="secure_id">
          <el-input type="number" v-model="form.secure_id"></el-input>
        </el-form-item>

        <el-form-item label="Building" prop="building">
          <el-select v-model="form.building" placeholder="Please select a building">
            <el-option v-for="item in buildings" :key="item.ID" :label="item.NAME" :value="item.ID">
              <span style="float: left">{{ item.NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Radar System" prop="system">
          <el-select v-model="form.system" placeholder="Please select a radar system">
            <el-option
              v-for="itemSystem in systems"
              :key="itemSystem.ID"
              :label="itemSystem._SYSTEM_NAME"
              :value="itemSystem.ID"
            >
              <span style="float: left">{{ itemSystem._SYSTEM_NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ itemSystem.ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>
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
      dialogFormVisible: false,
      rhubs: [],
      buildings: [],
      systems: [],
      editForm: {},
      form: {
        id: '',
        name: '',
        pi_id: '',
        secure_id: '',
        system: '',
        building: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please enter the radar name', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pi_id: [
          { required: true, message: 'Please enter the pi id', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        secure_id: [
          { required: true, message: 'Please enter the secure id', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        building: [
          { required: true, message: 'Please select the building', trigger: 'change' }
        ],
        system: [
          { required: true, message: 'Please select the radar system', trigger: 'change' }
        ]
      }
    };
  },
  methods: {

    async initRadarHub () {
      await this.$http({
        url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/rhub",
        method: "get",
        crossdomain: true,
      })
        .then(response => (this.rhubs = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    async changeData (item) {
      console.log('the item is ' + item)
      this.dialogFormVisible = true;
      this.form.id = item.ID;
      this.form.name = item._NAME;
      //   this.form.room = item._RAUM_NAME;
      this.form.pi_id = item._PI_ID;
      this.form.secure_id = item._SECUREID;
      this.form.building = item.NAME;
      this.form.system = item._SYSTEM_NAME;
      console.log(this.form)

      await this.$http.all([
        await this.$http.get('https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/building'),
        await this.$http.get('https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/system'),

      ]).then(this.$http.spread((buildingsRes, systemsRes) => {
        console.log('Building : ', typeof buildingsRes.data)
        this.buildings = buildingsRes.data

        console.log('Radar System : ', systemsRes.data)
        this.systems = systemsRes.data

      }));

    },
    sendData () {
      console.log(this.form)
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.editForm.id = this.form.id;
          this.editForm.name = this.form.name;
          this.editForm.pi_id = parseInt(this.form.pi_id);
          this.editForm.secure_id = parseInt(this.form.secure_id);
          this.editForm.building = this.form.building;
          this.editForm.system = this.form.system;
          console.log(this.editForm)

          const { data: res } = await this.$http.post('https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/edit_hub', this.editForm)
          console.log(res)
          if (res !== 'success') {
            return this.$message.error('failed to edit radar hub')
          }

          this.$message.success('succeed to edit radar hub')
          this.initRadarHub()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.editForm = {}

      this.dialogFormVisible = false;
    }


  },
  mounted () {

    this.initRadarHub()

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
