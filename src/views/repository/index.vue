<template>
  <div class="app-container">
    <div class="top">
      <el-tooltip content="Switch partition mode" placement="bottom">
        <el-button
          v-if="dataview == true"
          size="mini"
          icon="el-icon-s-operation"
          @click="changeview"
        />
        <el-button
          v-else
          size="mini"
          icon="el-icon-menu"
          @click="changeview"
        />
      </el-tooltip>
    </div>
    <div class="rep">
      <div class="leftbar">
        <el-scrollbar style="height:100%">
          <el-tree
            ref="tree"
            :data="data"
            node-key="id"
            :default-expanded-keys="[1]"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>
                <i class="el-icon-folder" />{{ node.label }}
              </span>
            </span>
          </el-tree>
        </el-scrollbar>
      </div>
      <div class="rightcontext">
        <div class="topcontext">
          <el-upload
            class="upload-demo"
            action="#"
            multiple
          >
            <el-button size="small" type="primary">Upload file</el-button>
          </el-upload>
        </div>
        <div>
          {{ sbb }}
        </div>
      </div>
    </div>
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
