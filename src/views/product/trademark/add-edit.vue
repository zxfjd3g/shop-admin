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
          <img :src="trademark.logoUrl">
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
  logoUrl: '/static/default.jpg'
}

export default {
  data() {
    return {
      trademark: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用
      BASE_API: process.env.BASE_API
    }
  },

  // 监听器
  watch: {
    $route(to, from) {
      console.log('路由变化......')
      console.log(to)
      console.log(from)
      this.init()
    }
  },

  // 生命周期方法（在路由切换，组件不变的情况下不会被调用）
  created() {
    console.log('form created ......')
    this.init()
  },

  methods: {

    // 表单初始化
    init() {
      // debugger
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.fetchDataById(id)
      } else {
        // 对象拓展运算符：拷贝对象，而不是赋值对象的引用
        this.trademark = { ...defaultForm }
      }
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true // 防止表单重复提交
      if (!this.trademark.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 新增
    saveData() {
      this.$API.tradeMark.save(this.trademark).then(response => {
        // debugger
        if (response.code) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/product/trademark' })
        }
      })
    },

    // 根据id更新记录
    updateData() {
      this.$API.tradeMark.updateById(this.trademark).then(response => {
        // debugger
        if (response.code) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.$router.push({ path: '/product/trademark' })
        }
      })
    },

    // 根据id查询记录
    fetchDataById(id) {
      this.$API.tradeMark.getById(id).then(response => {
        // debugger
        this.trademark = response.data
      })
    },

    // banner上传成功的回调
    handleImageUrlSuccess(response) {
      this.trademark.logoUrl = response.data
    },

    // 上传之前的回调
    beforeImageUrlUpload(file) {
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type) 
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传封面图片只能是 JPG/PNG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传封面图片大小不能超过 2MB!')
      // }
      return isJPG && isLt2M // 返回false不上传
    }
  }
}
</script>
