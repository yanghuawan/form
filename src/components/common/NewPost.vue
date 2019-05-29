<template>
  <div>
    <el-button @click="dialogVisible = true">新建部门</el-button>
    <el-dialog :visible.sync="dialogVisible" title="新建岗位">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="岗位基础信息" name="first">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item :label-width="formLabelWidth" label="岗位名称" prop="name">
              <el-input v-model="form.name" placeholder="1-10个字"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="学历要求">
              <el-select v-model="form.type">
                <el-option label="无学历要求" value="无学历要求"/>
                <el-option label="小学及以上学历" value="小学及以上学历"/>
                <el-option label="初中及以上学历" value="初中及以上学历"/>
                <el-option label="高中及以上学历" value="高中及以上学历"/>
                <el-option label="大专及以上学历" value="大专及以上学历"/>
                <el-option label="本科及以上学历" value="本科及以上学历"/>
                <el-option label="研究生及以上学历" value="研究生及以上学历"/>
                <el-option label="博士及以上学历" value="博士及以上学历"/>
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="岗位职责" prop="jobResponsibility">
              <el-input
                :rows="3"
                v-model="form.jobResponsibility"
                type="textarea"
                placeholder="1-200个字"/>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="任职要求" prop="jobRequirements">
              <el-input
                :rows="3"
                v-model="form.jobRequirements"
                type="textarea"
                placeholder="1-200个字"/>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="功能&数据权限" name="second">功能&数据权限</el-tab-pane>
        <el-tab-pane label="通讯录权限" name="third">通讯录权限</el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NewPost',
  data() {
    return {
      dialogVisible: false,
      activeName: 'first',
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择部门类型', trigger: 'change' }
        ],
        jobResponsibility: [
          { required: true, message: '请输入岗位职责，长度1-200个字', trigger: 'blur' },
          { min: 1, max: 200, message: '岗位职责长度不能超过200个字', trigger: 'blur' }
        ],
        jobRequirements: [
          { required: true, message: '请输入岗位职责，长度1-200个', trigger: 'blur' },
          { min: 1, max: 200, message: '岗位职责长度不能超过200个字', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        type: '无学历要求',
        jobResponsibility: '',
        jobRequirements: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 发送ajax请求，判断岗位是否存在，将form表单发送到后台
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style>
  .el-dialog__header {
    padding: 20px 20px 10px;
    background: rgba(128, 128, 128, 0.52);
  }
  .el-input__inner{
    width:555px;
  }
  .el-textarea__inner{
    width: 555px;
  }
</style>
<style scoped lang="less">

</style>
