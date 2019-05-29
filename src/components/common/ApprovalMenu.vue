<template>
  <div class="approval-menu">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
      unique-opened=""
      @select="handleSelect"
    >
      <template v-for="(item, index) in menuList">
        <el-submenu v-if="item.children.length > 0" :index="item.path" :key="index">
          <template slot="title">
            {{ item.name }}
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path" :key="index2">
              {{ item2.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="index">
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'ApprovalMenu',
  data() {
    return {
      menuList: [{
        name: '',
        path: '',
        children: []
      }],
      activeIndex: '/approval/base'
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.menuList = [{
        name: '基础设置',
        path: '/approval/base',
        children: []
      }, {
        name: '表单设计',
        path: '/approval/form',
        children: []
      }, {
        name: '流程设计',
        path: '/approval/process',
        children: []
      }]
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
    }
  }
}
</script>

<style scoped lang="less">
.approval-menu{
  float: left;
  margin-left: 20px;
  .el-menu-demo{
    height: 100%;
  }
  .el-menu.el-menu--horizontal{
    border-bottom: none
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
    color: #303133;
    background-color: #3a8ee6;
  }
  .el-menu--horizontal>.el-menu-item{
    border-bottom: none;
    height: 100%;
    width: 110px;
    text-align: center;
    line-height: 80px;
    font-size: 16px;
  }
  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: none;
    color: #303133;
  }
  .el-submenu.is-active .el-submenu__title {
    border-bottom: none;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    line-height: 80px;
  }
}
</style>
