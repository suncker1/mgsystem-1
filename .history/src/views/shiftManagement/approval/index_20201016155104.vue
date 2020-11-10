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
            width="83"
          />
          <el-table-column
            prop="type"
            label="Type"
            width="120"
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
        start: '2020-10-19',
        end: '2020-10-19',
        type: 'Personal leave',
        status: 'SUCCESS',
        reason: 'Reissue ID card',
        starttime: '08:30',
        endtime: '10:00',
        submission: '2020-10-16'
      }, {
        engineer: '1298713',
        start: '2020-10-20',
        end: '2020-10-23',
        type: 'Personal leave',
        status: 'REVIEWING',
        reason: 'Business trip',
        starttime: '08:30',
        endtime: '18:00',
        submission: '2020-10-19'
      }, {
        engineer: '1987124',
        start: '2020-10-26',
        end: '2020-11-19',
        type: 'Sick leave',
        status: 'FAILURE',
        reason: 'Go to the hospital',
        starttime: '08:30',
        endtime: '18:00',
        submission: '2020-10-20'
      }, {
        engineer: '1298715',
        start: '2020-10-21',
        end: '2020-10-21',
        type: 'Sick leave',
        status: 'REVIEWING',
        reason: 'Go to the hospital to get medicine',
        starttime: '08:30',
        endtime: '12:30',
        submission: '2020-10-16'
      }, {
        engineer: '1298126',
        start: '2020-10-20',
        end: '2020-10-23',
        type: 'Personal leave',
        status: 'REVIEWING',
        reason: 'Business trip',
        starttime: '08:30',
        endtime: '18:00',
        submission: '2020-10-20'
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
