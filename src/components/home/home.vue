<template>
	<el-container class="home">	
	  <el-header class="header">
			<el-row>
			  <el-col :span="6">
			  	<div class="grid-content bg-purple">
			  		<img src="@/assets/images/logo.png" alt="">
			  	</div>
			  </el-col>
			  <el-col :span="14">
			  	<div class="grid-content bg-purple-light">
			  		
			  	</div>
			  </el-col>
			  <el-col :span="2">
			  	<div class="grid-content bg-purple">
			  		<el-button type="text" @click.prevent="logout">退出</el-button>
			  	</div>
			  </el-col>
			</el-row>
	  </el-header>
	  <el-container>
	     <home-aside></home-aside>
	     <el-main class="main">
				<router-view></router-view>
	     </el-main>
	  </el-container>
	</el-container>
</template>
<script>
import homeAside from './aside.vue'

export default {
	data() {
		return {
			
		}
	},
	methods:{
		logout () {
			this.$confirm('确定退出吗？','退出确认',{
				confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
			}).then(()=>{
				sessionStorage.removeItem('token')
				this.$message.success('退出成功')
				this.$router.push({name:'login'})
			})
			
		}
	},
	components:{
		homeAside
	},
	beforeCreate () {
		const token = sessionStorage.getItem('token')
		if (!token) {
			this.$message.warning('请先登陆')
			this.$router.push({name:'login'})
		}
	}
}
</script>
<style>
	.home {
		height: 100%;
	}

	.header {
		/* height: 50px; */
		background: #111;
		line-height: 60px;
	}
	.header img {
		height: 60px;
	}
	.main {
		background: #ccc;
	}
	.el-row {
	  height: 100%;
	}
	.el-row>div {
		height: 100%;
	}
</style>