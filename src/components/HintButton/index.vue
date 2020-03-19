<template>
  <a href="javascript:" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"/>
  </a>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String
    }
  }
</script>