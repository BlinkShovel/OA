<template>
	<div class="user">
		<el-breadcrumb separator-class="el-icon-arrow-right nav">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="searchRow">
		  <el-input placeholder="请输入内容" v-model="find" class="input-with-select search">
		    <el-button slot="append" icon="el-icon-search"></el-button>
		  </el-input>
		  <el-button type="success">添加用户</el-button>
		</div>

		<div class="table">
			<template>
			  <el-table
			    :data="tableData3"
			    height="500"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="date"
			      label="#"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="姓名"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="邮箱">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="电话">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="创建日期">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="用户状态">
			    </el-table-column>
			    <el-table-column
			      prop="address"
			      label="操作">
			    </el-table-column>
			  </el-table>
			</template>
		</div>

		<div class="block">
  	  <el-pagination
  	    @size-change="handleSizeChange"
  	    @current-change="handleCurrentChange"
  	    :current-page="pagenum"
  	    :page-sizes="[5, 10, 15, 20]"
  	    :page-size="pagesize"
  	    layout="total, sizes, prev, pager, next, jumper"
  	    :total="50">
  	  </el-pagination>
  	</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			find:'',
			pagenum: 1,
			pagesize:5,
			query:'',
			tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
		}
	},
	methods:{
		async getUserList () {
			const AUTH_TOKEN = sessionStorage.getItem('token')
			this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
			console.log(AUTH_TOKEN)//有值
			console.log(`/user?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
			const res = await this.$http.get(`/user?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
			console.log(res)
		},
		handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
	},
	created () {
		this.getUserList()
	}
}
</script>
<style>
	.user {
		height: 100%;
		width: 100%;
		background: #fff;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
	}

	.user .el-breadcrumb__item {
		font-size: 16px;
		padding: 5px;
	}
	.user .searchRow {
		padding: 10px;
	}
	.user .search {
		/* width: 80%; */
		width: 400px;
	}
</style>