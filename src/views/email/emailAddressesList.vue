
<template>
  <div class="app-container">
    <div class="btnlist">
      <el-input v-model="listQuery.query" placeholder="请输入搜索邮箱" clearable class="mini-input">
        <el-button slot="append" icon="el-icon-search" @click=" getListByPage()" />
      </el-input>
      <el-button size="mini" @click="getList(listQuery.query='')"><span class="el-icon-search" />查询全部</el-button>
      <el-button size="mini" @click="editUser"><span class="el-icon-plus" />添加邮箱</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="addressesList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        type="index"
        align="center"
        width="50"
      />

      <el-table-column label="邮箱地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属用户">
        <template slot-scope="scope">
          <span>{{ userFormat(scope.row.user) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="editUser(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="delAdress(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-footer>
      <paging
        class="page"
        :total-count="total"
        :query-val="listQuery.query"
        :page-size="pageSize"
        :table-data="tableData"
        @tables="getView"
        @getList="getList"
        @getListByPage="getListByPage"
      />
    </el-footer>
    <el-dialog :title="editFlag===true?'编辑邮箱':'添加邮箱'" width="500px" :visible.sync="dialogAddFormVisible">
      <el-form
        ref="addForm"
        :show-close="false"
        :model="addForm"
        :rules="rules"
        class="addForm"
        label-width="108px"
      >
        <el-form-item label="所属用户" prop="user">
          <el-select v-model.trim="addForm.user" placeholder="选择入所属用户" class="lg_select" :disabled="editFlag">
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="address">
          <el-input v-model.trim="addForm.address" placeholder="请输入邮箱地址" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('addForm')">取 消</el-button>
        <el-button @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '../../assets/qIcon/iconfont.css' // 自定义注册图标库
import {
  getEmailAddressesList,
  getEmailUserList,
  setAddress,
  deleteAddressesByid,
  getEmailAddressesById,
  editAddress
} from '@/api/mail'

import paging from '@/components/Pagegroup'
export default {
  components: { paging },

  data() {
    const isOneAdress = (rule, value, callback) => {
      const that = this
      const reg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
      if (reg.test(value)) {
        if (that.addressInfoList.includes(value)) {
          return callback(new Error('邮箱已存在，请重新输入'))
        } else {
          callback()
        }
      } else {
        return callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      total: 0,
      // 编辑对象id
      addressId: '',
      editFlag: 'false',
      // 查询表格数据（无参数查询）
      tableData: [],
      // 默认当前页显示数量
      pageSize: 10,
      // 获取邮箱地址总数据（验证重名）
      addressInfoList: [],
      // 获取所有已存在邮箱所属于的用户集合（用于判断该用户下邮箱个数不能为0）
      addressUserList: [],
      // 表格显示总数据（分页带参后数据）
      addressesList: [],
      // 获取所有用户
      userList: [],
      dialogAddFormVisible: false,
      // 添加表单
      addForm: {
        user: '',
        address: ''
      },
      listLoading: true,
      // 校验
      rules: {
        user: [
          { required: true, message: '请选择所属用户', trigger: 'change' }
        ],
        address: [
          { required: true, trigger: 'blur', validator: isOneAdress }
        ]
      },
      listQuery: {
        query: ''
      }

    }
  },
  created() {
    this.getUserList()
    this.getList()
  },
  methods: {
    // 供子组件处理好数据时调用赋值应显示表格数据
    getView(table) {
      this.addressesList = table
    },
    // 获取集合
    getList(val) {
      this.listLoading = true
      const that = this
      if (val) {
        that.pageSize = val
      }
      that.addressesList = []
      getEmailAddressesList().then(response => {
        // 获取所有不处理参数集合
        this.tableData = response.data.results
        // 如果返回总数据大于当前页面显示总数据时进入分页截取
        if (response.data.results.length >= that.pageSize) {
          for (let i = 0; i < that.pageSize; i++) {
            that.addressesList.push(response.data.results[i])
          }
        } else {
          that.addressesList = response.data.results
        }
        this.addressInfoList = this.tableData.map(x => x.address)
        this.addressUserList = this.tableData.map(x => x.user)
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // 带参数或点击分页时查询
    getListByPage(val) {
      this.listLoading = true
      const that = this
      if (val) {
        that.pageSize = val
      }
      // 先清空当前表格显示数据
      that.addressesList = []
      getEmailAddressesList(this.listQuery).then(response => {
        this.tableData = response.data.results
        // 是否进入分页
        if (response.data.results.length >= that.pageSize) {
          for (let i = 0; i < that.pageSize; i++) {
            that.addressesList.push(response.data.results[i])
          }
        } else {
          that.addressesList = response.data.results
        }
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // 新增邮箱时选择所属用户集合
    getUserList() {
      getEmailUserList().then(response => {
        this.userList = response.data.results
      })
    },
    // 拿取编辑时所属用户姓名
    userFormat(val) {
      let name = ''
      this.userList.map((k) => {
        if (k.id === val) {
          name = k.name
        }
      })
      return name
    },

    // 编辑或添加弹出框
    editUser(formData) {
      const _that = this

      if (formData.id) {
        _that.editFlag = true
        getEmailAddressesById(formData.id).then(res => {
          _that.addForm = {
            user: res.data.user,
            address: res.data.address
          }
          _that.addressId = res.data.id
        })
      } else {
        _that.addForm = {
          user: '',
          address: ''
        }
        _that.editFlag = false
      }
      this.dialogAddFormVisible = true
    },
    // 保存
    submitForm(addForm) {
      const that = this
      this.$refs[addForm].validate(valid => {
        if (valid) {
          if (this.editFlag === true) {
            const val = {
              address: that.addForm.address
            }
            editAddress(that.addForm.user, that.addressId, val).then(res => {
              that.$message.success('邮箱修改成功')
              that.getList()
              that.$refs[addForm].resetFields()
              that.dialogAddFormVisible = false
            })
          } else {
            const val = {
              address: that.addForm.address
            }
            setAddress(that.addForm.user, val).then(res => {
              that.$message.success('邮箱添加成功')
              that.getList()
              that.$refs[addForm].resetFields()
              that.dialogAddFormVisible = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 取消
    cancelForm(addForm) {
      this.dialogAddFormVisible = false
      this.$refs[addForm].resetFields()
    },
    // 删除
    delAdress(data) {
      const _that = this
      // 判断所属用户下邮箱数量
      const counts = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
      const val = counts(_that.addressUserList, data.user)
      if (val > 1) {
        _that.$confirm('此操作将永久删除该邮箱, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAddressesByid(data.user, data.id).then(res => {
            _that.$message({
              type: 'success',
              message: '已删除'
            })
            _that.getList()
          })
        }).catch(() => {
          _that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        _that.$message({
          type: 'warning',
          message: '该用户下只剩一个邮箱啦，不能再删除了'
        })
      }
    }
  }
}
</script>
