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
          min-width="150"
          prop="staffId"
          sortable
        >
          <editable-cell v-model="row.staffId" slot-scope="{row}" :show-input="row.editMode">
            <span slot="content">{{ row.staffId }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="ShiftName"
          min-width="150"
        >
          <editable-cell v-model="row.shiftName" slot-scope="{row}" :show-input="row.editMode">
            <span slot="content">{{ row.shiftName }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="StartTime"
          min-width="160"
          prop="starttime"
        >
          <editable-cell
            v-model="row.starttime"
            slot-scope="{row}"
            type="datetime"
            :show-input="row.editMode"
            editable-component="el-date-picker"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
            <span slot="content">{{ row.starttime }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="EndTime"
          min-width="160"
          prop="endtime"
        >
          <editable-cell
            v-model="row.endtime"
            slot-scope="{row}"
            type="datetime"
            :show-input="row.editMode"
            editable-component="el-date-picker"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
            <span slot="content">{{ row.endtime }}</span>
          </editable-cell>
        </el-table-column>
        <el-table-column
          label="ShiftType"
          min-width="150"
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
          min-width="150"
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
          min-width="150"
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

        <el-table-column label="Operations" min-width="120">
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
              v-if="row.editMode == false"
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(row, index)"
            />
            <el-button
              v-else
              size="mini"
              type="danger"
              icon="el-icon-close"
              @click="cancelEdit(row, index)"
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
        <el-form-item label="Time" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.datetime1"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00', '08:00:00']"
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
        datetime1: '',
        engineer: '',
        shift: '',
        type: 'Morning',
        task: 'Work',
        activities: ['Work']
      },
      formLabelWidth: '120px',
      tableData: [
        {
          starttime: '2021-01-03 12:00:00',
          endtime: '2021-01-12 16:00:00',
          shiftId: '001',
          staffId: '1001',
          shiftName: '123',
          shiftType: 'Night',
          shiftTask: 'Work',
          shiftActivity: ['Lunch'],
          status: ''
        }, {
          starttime: '2021-01-03 12:00:00',
          endtime: '2021-01-12 16:00:00',
          shiftId: '001',
          staffId: '1001',
          shiftName: '123',
          shiftType: 'Night',
          shiftTask: 'Work',
          shiftActivity: ['Lunch'],
          status: ''
        }, {
          starttime: '2021-01-03 12:00:00',
          endtime: '2021-01-12 16:00:00',
          shiftId: '001',
          staffId: '1001',
          shiftName: '123',
          shiftType: 'Night',
          shiftTask: 'Work',
          shiftActivity: ['Lunch'],
          status: ''
        }, {
          starttime: '2021-01-03 12:00:00',
          endtime: '2021-01-12 16:00:00',
          shiftId: '001',
          staffId: '1001',
          shiftName: '123',
          shiftType: 'Night',
          shiftTask: 'Work',
          shiftActivity: ['Lunch'],
          status: ''
        }
      ]
    }
  },
  mounted() {
    this.tableData = this.tableData.map(row => {
      return {
        ...row,
        editMode: false
      }
    })
    // axios.get('http://120.25.164.172:9124/system/shift/').then(res => {
    //   this.tableData = res.data.data
    //   this.tableData = this.tableData.map(row => {
    //     return {
    //       ...row,
    //       editMode: false
    //     }
    //   })
    // })
  },
  updated() {
    // 对Table进行重新布局
    this.$nextTick(() => {
      this.$refs.tableRef.doLayout()
    })
  },
  methods: {
    zeroFill(i) {
      if (i >= 0 && i <= 9) {
        return '0' + i
      } else {
        return i
      }
    },
    getNowFormattime(date) {
      var hour = this.zeroFill(date.getHours())
      var minute = this.zeroFill(date.getMinutes())
      var second = this.zeroFill(date.getSeconds())
      var curTime = hour + ':' + minute + ':' + second
      return curTime
    },
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
    changeNowFormatDatetime(date) {
      var d = new Date(date)
      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + this.zeroFill(d.getHours()) + ':' + this.zeroFill(d.getMinutes()) + ':' + this.zeroFill(d.getSeconds())
      return datetime
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
      // 将结束日期小于当前日期的轮班样式变灰
      if (new Date(row.end).getTime() < new Date(this.getNowFormatDate()).getTime()) {
        return 'warning-row'
      }
      return ''
    },
    handleDelete(row, index) {
      this.$confirm('Are you sure to delete this shift record?', 'point', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'successfully deleted!'
        })
        axios.delete('http://120.25.164.172:9124/system/shift/' + row.shiftId).then(res => {
          console.log(res)
        })
        this.tableData.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Undeleted'
        })
      })
    },
    setEditMode(row, index) {
      row.editMode = true
    },
    saveRow(row, index) {
      console.log(row.start)
      const data = new FormData()
      data.append('activities', row.shiftActivity)
      data.append('end', row.end)
      data.append('endTime', row.endTime)
      data.append('engineer', row.staffId)
      data.append('shift', row.shiftName)
      data.append('start', row.start)
      data.append('startTime', row.startTime)
      data.append('task', row.shiftTask)
      data.append('type', row.shiftType)
      axios.put('http://120.25.164.172:9124/system/shift/' + row.shiftId, data).then(res => {
        console.log(res)
      })
      row.editMode = false
    },
    submitShift() {
      console.log(this.changeNowFormatDatetime(this.form.datetime1[0]))
      // const data = new FormData()
      // data.append('activities', this.form.activities)
      // data.append('end', this.changeNowFormatDate(this.form.valuedate[1]))
      // data.append('endTime', this.getNowFormattime(this.form.value1[1]))
      // data.append('engineer', this.form.engineer)
      // data.append('shift', this.form.shift)
      // data.append('start', this.changeNowFormatDate(this.form.valuedate[0]))
      // data.append('startTime', this.getNowFormattime(this.form.value1[0]))
      // data.append('task', this.form.task)
      // data.append('type', this.form.type)
      // axios.post('http://120.25.164.172:9124/system/shift/', data).then(res => {
      //   console.log(res)
      // })
      // this.dialogFormVisible = false
    },
    cancelEdit(row, index) {
      row.editMode = false
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
