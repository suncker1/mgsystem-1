<template>
  <!-- 里面写eleCalendar组件-->
  <ele-calendar
    :key="menuKey"
    :render-content="renderContent"
    :data="datedef"
    :prop="prop"
    :highlight="false"
    :border="true"
    :default-value="defaultValue"
    value-format="yyyy-MM-dd"
    class="work-day"
    @pick="pick"
    @date-change="dateChange"
  />
</template>

<script>
import eleCalendar from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
import { calendar, allWorkDay, allcalendar } from '@/api/setting/work-day'
export default {
  name: 'WorkDayMain',
  components: {
    eleCalendar
  },
  props: {
    searchForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      allcalendar: [],
      normalWork: '',
      datedef: [
        // { 'date': '2019-09-5', 'content': '班', 'cid': null },
        // { 'date': '2019-09-10', 'content': '班', 'cid': null }
      ],
      prop: 'date', // 对应日期字段名
      defaultValue: '2020-08', // 默认值,搜索时赋值
      menuKey: 1
    }
  },
  watch: {
    'searchForm.intyear': function(val, oldVal) {
      ++this.menuKey
      this.defaultValue = this.searchForm.intyear
    }
  },
  created() {
    // this.getAllWorkDay()
  },
  methods: {
    renderContent(h, parmas) {
      const loop = data => {
        return (
          data.defvalue.value = <div class='calendar'><div>{data.defvalue.text}</div>
            <div style='font-size:12px' class={data.defvalue.value.class}>{data.defvalue.value.content}</div>
          </div>)
      }
      return (
        <div>
          {loop(parmas)}
        </div>
      )
    },
    pick(date, event, row, dom) {
      calendar({ 'strdate': date }).then(res => {
        if (res.code === 20000) {
          this.$message.success(res.message)
          this.getAllWorkDay()
        }
      })
    },
    // 查询全部工作日
    getAllWorkDay() {
      this.datedef = []
      this.$parent.$parent.$refs['Search'].loading = true
      const obj = {
        0: '班',
        1: '休'
      }
      this.$nextTick(() => {
        allWorkDay({ 'intyear': this.searchForm.intyear }).then(res => {
          this.$parent.$parent.$refs['Search'].loading = false
          if (res.code === 20000) {
            res.data.forEach(item => {
              this.datedef.push({ 'date': item.strdate, 'content': obj[item.blnworkday], 'class': 'a' + item.blnworkday })
            })
          }
        })
      })
    },
    // 预置本年日历
    getAllcalendar() {
      allcalendar(this.searchForm.intyear).then(res => {
        if (res.code === 20000) {
          this.allcalendar = res.data
          this.$message.success(res.message)
        }
      })
    },
    dateChange(val) {
      const year = val.split('-')[0]
      if (year !== this.searchForm.intyear) {
        this.searchForm.intyear = year
        this.getAllWorkDay()
      }
    }
  }
}
</script>
<style>
.work-day .a1 { color: #ff0000}
/* .work-day td {height: 62px} */
.calendar{font-size:16px;line-height:20px;}
.calendar div {height: 20px}
.el-date-table-calendar td.current {background:#ecf1f1 !important; color: #333 !important}
.el-date-table-calendar td.next-month, .el-date-table-calendar td.prev-month{color: #fff !important}
.el-date-table-calendar td.next-month .a1, .el-date-table-calendar td.prev-month .a1{color: #fff !important}
.calendar-content{color: #07a5a6; font-weight:bold;font-size:16px}
.el-date-table-calendar td.today{ color: #07a5a6 !important}
.el-date-table-calendar td.available:hover{color: #07a5a6 !important}
.work-day td{height: calc(55vh/7);}
</style>
