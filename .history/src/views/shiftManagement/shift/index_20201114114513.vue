<template>
  <div class="shiftb">
    <div class="shiftass">
      <div class="listview">List view</div>
      <el-button type="primary" @click="dialogFormVisible = true">Assign shift</el-button>
    </div>
    <div>
      <el-table
        ref="tableRef"
        :data="tableData"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          v-if="showshiftid"
          prop="shiftId"
          label="ShiftId"
        />
        <el-table-column
          label="StaffId"
          width="150"
          sortable
        >
          <editable-cell v-model="row.staffId" slot-scope="{row}" :show-input="row.editMode">
            <span slot="content">{{ row.staffId }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="ShiftName"
          width="150"
        >
          <editable-cell v-model="row.shiftName" slot-scope="{row}" :show-input="row.editMode">
            <span slot="content">{{ row.shiftName }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="Starting date"
          width="150"
          sortable
        >
          <editable-cell
            v-model="row.start"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-date-picker"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
            <span slot="content">{{ row.start }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="Starting time"
          width="150"
          sortable
        >
          <editable-cell
            v-model="row.startTime"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-time-picker"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          >
            <span slot="content">{{ row.startTime }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="End date"
          width="150"
          sortable
        >
          <editable-cell
            v-model="row.end"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-date-picker"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
            <span slot="content">{{ row.end }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="End time"
          width="150"
          sortable
        >
          <editable-cell
            v-model="row.endTime"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-time-picker"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
          >
            <span slot="content">{{ row.endTime }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="ShiftType"
          width="150"
        >
          <editable-cell
            v-model="row.shiftType"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-select"
            close-event="change"
          >
            <el-tag
              slot="content"
              size="medium"
              type="primary"
            >
              {{ row.shiftType }}
            </el-tag>
            <template slot="edit-component-slot">
              <el-option value="Morning" label="Morning" />
              <el-option value="Middle" label="Middle" />
              <el-option value="Night" label="Night" />
              <el-option value="Multi-day" label="Multi-day" />
            </template>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="ShiftTask"
          width="150"
        >
          <editable-cell
            v-model="row.shiftTask"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-select"
            close-event="change"
          >
            <el-tag
              slot="content"
              size="medium"
              type="primary"
            >
              {{ row.shiftTask }}
            </el-tag>
            <template slot="edit-component-slot">
              <el-option value="Work" label="Work" />
              <el-option value="OnCall" label="OnCall" />
              <el-option value="Break" label="Break" />
              <el-option value="Training" label="Training" />
              <el-option value="Meeting" label="Meeting" />
            </template>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="ShiftActivity"
          width="150"
        >
          <editable-cell
            v-model="row.shiftActivity"
            slot-scope="{row}"
            :show-input="row.editMode"
            editable-component="el-select"
            multiple
            close-event="change"
          >
            <el-tag
              slot="content"
              size="medium"
              type="primary"
            >
              {{ row.shiftActivity.toString() }}
            </el-tag>
            <template slot="edit-component-slot">
              <el-option value="Work" label="Work" />
              <el-option value="Lunch" label="Lunch" />
              <el-option value="Break" label="Break" />
            </template>
          </editable-cell>
        </el-table-column>

        <el-table-column
          prop="status"
          label="Remark"
          min-width="80"
        />

        <el-table-column label="Operations" width="120">
          <template slot-scope="{row, index}">
            <el-button
              v-if="row.editMode == false"
              size="mini"
              icon="el-icon-edit"
              @click="setEditMode(row, index)"
            />
            <el-button
              v-else
              size="mini"
              type="success"
              icon="el-icon-check"
              @click="saveRow(row, index)"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(row, index)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="Assign shift" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Engineer" :label-width="formLabelWidth">
          <el-input v-model="form.engineer" placeholder="If there are multiple engineers, please separate with ';'" />
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
          <el-radio-group v-model="form.type">
            <el-radio class="radiotype" label="Morning">Morning</el-radio>
            <el-radio class="radiotype" label="Middle">Middle</el-radio>
            <el-radio class="radiotype" label="Night">Night</el-radio>
            <el-radio class="radiotype" label="Multi-day">Multi-day</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Task" :label-width="formLabelWidth">
          <el-radio-group v-model="form.task">
            <el-radio class="radiotask" label="Work">Work</el-radio>
            <el-radio class="radiotask" label="OnCall">OnCall</el-radio>
            <el-radio class="radiotask" label="Break">Break</el-radio>
            <el-radio class="radiotask" label="Training">Training</el-radio>
            <el-radio class="radiotask" label="Meeting">Meeting</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activities" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.activities">
            <el-checkbox label="Work" />
            <el-checkbox label="Lunch" />
            <el-checkbox label="Break" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitShift">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import EditableCell from '../../../components/EditableCell/index'

export default {
  components: {
    EditableCell
  },
  data() {
    return {
      showshiftid: false,
      dialogFormVisible: false,
      form: {
        engineer: '',
        shift: '',
        valuedate: '',
        value1: [new Date(2020, 10, 10, 8, 30), new Date(2020, 10, 10, 12, 30)],
        type: 'Morning',
        task: 'Work',
        activities: ['Work']
      },
      formLabelWidth: '120px',
      tableData: []
    }
  },
  mounted() {
    axios.get('http://120.25.164.172:9124/system/shift/').then(res => {
      this.tableData = res.data.data
      this.tableData = this.tableData.map(row => {
        return {
          ...row,
          editMode: false
        }
      })
    })
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.tableRef.doLayout()
    })
  },
  methods: {
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    changeNowFormatDate(date) {
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    tableRowClassName({ row, rowIndex }) {
      if (new Date(row.end).getTime() < new Date(this.getNowFormatDate()).getTime()) {
        return 'warning-row'
      }
      return ''
    },
    handleDelete(row, index) {
      this.tableData.splice(index, 1)
    },
    setEditMode(row, index) {
      row.editMode = true
    },
    saveRow(row, index) {
      row.editMode = false
      console.log(row)
      console.log(row.start)
    },
    submitShift() {
      console.log(this.changeNowFormatDate(this.form.valuedate[0]))
      console.log(this.changeNowFormatDate(this.form.valuedate[1]))
      // console.log(this.form)
      // console.log(this.form.activities)
      // console.log(this.form.engineer)
      // console.log(this.form.shift)
      // console.log(this.form.task)
      // console.log(this.form.type)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>
.el-table .warning-row {
    background: rgb(243, 243, 243);
    color: rgb(146, 146, 146);
}
.shiftb{
  margin: 2vh 0 1vw 0;
}
.shiftass{
  display: flex;
  justify-content: space-between;
  margin: 0 1vw 2vh 1vw;
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
.edit-cell {
  min-height: 35px;
  cursor: pointer;
}
.edit-cell>.el-date-editor.el-input, .edit-cell>.el-date-editor>.el-input__inner {
    width: 134px;
}
.el-table th.gutter{
  display: table-cell !important;
}
</style>
