<!--suppress ALL -->
<template>
  <div class="content">
    <div class="mid">
      <div class="midList">
        <div class="midBorder clearfix">
          <div v-show="isShow" class="inLine1 clearfix">
            <span>请选择将控件拖动至左上角显示</span>
          </div>
          <div v-show="!isShow" class="inLine ">
            <draggable
              :list="midList"
              class="list-group1"
              group="control"
              @start="startDrag"
              @end = "endDrag"
              @change = "change">
              <div
                v-for="(element,index) in midList"
                :key="element.id"
                :index="index"
                class="list-group-item midStyle"
                @click="handleSelect(index,element)"
                @mouseenter="mouseEnterForm($event)"
                @mouseleave="mouseleaveForm($event)">
                <div v-if="element.type !== '日期区间' && element.type !== '明细'" style="width: 100%;min-height: 50px">
                  <i class="el-icon-close rightDel" @click="removeAt(element, $event)"/>
                  <span class="leftDes">{{ element.name }}</span>
                  <span v-if="element.type !== '图片' && element.type !== '附件'" class="rightDes">{{ element.des }}</span>
                  <span v-if="element.type === '附件'" style="float: right;margin-right: 10%;margin-top:15px;font-size: 20px;color: rgba(128,128,128,0.4)" class="el-icon-paperclip"/>
                  <span v-if="element.type === '图片'" style="float: right;margin-right: 10%;margin-top:15px;font-size: 20px;color: rgba(128,128,128,0.4)" class="el-icon-picture"/>
                </div>
                <div v-if="element.type === '日期区间'" style="width: 100%;min-height: 50px">
                  <i class="el-icon-close rightDel" @click="removeAt(element, $event)"/>
                  <div style="width: 100%;height: 50px;border-bottom: 1px solid rgba(128,128,128,0.27)">
                    <span class="leftDes">{{ element.data1 }}</span>
                    <span class="rightDes">{{ element.des }}</span>
                  </div>
                  <div style="width: 100%;height: 50px">
                    <span class="leftDes">{{ element.data2 }}</span>
                    <span class="rightDes">{{ element.des }}</span>
                  </div >
                  <div v-show="element.isShowtime" style="width: 100%;height: 50px;border-top: 1px solid rgba(128,128,128,0.27)">
                    <span class="leftDes">{{ element.time }}(天）</span>
                  </div>
                </div>
                <div v-if="element.type === '明细'" style="width: 100%">
                  <i class="el-icon-close rightDel" @click="removeAt(element, $event)"/>
                  <div style="width: 100%;height: 50px;border-bottom: 1px solid rgba(128,128,128,0.27)">
                    <span class="leftDes">{{ element.name }}</span>
                  </div>
                  <div style="width: 100%;min-height:100px;background: rgba(28, 112, 255, 0.08)">
                    <draggable
                      :list="element.items2"
                      class="list-group2"
                      group="control"
                      @end= "endDrag2"
                      @change = "change2">
                      <div v-if="element.items2.length <= 0">
                        <span style="float: left;margin-left: 20px;margin-top: 20px">可拖入多个组件（不包含明细组件）</span>
                      </div>
                      <div
                        v-for="(item,index) in element.items2"
                        v-else
                        :key="item.id"
                        :index="index"
                        class="list-group-item midStyle2"
                        @click="handleSelect2(index,$event,item)"
                        @mouseenter="mouseEnterForm($event)"
                        @mouseleave="mouseleaveForm($event)">
                        <div v-if="item.type === '日期区间'">
                          <i class="el-icon-close rightDel" @click="removeAt1(item, $event, index)"/>
                          <div style="width: 100%;height: 50px;border-bottom: 1px solid rgba(128,128,128,0.27)">
                            <span class="leftDes">{{ item.data1 }}</span>
                            <span class="rightDes">{{ item.des }}</span>
                          </div>
                          <div style="width: 100%;height: 50px">
                            <span class="leftDes">{{ item.data2 }}</span>
                            <span class="rightDes">{{ item.des }}</span>
                          </div >
                          <div v-show="item.isShowtime" style="border-top: 1px solid rgba(128,128,128,0.27)">
                            <span class="leftDes">{{ item.time }}(天）</span>
                          </div>
                        </div>
                        <div v-if="item.type !== '日期区间' && item.type !== '明细'">
                          <i class="el-icon-close rightDel" @click="removeAt1(item, $event, index)"/>
                          <span class="leftDes">{{ item.name }}</span>
                          <span v-if="item.type !== '图片' && item.type !== '附件'" class="rightDes">{{ item.des }}</span>
                          <span v-if="item.type === '附件'" style="float: right;margin-right: 10%;margin-top:15px;font-size: 20px;color: rgba(128,128,128,0.4)" class="el-icon-paperclip"/>
                          <span v-if="item.type === '图片'" style="float: right;margin-right: 10%;margin-top:15px;font-size: 20px;color: rgba(128,128,128,0.4)" class="el-icon-picture"/>
                        </div>
                      </div>
                    </draggable>
                  </div>
                  <div>
                    <span style="display: inline-block; font-size: 14px;text-align: center;width: 100%;color: rgba(12,116,255,0.81)" class="el-icon-plus">{{ element.des }}</span>
                  </div>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <div class="left">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="控件库" name="first">
              <div class="leftControl">
                <draggable
                  :list="controlList"
                  :group="{ name: 'control', pull: 'clone', put: false }"
                  :clone="cloneDog"
                  :sort="false"
                  class="dragArea list-group list-group-right"
                  @start="start"
                  @end="end"
                >
                  <div
                    v-for="(element, index) in controlList"
                    :key="index"
                    class="list-group-item InputStyle"
                  >
                    {{ element.name }}
                    <img :src="element.imgSrc" class="ImgStyle">
                  </div>
                </draggable>
              </div>
            </el-tab-pane>
            <el-tab-pane label="出勤套件" name="second">出勤套件</el-tab-pane>
            <el-tab-pane label="人事套件" name="third">人事套件</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div v-show="display" class="rightForm">
      <div v-if="midList.length === -1" class="right-list-need">
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
      <div v-if="midList.length > 0 ">
        <div v-if="display?display.type:false">
          <div class="rightHead">{{ display ? display.type : '' }}</div>
          <div v-if=" display.type === '说明文字'">
            <div class="right-list-option">
              <div class="right-list-in">说明文字
                <span class="right-list-tip">最多2000字</span>
              </div>
              <el-input v-model="display.name" type="textarea" rows="4" class="right-list-input"/>
            </div>
          </div>
          <div v-if=" display.type === '日期区间'||display.type === '日期'">
            <div v-show="display.type === '日期'" class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="display.type === '日期区间'" class="right-list-option">
              <div class="right-list-in">标题1
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="data1">
                  <el-input v-model="display.data1" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="display.type === '日期区间'" class="right-list-option">
              <div class="right-list-in">标题2
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="data2">
                  <el-input v-model="display.data2" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="display.type === '日期区间'" class="right-list-option">
              <div class="right-list-in">提示文字
                <span class="right-list-tip">最多50字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="des">
                  <el-input v-model="display.des" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">日期类型</div>
              <el-radio v-model="display.option" label="1" style="padding-left: 10px">年-月-日 时:分</el-radio>
              <el-radio v-model="display.option" label="2">年-月-日</el-radio>
            </div>
            <div v-show="display.type === '日期区间'" class="right-list-option">
              <div class="right-list-in">自动计算时长</div>
              <el-checkbox v-model="display.isShowtime" class="right-list-checkbox">开启</el-checkbox>
              <div v-show="display.isShowtime" class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
                <el-form ref="displayForm" :rules="rules" :model="display">
                  <el-form-item prop="time">
                    <el-input v-model="display.time" class="right-list-input"/>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">验证</div>
              <el-checkbox v-model="display.checked" class="right-list-checkbox">(必填)<span v-if=" display.type === '日期'" class="right-list-tip">(勾选后可作为流程条件)</span></el-checkbox>
            </div>
          </div>
          <div v-if=" display.type === '明细'">
            <div class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">动作名称
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="des">
                  <el-input v-model="display.des" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if=" display.type === '关联流程单'">
            <div class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">提示文字
                <span class="right-list-tip">最多50字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="des">
                  <el-input v-model="display.des" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">验证</div>
              <el-checkbox v-model="display.checked" class="right-list-checkbox">(必填)</el-checkbox>
            </div>
          </div>
          <div v-if=" display.type === '附件' || display.type === '部门'">
            <div class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">验证</div>
              <el-checkbox v-model="display.checked" class="right-list-checkbox">(必填)</el-checkbox>
            </div>
            <div v-if="display.type === '部门'" class="right-list-option">
              <div class="right-list-in">选项</div>
              <el-radio v-model="display.option" label="1" style="padding-left: 10px">只能选一个部门</el-radio>
              <el-radio v-model="display.option" label="2">可同时选多个部门</el-radio>
            </div>
          </div>
          <div v-if=" display.type === '图片'">
            <div class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
              <div class="right-list-tip" style="margin-left: 10px;color: gray">图片最多可添加9张</div>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">验证</div>
              <el-checkbox v-model="display.checked" class="right-list-checkbox">(必填)</el-checkbox>
            </div>
          </div>
          <div v-if=" display.type === '单选框'||display.type === '多选框'">
            <div class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">提示文字
                <span class="right-list-tip">最多50字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="des">
                  <el-input v-model="display.des" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">选项
                <span class="right-list-tip">最多200项，每项最多50个字</span>
              </div>
              <el-form v-model="display.items" label-width="10px" class="demo-dynamic">
                <el-form-item
                  v-for="(item,index) in display.items"
                  :value="'选项' + index"
                  :key="index">
                  <el-input v-model="item.value" class="right-list-input2" maxlength="50"/>
                  <el-button type="primary" icon="el-icon-minus" circle @click.prevent="removeItem(item)"/>
                  <el-button type="primary" icon="el-icon-plus" circle @click="addItem"/>
                </el-form-item>
              </el-form>
              <el-button style="color: #3691ff;cursor: pointer;margin-left: 10px" @click="clickText(display.items)">批量编辑</el-button>
              <el-dialog :visible.sync="dialogVisible" title="批量编辑">
                <h3>每一行对应一条数据</h3>
                <el-input v-model="textarea" type="textarea" rows="8" @input="changeInput(display)" />
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm(display.items)">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">验证</div>
              <el-checkbox v-model="display.checked" class="right-list-checkbox">(必填)<span v-if=" display.type === '单选框'" class="right-list-tip">(勾选后可作为流程条件)</span></el-checkbox>
            </div>
          </div>
          <div v-if=" display.type === '多行输入框' || display.type === '单行输入框'||display.type === '数字输入框'
          || display.type === '联系人' || display.type === '金额' || display.type === '收款账号' ">
            <div class="right-list-option">
              <div class="right-list-in">标题
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="name">
                  <el-input v-model="display.name" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="right-list-option">
              <div class="right-list-in">提示文字
                <span class="right-list-tip">最多50字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="des">
                  <el-input v-model="display.des" class="right-list-input"/>
                </el-form-item>
              </el-form>
              <div v-show="display.type !== '数字输入框' && display.type !== '联系人' && display.type !== '金额' && display.type !== '收款账号'" class="right-list-tip" style="margin-left: 10px">内容最多可填写8000个字</div>
            </div>
            <div v-show="display.type === '数字输入框'" class="right-list-option">
              <div class="right-list-in">单位
                <span class="right-list-tip">最多20字</span>
              </div>
              <el-form ref="displayForm" :rules="rules" :model="display">
                <el-form-item prop="unit">
                  <el-input v-model="display.unit" class="right-list-input"/>
                </el-form-item>
              </el-form>
            </div>
            <div v-show=" display.type !== '收款账号'" class="right-list-option">
              <div class="right-list-in">验证</div>
              <el-checkbox v-model="display.checked" class="right-list-checkbox">必填
              </el-checkbox>
            </div>
            <div v-show ="display.type === '联系人'" class="right-list-option">
              <div class="right-list-in">选项</div>
              <el-radio v-model="display.option" label="1" style="padding-left: 10px">只能选择一人</el-radio>
              <el-radio v-model="display.option" label="2">可同时选择多人</el-radio>
            </div>
            <div v-show ="display.type === '金额'" class="right-list-option">
              <div class="right-list-in">大写</div>
              <el-checkbox v-model="display.capital" class="right-list-checkbox">显示大写<span class="right-list-tip">(输入数字后自动显示大写)</span></el-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import Formtool from './Formtool'

let idGlobal = 15
export default {
  name: 'Form',
  display: 'Custom Clone',
  components: { draggable },
  mixins: [Formtool],
  data() {
    return {
      activeName: 'first',
      rightIndex: 0,
      rightIndex2: 0,
      count: 0,
      isShow: true,
      IsMx: [],
      objMx: {},
      n: 0,
      dialogVisible: false,
      textarea: '',
      flog: {
        out: false,
        in: false
      },
      display: null,
      rules: {
        name: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        data1: [
          { required: true, message: '标题1不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        data2: [
          { required: true, message: '标题2不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        des: [
          { min: 0, max: 50, message: '最多50字', trigger: 'blur' }
        ],
        unit: [
          { min: 0, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 切换midList显示状态
    midList(val) {
      if (val.length === 0) {
        this.isShow = true
      }
      if (val.length > 0) {
        this.isShow = false
      }
    }
  },
  mounted() {
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function ondrop(event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    // 改变 两表格之间的关联
    cloneDog({ id }) {
      idGlobal += 1
      return {
        id: idGlobal,
        name: `${this.controlList[id].name}`,
        des: `${this.controlList[id].des}`,
        type: `${this.controlList[id].type}`,
        data1: `${this.controlList[id].data1}`,
        data2: `${this.controlList[id].data2}`,
        time: `${this.controlList[id].time}`,
        items: [
          { value: '选项1' },
          { value: '选项2' }
        ],
        key: this.controlList[id].key + idGlobal,
        items2: [],
        checked: this.controlList[id].checked,
        numIndex: id + 1
      }
    },
    // 拖拽前将中间显示效果改变
    start() {
      this.isShow = false
      this.length1 = this.midList.length
    },
    startDrag() {
      this.length1 = this.midList.length
    },
    // 在midList中的三种变化
    change(event) {
      // 从midList往明细添加
      if (event.removed) {
        this.isMxarea()
        const obj = event.removed.element
        const arr = Object.values(this.objMx)
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i].includes(obj)) {
            this.rightIndex2 = i
            this.rightIndex = this.IsMx[i]
          }
        }
        this.flog.in = true
        this.flog.out = false
        this.display = obj
      }
      // 往midList中添加
      if (event.added) {
        const index = [].indexOf.call(this.midList, event.added.element)
        const element = document.querySelector('.list-group1').childNodes
        // 获取当前点击的元素改变边框样式
        for (let i = 0; i < element.length; i += 1) {
          element[i].style.border = '0 solid #DFDFDF'
        }
        element[index].style.border = '1px solid #9EA7FF'
        // 获取所有明细的元素
        const element1 = document.querySelectorAll('.list-group2')
        if (element1.length > 0) {
          for (let i = 0; i < element1.length; i += 1) {
            for (let j = 0; j < element1[i].length; j += 1) {
              element1[i][j].style.border = '0 solid #DFDFDF'
            }
          }
        }
        this.handleSelect(index)
        this.flog.in = false
        this.flog.out = true
        this.display = event.added.element
      }
      // 在midList中移动
      if (event.moved) {
        const index = [].indexOf.call(this.midList, event.moved.element)
        const element = document.querySelector('.list-group1').childNodes
        // 获取当前点击的元素改变边框样式
        for (let i = 0; i < element.length; i += 1) {
          element[i].style.border = '0 solid #DFDFDF'
        }
        element[index].style.border = '1px solid #9EA7FF'
        this.handleSelect(index)
        this.flog.in = false
        this.flog.out = true
        this.display = event.moved.element
      }
    },
    // 在明细中的三种变化
    change2(event) {
      // 从明细往midList添加
      if (event.removed) {
        this.handleSelect(this.rightIndex)
        this.flog.in = false
        this.flog.out = true
        this.display = event.removed.element
      }
      if (event.added) {
        this.isMxarea()
        const obj = event.added.element
        const arr = Object.values(this.objMx)
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i].includes(obj)) {
            this.rightIndex = this.IsMx[i]
            this.is = i
          }
        }
        for (let j = 0; j < arr[this.is].length; j += 1) {
          if (obj === arr[this.is][j]) {
            this.rightIndex2 = j
          }
        }
        this.length2 = this.midList.length
        // 处理明细中不能存在明细
        if (this.midList[this.rightIndex].items2[this.rightIndex2]) {
          if (this.midList[this.rightIndex].items2[this.rightIndex2].type === '明细') {
            this.midList[this.rightIndex].items2.splice(this.rightIndex2, 1)
          }
        }
        const element = document.querySelector('.list-group1').childNodes
        // 获取当前点击的元素改变边框样式
        for (let i = 0; i < element.length; i += 1) {
          element[i].style.border = '0 solid #DFDFDF'
        }
        // 获取所有明细的元素
        const element1 = document.querySelectorAll('.list-group2')
        // 获取当前点击的元素的所在明细
        const MXindex = this.IsMx.indexOf(this.rightIndex)
        // 获取当前点击的元素的数组
        const MxArr = element1[MXindex].childNodes
        // 遍历数组找到点击添加的元素改变样式
        for (let i = 0; i < MxArr.length; i += 1) {
          MxArr[i].style.border = '0 solid #DFDFDF'
        }
        MxArr[this.rightIndex2].style.border = '1px solid #9EA7FF'
        if (MxArr.length <= 0) {
          element[this.rightIndex].style.border = '1px solid #9EA7FF'
        }
        this.flog.in = true
        this.flog.out = false
        this.display = event.added.element
      }
      if (event.moved) {
        const element = document.querySelector('.list-group1').childNodes
        // 获取当前点击的元素改变边框样式
        for (let i = 0; i < element.length; i += 1) {
          element[i].style.border = '0 solid #DFDFDF'
        }
        // 获取所有明细的元素
        const element1 = document.querySelectorAll('.list-group2')
        // 获取当前点击的元素的所在明细
        const MXindex = this.IsMx.indexOf(this.rightIndex)
        // 获取当前点击的元素的数组
        const MxArr = element1[MXindex].childNodes
        // 遍历数组找到点击添加的元素改变样式
        for (let i = 0; i < MxArr.length; i += 1) {
          MxArr[i].style.border = '0 solid #DFDFDF'
        }
        const index = event.moved.newIndex
        this.rightIndex2 = index
        MxArr[this.rightIndex2].style.border = '1px solid #9EA7FF'
        if (MxArr.length <= 0) {
          element[this.rightIndex].style.border = '1px solid #9EA7FF'
        }
        this.flog.in = true
        this.flog.out = false
        this.display = event.moved.element
      }
    },
    // 从最左边控件往midList或明细中拖动结束调用函数
    end(evt) {
      this.length2 = this.midList.length
      if (this.length2 <= 0 && this.length1 <= 0) {
        this.rightIndex = 0
      }
      // 中间midList数组的长度增加
      if (this.length2 > 0 && this.length2 > this.length1) {
        this.flog.out = true
        this.flog.in = false
      }
      // 判断从左边拉倒明细中的位置
      if (this.length2 === this.length1) {
        const midDom = document.querySelectorAll('.midStyle')
        const index = [].indexOf.call(midDom, evt.to.offsetParent)
        this.rightIndex = index
      }
      // 将midlist状态样式切换
      if (this.midList.length <= 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.isMxarea()
    },
    // midList 中拖动时实时显示右边的数据
    endDrag() {
      this.isMxarea()
      this.length2 = this.midList.length
    },
    // 在midList中点击表单
    handleSelect(index, element) {
      this.count = index
      // 显示右边的样式
      this.rightIndex = this.count
      const element1 = document.querySelector('.list-group1').childNodes
      // 获取当前点击的元素改变边框样式
      for (let i = 0; i < element1.length; i += 1) {
        element1[i].style.border = '0 solid #DFDFDF'
      }
      element1[index].style.border = '1px solid #9EA7FF'
      if (this.IsMx.length > 0) {
        const element2 = document.querySelectorAll('.list-group2')
        for (let i = 0; i < element2.length; i += 1) {
          for (let j = 0; j < element2[i].childNodes.length; j += 1) {
            element2[i].childNodes[j].style.border = '0 solid #DFDFDF'
          }
        }
      }
      if (this.objMx) {
        const arr = Object.values(this.objMx)
        for (let i = 0; i < arr.length; i += 1) {
          if (arr[i].includes(arr)) {
            this.rightIndex2 = i
            this.rightIndex = this.IsMx[i]
          }
        }
      }
      this.flog.in = false
      this.flog.out = true
      this.display = element
    },
    // 在midList中删除表单
    removeAt(element, event) {
      event.stopPropagation()
      // 获取删除的下标, 重新判断midList中的数组中明细个数以及位置
      if (element.type === '明细') {
        const index = this.midList.indexOf(element)
        const index2 = this.IsMx.indexOf(index)
        this.midList.splice(index, 1)
        delete this.objMx[index2]
        this.IsMx.splice(index2, 1)
        this.isMxarea()
      } else {
        const index = this.midList.indexOf(element)
        this.midList.splice(index, 1)
        this.isMxarea()
      }
      if (this.midList.length === 0) {
        this.display = null
      }
      this.display = null
    },
    // 在明细中拖动
    endDrag2(event) {
      this.count2 = event.newIndex
      this.rightIndex2 = this.count2
    },
    // 点击明细中的表单触发的函数
    handleSelect2(index, event, item) {
      // 获取删除明细内容的位置,获取明细中控件的位置
      event.stopPropagation()
      const arr = Object.values(this.objMx)
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].includes(item)) {
          this.rightIndex = this.IsMx[i]
        }
      }
      this.rightIndex2 = index
      const element = document.querySelector('.list-group1').childNodes
      // 获取当前点击的元素改变边框样式
      for (let i = 0; i < element.length; i += 1) {
        element[i].style.border = '0 solid #DFDFDF'
      }
      // 获取所有明细的元素
      const element1 = document.querySelectorAll('.list-group2')
      // 获取当前点击的元素的所在明细
      const MXindex = this.IsMx.indexOf(this.rightIndex)
      // 获取当前点击的元素的数组
      const MxArr = element1[MXindex].childNodes
      // 遍历数组找到点击添加的元素改变样式
      for (let i = 0; i < MxArr.length; i += 1) {
        MxArr[i].style.border = '0 solid #DFDFDF'
      }
      MxArr[this.rightIndex2].style.border = '1px solid #9EA7FF'
      this.flog.in = true
      this.flog.out = false
      this.display = item
    },
    // 在明细中点击删除表单
    removeAt1(item, event, index) {
      event.stopPropagation()
      const arr = Object.values(this.objMx)
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].includes(item)) {
          this.rightIndex = this.IsMx[i]
          this.is = i
        }
      }
      for (let j = 0; j < arr[this.is].length; j += 1) {
        if (item === arr[this.is][j]) {
          this.rightIndex2 = j
        }
      }
      const index1 = [].indexOf.call(this.midList[this.rightIndex].items2, this.midList[this.rightIndex].items2[index])
      this.midList[this.rightIndex].items2.splice(index1, 1)
      const element = document.querySelector('.list-group1').childNodes
      // 获取当前点击的元素改变边框样式
      for (let i = 0; i < element.length; i += 1) {
        element[i].style.border = '0px solid rgb(223, 223, 223)'
      }
      event.path[8].style.border = '1px solid rgb(158, 167, 255)'
      this.display = this.midList[this.rightIndex]
    },
    // 实时获取IsMx和objMx两个参数值
    isMxarea() {
      this.n = 0
      for (let i = 0; i < this.midList.length; i += 1) {
        if (this.midList[i].type === '明细') {
          this.n += 1
          this.IsMx.push(i)
        }
      }
      if (this.n >= 1) {
        const num = this.IsMx.length - this.n
        this.IsMx = this.IsMx.slice(num)
        // 加载所有item2的值
        for (let i = 0; i < this.IsMx.length; i += 1) {
          this.objMx[i] = this.midList[this.IsMx[i]].items2
        }
      }
    },
    // 单选和多选中点击批量删除后确认后提交修改数据
    submitForm(items) {
      if (this.arrText.length >= items.length) {
        this.arrText.splice(items.length)
        for (let i = 0; i < this.arrText.length; i += 1) {
          items[i].value = this.arrText[i]
        }
      } else {
        for (let i = 0; i < this.arrText.length; i += 1) {
          items[i].value = this.arrText[i]
        }
        items.splice(this.arrText.length)
      }
      this.dialogVisible = false
    },
    // 点击批量删除读取输入框中的初始值
    clickText(items) {
      let text = ''
      for (let i = 0; i < items.length; i += 1) {
        text += `${items[i].value}${'\n'}`
      }
      this.textarea = text
      this.dialogVisible = true
    },
    // 实时获取批量删除中表单的每一次输入数值
    changeInput(element) {
      // 获取每一行多少字
      this.arrText = []
      const arr1 = []
      this.textarea.trim().split('\n').forEach(v => {
        this.arrText.push(v)
      })
      // 实时获取有多少换行符
      this.textarea.split(/\n/).forEach(v => {
        arr1.push(v)
      })
      if ((arr1.length - 1) > element.items.length) {
        console.log('超过了')
      }
    },
    // 单选框多选框删除按钮
    removeItem(item) {
      const index = this.midList[this.rightIndex].items.indexOf(item)
      if (this.midList[this.rightIndex].items.length > 1) {
        this.midList[this.rightIndex].items.splice(index, 1)
      } else if (this.midList[this.rightIndex].items2[this.rightIndex2].items.length > 1) {
        this.midList[this.rightIndex].items2[this.rightIndex2].items.splice(index, 1)
      }
    },
    // 单选框多选框增加按钮
    addItem() {
      if (this.midList[this.rightIndex].type !== '明细') {
        this.midList[this.rightIndex].items.push({
          value: `选项${this.midList[this.rightIndex].items.length}`
        })
      } else {
        this.midList[this.rightIndex].items2[this.rightIndex2].items.push({
          value: `选项${this.midList[this.rightIndex].items2[this.rightIndex2].items.length}`
        })
      }
    },
    // 移除校验值并重置表单初始值
    empty() {
      this.$nextTick(() => {
        this.$refs.displayForm.resetFields()
      })
    },
    // 获取被点击的元素的位置加上class
    mouseEnterForm(event) {
      window.event?window.event.cancelBubble=true:event.stopPropagation()
      if (event.target.style.border !== '1px solid rgb(158, 167, 255)') {
        event.target.style.border = '1px dashed rgb(56, 173, 255)'
      }
      event.target.children[0].firstChild.style.display = 'block'
    },
    mouseleaveForm(event) {
      window.event?window.event.cancelBubble=true:event.stopPropagation()
      if (event.target.style.border !== '1px solid rgb(158, 167, 255)') {
        event.target.style.border = '0px solid rgb(223, 223, 223)'
      }
      event.target.children[0].firstChild.style.display = 'none'
    }
  }
}
</script>

<style scoped lang="less">
  .content{
    position: relative;
    width: 100%;
    overflow: hidden;
    background: rgba(128, 128, 128, 0.47);
    .left{
      float: left;
      width: 270px;
      height: calc(100vh + 50px);
      background: white;
      margin-left: -100%;
      padding-bottom: 10000px;
      margin-bottom: -10000px;
      .leftControl{
        float: left;
        width: 270px;
        height: 100%;
        .InputStyle{
          display: inline-block;
          width:115px;
          height: 32px;
          line-height: 32px;
          font-size: 12px;
          box-sizing: border-box;
          padding-left: 8px;
          cursor: move;
          color: #191f25;
          background: #FFFFFF;
          border: 1px solid #DFDFDF;
          border-radius: 2px;
          overflow: hidden;
          margin-left:8px;
          margin-bottom: 8px;
        }
        .ImgStyle{
          float: right;
          margin-right: 10%;
          margin-top: 6px;
        }
      }
    }
    .mid{
      float: left;
      width: 100%;
      padding-bottom: 10000px;
      margin-bottom: -10000px;
      .midList{
        padding: 0 320px 0 270px;
        .midBorder{
          width: 399px;
          height: 534px;
          background: #FFFFFF;
          margin:70px auto;
          .inLine1{
            float: left;
            width: 381px;
            box-sizing: border-box;
            height: calc(100% - 18px);
            margin:9px;
            background: #FFFFFF;
            border: 1px solid #9EA7FF;
            span{
              float: left;
              font-size: 14px;
              margin-left: 18%;
              margin-top: 50%;
              color: rgba(128, 87, 128, 0.31);
            }
          }
          .inLine{
            float: left;
            width: 381px;
            height: calc(100% - 18px);
            margin:9px;
            background: rgba(58, 0, 0, 0.17);
            overflow-y: auto;
            border: 0;
            .midStyle{
              position: relative;
              width: 100%;
              background: #FFFFFF;
              border: 1px solid rgba(111, 73, 255, 0.34);
              box-sizing: border-box;
              margin-bottom: 16px;
              min-height:50px;
              line-height: 50px;
              cursor: move;
              font-size: 14px;
              background: white;
              .rightDel{
                position: absolute;
                top: 0;
                right: 0;
                width: 16px;
                height: 16px;
                background: blue;
                font-size: 15px;
                color: white;
                font-weight: bolder;
                text-align: center;
                line-height: 16px;
                cursor: pointer;
                display: none;
                z-index: 3;
              }
              .leftDes{
                float: left;
                padding-left: 10px;
                width: 32%;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .rightDes{
                float: right;
                width: 58%;
                height: 100%;
                text-align: right;
                margin-right: 10px;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                color: rgba(128, 122, 121, 0.36);
                text-overflow: ellipsis;
              }
              .midStyle2{
                position: relative;
                width: 100%;
                height: 100%;
                background: #FFFFFF;
                border: 1px solid rgba(111, 73, 255, 0.34);
                box-sizing: border-box;
                min-height:50px;
                line-height: 50px;
                cursor: move;
                font-size: 14px;
                background: white;
                margin-bottom: 1px;
                z-index: 3;
                .rightDel{
                  position: absolute;
                  top: 0;
                  right: 0;
                  width: 16px;
                  height: 16px;
                  background: blue;
                  font-size: 15px;
                  color: white;
                  font-weight: bolder;
                  text-align: center;
                  line-height: 16px;
                  cursor: pointer;
                  display: none;
                  z-index: 3;
                }
                .leftDes{
                  float: left;
                  padding-left: 10px;
                  width: 32%;
                  height: 100%;
                  display: block;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .rightDes{
                  float: right;
                  width: 58%;
                  height: 100%;
                  text-align: right;
                  margin-right: 10px;
                  display: block;
                  white-space: nowrap;
                  overflow: hidden;
                  color: rgba(128, 122, 121, 0.36);
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
    .rightForm{
      float: left;
      width: 320px;
      height: calc(100vh + 50px);
      overflow-y: auto;
      background: white;
      margin-left: -320px;
      padding-bottom: 10000px;
      margin-bottom: -10000px;
      .rightHead{
        width: 90%;
        border-bottom: 1px solid #e1e1e1;
        padding: 10px 0 10px 10px;
        font-weight: bold;
      }
      .right-list-in{
        font-weight: bold;
        padding: 20px 0 10px 10px;
      }
      .right-list-tip{;
        font-size: 13px;
        margin-left: 5px;
        color: rgba(128, 128, 128, 0.6);
        font-weight: normal;
      }
      .right-list-input{
        width: 90%;
        margin-left: 10px;
      }
      .right-list-input2{
        width: 50%;
        margin-left: 0px;
      }
      ul,li{list-style:none;
        padding-left: 0}
      .right-list-checkbox{
        margin-left: 10px;
        margin-right: 5px;
      }
      .right-list-need{
        padding-left: 20px;
      }
      .right-list-need-tip{
        font-size: 12px;
      }
    }
  }
</style>
<style>
  .chosenClass{
    float: left;
    width: 99%;
    border: 1px solid red;
    margin-bottom: 15px;
    height: 45px;
    line-height: 45px;
    cursor: move;
    font-size: 14px;
    padding-left: 15px;
    background: white;
    box-sizing: border-box;
  }
  .chooseSelect{
    width: 88%;
    height: 40px;
    border: 1px solid rgba(128,128,128,0.44);
    margin-left: 10px;
    padding-left: 10px;
    line-height: 40px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
  }
  .sortable-chosen{
    border: 1px solid red!important;
  }
  .clearfix{
    *zoom: 1;
  }
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }
  .el-dialog__header {
    padding: 20px 20px 10px;
    background: rgba(128, 128, 128, 0.52);
  }
  .el-form-item__error{
    padding-top: 6px;
    padding-left: 8px;
  }
</style>
