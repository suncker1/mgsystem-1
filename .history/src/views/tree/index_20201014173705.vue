<template>
  <div class="shiftb">
    <div>
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        header-align="center"
      >
        <el-table-column width="50" header-align="center">
          <template>
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="Name" width="300" header-align="center">
          <template slot-scope="{row,$index}">
            <input v-if="showEdit[$index]" v-model="row.Name" class="edit-cell">
            <span v-if="!showEdit[$index]">{{ row.Name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          header-align="center">
          <template slot-scope="{row,$index}">
            <el-button v-if="showBtn[$index]">更新 type="text" size="small" @click.native="handleUpdate($index, row)"</el-button>
            <el-button v-if="showBtn[$index]" type="text" size="small" @click.native="handleCancel($index, row)">取消</el-button>
            <el-button v-if="!showBtn[$index]" type="text" size="small" @click.native="handleEdit($index, row)">编辑</el-button>
            <el-button v-if="!showBtn[$index]" type="text" size="small" @click.native="handleDelete($index, row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showEdit: [],
      showBtn: [],
      showBtnOrdinary: true,
      dialogFormVisible: false,
      form: {
        name: '',
        shift: '',
        region: '',
        valuedate: '',
        value1: [new Date(2020, 10, 10, 8, 30), new Date(2020, 10, 10, 12, 30)],
        date1: '',
        date2: '',
        radio: 1,
        radio1: 5,
        checkList: ['Work'],
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      tableData: [{
        engineer: '12987122',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '234',
        task: '3.2',
        activities: 10
      }, {
        engineer: '12987123',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '165',
        task: '4.43',
        activities: 12
      }, {
        engineer: '12987124',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '324',
        task: '1.9',
        activities: 9
      }, {
        engineer: '12987125',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '621',
        task: '2.2',
        activities: 17
      }, {
        engineer: '12987126',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '539',
        task: '4.1',
        activities: 15
      }]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    handleEdit(index, row) {
      this.showEdit[index] = true
      this.showBtn[index] = true
      this.$set(this.showEdit, row, true)
      this.$set(this.showBtn, row, true)
    },
    handelCancel(index, row) {
      this.getContentList()
      this.showEdit[index] = false
      this.showBtn[index] = false
    }
  }
}
</script>

<style>
.shiftb{
  margin: 2vh 2vw 0 2vw;
}
.shiftass{
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
}
.listview{
  line-height: 5vh;
}
.el-range-separator{
  width: 2vw !important;
}
.el-dialog__body{
  padding: 10px 20px 0;
}
.el-dialog__footer{
  padding: 0 20px 20px;
}
</style>
