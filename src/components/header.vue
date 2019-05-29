<template>
  <el-header id="header">
    <a class="page" href="https://www.baidu.com">
      <span class="logo"/>
    </a>
    <div class="left">
      <router-link to="/dashboard" class="astyle">首页</router-link>
      <router-link to="/dynamic" class="astyle">动态</router-link>
      <router-link to="/process" class="astyle">流程</router-link>
      <router-link to="/documentmanagement" class="astyle">文档管理</router-link>
      <router-link to="/management" class="astyle">经营管理</router-link>
      <router-link to="/lessonslibrary" class="astyle">经验教训库</router-link>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="less">
#header{
    padding-left: 0;
    position: relative;
    .page{
      float: left;
      width: 60px;
      height: 60px;
      .logo{
        float: left;
        cursor: pointer;
        width: 60px;
        height: 60px;
        background: url('data:image/png;base64,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');
        background-position: 50% 50%;
      }
    }
    .left{
      float: left;
      .astyle{
        float: left;
        display: inline-block;
        text-decoration: none;
        color: black;
        padding: 0 20px 0 20px;
        height: 60px;
        line-height: 60px;
      }
    }
  }
</style>
