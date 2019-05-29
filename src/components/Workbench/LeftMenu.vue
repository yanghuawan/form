<template>
  <div class="left-menu">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      router
      unique-opened
    >
      <template v-for="(item, index) in leftMenuList">
        <el-submenu v-if="item.children.length > 0" :index="item.path" :key="index">
          <template slot="title">
            <img :src="item.icon">
            {{ item.name }}
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path" :key="index2">
              {{ item2.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else :index="item.path" :key="index">
          <img :src="item.icon">
          {{ item.name }}
        </el-menu-item>
      </template>
      <router-view/>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'LeftMenu',
  data() {
    return {
      leftMenuList: []
    }
  },
  mounted() {
    this.getLeftMenuList()
  },
  methods: {
    getLeftMenuList() {
      console.log(this.$route.path)
      this.leftMenuList = [{
        name: '组织架构管理',
        path: '/organization',
        icon: '../../../static/images/1.png',
        children: [{
          name: '组织管理',
          path: '/organization/manage'
        }, {
          name: '组织架构图',
          path: '/organization/global'
        }]
      }]
    }
  }
}
</script>

<style scoped>

</style>
