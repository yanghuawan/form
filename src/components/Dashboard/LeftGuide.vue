<template>
  <div id="header">
    <div class="left">
      <el-scrollbar>
        <el-menu :collapse="isCollapse" default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"/>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"/>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"/>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"/>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="right">
      <i class="icon iconfont icon-caidan1 iStyle" @click="Collapse()"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderGuide',
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    Collapse() {
      this.isCollapse = !this.isCollapse
      const i = document.querySelector('i')
      i.style.color = 'blue'
      setTimeout(() => {
        i.style.color = ''
      }, 1000)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">
  #header{
    position: relative;
    width: 100%;
    height: 100%;
    .left{
      position: relative;
      float: left;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height:100%;
      }
    }
    .right{
      position: relative;
      text-align: left;
      height: 60px;
      overflow: hidden;
      background: gray;
      .iStyle{
        font-size: 30px;
        line-height: 60px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
