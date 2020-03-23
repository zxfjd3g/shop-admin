<template>
  <div class="app-container">

    <div style="margin-bottom:10px;">
      <el-button type="primary" icon="el-icon-plus" @click="toAdd">添加</el-button>
    </div>

    <!-- 品牌列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      stripe
      style="width: 100%"
    >

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="logo" width="320" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img :src="scope.row.logoUrl" alt="scope.row.title" width="100px">
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="tmName" label="名称" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/product/trademark/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 品牌列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
    }
  },

  created() {
    this.fetchData()
  },

  methods: {

    /* 
    当页码发生改变的时候
    */
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.fetchData()
    },

    /* 
    跳转到添加品牌的路由
    */
    toAdd(){
      this.$router.push({ path: '/product/trademark/add' })
    },

    /* 
    加载品牌分页列表数据
    */
    fetchData(page = 1) {
      console.log('翻页。。。' + page)
      // 异步获取远程数据（ajax）
      this.page = page

      this.$API.tradeMark.getPageList(this.page, this.limit, this.searchObj).then(
        result => {
          // debugger
          this.list = result.data.records
          this.total = result.data.total

          // 数据加载并绑定成功
          this.listLoading = false
        }
      )
    },

    /* 
    重置查询表单
    */
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },

    /* 
    根据id删除数据
    */
    removeDataById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // promise
        // 点击确定，远程调用ajax
        return this.$API.tradeMark.removeById(id)
      }).then((result) => {
        this.fetchData(this.page)
        if (result.code) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>

