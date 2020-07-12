<template>
  <div id="setting">
    <el-row class="tac">
      <el-col :span="4">
        <h5 align="center">Setting</h5>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
          <el-menu-item index="/radar">
            <template slot="title">
              <i class="el-icon-s-ticket"></i>
              <span>Radar</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/hub">
            <i class="el-icon-cpu"></i>
            <span slot="title">Radar Hub</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">Other</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="12">
        <!-- router view -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please enter the radar name', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
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
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
#setting {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 90%;
  height: 80%;
  position: relative;
  margin: auto;
  background-color: white;
  margin-top: 60px;
  padding: 20px;
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

