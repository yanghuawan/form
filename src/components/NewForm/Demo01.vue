<template>
  <div class="demo01">
    <div id="container">
      <div id="leftForm" style="width: 400px;height:100%;display: inline-block;">
        <el-tabs v-model="activeIndex" @tab-click="handleSelect">
          <el-tab-pane label="用户管理" name="first">
            <div id="moveDiv" :style="movePosition">
              {{ moveInfo }}
              <img :src="moveImgSrc">
            </div>
            <template v-for="(item, index) in controlList">
              <div :key="index" class="selectList" @mousedown="selectFormList(index)">
                {{ item.info }}
                <img :src="item.imgSrc">
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane label="请假套件" name="second">请假套件</el-tab-pane>
          <el-tab-pane label="人事套件" name="third">人事套件</el-tab-pane>
          <el-tab-pane label="预算套件" name="fourth">预算套件</el-tab-pane>
        </el-tabs>
      </div>
      <div id="middleForm" style="display: inline-block">
        <div id="mobile">
          <div style="width: 100px;height: 6px;background-color: #f6f6f6;margin: 10px auto"/>
          <div id="content">
            <template v-for="(data, index) in dataList">
              <div v-if="data.typeIndex < 0" :key="index">
                <div class="innerContent" @mouseenter="mouseEnterForm(index)">
                  <div class="button"><i class="el-icon-close" style="color: #fff"/></div>
                  <div class="middleList">
                    <div style="padding: 20px auto;">
                      <div class="style1">请假类型</div>
                      <div class="style2">请选择(必填)</div>
                    </div>
                    <div style="margin-top: 10px">
                      <div class="style1">开始时间</div>
                      <div class="style2">请选择(必填)</div>
                    </div>
                    <div style="margin: 2px 0">
                      <div class="style1">结束时间</div>
                      <div class="style2">请选择(必填)</div>
                    </div>
                    <div>
                      <div class="style1">时长</div>
                    </div>
                    <div style="font-size: 12px;background-color: #fcf7d7">年假/调休余额可设置，并支持自动扣减&nbsp;&nbsp;<a href="#">去设置</a></div>
                  </div>
                </div>
              </div>
              <div v-else :key="index">
                <div class="innerContent" @mouseenter="mouseEnterForm(index)">
                  <div class="button"><i class="el-icon-close" style="color: #fff"/></div>
                  <div class="middleList">
                    <div class="style1">{{ data.title }}</div>
                    <div v-if="data.typeIndex !== 7" class="style2">{{ data.text }}</div>
                    <img v-else :src="data.text" style="margin-left:80px" >
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div id="rightForm">
        <div id="rightHead">{{ rightTitle }}</div>
        <div v-if="rightIndex === -1" class="right-list-need">
          <div style="padding: 20px 0 15px 0">
            <div style="font-size: 15px;display: inline-block;">当前请假类型包括: </div>
            <a href="#" style="margin-left: 40px;text-decoration: none">修改</a>
          </div>
          <div>
            <el-table
              :data="tableData"
              :show-header="showHeader"
              style="width: 90%"
              border
              size="small">
              <el-table-column
                prop="type"
                label="请假类型"
              />
              <el-table-column
                prop="time"
                label="请假时间"
              />
            </el-table>
          </div>
          <div style="padding: 20px 0 15px 0" class="right-list-need-tip">
            <div>系统将根据排班自动计算请假时长，精确汇总至考勤报表</div>
            <div>若当日未排班，员工可手动修改时长</div>
            <div>如需调休，可到假期管理中编辑调休余额类型。<a href="#" style="text-decoration: none">去设置调休余额</a></div>
          </div>
        </div>
        <div v-else-if="rightIndex >= 0 && dataList[rightIndex]" id="rightList">
          <div class="right-list-option">
            <div class="right-list-in">标题 <span class="right-list-tip">最多20字</span></div>
            <el-input v-model="dataList[rightIndex].title" class="right-list-input"/>
          </div>
          <div class="right-list-option">
            <div class="right-list-in">提示文字<span class="right-list-tip">最多50字</span></div>
            <el-input v-model="dataList[rightIndex].text" class="right-list-input"/>
            <div class="right-list-tip" style="margin-left: 10px">内容最多可填写8000个字</div>
          </div>
          <div class="right-list-option">
            <div class="right-list-in">验证</div>
            <el-checkbox v-model="dataList[rightIndex].checked" class="right-list-checkbox">(必填)</el-checkbox>
          </div>
          <div class="right-list-option">
            <div class="right-list-in">打印</div>
            <el-checkbox v-model="dataList[rightIndex].printFlag" class="right-list-checkbox">参与打印<span class="right-list-tip">(如不勾选，打印时不显示该项)</span></el-checkbox>
          </div>
          <div class="right-list-option">
            <div class="right-list-in">水印照片</div>
            <el-checkbox v-model="dataList[rightIndex].openPhoto" class="right-list-checkbox">开启后图片上传只能通过手机拍照方式</el-checkbox>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="submitDataList()">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import DemoTool from '@/components/NewForm/Demo01_tool'

export default {
  name: 'Demo01',
  // mixins: [DemoTool],
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.demo01{
  #container{
    position: relative;
    background-color: #f6f6f6;
  }
  #leftForm{
    background-color: #fff;
    padding-bottom: 20px;
    margin-top: -20px;
    float: left;
  }
  #middleForm{
  }
  #rightForm{
    display: none;
    width: 350px;
    height: 600px;
    background-color: #fff;
    margin-left: 10px;
    position: absolute;
    right: 0;
  }
  #moveDiv{
    width: 150px;
    height: 30px;
    font-size: 12px;
    padding-left: 10px;
    line-height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: move;
    background-color: #fff;
    z-index: 10;
    position: fixed;
  }
  #moveDiv img{
    float: right;
    margin-top: 4px;
    margin-right: 6px;
  }
  .selectList{
    width: 150px;
    height: 30px;
    font-size: 12px;
    padding-left: 10px;
    line-height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin: 10px 5px 0 5px;
    display: inline-block;
    cursor: move;
  }
  .selectList img{
    float: right;
    margin-top: 4px;
    margin-right: 6px;
  }
  #mobile{
    width: 320px;
    height: 550px;
    background-color: #fff;
    border-radius: 30px;
    margin: 40px 0 0 20px;
    padding-top: 20px;
    box-shadow: -2px 1px 40px #ebebeb;
  }
  #line{
    width: 100px;
    height: 6px;
    background-color: #f6f6f6;
    overflow: hidden;
    margin: 0 auto;
    border-radius: 4px;
  }
  #content{
    width: 90%;
    height: 480px;
    margin: 15px auto;
    background-color: #f6f6f6;
    overflow: auto;
  }
  .style1{
    width: 45%;
    font-size: 15px;
    font-weight: bold;
    display: inline-block;
    padding-left: 5px;
    margin: 16px 0 16px 0;
  }
  .style2{
    width: 42%;
    font-size: 15px;
    color: #c3c4c6;
    display: inline-block;
  }
  .innerContent{
    border: 2px solid #f6f6f6;
    margin-top: 15px;
  }
  .middleList{
    background-color: #fff;
  }
  .button{
    width: 16px;
    height: 16px;
    background-color: #38adff;
    float: right;
    margin: -2px -2px;
    display: none;
  }
  #rightHead{
    border-bottom: 1px solid #e1e1e1;
    padding: 10px 0 10px 20px;
    font-weight: bold;
  }
  .right-list-in{
    font-weight: bold;
    padding: 20px 0 10px 10px;
  }
  .right-list-tip{
    font-size: 12px;
    font-weight: normal;
  }
  .right-list-input{
    width: 90%;
    margin-left: 10px;
  }
  .right-list-checkbox{
    margin-left: 10px;
  }
  .right-list-need{
    padding-left: 20px;
  }
  .right-list-need-tip{
    font-size: 12px;
  }
}
</style>
<style lang="less">
  .demo01{
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    .el-tabs__active-bar {
      width: 120px !important;
      left: -20px;
    }
    .el-input__inner {
      height: 30px;
    }
  }
</style>
