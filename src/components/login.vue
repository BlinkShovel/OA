<template>
	<div class="login">
		<el-form :label-position="labelPosition" label-width="80px" :model="formData" class="form">
			<h2>用户登陆</h2>
		  <el-form-item label="用户名">
		    <el-input v-model="formData.username"></el-input>
		  </el-form-item>
		  <el-form-item label="密码">
		    <el-input v-model="formData.password"></el-input>
		  </el-form-item>
		  <el-button type="success" @click.prevent="login">登陆</el-button>
		</el-form>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        formData: {
          username: '',
          password: ''
        }
      }
    },
    methods:{
    	async login () {
    		const res = await this.$http.post('/login',this.formData)
    		const {data,meta:{msg,status}} = res.data
    		if (status === 200) {
    			sessionStorage.setItem('token', data.token)
    			this.$message.success(msg)
    			this.$router.push({name:'home'})
    		}else{
    			this.$message.error(msg)
    		}
    	}
    },
    created () {

    }
  }
</script>
<style>
	.login {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #324152;
	}
	.login .form {
		width: 400px;
		background: #fff;
		padding: 20px 30px;
		border-radius: 10px;
		box-shadow: 0 0 10px #331;
	}
	.login button {
		margin-top: 10px;
		width: 100%;
	}
</style>