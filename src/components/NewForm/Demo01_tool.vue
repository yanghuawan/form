<!--suppress ALL-->
<script>
export default {
  name: 'Demo01_tool',
  data() {
    return {
      moveInfo: '单行输入框',
      moveImgSrc: '../../../static/images/list1.png',
      movePosition: {
        marginTop: '0px',
        marginLeft: '0px',
        transform: 'translate3d(0, 0, 0)',
        display: 'none'
      },
      controlList: [],
      activeIndex: 'first',
      dataList: [{
        title: '',
        text: '',
        typeIndex: ''
      }],
      rightTitle: '',
      rightIndex: 0,
      tableData: [],
      showHeader: false
    }
  },
  mounted () {
    this.getControlList()
    this.getDataList()
    this.getTableData()
  },
  methods: {
    // 获取用户管理列表
    getControlList () {
      this.controlList = [{
        info: '单行输入框',
        imgSrc: '../../../static/images/list1.png'
      }, {
        info: '多行输入框',
        imgSrc: '../../../static/images/list2.png'
      }, {
        info: '数字输入框',
        imgSrc: '../../../static/images/list3.png'
      }, {
        info: '单选框',
        imgSrc: '../../../static/images/list4.png'
      }, {
        info: '多选框',
        imgSrc: '../../../static/images/list5.png'
      }, {
        info: '日期',
        imgSrc: '../../../static/images/list6.png'
      }, {
        info: '日期区间',
        imgSrc: '../../../static/images/list7.png'
      }, {
        info: '图片',
        imgSrc: '../../../static/images/list8.png'
      }, {
        info: '明细',
        imgSrc: '../../../static/images/list9.png'
      }, {
        info: '说明文字',
        imgSrc: '../../../static/images/list10.png'
      }, {
        info: '金额',
        imgSrc: '../../../static/images/list11.png'
      }, {
        info: '附件',
        imgSrc: '../../../static/images/list12.png'
      }, {
        info: '外部联系人',
        imgSrc: '../../../static/images/list13.png'
      }, {
        info: '联系人',
        imgSrc: '../../../static/images/list14.png'
      }, {
        info: '部门',
        imgSrc: '../../../static/images/list15.png'
      }, {
        info: '地点',
        imgSrc: '../../../static/images/list16.png'
      }, {
        info: '计算公式',
        imgSrc: '../../../static/images/list17.png'
      }, {
        info: '电子发票',
        imgSrc: '../../../static/images/list18.png'
      }, {
        info: '关联审批单',
        imgSrc: '../../../static/images/list19.png'
      }]
    },
    // 获取中间表单中的数据
    getDataList () {
      let that = this
      this.$axios.get('/api/form/middle').then(function (res) {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].checked === 0) {
            data[i].checked = true
          } else {
            data[i].checked = false
          }
          if (data[i].printFlag === 0) {
            data[i].printFlag = true
          } else {
            data[i].printFlag = false
          }
          if (data[i].openPhoto === 0) {
            data[i].openPhoto = true
          } else {
            data[i].openPhoto = false
          }
        }
        that.dataList = data
      })
    },
    getTableData () {
      this.tableData = [{
        type: '年假',
        time: '按半天请'
      }, {
        type: '事假',
        time: '按小时请'
      }, {
        type: '病假',
        time: '按小时请'
      }, {
        type: '调休',
        time: '按小时请'
      }, {
        type: '产假',
        time: '按天请'
      }, {
        type: '陪产假',
        time: '按天请'
      }, {
        type: '婚假',
        time: '按天请'
      }, {
        type: '例假',
        time: '按半天请'
      }, {
        type: '丧家',
        time: '按天请'
      }, {
        type: '哺乳假',
        time: '按小时请'
      }]
    },
    // 当鼠标进入中间表单的区域
    mouseEnterForm (index) {
      let evt = event
      if (evt.target.style.border !== '2px solid rgb(56, 173, 255)') {
        event.target.style.border = '2px dashed #38adff'
      }
      event.target.firstChild.style.display = 'inline-block'
      event.target.onclick = () => {
        this.rightTitle = this.dataList[index].typeName
        this.rightIndex = index
        if (evt.target.style.border !== '2px solid rgb(56, 173, 255)') {
          let allBorder = document.getElementsByClassName('innerContent')
          for (let i = 0; i < allBorder.length; i++) {
            allBorder[i].style.border = '2px solid rgb(246, 246, 246)'
          }
          evt.target.style.border = '2px solid rgb(56, 173, 255)'
        }
      }
      event.target.firstChild.onclick = () => {
        event.stopPropagation()
        if (index >= 0) {
          this.dataList.splice(index, 1)
        }
      }
      event.target.onmouseleave = function () {
        if (evt.target.style.border !== '2px solid rgb(56, 173, 255)') {
          evt.target.style.border = '2px solid #f6f6f6'
        }
        evt.target.firstChild.style.display = 'none'
      }
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    selectFormList (index) {
      this.moveInfo = this.controlList[index].info
      this.moveImgSrc = this.controlList[index].imgSrc
      let top = 10 + (parseInt(index / 2)) * 42 + 'px'
      let left = 5 + (index % 2) * 172 + 'px'
      this.movePosition = {
        marginTop: top,
        marginLeft: left,
        transform: 'translate3d(0, 0, 0)',
        display: 'inline-block'
      }
      let x1 = event.clientX
      let y1 = event.clientY
      let num = this.getDataListSpace()
      document.onmousemove = () => {
        let offX = event.clientX - x1 + 'px'
        let offY = event.clientY - y1 + 'px'
        this.movePosition.transform = 'translate3d(' + offX + ', ' + offY + ', 0)'
        this.showRedLine(num, event.clientX, event.clientY)
      }
      document.onmouseup = () => {
        let newList = {
          title: this.controlList[index].info,
          text: '请输入',
          typeIndex: index,
          typeName: this.controlList[index].info,
          checked: true,
          printFlag: true
        }
        if (!this.dataList.length) {
          this.dataList = []
        }
        this.dataList.push(newList)
        this.movePosition.display = 'none'
        document.onmousedown = null
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    submitDataList () {
      let that = this
      this.$confirm('您确定提交该表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < that.dataList.length; i++) {
          if (that.dataList[i].checked) {
            that.dataList[i].checked = 0
          } else {
            that.dataList[i].checked = 1
          }
          if (that.dataList[i].printFlag) {
            that.dataList[i].printFlag = 0
          } else {
            that.dataList[i].printFlag = 1
          }
          if (that.dataList[i].openPhoto) {
            that.dataList[i].openPhoto = 0
          } else {
            that.dataList[i].openPhoto = 1
          }
        }
        console.log(that.dataList)
        that.$axios.post('/api/form/submit', that.dataList).then(function (res) {
          console.log(res)
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消提交'
        })
      })
    },
    addLeftToMiddleForm () {

    },
    getDataListSpace () {
      let top = document.getElementById('container').offsetTop
      let innerContent = document.getElementsByClassName('innerContent')
      let arr = []
      if (innerContent && innerContent.length > 0) {
        for (let i = 0; i < innerContent.length; i++) {
          arr[i] = top + innerContent[i].offsetTop + (innerContent[i].offsetHeight / 2)
        }
      }
      return arr
    },
    showRedLine (arr, x, y) {
      let x1 = document.getElementById('mobile').offsetLeft
      let x2 = document.getElementById('mobile').offsetLeft + document.getElementById('mobile').offsetWidth
      if (x >= x1 && x <= x2) {

      }
    }
  }
}
</script>

<style scoped>

</style>
