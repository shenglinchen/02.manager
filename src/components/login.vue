<template>
    <div class="login-box">
      <div class="login">
        <h2>用户登录</h2>
        <el-form label-position="top" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="username"  prop="username">
            <el-input v-model="ruleForm.username"></el-input>
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
  name: 'login',
  data() {
    return {
      // ruleForm: {
      //   name: "",
      //   password: ""
      // },
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
      // required： 是否必填
      // message： 提示信息
      // trigger： 触发时机
      // min： 最短字长
      // max： 最长字长
        username: [
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
               // alert('submit!');
               // 有输入后，提交并获取数据
               this.$axios.post("login", this.ruleForm)
               .then(res => {
                // console.log(res);
                // console.log(res.data.meta.status)
                if (res.data.meta.status === 400){
                  // this.$message.error(res.data.meta.msg);
                }else if (res.data.meta.status == 200) {
                  // this.$message.success(res.data.meta.msg);
                  window.sessionStorage.setItem("token", res.data.data.token);

                  // 编程式导航
                  this.$router.push("/");
                }
               })
             } else {
               // console.log('error submit!!');
               // 如果没有填写内容，则提示
               // this.$message.error('请输入用户名和密码');
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
  
  #app {
    height: 100%;
    .login-box {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(50, 65, 82);

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
  }


</style>
