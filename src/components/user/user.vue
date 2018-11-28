<template>
	<div class="user">
		<el-breadcrumb separator-class="el-icon-arrow-right nav">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
		  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="searchRow">
		  <el-input placeholder="请输入内容" v-model="query" class="input-with-select search">
		    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
		  </el-input>
		  <el-button type="success" @click="dialogFormVisible=true">添加用户</el-button>
		</div>

		<div class="table">
			<template>
			  <el-table
			    :data="users"
			    height="500"
			    border
			    style="width: 100%">
			    <el-table-column
			      label="#"
			      type="index"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="username"
			      label="姓名"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="role_name"
			      label="权限"
			      width="150">
			    </el-table-column>
			    <el-table-column
			      prop="email"
			      label="邮箱">
			    </el-table-column>
			    <el-table-column
			      prop="mobile"
			      label="电话">
			    </el-table-column>
			    <el-table-column
			      label="创建日期"
			      width="180">
			      <template slot-scope="scope">
			      	{{scope.row.create_time | dFormat}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="用户状态" width="80">
			      <template  slot-scope="scope">
			      	<el-switch
			      	@change="changeUserStatus(scope.row)"
			        v-model="scope.row.mg_state"
			        active-color="#13ce66"
			        inactive-color="#ff4949">
			      	</el-switch>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作">
			      <template slot-scope="scope">
			      	<el-button type="primary" icon="el-icon-edit" circle size="mini" :plain="true" @click="getEditUser(scope.row.id)"></el-button>
  						<el-button type="danger" icon="el-icon-delete" circle size="mini" :plain="true" @click="delUser(scope.row.id)"></el-button>
  						<el-button type="success" icon="el-icon-check" circle size="mini" :plain="true" @click="getEditRole(scope.row.id)"></el-button>
			      </template>
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
  	    :total="total">
  	  </el-pagination>
  	</div>

		<!-- 添加用户 隐藏 -->

		<el-dialog title="添加新用户"  :visible.sync="dialogFormVisible">
		  <el-form :model="addForm" :rules="rules">
		    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
		      <el-input v-model="addForm.username" autocomplete="off" value></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
		      <el-input v-model="addForm.password" autocomplete="off" value></el-input>
		    </el-form-item>
		    <el-form-item label="邮箱" :label-width="formLabelWidth">
		      <el-input v-model="addForm.email" autocomplete="off" value></el-input>
		    </el-form-item>
		    <el-form-item label="电话" :label-width="formLabelWidth">
		      <el-input v-model="addForm.mobile" autocomplete="off" value></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addSubmit">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 编辑用户 隐藏 -->

		<el-dialog title="编辑用户"  :visible.sync="dialogEditFormVisible">
		  <el-form :model="editForm" :rules="rules">
		    <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
		      <el-input v-model="editForm.username" autocomplete="off" value disabled></el-input>
		    </el-form-item>
		    <el-form-item label="邮箱" :label-width="formLabelWidth">
		      <el-input v-model="editForm.email" autocomplete="off" value></el-input>
		    </el-form-item>
		    <el-form-item label="电话" :label-width="formLabelWidth">
		      <el-input v-model="editForm.mobile" autocomplete="off" value></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogEditFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editSubmit">确 定</el-button>
		  </div>
		</el-dialog>
		
		<!-- 权限修改 隐藏 -->
		<el-dialog title="收货地址" :visible.sync="dialogRoleFormVisible">
		  <el-form :model="roleForm">
		    <el-form-item label="用户名" label-width="100px">
      		{{roleForm.username}}
      		{{roleForm.rid}}
    		</el-form-item>
		    <el-form-item label="角色" label-width="100px">
		      <el-select v-model="roleForm.rid" placeholder="请选择">
		        <el-option label="请选择" value="-1" disabled>
    				</el-option>
  				  <el-option
  				    v-for="item in roleOptions"
  				    :key="item.id"
  				    :label="item.roleName"
  				    :value="item.id">
  				  </el-option>
  				</el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogRoleFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="setEditRole">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
</template>
<script>
export default {
	data() {
		return {
			pagenum: 1,
			pagesize:5,
			query:'',
			total:1,
			users:[],
			dialogFormVisible: false,
			dialogEditFormVisible:false,
			dialogRoleFormVisible:false,
      addForm: {
        username: '',
        password:'',
        email:'',
        mobile:''
      },
      editForm: {
      	id:'',
        username: '',
      	email:'',
      	mobile:''
      },
      roleForm: {
      	username:'test666',
      	role_id:''
      },
      roleOptions:[],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
        	{required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
		}
	},
	methods:{
		async getUserList () {

			const AUTH_TOKEN = sessionStorage.getItem('token')
			this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

			const res = await this.$http.get(`/users?
				query=${this.query}
				&pagenum=${this.pagenum}
				&pagesize=${this.pagesize}`)
      
			const {data:{pagenum,total,users},meta:{msg}} = res.data
			
			// console.log(res)
			
			this.total = total
			this.users = users
		},
		handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    async addSubmit () {
    	// console.log(this.addForm)
    	const res = await this.$http.post('/users',this.addForm)
    	const msg = res.data.meta.msg
    	this.$message.success(msg)
    	this.getUserList()
    	this.dialogFormVisible = false

    	for (var k in this.addForm) {
    		this.addForm[k] = ''
    	}
    },
    async getEditUser (id) {
    	const res = await this.$http.get(`/users/`+id)
    	// console.log(res)
    	this.editForm = res.data.data
    	// console.log(this.editForm)
    	this.dialogEditFormVisible = true
    },
    async editSubmit () {
    	const res = await this.$http.put(`/users/${this.editForm.id}`,this.editForm)
    	const {meta:{msg,status}} = res.data
    	console.log(msg)
    	if (status === 200) {
    		this.$message.success(msg)
    		this.getUserList()
    	}
    	this.dialogEditFormVisible = false
    },
    delUser (id) {
    	this.$confirm('确定要删除么','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
    			const res = await this.$http.delete('/users/'+id)
    			console.log(res)
    			this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
    },
    changeUserStatus (obj) {
    	this.$http.put(`users/${obj.id}/state/${obj.mg_state}`).then(res=>{
    		console.log(res)
    		if (res.data.meta.status === 200) this.$message.success(res.data.meta.msg)
    	})
    },
    async getEditRole (id) {
    	const res = await this.$http.get('/users/' + id)
    	this.roleForm = res.data.data

    	const res2 = await this.$http.get('/roles')
    	this.roleOptions = res2.data.data

    	this.dialogRoleFormVisible = true
    },
    async setEditRole () {
    	const res = await this.$http.put(`/users/${this.roleForm.id}/role`,{rid:this.roleForm.rid})
    	// console.log(res)
    	if (res.data.meta.status === 200) {
    		this.$message.success(res.data.meta.msg)
    		this.getUserList()
    	}
    	this.dialogRoleFormVisible = false
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