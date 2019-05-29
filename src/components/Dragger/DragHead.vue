<template>
  <el-header>
    <div class="left">
      <el-button class="el-icon-arrow-left iconStyle"/>
      <span class="msg">{{ msg }}</span>
    </div>
    <div class="center">
      <el-menu
        :default-active="this.$router.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        router
        unique-opened=""
        active-text-color="#ffd04b"
        @select="handleSelect">
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
    <div class="right">
      <router-link to="/help" class="icon iconfont icon-iconfontwenhao1 wenhao">
        <span class="help">帮助</span>
      </router-link>
      <el-button class="submit" @click="submitMsg">发布</el-button>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'DragHead',
  data() {
    return {
      msg: '生僻',
      menuList: [{
        name: '',
        path: '',
        children: []
      }],
      activeIndex: '/dragger/form'
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.menuList = [{
        name: '基础设置',
        path: '/dragger/base',
        children: []
      }, {
        name: '表单设计',
        path: '/dragger/form',
        children: []
      }, {
        name: '流程设计',
        path: '/dragger/process',
        children: []
      }]
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath)
    },
    submitMsg() {}
  }
}
</script>

<style scoped lang="less">
  .el-header{
    padding: 0;
    background: #2396ff;
    .left{
      float: left;
      width: 30%;
      height: 60px;
      .iconStyle{
        float: left;
        width: 60px;
        height: 60px;
        background:#2396ff ;
        font-size: 24px;
        color: white;
        font-weight: bolder;
        border: none;
        &:hover{
          background: #1cb7ff;
        }
      }
      .msg{
        float: left;
        height: 60px;
        width: 100px;
        line-height: 60px;
      }
    }
    .center{
      float: left;
      width: 42%;
      height: 60px;
      background: white;
      el-menu-demo{
        width: 100%;
        height: 60px;
      }
    }
    .right{
      float: left;
      width: 28%;
      .wenhao{
        float: left;
        font-size: 20px;
        color: white;
        margin-left: 50%;
        line-height: 60px;
        text-decoration: none;
        .help{
          font-size: 16px;
          color: white;
          padding-left: 5px;
        }
      }
      .submit{
        float: left;
        margin-top: 10px;
        margin-left: 20px;
      }
    }
  }
</style>
<style>
  .el-menu-item{
    width: 33%;
    padding: 0;
    text-align: center;
  }
  .el-menu-item:nth-child(3){
    width: 34%;
  }
  .gide{
    display: inline-block;
    width: 100%;
    text-decoration: none;
  }
</style>
