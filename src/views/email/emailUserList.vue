<template>
  <div class="app-container">
    <div class="btnlist">
      <el-input v-model="listQuery.query" placeholder="请输入搜索关键字（如用户账号，邮箱等）" clearable class="mini-input">
        <el-button slot="append" icon="el-icon-search" @click="getListByPage()" />
      </el-input>
      <el-button size="mini" @click="getList(listQuery.query='')"><span class="el-icon-search" />查询全部</el-button>
      <el-button size="mini" @click="editUser"><span class="el-icon-plus" />添加用户</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      class="roundTable"
      :data="userList"
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
      <el-table-column label="用户账号">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱地址"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="激活状态">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.activated === true"
            type="success"
            size="mini"
          >已激活</el-tag>
          <el-tag
            v-else
            type="danger"
            size="mini"
          >未激活</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="禁用状态">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.disabled !== true"
            type="success"
            size="mini"
          >未禁用</el-tag>
          <el-tag
            v-else
            type="danger"
            size="mini"
          >已禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-tooltip
            content="重置配额"
            placement="top"
          >
            <el-button
              size="mini"
              round
              type="primary"
              @click="updateStorageUsed(scope.row)"
            >
              <i class="el-icon-refresh-right" />
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="重置密码"
            placement="top"
          >
            <el-button
              size="mini"
              round
              type="info"
              @click="resetPwd(scope.row)"
            >
              <i class="qiiconfont qiconzhongzhimima" />
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="修改密码"
            placement="top"
          >
            <el-button
              size="mini"
              round
              type="success"
              @click="updatePwd(scope.row)"
            >
              <i class="qiiconfont qiconxiugaimima" />
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="编辑"
            placement="top"
          >
            <el-button
              size="mini"
              round
              type="warning"
              @click="editUser(scope.row)"
            >
              <i class="qiiconfont qiconbianji" />
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top"
          >
            <el-button
              size="mini"
              round
              type="danger"
              @click="delUser(scope.row)"
            >
              <i class="el-icon-delete" />
            </el-button>
          </el-tooltip>
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
    <el-dialog
      :title="editFlag === true ? '编辑用户' : '添加用户'"
      width="500px"
      :visible.sync="dialogAddFormVisible"
    >
      <el-form
        ref="addForm"
        :show-close="false"
        :model="addForm"
        :rules="rules"
        class="addForm"
        label-width="90px"
      >
        <el-form-item
          v-if="!editFlag"
          label="账户名称"
          prop="username"
        >
          <el-input
            v-model.trim="addForm.username"
            placeholder="请输入账户名称"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="用户姓名"
          prop="name"
        >
          <el-input
            v-model.trim="addForm.name"
            placeholder="请输入用户姓名"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="editFlag"
          label="是否禁用"
          prop="disabled"
          style="text-align: left"
        >
          <el-switch
            v-model="addForm.disabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
        <el-form-item
          v-if="!editFlag"
          label="账户密码"
          prop="password"
        >
          <el-input
            v-model.trim="addForm.password"
            placeholder="请输入账户密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-if="!editFlag"
          label="邮箱地址"
          prop="address"
        >
          <el-input
            v-model.trim="addForm.address"
            placeholder="请输入邮箱地址"
            autocomplete="off"
          >
            <!-- <template slot="append">@7qiao.club</template> -->
            <i slot="suffix">@7qiao.club</i>
          </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelForm('addForm')">取 消</el-button>
        <el-button @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :show-close="false"
      :close-on-click-modal="false"
      title="修改密码"
      :visible.sync="pwdDialogVisible"
      width="360px"
      center
    >
      <el-form
        ref="pwdForm"
        label-width="108px"
        :model="pwdForm"
        :rules="pwdRules"
      >
        <el-form-item
          label="旧密码"
          prop="existingPassword"
        >
          <el-input
            v-model.trim="pwdForm.existingPassword"
            type="password"
            placeholder="请输入"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newpwd"
        >
          <el-input
            v-model.trim="pwdForm.newpwd"
            type="password"
            placeholder="请输入"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="password"
        >
          <el-input
            v-model.trim="pwdForm.password"
            type="password"
            placeholder="请输入"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelPwdForm('pwdForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="toEditPwd('pwdForm')"
        >确认修改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :show-close="false"
      title="提示"
      :visible.sync="resetDialogVisible"
      width="30%"
    >
      <p>
        用户密码重置成功；初始密码为：<span style="color: red">{{
          copyForm.resetPwdVal
        }}</span>
      </p>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="resetDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :title="copyForm.resetPwdVal"
          @click="handleCopy(copyForm, $event)"
        >复制到粘贴板</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import '../../assets/qIcon/iconfont.css' // 自定义注册图标库
import {
  getEmailUserList,
  setUserInfo,
  deleteUserByid,
  getEmailUserById,
  editUserInfo,
  resetUserPwd,
  setStorageUsed
} from '@/api/mail'
import clip from '@/utils/clipboard' // 复制工具
import paging from '@/components/Pagegroup'
export default {
  components: { paging },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度长度在6到16个字符'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.pwdForm.password !== '') {
          this.$refs.pwdForm.validateField('password')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.pwdForm.newpwd) {
        callback(new Error('两次输入新密码不一致!'))
      } else {
        callback()
      }
    }
    const isOneUserName = (rule, value, callback) => {
      const that = this
      const reg = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/
      if (reg.test(value)) {
        if (that.userNameList.includes(value)) {
          return callback(new Error('账号已存在，请重新输入'))
        } else {
          callback()
        }
      } else {
        return callback(
          new Error('昵称格式：限16个字符，支持中英文、数字、减号或下划线')
        )
      }
    }
    const isOneAdress = (rule, value, callback) => {
      const that = this
      const reg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
      if (reg.test(value)) {
        if (that.addressesList.includes(value)) {
          return callback(new Error('邮箱已存在，请重新输入'))
        } else {
          callback()
        }
      } else {
        return callback(new Error('请输入正确的邮箱格式'))
      }
    }
    const isOneName = (rule, value, callback) => {
      const that = this
      if (value.length > 0 && value.length < 16) {
        if (that.nameList.includes(value) && that.nameVal !== value) {
          return callback(new Error('用户姓名已存在；请重新输入'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入用户姓名，长度不能超过16个字符'))
      }
    }
    return {
      copyForm: {
        userName: '',
        resetPwdVal: ''
      },
      // 校验修改时重名
      nameVal: '',
      // 重置密码弹框
      resetDialogVisible: false,
      // 修改密码弹框
      pwdDialogVisible: false,
      // 编辑id
      vid: '',
      total: 0,
      pageSize: 10,
      editFlag: 'false',
      // 总数据
      tableData: [],
      // 分页处理后显示数据
      userList: [],
      // 账号集合（校验重名）
      userNameList: [],
      // 邮箱集合（校验重名）
      addressesList: [],
      // 姓名集合（校验重名）
      nameList: [],
      // 修改新增弹框
      dialogAddFormVisible: false,
      // 添加表单
      addForm: {
        username: '',
        password: '',
        disabled: false,
        name: '',
        address: '',
        tags: ['status:regular_user', 'subscription:business_big']
      },
      listLoading: true,
      // 校验
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: isOneUserName }
        ],
        name: [{ required: true, trigger: 'blur', validator: isOneName }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        address: [{ required: true, trigger: 'blur', validator: isOneAdress }]
      },
      pwdForm: {
        existingPassword: '',
        newpwd: '',
        password: ''
      },
      pwdRules: {
        existingPassword: [
          { required: true, message: '请输入旧密码!', trigger: 'blur' },
          { max: 16, message: '密码不能大于16位', trigger: 'blur' }
        ],
        newpwd: [
          { required: true, validator: validatePass, trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度长度在6到16个字符哦!',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度长度在6到16个字符哦!',
            trigger: 'blur'
          }
        ]
      },
      listQuery: {
        query: ''
      }

    }
  },

  created() {
    this.getList()
  },
  methods: {
  // 更新用户配额
    updateStorageUsed(data) {
      setStorageUsed(data.id).then(res => {
        this.$message.success('用户配额更新成功')
      })
    },
    // submitstorageUsedForm(storageUsedForm) {
    //   const that = this
    //   that.$refs[storageUsedForm].validate((valid) => {
    //     if (valid) {
    //       setStorageUsed(that.storageUsedForm).then(res => {
    //         that.$message.success('用户配额更新成功')
    //         this.dialogStorageUsed = false
    //       })
    //     }
    //   })
    // },
    // 子组件处理数据后调用赋值
    getView(table) {
      this.userList = table
    },
    // 进入时查询
    getList(val) {
      this.listLoading = true
      const that = this
      if (val) {
        that.pageSize = val
      }
      that.userList = []
      getEmailUserList().then((response) => {
        this.tableData = response.data.results
        if (response.data.results.length >= that.pageSize) {
          for (let i = 0; i < that.pageSize; i++) {
            that.userList.push(response.data.results[i])
          }
        } else {
          that.userList = response.data.results
        }
        this.userNameList = this.tableData.map((x) => x.username)
        this.nameList = this.tableData.map((x) => x.name)
        this.addressesList = this.tableData.map((x) => x.address)
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // 带参数或点击分页查询
    getListByPage(val) {
      this.listLoading = true
      const that = this
      if (val) {
        that.pageSize = val
      }
      that.userList = []
      getEmailUserList(this.listQuery).then(response => {
        this.tableData = response.data.results
        if (response.data.results.length >= that.pageSize) {
          for (let i = 0; i < that.pageSize; i++) {
            that.userList.push(response.data.results[i])
          }
        } else {
          that.userList = response.data.results
        }
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    // 重置密码
    resetPwd(data) {
      const _that = this
      _that.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          resetUserPwd(data.id).then((response) => {
            _that.copyForm = {
              resetPwdVal: response.data.password,
              userName: data.name
            }
            _that.resetDialogVisible = true
          })
        })
        .catch(() => {
          _that.$message({
            type: 'info',
            message: '已取消重置'
          })
        })
    },
    // 点击复制
    handleCopy(text, event) {
      const val = text.resetPwdVal
      const info = text.userName + '的初始密码'
      clip(val, info, event)
      this.resetDialogVisible = false
    },
    // 更新密码弹框显示
    updatePwd(data) {
      this.pwdid = data.id
      this.pwdDialogVisible = true
    },
    // 修改密码表单提交
    toEditPwd(pwdForm) {
      const that = this
      that.$refs[pwdForm].validate((valid) => {
        if (valid) {
          const obj = {
            existingPassword: that.pwdForm.existingPassword,
            password: that.pwdForm.password
          }
          editUserInfo(that.pwdid, obj)
            .then((response) => {
              that.$message.success('密码修改成功')
              that.getList()
              that.$refs[pwdForm].resetFields()
              that.pwdDialogVisible = false
            })
            .catch((err) => {
              that.$message.error(
                '操作失败，请检查网络或重新输入正确密码' + err
              )
            })
        } else {
          return false
        }
      })
    },
    // 编辑或添加弹出框
    editUser(formData) {
      const _that = this
      if (formData.id) {
        _that.editFlag = true
        getEmailUserById(formData.id).then((res) => {
          _that.addForm = {
            name: res.data.name,
            disabled: res.data.disabled
          }
          _that.nameVal = res.data.name
          _that.vid = res.data.id
        })
      } else {
        _that.addForm = {
          username: '',
          password: '',
          name: '',
          address: '',
          tags: ['status:regular_user', 'subscription:business_big']
        }
        _that.editFlag = false
      }
      this.dialogAddFormVisible = true
    },
    // 保存
    submitForm(addForm) {
      const that = this
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          if (this.editFlag === true) {
            editUserInfo(that.vid, that.addForm).then((res) => {
              that.$message.success('用户修改成功')
              that.getList()
              that.$refs[addForm].resetFields()
              that.nameVal = ''
              that.dialogAddFormVisible = false
            })
          } else {
            setUserInfo(that.addForm).then((res) => {
              that.$message.success('用户添加成功')
              that.getList()
              that.$refs[addForm].resetFields()
              that.nameVal = ''
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
      this.nameVal = ''
    },
    // 取消
    cancelPwdForm(pwdForm) {
      this.pwdDialogVisible = false
      this.$refs[pwdForm].resetFields()
      this.nameVal = ''
    },
    delUser(data) {
      const _that = this
      _that.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUserByid(data.id).then((res) => {
            _that.$message({
              type: 'success',
              message: '已删除'
            })
            _that.getList()
          })
        })
        .catch(() => {
          _that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>
<style scoped >
.roundTable .el-button--mini,
.el-button--mini.is-round {
  padding: 8px;

}
.roundTable .el-button--mini,
.el-button--small {
    font-size: 14px;
    width: 31px;
}

</style>
