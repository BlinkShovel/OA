<template>
	<div class="role">
		<bread-nav lv1="权限管理" lv2="角色列表"></bread-nav>
		<el-button type="info" @click="dialogAddFormVisible=true">添加角色</el-button>

		<el-table
    :data="roleList"
    style="width: 100%">
	    <el-table-column type="expand">
	      <template slot-scope="scope">
          <el-row
					  v-for="item in scope.row.children"
					  :key="item.id">
						<el-col :span="4"><!-- :span -->
							<el-tag closable @close="removeRight(scope.row,item.id)">
					  		{{item.authName}}
					  		<!-- {{item.children.length}} -->
							</el-tag>


							<i class="el-icon el-icon-arrow-right"></i>
						</el-col>
						<el-col :span="20">
							<el-row v-for="item2 in item.children" :key="item2.id">
								<el-col :span="4">
									<el-tag closable @close="removeRight(scope.row,item2.id)" type="success">
										{{item2.authName}}
									</el-tag>
									<i class="el-icon el-icon-arrow-right"></i>
								</el-col>
								<el-col :span="20">
									<el-tag closable @close="removeRight(scope.row,item3.id)" type="warning" 
									v-for="item3 in item2.children" :key="item3.id">
										{{item3.authName}}
									</el-tag>
								</el-col>
							</el-row>
						</el-col>
          </el-row>
          <!-- 无权限的提示 -->
					<span v-if="scope.row.children.length===0"> 该角色未分配权限</span>
	      </template>
	    </el-table-column>
	    <el-table-column
	    	label="#"
	      type="index">
	    </el-table-column>
	    <el-table-column
	      label="角色名称"
	      prop="roleName">
	    </el-table-column>
	    <el-table-column
	      label="角色描述"
	      prop="roleDesc">
	    </el-table-column>
	    <el-table-column
			      label="操作">
			  <template slot-scope="scope">
			  	<el-button type="primary" icon="el-icon-edit" circle size="mini" :plain="true" @click="editRole(scope.row.id)"></el-button>
  				<el-button type="danger" icon="el-icon-delete" circle size="mini" :plain="true" @click="delConfirm(scope.row.id)"></el-button>
  				<el-button type="success" icon="el-icon-check" circle size="mini" :plain="true" @click="getRole(scope.row)"></el-button>
				</template>
			</el-table-column>
	  </el-table>

		<!-- 角色授权 -->
		<el-dialog title="分配权限" :visible.sync="dialogFormVisible">
		  <el-tree
			  :data="rolesTree"
			  show-checkbox
			  node-key="id"
			  default-expand-all
			  ref="tree"
			  :default-checked-keys="checked"
			  :props="defaultProps">
			</el-tree>
		  <!-- </el-form> -->
		  	<div slot="footer" class="dialog-footer">
		  	  <el-button @click="dialogFormVisible = false">取 消</el-button>
		  	  <el-button type="primary" @click="setRole()">确 定</el-button>
		  	</div>
		</el-dialog>

		<!-- 添加角色 隐藏 -->

		<el-dialog title="添加新角色"  :visible.sync="dialogAddFormVisible">
		  <el-form :model="addForm" :rules="rules" ref="addForm">
		    <el-form-item label="角色名称" prop="roleName">
		      <el-input v-model="addForm.roleName" autocomplete="off" value></el-input>
		    </el-form-item>
		    <el-form-item label="角色描述" prop="roleDesc">
		      <el-input v-model="addForm.roleDesc" autocomplete="off" value></el-input>
		    </el-form-item>		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('dialogAddFormVisible','addForm')">取 消</el-button>
		    <el-button type="primary" @click="addSubmit">确 定</el-button>
		  </div>
		</el-dialog>

				<!-- 编辑角色 隐藏 -->

		<el-dialog title="编辑角色"  :visible.sync="dialogEditFormVisible">
		  <el-form :model="editForm" :rules="rules" ref="editForm">
		    <el-form-item label="角色名称" prop="roleName">
		      <el-input v-model="editForm.roleName" disabled autocomplete="off" value></el-input>
		    </el-form-item>
		    <el-form-item label="角色描述" prop="roleDesc">
		      <el-input v-model="editForm.roleDesc" autocomplete="off" value></el-input>
		    </el-form-item>		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('dialogEditFormVisible')">取 消</el-button>
		    <el-button type="primary" @click="editSubmit">确 定</el-button>
		  </div>
		</el-dialog>

	</div>
<!-- 
dialogAddFormVisible = false
dialogEditFormVisible = false
 -->
</template>
<script>
export default {
	data() {
		return {
			//角色列表
			roleList:[],
			//角色授权
				//角色授权弹框显示隐藏
			roleId:-1,
			dialogFormVisible:false,
			rolesTree:[],
			defaultProps: {
        children: 'children',
        label: 'authName'
      },
      	//默认选中的
      checked:[],
      //添加角色
      dialogAddFormVisible:false,
      addForm:{
      	roleName:'',
				roleDesc:''
      },
      // 编辑角色
      dialogEditFormVisible:false,
      editForm:{
      	roleName:'',
				roleDesc:'',
				roleId:-1
      },
      rules:{
      	roleName:[{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      	roleDesc:[{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
		}
	},
	methods:{
		/**
		 * [获取角色列表]
		 */
		async getRoles () {
			const res = await this.$http.get('/roles')
			// console.log(res)
			this.roleList = res.data.data
			// console.log(this.roleList)
		},
		/**
		 * 移除权限
		 * @param  {[type]} scope [角色列表]
		 * @param  {[type]} id    [权限id]
		 */
		async removeRight (role,rightId) {

			const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
			// console.log(role)
			// console.log(res.data.data)
			role.children = res.data.data
		},
		/**
		 * 获取权限列表
		 * @param  {[obj]} role [角色]
		 */
		async getRole (role) {

			this.dialogFormVisible = true

			this.roleId = role.id

			const res = await this.$http.get(`rights/tree`)
			// console.log(res)
			this.rolesTree = res.data.data

			let arr = []

			role.children.forEach( v =>{
				v.children.forEach(v2 => {
					v2.children.forEach(v3 => {
						arr.push(v3.id)
					})
				})
			})
			// console.log(arr)
			this.checked = arr
		},
		async setRole () {
			let arr1 = this.$refs.tree.getCheckedKeys()
			let arr2 = this.$refs.tree.getHalfCheckedKeys()
			let key = [...arr1,...arr2].join(',')

			const res = await this.$http.post(`roles/${this.roleId}/rights`,{rids:key})
			// console.log(res)
			if (res.data.meta.status === 200) this.$message.success(res.data.meta.msg)
			
			this.getRoles()

			this.dialogFormVisible = false
		},
		//重置表单
		resetForm(sync,formName) {
			this[sync] = false
			formName&&this.$refs[formName].resetFields()
      // this.$refs[formName].resetFields()
    },
		async addSubmit () {

			const res = await this.$http.post(`/roles`,this.addForm)
			// console.log(res.data)
			if (res.data.meta.status === 201) {
				this.$message.success(res.data.meta.msg)
				this.getRoles()
			}

			this.dialogAddFormVisible = false
		},
		async editRole (id) {
			const res = await this.$http.get(`/roles/${id}`)
			// console.log(res.data.data)
			this.editForm = res.data.data

			this.dialogEditFormVisible = true
		},
		async editSubmit () {
			
			const res = await this.$http.put(`roles/${this.editForm.roleId}`,this.editForm)
			if(res.data.meta.status === 200) {
				this.$message.success('修改成功')
				this.getRoles()
			}
			this.dialogEditFormVisible = false
		},
		async delRole (id) {
			const res = await this.$http.delete(`/roles/${id}`)
			// console.log(res)
			this.getRoles()
		},
		//确认删除弹框
		delConfirm (id) {
			this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      	this.delRole(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
		}
	},
	created () {
		this.getRoles()
	}
}
</script>
<style>
	.role {
		background: #fff;
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding: 10px;
	}
</style>
