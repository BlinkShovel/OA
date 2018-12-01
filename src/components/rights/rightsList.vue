<template>
	<div class="rights">
		<bread-nav lv1="权限管理" lv2="权限列表"></bread-nav>
  		<el-table
  		  :data="rights"
  		  height="80%"
  		  stripe
  		  border
  		  style="width: 100%">
  		  <el-table-column
  		    label="#"
  		    type="index"
  		    width="180">
  		  </el-table-column>
  		  <el-table-column
  		    prop="authName"
  		    label="权限名称"
  		    width="180">
  		  </el-table-column>
  		  <el-table-column
  		    prop="path"
  		    label="路径">
  		  </el-table-column>
  		  <el-table-column
  		    prop="level"
  		    label="层级">
  		  </el-table-column>
  		</el-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			rights: []
		}
	},
	methods:{
		async getRights () {
			const res = await this.$http.get('/rights/list')
			const {data,meta:{msg,status}} = res.data
			if (status === 200) {
				this.$message.success(msg)
			}
			this.rights = data
		}
	},
	created () {
		this.getRights()
	}
}
</script>
<style>
	.rights {
		height: 100%;
		width: 100%;
		background: #fff;
		overflow: hidden;
		padding: 10px;
	}
</style>