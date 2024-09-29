<template>
  <div class="pagination-container">
      <el-pagination
          :background="background"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="layout"
          :total="total">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 30, 50, 100]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  // computed: {
  //   currentPage: {
  //     get() {
  //       return this.page
  //     },
  //     set(val) {
  //       this.$emit('update:page', val)
  //     }
  //   },
  //   pageSize: {
  //     get() {
  //       return this.limit
  //     },
  //     set(val) {
  //       this.$emit('update:limit', val)
  //     }
  //   }
  // },
  methods: {
    handleSizeChange(val) {
      this.$emit('sizeChange', val);
    },
    handleCurrentChange(val) {
      this.$emit('currentChange', val);
    }
  }
}
</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding: 32px 16px;
    text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
