<template>
  <div>
    <!-- 调整排序 -->
    <el-button @click="dragging = true">调整排序</el-button>
    <el-dialog
      :visible.sync="dragging"
      title="调整排序"
      width="50%">
      <draggable
        v-model="list"
        v-bind="dragOptions"
        class="list-group"
        tag="ul"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <transition-group type="transition" name="flip-list">
          <li
            v-for="element in list"
            :key="element.order"
            class="list-group-item "
          >
            <i class="icon iconfont icon-caidan1"/>
            <span>{{ element.name }}</span>
          </li>
        </transition-group>
      </draggable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dragging = false">取 消</el-button>
        <el-button type="primary" @click="handleClick4">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import draggable from 'vuedraggable'

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]
export default {
  name: '',
  display: 'Transition',
  order: 6,
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => ({ name, order: index + 1 })),
      dragging: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order)
    },
    handleClick4() {
      // ajax请求将排序后的列表发到后台
      this.dragging = false
    }
  }
}
</script>


<style>
  .el-dialog__header {
    padding: 20px 20px 10px;
    background: rgba(128, 128, 128, 0.52);
  }
  .el-dialog__body{
    // 调节content 的高度
    height: 290px;
    overflow-y: scroll;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group-item {
    min-height: 40px;
    border: 1px solid #808080;
    margin-bottom: 5px;
    line-height: 40px;
    padding-left: 10px;
    border-radius: 5px;
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
  ul,li{
    list-style-type: none;
    padding: 0px;
    margin: 0px;
  }
</style>
<style scoped lang="less">

</style>
