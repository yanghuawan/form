<template>
  <div>
    <el-button @click="dialogFormVisible = true">新建部门</el-button>
    <el-dialog :visible.sync="dialogFormVisible" title="新建部门">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="部门名称，1-20个字"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="部门类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option label="分公司" value="分公司"/>
            <el-option label="部门" value="部门"/>
            <el-option label="区域" value="区域"/>
            <el-option label="科室" value="科室"/>
            <el-option label="班组" value="班组"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="上级部门" prop="higherOffice">
          <div class="block">
            <el-cascader
              :options="options"
              v-model="form.higherOffice"
              change-on-select
              clearable
            />
          </div>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="备注" prop="desc">
          <el-input
            :rows="7"
            v-model="form.desc"
            type="textarea"
            placeholder="不能超过200字"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: 'HeaderGuide',
  data() {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'data',
          label: 'Data',
          children: [{
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择部门类型', trigger: 'change' }
        ],
        higherOffice: [
          { required: true, message: '请选择上级部门', trigger: 'change' }
        ],
        desc: [
          { required: false, message: '请输入部门名称', trigger: 'blur' },
          { min: 0, max: 200, message: '备注长度不能超过200个字', trigger: 'blur' }
        ]
      },
      form: {
        name: '',
        type: '',
        higherOffice: [],
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClick() {
      //  判断请求是否符合要求,并发送ajax请求给后台
      this.dialogFormVisible = false
      console.log(this.form)
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
    width:400px;
  }
  .el-textarea__inner{
    width: 400px;
  }
</style>
<style scoped lang="less">
</style>
