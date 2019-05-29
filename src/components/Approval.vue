<template>
  <div class="approval">
    <div class="header">
      <el-button type="text" style="float: left">
        <i class="el-icon-arrow-left"/>
      </el-button>
      <approval-menu/>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ApprovalMenu from './ApprovalMenu'

export default {
  name: 'Approval',
  components: { ApprovalMenu },
  mixins: ['ApprovalMenu'],
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style scoped lang="less">
.approval{
  .header{
    height: 80px;
  }
  .content{
    position: relative;
  }
}
</style>
