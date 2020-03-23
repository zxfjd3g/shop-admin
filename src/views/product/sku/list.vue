<template>
  <div>

    <!-- SKU列表 -->
    <el-table
      border
      v-loading="listLoading"
      :data="list"
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

      <el-table-column prop="id" label="SKU ID" width="100"/>

      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="price" label="价格(元)" width="120"/>

      <el-table-column label="默认图片" width="120" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img :src="scope.row.skuDefaultImg" alt="商品图片" style="width: 80px;">
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="价格" width="70"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <HintButton title="上架" v-if="scope.row.isSale == 0" type="success" size="mini" 
            icon="el-icon-top" @click="onSale(scope.row.id)" />
          <HintButton title="下架" v-if="scope.row.isSale == 1" type="warning" size="mini" 
            icon="el-icon-bottom" @click="cancelSale(scope.row.id)" />
          <HintButton title="修改" type="primary" size="mini" 
            icon="el-icon-edit" @click="toUpdateSku(scope.row.id)" />
          <HintButton title="删除" type="danger" size="mini" 
            icon="el-icon-delete" @click="deleteSku(scope.row.id)" />
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
      @current-change="getSkuList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      listLoading: false, // 数据是否正在加载
      list: [], // SKU列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
    }
  },

  mounted() {
    this.getSkuList()
  },

  methods: {
    
    /* 
    当页码发生改变的时候
    */
    changeSize(size) {
      console.log(size)
      this.limit = size
      this.getSkuList(1)
    },

    /* 
    异步获取指定页码的sku列表
    */
    getSkuList(page = 1) {
      this.page = page
      this.listLoading = true
      this.$API.sku.getPageList(this.page, this.limit).then(result => {
        this.list = result.data.records
        this.total = result.data.total
        this.listLoading = false
      })
    },

    /* 
    对指定SKU进行上架的请求
    */
    onSale(skuId) {
      this.$API.sku.onSale(skuId).then(result => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.getSkuList(this.page)
      })
    },

    /* 
    对指定SKU进行下架的请求
    */
    cancelSale(skuId) {
      this.$API.sku.cancelSale(skuId).then(result => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.getSkuList(this.page)
      })
    },

    /* 
    重置查询表单, 重新获取列表
    */
    resetData() {
      this.searchObj = {}
      this.getSkuList()
    },

    /* 
    跳转到SKU的更新界面去
    */
    toUpdateSku (id) {
      this.$router.push(`/product/sku/edit/${id}`)
    },

    /* 
    删除SKU
    */
    deleteSku (id) {
      this.$confirm(`确定删除此SKU吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const result = await this.$API.sku.deleteById(id)
          if (result.code===200) {
            this.$message({
              message: '删除SKU成功',
              type: 'success'
            })
            this.getSkuList(this.page)
          } else {
            this.$message({
              message: '删除SKU失败',
              type: 'error'
            })
          }
        })
    }
  }
}
</script>

