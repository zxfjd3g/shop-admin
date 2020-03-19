<template>
  <div>
    <!--基本表单-->
    <el-form :model="sku" label-width="150px">
      <el-form-item label="sku名称">
        <el-input v-model="sku.skuName"/>
      </el-form-item>

      <el-form-item label="商品价格">
        <el-input v-model="sku.price"/>
      </el-form-item>

      <el-form-item label="商品重量（千克)">
        <el-input v-model="sku.weight"/>
      </el-form-item>

      <el-form-item label="商品规格描述">
        <el-input v-model="sku.skuDesc" :rows="5" type="textarea"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini" @click="updateSkuInfo">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      sku: {},
    }
  },

  mounted () {
    this.getSku()
  },

  methods: {

    async getSku () {
      const id = this.$route.params.id
      const result = await this.$API.sku.getById(id)
      this.sku = result.data
    },
    
    // 更新Sku
    async updateSkuInfo() {
      const {id, skuName, price, weight, skuDesc} = this.sku
      const result = await this.$API.sku.update({id, skuName, price, weight, skuDesc})
      if (result.code===200) {
        this.$message({
          message: '更新SKU成功',
          type: 'success'
        })
        this.$router.back()
      } else {
        this.$message({
          message: '更新SKU失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

