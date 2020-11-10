<template>
  <div>
    <el-tabs v-model="activeName" class="tabbod" @tab-click="handleClick">
      <el-tab-pane label="My approval" name="first">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="engineer"
            label="Engineer"
            min-width="83"
          />
          <el-table-column
            prop="type"
            label="Type"
          />
          <el-table-column
            prop="start"
            label="Starting date"
          />
          <el-table-column
            prop="starttime"
            label="Starting time"
          />
          <el-table-column
            prop="end"
            label="End date"
          />
          <el-table-column
            prop="endtime"
            label="End time"
          />
          <el-table-column
            prop="reason"
            label="Reason"
          />
          <el-table-column
            prop="submission"
            label="Submission time"
            min-width="110"
            sortable
          />
          <el-table-column class-name="status-col" label="Status" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 'REVIEWING'" class="action-bts">
                <el-button type="success" size="mini" @click="passApply(scope.row.order_no, scope.$index)">Approve</el-button>
                <el-button type="danger" size="mini" @click="openReasonDialog(scope.row.order_no, scope.$index)">Refuse</el-button>
              </div>
              <el-tag v-else :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Submitted" name="second">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="type"
            label="Type"
          />
          <el-table-column
            prop="start"
            label="Starting date"
          />
          <el-table-column
            prop="starttime"
            label="Starting time"
          />
          <el-table-column
            prop="end"
            label="End date"
          />
          <el-table-column
            prop="endtime"
            label="End time"
          />
          <el-table-column
            prop="reason"
            label="Reason"
          />
          <el-table-column
            prop="submission"
            label="Submission time"
            min-width="110"
            sortable
          />
          <el-table-column class-name="status-col" label="Status" min-width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="Reject application" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="Reason for rejection" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="sumbit">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  filters: {
    // el-tag类型转换
    statusFilter(status) {
      const statusMap = {
        SUCCESS: 'success',
        REVIEWING: 'gray',
        FAILURE: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      activeName: 'first',
      tableData: [{
        engineer: '1298122',
        shift: '王小虎',
        start: '2020-10-19',
        end: '2020-10-19',
        duration: '666',
        type: 'Personal leave',
        task: '3.2',
        activities: 10,
        status: 'SUCCESS',
        reason: 'Reissue ID card',
        starttime: '08:00',
        endtime: '10:00',
        submission: '2020-10-16'
      }, {
        engineer: '1298713',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: 'Personal leave',
        task: '4.43',
        activities: 12,
        status: 'REVIEWING',
        reason: '111',
        starttime: '08:30',
        endtime: '12:30',
        submission: '444'
      }, {
        engineer: '1987124',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: 'Sick leave',
        task: '1.9',
        activities: 9,
        status: 'FAILURE',
        reason: '111',
        starttime: '08:30',
        endtime: '12:30',
        submission: '444'
      }, {
        engineer: '1298715',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: 'Sick leave',
        task: '2.2',
        activities: 17,
        status: 'REVIEWING',
        reason: '111',
        starttime: '08:30',
        endtime: '12:30',
        submission: '444'
      }, {
        engineer: '1298126',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: 'Personal leave',
        task: '4.1',
        activities: 15,
        status: 'REVIEWING',
        reason: '111',
        starttime: '08:30',
        endtime: '12:30',
        submission: '444'
      }],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '160px',
      row: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    passApply(order_no, index) {
      this.$set(this.tableData[index], 'status', 'SUCCESS')
    },
    openReasonDialog(order_no, index) {
      this.row = index
      this.dialogFormVisible = true
    },
    cancel() {
      this.dialogFormVisible = false
    },
    sumbit() {
      this.dialogFormVisible = false
      this.$set(this.tableData[this.row], 'status', 'FAILURE')
    }
  }
}
</script>

<style>
.tabbod{
    margin: 0 2vw;
}
.el-input{
  width: 24vw;
}
</style>
