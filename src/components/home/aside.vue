<template>
	<el-col :span="12" class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu
      v-for="item in navList" 
      :index="''+item.order"
      :key="item.id"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group v-for="item2 in item.children">
          <el-menu-item :index="item2.path">{{item2.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<!--       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="role">角色列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="right">权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
        	<el-menu-item index="3-1">商品列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-2">分类参数</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="3-3">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
        	<el-menu-item index="4-1">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
        	<el-menu-item index="5-1">数据列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </el-col>
</template>
<script>
export default {
	data() {
		return {
			navList:[]
		}
	},
	methods: {
		handleOpen(key, keyPath) {
  	  console.log(key, keyPath);
  	},
  	handleClose(key, keyPath) {
  	  console.log(key, keyPath);
  	},
    async getMenus () {
      const res = await this.$http.get(`/menus`)
      this.navList = res.data.data
      console.log(this.navList)
    }
	},
  created () {
    this.getMenus()
  }
}
</script>
<style>
	.aside {
		background: #324152;
		width: 200px;
	}
	.aside * {
		background: rgba(0, 0, 0, 0);
		color: #ccc;
	}
</style>