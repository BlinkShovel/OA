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
  	    :current-page="currentPage4"
  	    :page-sizes="[100, 200, 300, 400]"
  	    :page-size="100"
  	    layout="total, sizes, prev, pager, next, jumper"
  	    :total="400">
  	  </el-pagination>
  	</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			find:'',
			currentPage4: 4,
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
		getUserList () {

		},
		handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
	},
	beforeCreate () {

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