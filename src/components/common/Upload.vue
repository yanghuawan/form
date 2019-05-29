<template>
  <div>
    <div v-show="isShow">
      <el-table
        :data="fileList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="文件名称"
          width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="small"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileno"
          label="文件编号"
          width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fileno" size="small"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="version "
          label="版本号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.version " size="small"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="status "
          label="">
          <span class="uploadType">等待上传</span>
        </el-table-column>
      </el-table>
    </div>
    <el-upload
      :on-change="changeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success = "successUpload"
      :on-error = "errorUpload"
      :on-progress = "progressUpload"
      :file-list="fileList"
      :auto-upload="true"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      fileList: [],
      isShow: false
    }
  },
  methods: {
    handleRemove(file) {
      this.fileList.splice(file, 1)
      if (this.fileList.length === 0) {
        console.log(this.fileList)
        this.isShow = false
      }
    },
    handlePreview() {
    },
    changeUpload(file) {
      this.fileList.push(file)
      console.log(this.fileList)
      this.isShow = true
    },
    successUpload(response, file) {
      console.log(response, file)
      document.querySelector('.uploadType').innerHTML = '上传成功'
    },
    errorUpload(err, file) {
      console.log(err, file)
      document.querySelector('.uploadType').innerHTML = '上传失败'
    },
    progressUpload(event, file) {
      console.log(event, file)
      document.querySelector('.uploadType').innerHTML = '正在上传'
    }
  }
}
</script>

<style scoped lang="less">

</style>
