<template>
  <div>
    <drag-head/>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import DragHead from './DragHead'

export default {
  name: 'Dragger',
  components: { DragHead },
  data() {
    return {
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    submitMsg() {
      this.$router.push('/a')
    },
    handleClick() {}
  }
}
</script>

<style scoped lang="less">
  .content{
    position: relative;
  }
</style>
