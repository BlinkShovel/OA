<template>

	<div class="breadNav">
		<el-breadcrumb separator-class="el-icon-arrow-right nav breadNav">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>{{lv1}}</el-breadcrumb-item>
		  <el-breadcrumb-item>{{lv2}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>

</template>
<script>
export default {
	name:'breadNav',
	data() {
		return {
			
		}
	},
	props:['lv1','lv2']
}
</script>
<style>
	.breadNav {
		margin: 10px;
		overflow: hidden;
	}
</style>