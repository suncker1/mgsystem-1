<template>
  <div class="app-container">
    <el-upload
      ref="upload"
      style="display:inline-block"
      :limit="1"
      class="upload-demo"
      accept=".xls,.xlsx"
      action="/hqx/knowledge/importKnowledge"
      :file-list="fileList"
      :http-request="uploadSectionFile"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary" plain>选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success" @click="submitUpload">导入</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {

  data() {
    return {
      dataview: true,
      sbb: '',
      data: [],
      data1: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 2,
          label: '二级 1-1',
          children: [{
            id: 4,
            label: '三级 1-1-1'
          }, {
            id: 5,
            label: '三级 1-1-2'
          }]
        }, {
          id: 3,
          label: '二级 1-2',
          children: [{
            id: 6,
            label: '三级 1-2-1'
          }, {
            id: 7,
            label: '三级 1-2-2'
          }]
        }]
      }],
      data2: [{
        id: 1,
        label: '一级国家',
        children: [{
          id: 2,
          label: '二级洲',
          children: [{
            id: 4,
            label: '三级区1'
          }, {
            id: 5,
            label: '三级区2'
          }]
        }, {
          id: 3,
          label: '二级洲',
          children: [{
            id: 6,
            label: '三级区3'
          }, {
            id: 7,
            label: '三级区4'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.data = this.data1
  },
  methods: {
    submitUpload() {
      const list = document.getElementsByClassName('el-upload-list__item is-ready')
      if (list.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择需要导入的模板！'
        })
        return
      }
      this.$refs.upload.submit()
    },
    uploadSectionFile(param) {
      var fileObj = param.file
      // FormData 对象
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      form.append('userId', this.userId)
      form.append('userName', this.userName)
      this.GLOBAL.POST('/hqx/knowledge/importKnowledge', form).then(res => {
        if (res.data.success === true) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.fileList = []
        } else {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.fileList = []
        }
      })
    },
    handleNodeClick(data) {
      console.log(data)
      this.sbb = data.label
    },
    changeview() {
      this.dataview = !this.dataview
      if (this.dataview) {
        this.data = this.data1
      } else {
        this.data = this.data2
      }
    }
  }
}
</script>

<style>
.top{
  margin-bottom: 15px;
}
.leftbar{
  width: 20%;
  height: 850px;
}
.rep{
  display: flex;
}
.rightcontext{
  width: 100%;
}
.el-scrollbar__wrap{
  overflow-x: auto;
}
/* .el-checkbox .el-checkbox__inner{
  display: none;
} */
.topcontext{
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
