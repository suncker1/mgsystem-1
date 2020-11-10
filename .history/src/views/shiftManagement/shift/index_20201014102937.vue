<template>
  <div class="shiftb">
    <div class="shiftass">
      <div class="listview">List view</div>
      <el-button type="primary" @click="dialogFormVisible = true">Assign shift</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        :span-method="arraySpanMethod"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="engineer"
          label="Engineer"
          width="150"
        />
        <el-table-column
          prop="shift"
          label="Shift"
        />
        <el-table-column
          prop="start"
          label="Starting time"
        />
        <el-table-column
          prop="end"
          label="End Time"
        />
        <el-table-column
          prop="duration"
          label="Work duration"
        />
        <el-table-column
          prop="type"
          label="Type"
        />
        <el-table-column
          prop="task"
          label="Task"
        />
        <el-table-column
          prop="activities"
          label="Activities"
          width="150"
        />
        <el-table-column label="Operations" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="Assign shift" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Engineer" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="If there are multiple engineers, please separate with ';'" />
        </el-form-item>
        <el-form-item label="Shift name" :label-width="formLabelWidth">
          <el-input v-model="form.shift" />
        </el-form-item>
        <el-form-item label="Date" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.valuedate"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
          />
        </el-form-item>
        <el-form-item label="Time" :label-width="formLabelWidth">
          <el-time-picker
            v-model="form.value1"
            is-range
            range-separator="To"
            start-placeholder="Start time"
            end-placeholder="End time"
          />
        </el-form-item>
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">Morning shift</el-radio>
            <el-radio :label="2">Middle shift</el-radio>
            <el-radio :label="3">Night shift</el-radio>
            <el-radio :label="4">Multi-day shift</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Task" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio1">
            <el-radio :label="5">Work</el-radio>
            <el-radio :label="6">On call</el-radio>
            <el-radio :label="7">Break</el-radio>
            <el-radio :label="8">Training</el-radio>
            <el-radio :label="9">Meeting</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activities" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="Work" />
            <el-checkbox label="Lunch" />
            <el-checkbox label="Break" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>lll

<script>
export default {
  data() {
    return {
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleEdit(index, row) {
      console.log(index)
      console.log(row)
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
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
