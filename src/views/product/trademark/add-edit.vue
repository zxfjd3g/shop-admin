<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="trademark.tmName"/>
      </el-form-item>

      <el-form-item label="Logo">
        <el-upload
          :show-file-list="false"
          :on-success="handleImageUrlSuccess"
          :before-upload="beforeImageUrlUpload"
          :action="'http://182.92.128.115/admin/product/fileUpload'"
          class="avatar-uploader">
          <img v-if="trademark.logoUrl" :src="trademark.logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const defaultForm = {
  tmName: '',
  logoUrl: ''
}

export default {

  data() {
    return {
      BASE_API: process.env.BASE_API,
      trademark: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用
    }
  },

  watch: {
    // 路由变化时, 重新初始化
    $route(to, from) {
      this.init()
    }
  },

  mounted () {
    this.init()
  },

  methods: {

    /* 
    表单初始化: 添加与重新做不同处理
    */
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        this.trademark = { ...defaultForm }
      }
    },

    /* 
    保存或更新
    */
    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      if (!this.trademark.id) {
        this.addTradeMark()
      } else {
        this.updateTradeMark()
      }
    },

    /* 
    请求添加一个新的品牌
    */
    addTradeMark() {
      this.$API.tradeMark.save(this.trademark).then(result => {
        // debugger
        if (result.code) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.$router.replace({ path: '/product/trademark' })
        }
      })
    },

    /* 
    请求更新品牌
    */
    updateTradeMark() {
      this.$API.tradeMark.updateById(this.trademark).then(result => {
        if (result.code) {
          this.$message({
            type: 'success',
            message: result.message
          })
          this.$router.replace({ path: '/product/trademark' })
        }
      })
    },

    /* 
    异步获取指定id的品牌
    */
    fetchDataById(id) {
      this.$API.tradeMark.getById(id).then(result => {
        this.trademark = result.data
      })
    },

    /* 
    图片上传成功的回调
    */
    handleImageUrlSuccess(result) {
      this.trademark.logoUrl = result.data
    },

    /* 
    上传之前的回调
    */
    beforeImageUrlUpload(file) {
      const isImg = ['image/jpeg', 'image/png'].includes(file.type) 
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$message.error('上传封面图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 2MB!')
      }
      return isImg && isLt2M // 返回false不上传
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
</style>