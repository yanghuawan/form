<script>
export default {
  name: 'Formtool',
  data() {
    return {
      controlList: [],
      midList: []
    }
  },
  mounted() {
    this.getControlList()
    this.getmidList()
  },
  methods: {
    // 获取用户管理列表
    getControlList() {
      this.controlList = [
        {
          name: '单行输入框',
          imgSrc: '../../../static/images/list1.png',
          id: 0,
          des: '请输入',
          type: '单行输入框',
          numIndex: 1,
          key: 'singleLine'
        }, {
          name: '多行输入框',
          imgSrc: '../../../static/images/list2.png',
          id: 1,
          des: '请输入',
          type: '多行输入框',
          numIndex: 2,
          key: 'multiLine'
        }, {
          name: '数字输入框',
          imgSrc: '../../../static/images/list3.png',
          id: 2,
          des: '请输入数字',
          type: '数字输入框',
          numIndex: 3,
          key: 'number'
        }, {
          name: '单选框',
          imgSrc: '../../../static/images/list4.png',
          id: 3,
          des: '请选择>',
          type: '单选框',
          numIndex: 4,
          key: 'radio'
        }, {
          name: '多选框',
          imgSrc: '../../../static/images/list5.png',
          id: 4,
          des: '请选择>',
          type: '多选框',
          numIndex: 5,
          key: 'multiSelection'
        }, {
          name: '日期',
          imgSrc: '../../../static/images/list6.png',
          id: 5,
          des: '请选择>',
          type: '日期',
          numIndex: 6,
          key: 'date'
        }, {
          name: '日期区间',
          imgSrc: '../../../static/images/list7.png',
          id: 6,
          des: '请选择>',
          data1: '开始时间',
          data2: '结束时间',
          type: '日期区间',
          time: '时长',
          numIndex: 7,
          key: 'dateInterval'
        }, {
          name: '图片',
          imgSrc: '../../../static/images/list8.png',
          id: 7,
          type: '图片',
          numIndex: 8,
          key: 'image'
        }, {
          name: '明细',
          imgSrc: '../../../static/images/list9.png',
          id: 8,
          type: '明细',
          des: '增加明细',
          numIndex: 9,
          items: [],
          key: 'detail'
        }, {
          name: '说明文字',
          imgSrc: '../../../static/images/list10.png',
          id: 9,
          type: '说明文字',
          des: '',
          numIndex: 10,
          key: 'description'
        }, {
          name: '金额',
          imgSrc: '../../../static/images/list11.png',
          id: 10,
          type: '金额',
          des: '请输入金额',
          numIndex: 11,
          key: 'money'
        }, {
          name: '附件',
          imgSrc: '../../../static/images/list12.png',
          id: 11,
          type: '附件',
          numIndex: 11,
          key: 'annex'
        }, {
          name: '部门',
          imgSrc: '../../../static/images/list15.png',
          id: 12,
          type: '部门',
          des: '请选择>',
          numIndex: 13,
          key: 'department'
        }, {
          name: '联系人',
          imgSrc: '../../../static/images/list14.png',
          id: 13,
          des: '请选择>',
          type: '联系人',
          numIndex: 14,
          key: 'contact'
        }, {
          name: '关联流程单',
          imgSrc: '../../../static/images/list19.png',
          id: 14,
          type: '关联流程单',
          des: '请选择',
          numIndex: 15,
          key: 'association'
        }]
    },
    // 获取后台传输的midList
    getmidList() {
      this.midList = []
    }
  }
}
</script>

<style scoped lang="less">

</style>
