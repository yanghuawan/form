<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <h1>111111</h1>
        <draggable
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneDog"
          class="dragArea list-group"
          @change="log"
        >
          <div v-for="element in list1" :key="element.id" class="list-group-item">
            {{ element.name }}
          </div>
        </draggable>
      </el-col>

      <el-col :span="16">
        <h1>222222</h1>
        <nested-draggable
          :list3="lits2"
          :list="list2"
          class="dragArea list-group "
          group="people"
          @change="log"
        >
          <div v-for="element in list2" :key="element.id" class="list-group-item">
            {{ element.name }}
          </div>
          <h1>333333</h1>
          <el-col :span="16">
            <draggable
              :list="element.list3"
              class="dragArea list-group"
              group="people"
              @change="log"
            >
              <div v-for="element in element.list3" :key="element.id" class="list-group-item">
                {{ element.name }}
              </div>
            </draggable>
          </el-col>
        </nested-draggable>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-table
          :data="list1"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="日期"
            width="180"/>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"/>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table
          :data="list2"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="日期"
            width="180"/>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"/>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-table
          :data="list3"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="日期"
            width="180"/>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

let idGlobal = 8
export default {
  name: 'Demo',
  display: 'Custom Clone',
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: 'dog 1', id: 1 },
        { name: 'dog 2', id: 2 },
        { name: 'dog 3', id: 3 },
        { name: 'dog 4', id: 4 }
      ],
      list2: [
        {
          name: 'cat 5',
          id: 5,
          list3: [
            { name: 'cat 8', id: 8 },
            { name: 'cat 9', id: 9 },
            { name: 'cat 10', id: 10 }
          ]
        },
        {
          name: 'cat 6',
          id: 6,
          list3: [
            { name: 'cat 8', id: 8 },
            { name: 'cat 9', id: 9 },
            { name: 'cat 10', id: 10 }
          ]
        },
        {
          name: 'cat 7',
          id: 7,
          list3: [
            { name: 'cat 8', id: 8 },
            { name: 'cat 9', id: 9 },
            { name: 'cat 10', id: 10 }
          ]
        }
      ]
    }
  },
  methods: {
    log(evt) {
      window.console.log(evt)
    },
    cloneDog({ id }) {
      idGlobal += 1
      return {
        id: idGlobal,
        name: `cat ${id}`
      }
    }
  }
}
</script>
<style scoped>
  .list-group-item{
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #1c70ff;
    padding-bottom: 5px;}
</style>
