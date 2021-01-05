<!--分页-->
<template>
  <el-pagination
    background
    layout="total,sizes,prev, pager, next,jumper"
    :query="queryVal"
    :total="totalCount"
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :current-page="currentPage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />

</template>

<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 10
    },
    // 参数
    queryVal: {
      type: String,
      default: ''
    },
    pageSizes: {
      type: Array,
      default() {
        return [1, 5, 6, 8, 10, 15, 20, 30, 50]
      }
    },
    // 不处理总数量
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    defaultData: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tableView: [],
      currentPage: 1
    }
  },
  watch: {
    defaultData(newValue) {
      // 数据已经被更新
      this.handleCurrentChange(0)
    }
  },
  methods: {
    // 切换每页显示数据
    handleSizeChange(val) {
      if (this.queryVal) {
        this.$emit('getListByPage', val)
      } else {
        this.$emit('getList', val)
      }
    },
    // 分页处理逻辑
    handleCurrentChange(val) {
      console.log(val)
      // 当前页下标
      if (val !== 1) {
        val = (val - 1) * this.pageSize
      } else {
        val = 0
      }
      const number = this.tableData.length
      // 总数量大于每页显示数量时
      if (number > val + this.pageSize) {
        // 截取表格长度（每页显示总数量）
        this.tableView = this.tableData.slice(val, val + this.pageSize)
      } else {
        // 显示全部
        this.tableView = this.tableData.slice(val, this.tableData.length)
      }
      // 去映射显示表格数据
      this.$emit('tables', this.tableView)
    }
  }
}
</script>
