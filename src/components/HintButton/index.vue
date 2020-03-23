<template>
  <el-tooltip :content="title" placement="top" effect="light" :close-delay="0"
    :open-delay="500">
    <el-button v-bind="$attrs" v-on="$listeners"/>
  </el-tooltip>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: String
    }
  }
</script>