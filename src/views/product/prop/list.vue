<template>
  <div class="app-container">

    <!--三级下拉列表-->
    <CategorySelector @listenOnSelect="getAttrInfoList" />

      <el-divider></el-divider>

      <!--属性列表-->
      <div v-if="!showAttrInfoForm">
        <div style="margin-bottom:10px;">
          <el-button type="primary" icon="el-icon-plus" @click="toAddAttrInfo">添加平台属性</el-button>
        </div>

        <el-table
          :data="attrInfoList"
          v-loading="attrInfoListLoading"
          element-loading-text="数据正在加载......"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="序号" width="100">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>

          <el-table-column label="属性id" width="100" prop="id" />
          <el-table-column label="属性名称" prop="attrName" />

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button 
                v-if="categoryLevel === scope.row.categoryLevel" 
                type="primary" 
                size="mini" 
                icon="el-icon-edit" 
                @click="editAttrInfoById(scope.row.id, scope.row.attrName)"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--属性表单-->
      <el-form v-else :model="attrInfoForm" :inline="true">

        <el-form-item label="属性名称">
          <el-input v-model="attrInfoForm.attrName" placeholder="输入属性名称"/>
        </el-form-item>

        <div style="margin-bottom:10px;">
          <el-button :disabled="!attrInfoForm.attrName" type="primary" 
            icon="el-icon-plus" @click="addAttrValue">添加属性值</el-button>
          <el-button type="default" @click="backToAttrList()" style="position: right">返回</el-button>
        </div>

        <div>
          <el-table
            :data="attrInfoForm.attrValueList"
            v-loading="attrValueListLoading"
            element-loading-text="数据正在加载......"
            border
            fit
            highlight-current-row>

            <el-table-column align="center" label="序号" width="100">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>

            <el-table-column label="属性值id" width="100" prop="id"/>
            <el-table-column label="属性值名称">
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.edit"
                  v-model="scope.row.valueName"
                  class="edit-input"
                  size="mini"
                  @keyup.enter.native="saveAttrValue(scope.row)"
                  @blur="saveAttrValue(scope.row)" />
                <span
                  v-else
                  style="display: inline-block; width: 100%;"
                  @click="toEditAttrValue(scope.row)">{{ scope.row.valueName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" icon="el-icon-edit" @click="deleteAttrValue(scope.$index)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>

        <!--保存和返回按钮-->
        <div style="margin-top:22px;">
          <el-button type="primary" @click="saveAttrInfo()">保存</el-button>
          <el-button type="default" @click="backToAttrList()">返回</el-button>
        </div>
      </el-form>

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'PropList',
  data() {
    return {
      // 属性所属分类
      category1Id: 0,
      category2Id: 0,
      category3Id: 0,
      categoryId: 0,
      categoryLevel: 1,

      // 属性列表数据
      attrInfoList: [],
      attrInfoListLoading: false,

      // 属性表单数据
      showAttrInfoForm: false,
      attrValueListLoading: false,
      attrInfoForm: {
        id: '',
        attrName: '',
        category1Id: 0,
        category2Id: 0,
        category3Id: 0,
        attrValueList: []
      }
    }
  },

  methods: {

    /* 
    获取属性列表
    */
    getAttrInfoList(categoryId, categoryLevel) {
      this.categoryId = categoryId
      this.categoryLevel = categoryLevel
      if (categoryLevel === 1) {
        this.category1Id = categoryId
        this.category2Id = 0
        this.category3Id = 0
      }
      if (categoryLevel === 2) {
        this.category2Id = categoryId
        this.category3Id = 0
      }
      if (categoryLevel === 3) {
        this.category3Id = categoryId
      }
      // 查询数据
      this.attrInfoListLoading = true
      this.$API.prop.getAttrInfoList(this.category1Id, this.category2Id, this.category3Id).then(result => {
        this.attrInfoList = result.data
        this.attrInfoListLoading = false
      })
    },

    /* 
    添加平台属性
    */
    toAddAttrInfo() {
      // 如果没有选择分类提示警告框同时结束
      if (!this.category1Id) {
        this.$alert('请选择分类', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }

      // 初始化值
      this.attrInfoForm.id = null
      this.attrInfoForm.attrName = null
      this.attrInfoForm.attrValueList = []

      // 显示表单
      this.showAttrInfoForm = true
    },

    /* 
    修改属性
    */
    editAttrInfoById(attrId, attrName) {
      // 获取属性值列表
      this.attrValueListLoading = true
      this.$API.prop.getAttrValueList(attrId).then(result => {
        this.attrInfoForm.id = attrId
        this.attrInfoForm.attrName = attrName
        this.attrInfoForm.attrValueList = result.data
        this.attrValueListLoading = false
      })
      // 显示表单
      this.showAttrInfoForm = true
    },

    /* 
    删除指定属性值
    */
    deleteAttrValue(index) {
      this.attrInfoForm.attrValueList.splice(index, 1)
    },

    /* 
    保存属性和属性值
    */
    saveAttrInfo() {
      this.attrInfoForm.categoryId = this.categoryId
      this.attrInfoForm.categoryLevel = this.categoryLevel
      this.$API.prop.saveAttrInfo(this.attrInfoForm).then(result => {
        // 刷新属性列表
        this.getAttrInfoList(this.categoryId, this.categoryLevel)
        // 隐藏表单
        this.showAttrInfoForm = false
      })
    },

    /* 
    返回属性列表页面
    */
    backToAttrList() {
      // 隐藏表单
      this.showAttrInfoForm = false
    },

    /* 
    在前台添加属性值, 还不提交请求
    */
    addAttrValue() {
      const attrValue = {
        valueName: '',
        edit: true
      }
      this.attrInfoForm.attrValueList.push(attrValue)
    },

    /* 
    在前台保存属性值
    */
    saveAttrValue(row) {
      if (row.valueName.trim()) {
        row.edit = false
      }
    },

    /* 
    编辑属性值
    */
    toEditAttrValue(row) {
      // row.edit = true
      Vue.set(row, 'edit', true)
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 60px;
}
.save-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

