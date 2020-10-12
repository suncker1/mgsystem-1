<template>
  <div>
    <div class="head">
      <el-select v-model="whatEver" placeholder="please select">
        <el-option label="all" value="all" />
        <el-option label="free" value="free" />
        <el-option label="online" value="online" />
      </el-select>
      <div class="headRight">
        <el-select v-model="whatEver" placeholder="please select">
          <el-option label="all" value="all" />
          <el-option label="free" value="free" />
          <el-option label="online" value="online" />
        </el-select>
        <el-button icon="el-icon-search" circle />
        <el-button icon="el-icon-edit" circle />
        <el-button icon="el-icon-more" circle />
      </div>
    </div>
    <div class="my">
      <div id="myDiagramDiv" />
    </div>
  </div>
</template>
<script>
import go from 'gojs'
export default {
  data() {
    return {
      diagram: ''
    }
  },
  mounted() {
    const $ = go.GraphObject.make
    var myDiagram = $(go.Diagram, 'myDiagramDiv', {
      'undoManager.isEnabled': true,
      autoScale: go.Diagram.Uniform,
      layout: $(
        go.TreeLayout, // specify a Diagram.layout that arranges trees
        { angle: 90, layerSpacing: 35 }
      )
    })
    console.log(myDiagram)
    // the template we defined earlier
    myDiagram.nodeTemplate = $(
      go.Node,
      'Horizontal',
      { background: '#44CCFF' },
      $(
        go.TextBlock,
        'Default Text',
        { margin: 12, stroke: 'white', font: 'bold 16px sans-serif' },
        new go.Binding('text', 'name')
      )
    )

    var model = $(go.TreeModel)
    model.nodeDataArray = [
      { key: '1', name: 'Super Admin' },
      { key: '2', parent: '1', name: 'HR' },
      { key: '3', parent: '1', name: 'CFO' },
      { key: '4', parent: '3', name: 'Jellylorum' },
      { key: '5', parent: '3', name: 'Alonzo' },
      { key: '6', parent: '2', name: 'Munkustrap' }
    ]
    myDiagram.model = model
  }
}
</script>
<style scoped>
.my {
  width: 100%;
  height: 700px;
}
#myDiagramDiv {
  height: 100%;
  width: 100%;
}
.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 75px;
  padding: 10px;
  background-color: #f9fafc;
}
.el-button {
  margin: 0 8px;
}
</style>
