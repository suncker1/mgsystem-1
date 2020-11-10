<template>
  <div>
    <div class="calendarTop">
      <div class="calendarview">Calendar view</div>
      <el-button type="primary" @click="dialogVisible = true">Ask for leave</el-button>
    </div>
    <ele-calendar
      :render-content="renderContent"
      :data="datedef"
      :prop="prop"
      lang="en"
    />
    <el-dialog title="Ask for leave" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="Type" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">Personal leave</el-radio>
            <el-radio :label="2">Sick leave</el-radio>
          </el-radio-group>
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
        <el-form-item label="Reason" :label-width="formLabelWidth">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
export default {
  components: {
    eleCalendar
  },
  data() {
    return {
      datedef: [
        { 'date': '2020-10-14', 'content': 'kjfsdklj', 'cid': 'iooi' },
        { 'date': '2020-10-20', 'content': 'dsfsdfr', 'cid': 'hjjdsf' }
      ],
      prop: 'date',
      dialogVisible: false,
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
      formLabelWidth: '120px'
    }
  },
  methods: {
    renderContent(h, parmas) {
      console.log(h)
      console.log(parmas)
      const loop = data => {
        return (
          data.defvalue.value ? (<div><div>{data.defvalue.text}</div>
            <span >{data.defvalue.value.content}</span>
          </div>) : <div>{data.defvalue.text}</div>
        )
      }
      return (
        <div style='min-height:60px;'>
          {loop(parmas)}
        </div>
      )
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>

<style>
.calendarTop{
  margin: 2vh 2vw;
  display: flex;
  justify-content: space-between;
}
.calendarview{
  line-height: 5vh;
}
</style>
