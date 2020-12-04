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
        stripe
      >
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
            <el-radio :label="1">Morning</el-radio>
            <el-radio :label="2">Middle</el-radio>
            <el-radio :label="3">Night</el-radio>
            <el-radio :label="4">Multi-day</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Task" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio1">
            <el-radio :label="5">Work</el-radio>
            <el-radio :label="6">OnCall</el-radio>
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
      dialogFormVisible: false,
      form: {
        name: '',
        shift: '',
        valuedate: '',
        value1: [new Date(2020, 10, 10, 8, 30), new Date(2020, 10, 10, 12, 30)],
        radio: 1,
        radio1: 5,
        checkList: ['Work'],
        type: []
      },
      formLabelWidth: '120px',
      tableData: [{
        engineer: '1298122',
        shift: 'General',
        start: '2020-11-02',
        end: '2020-11-02',
        type: 'Morning',
        task: 'Work',
        remark: '',
        activities: ['Work'],
        starttime: '08:00:00',
        endtime: '12:00:00'
      }, {
        engineer: '1987123',
        shift: 'AEST',
        start: '2020-11-02',
        end: '2020-11-05',
        type: 'Middle',
        task: 'OnCall',
        remark: 'qj',
        activities: ['Work', 'Lunch'],
        starttime: '13:30:00',
        endtime: '18:00:00'
      }, {
        engineer: '1298724',
        shift: 'ANZ',
        start: '2020-11-15',
        end: '2020-11-15',
        type: 'Night',
        task: 'Break',
        remark: 'qjz',
        activities: ['Lunch'],
        starttime: '13:30:00',
        endtime: '18:00:00'
      }, {
        engineer: '1297125',
        shift: 'General',
        start: '2020-11-16',
        end: '2020-11-16',
        type: 'Multi-day',
        task: 'Training',
        remark: '',
        activities: ['Break'],
        starttime: '08:30:00',
        endtime: '12:30:00'
      }, {
        engineer: '1298716',
        shift: 'Internship',
        start: '2020-11-09',
        end: '2020-11-30',
        type: 'Middle',
        task: 'Meeting',
        remark: 'sfsdfdsff',
        activities: ['Break'],
        starttime: '08:30:00',
        endtime: '12:30:00'
      }]
    }
  },
  mounted() {
    axios.get('http://120.25.164.172:9124/system/shift/').then(res => {
      console.log(res.data.data)
      this.tableData = res.data.data
      this.tableData = this.tableData.map(row => {
        return {
          ...row,
          editMode: false
        }
      })
      // if (this.tableData.end > this.getNowFormatDate()) {
      //   console.log('jkfdshkj')
      // }
      console.log(this.tableData.end)
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
      console.log(this.form.valuedate[0])
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>
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
