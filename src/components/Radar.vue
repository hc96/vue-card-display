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
          <el-input v-model="radarForm.id"></el-input>
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="radarForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Room" prop="room">
          <el-select v-model="radarForm.room" placeholder="Please Select a Room">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Position" prop="position">
          <el-radio-group v-model="radarForm.position">
            <el-radio label="IN"></el-radio>
            <el-radio label="OUT"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="UnifiedRadarID" prop="unified_id">
          <el-input v-model="radarForm.unified_id"></el-input>
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
      radarForm: {
        id: null,
        name: '',
        room: '',
        resource: '',
        unified_id: null,
      },
      rules: {
        id: [
          { required: true, message: 'Please enter the radar id', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted () {

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

