<template>
  <el-tabs v-model="activeName" class="tabbod" @tab-click="handleClick">
    <el-tab-pane label="My approval" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="Submitted" name="second">配置管理</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {

  data() {
    return {
      activeName: 'first'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
.tabbod{
    margin: 0 2vw;
}
</style>
