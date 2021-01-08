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
          <el-input v-model="form.reason" />
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
import axios from 'axios'
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
export default {
  components: {
    eleCalendar
  },
  data() {
    return {
      datedef: [
        { 'date': '2020-10-19', 'content': 'General(08:00-12:00)', 'status': 'leave' },
        { 'date': '2020-10-20', 'content': 'AEST(13:30-18:00)', 'status': '' },
        { 'date': '2020-10-29', 'content': 'ANZ(13:30-18:00)', 'status': 'leave' },
        { 'date': '2020-11-09', 'content': 'General(08:00-12:00)', 'status': 'leave' },
        { 'date': '2020-11-20', 'content': 'General(08:00-12:00)', 'status': '' }
      ],
      prop: 'date',
      dialogVisible: false,
      form: {
        reason: '',
        valuedate: '',
        value1: [new Date(2020, 10, 10, 8, 30), new Date(2020, 10, 10, 12, 30)],
        radio: 1
      },
      formLabelWidth: '120px'
    }
  },
  mounted() {
    axios.get('http://120.25.164.172:9124/system/shift/').then(res => {
      // 获得轮班开始时间到结束时间中的每一天
      console.log(this.formatEveryDay(res.data.data[0].start, res.data.data[0].end))
      // 将轮班信息拼接成content的形式
      console.log(this.datecontent(res.data.data[0].shiftName, res.data.data[0].startTime, res.data.data[0].endTime))
    })
  },
  methods: {
    renderContent(h, parmas) {
      const loop = data => {
        return (
          data.defvalue.value ? (<div><div>{data.defvalue.text}</div>
            <div style='color:red;'>{data.defvalue.value.status}</div>
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
    formatEveryDay(start, end) {
      const dateList = []
      var startTime = this.getDate(start)
      var endTime = this.getDate(end)

      while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var year = startTime.getFullYear()
        var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1
        var day = startTime.getDate().toString().length === 1 ? '0' + startTime.getDate() : startTime.getDate()
        dateList.push(year + '-' + month + '-' + day)
        startTime.setDate(startTime.getDate() + 1)
      }
      return dateList
    },
    getDate(datestr) {
      var temp = datestr.split('-')
      var date = new Date(temp[0], temp[1] - 1, temp[2])
      return date
    },
    datecontent(shiftName, startTime, endTime) {
      let contentd = ''
      var leftb = '('
      var rightb = ')'
      var midb = '-'
      contentd = shiftName + leftb + startTime + midb + endTime + rightb
      return contentd
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
