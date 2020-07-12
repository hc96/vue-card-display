<template>
  <div id="hub">
    <div id="hubForm">
      <h1>Add a New Radar Hub</h1>
      <el-form
        :model="hubForm"
        :rules="rules"
        ref="hubForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="ID" prop="id">
          <el-input type="number" v-model="hubForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="hubForm.name"></el-input>
        </el-form-item>
        <el-form-item label="PI ID" prop="pi_id">
          <el-input type="number" v-model="hubForm.pi_id"></el-input>
        </el-form-item>
        <el-form-item label="Secure ID" prop="secure_id">
          <el-input type="number" v-model="hubForm.secure_id"></el-input>
        </el-form-item>

        <el-form-item label="Building" prop="building">
          <el-select v-model="hubForm.building" placeholder="Please select a building">
            <el-option v-for="item in buildings" :key="item.ID" :label="item.NAME" :value="item.ID">
              <span style="float: left">{{ item.NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Radar System" prop="system">
          <el-select v-model="hubForm.system" placeholder="Please select a radar system">
            <el-option
              v-for="itemSystem in systems"
              :key="itemSystem.ID"
              :label="itemSystem._NAME"
              :value="itemSystem.ID"
            >
              <span style="float: left">{{ itemSystem._NAME }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ itemSystem.ID }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('hubForm')">Add</el-button>
          <el-button @click="resetForm('hubForm')">Reset</el-button>
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
      buildings: {},
      systems: {},
      hubForm: {
        id: '',
        name: '',
        pi_id: '',
        secure_id: '',
        building: '',
        system: '',
      },
      rules: {
        id: [
          { required: true, message: 'Please enter the radar hub id', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.hubForm)
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted () {
    // this.$http({
    //   url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/",
    //   method: "get",
    //   crossdomain: true,
    // })
    //   .then(response => {
    //     this.buildings = response.data
    //     this.$http({
    //       url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/system",
    //       method: "get",
    //       crossdomain: true,
    //     })
    //       .then(response => (this.systems = response.data))
    //       .catch(function (error) { // 请求失败处理
    //         console.log(error);
    //       });

    //   })
    //   .catch(function (error) { // 请求失败处理
    //     console.log(error);
    //   });

    // this.$http({
    //   url: "https://counter-responsible-badger-bl.cfapps.eu10.hana.ondemand.com/system",
    //   method: "get",
    //   crossdomain: true,
    // })
    //   .then(response => (this.systems = response.data))
    //   .catch(function (error) { // 请求失败处理
    //     console.log(error);
    //   });

    this.$http.all([


      this.$http.get('/building'),
      this.$http.get('/system'),

      // this.$http({
      //   url: "/building",
      //   method: "get",
      //   crossdomain: true,
      // }),
      // this.$http({
      //   url: "/system",
      //   method: "get",
      //   crossdomain: true,
      // }),

    ]).then(this.$http.spread((buildingsRes, systemsRes) => {
      console.log('Building : ', typeof buildingsRes.data)
      this.buildings = buildingsRes.data

      console.log('Radar System : ', systemsRes.data)
      this.systems = systemsRes.data

    }));

  }
}
</script>

<style scoped>
#hub {
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

#hubForm {
  padding: 0px 50px 0 10px;
}
</style>

