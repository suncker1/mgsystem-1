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
            width="150"
          />
          <el-table-column
            prop="type"
            label="Type"
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
            prop="reason"
            label="Reason"
          />
          <el-table-column class-name="status-col" label="Status" width="200">
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
            prop="engineer"
            label="Engineer"
            width="150"
          />
          <el-table-column
            prop="type"
            label="Type"
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
            prop="reason"
            label="Reason"
          />
          <el-table-column class-name="status-col" label="Status" width="200">
            <template slot-scope="scope">
              <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="Reject application" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Reason for rejection">
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
        engineer: '12987122',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '234',
        task: '3.2',
        activities: 10,
        status: 'SUCCESS',
        reason: '111'
      }, {
        engineer: '12987123',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '165',
        task: '4.43',
        activities: 12,
        status: 'REVIEWING',
        reason: '111'
      }, {
        engineer: '12987124',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '324',
        task: '1.9',
        activities: 9,
        status: 'FAILURE',
        reason: '111'
      }, {
        engineer: '12987125',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '621',
        task: '2.2',
        activities: 17,
        status: 'REVIEWING',
        reason: '111'
      }, {
        engineer: '12987126',
        shift: '王小虎',
        start: '123',
        end: '345',
        duration: '666',
        type: '539',
        task: '4.1',
        activities: 15,
        status: 'REVIEWING',
        reason: '111'
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
      formLabelWidth: '100px',
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
  width: 70px;
}
</style>
