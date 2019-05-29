<template>
  <div>
    <el-button @click="handleClick2">停用部门</el-button>
    <el-dialog
      :visible.sync="stopDepartment"
      title="停用部门"
      width="40%">
      <span>
        <slot>你确定要停用部门{{ name }}吗?</slot>
      </span><br>
      <span>该部门停用，它的资部门都将被停用</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stopDepartment = false">取 消</el-button>
        <el-button type="primary" @click="handleClick3">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Stopdepartment',
  data() {
    return {
      stopdepartment: false
    }
  },
  methods: {
    handleClick2() {
      // 获取部门名称
      this.name = '拆件部门'
      this.stopDepartment = true
    },
    handleClick3() {
      /*
       发送请求，
        验证部门下属是否还有在职员工
        如没有给后台通知已经删除该部门
        得到后台返回的能否删除消息
        const isDelete = false
        */
      const isDelect = false
      this.stopDepartment = false
      // 发送消息告诉用户是否删除或者不能删除
      if (isDelect === false) {
        this.$message({
          message: '该部门包含在职员工，无法停用部门',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '部门停用成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-dialog__header {
  padding: 20px 20px 10px;
  background: rgba(128, 128, 128, 0.52);
}
.el-dialog__body {
  padding: 50px 25%;
  color: #606266;
  font-size: 14px;
}
</style>
