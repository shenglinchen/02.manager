<template>
  <div id="app">
    <div class="login">
      <h2>用户登录</h2>
      <el-form label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        
      </el-form>
      <el-button type="primary" class="btn-login">登录</el-button>
    </div>
    
    
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      formLabelAlign: {
        name: '',
        password: '',
      }
    }
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
