<template>
  <div id="app">
    <div class="login">
      <h2>用户登录</h2>
      <el-form label-position="top" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="name"  prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        
      </el-form>
      <el-button type="primary" class="btn-login" @click="submitForm('ruleForm')">登录</el-button>
    </div>
    
    
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      // ruleForm: {
      //   name: "",
      //   password: ""
      // },
      ruleForm: {
        name: '',
        password: '',
      },
      rules: {
      // required： 是否必填
      // message： 提示信息
      // trigger： 触发时机
      // min： 最短字长
      // max： 最长字长
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change"},
          { min: 6, message: '密码太短', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
           this.$refs[formName].validate((valid) => {
             if (valid) {
               alert('submit!');
             } else {
               console.log('error submit!!');
               return false;
             }
           });
         },
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;

  }

  body {
    background-color: rgb(50, 65, 82);
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      box-sizing: border-box;
      width: 600px;
      background-color: #fff;
      border-radius: 5px;
      padding: 40px;
      .btn-login {
        width: 100%;
      }
    }
  }

  

  
</style>
