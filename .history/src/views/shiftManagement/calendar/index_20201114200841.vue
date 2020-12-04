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
// import axios from 'axios'
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
export default {
  components: {
    eleCalendar
  },
  data() {
    return {
      datedef: [
        { 'date': '2020-10-19', 'content': 'General(08:00-12:00)', 'status': 'qjl' },
        { 'date': '2020-10-20', 'content': 'AEST(13:30-18:00)', 'status': '' },
        { 'date': '2020-10-29', 'content': 'ANZ(13:30-18:00)', 'status': 'qjz' },
        { 'date': '2020-11-09', 'content': 'General(08:00-12:00)', 'status': 'qjsb' },
        { 'date': '2020-11-20', 'content': 'qjl', 'status': null }
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
  // mounted() {
  //   axios.get('http://120.25.164.172:9124/system/shift/').then(res => {
  //     this.datedef = res.data.data
  //     this.tableData = this.tableData.map(row => {
  //       return {
  //         ...row,
  //         editMode: false
  //       }
  //     })
  //   })
  // },
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
