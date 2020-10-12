<template>
  <div style="padding:10px;">
    <el-tabs
      v-model="activeName"
      style="width: 100%; height: 100%"
    >
      <el-tab-pane label="department" name="department">
        <div class="head">
          <el-select v-model="whatEver" placeholder="please select">
            <el-option label="all" value="all" />
            <el-option label="free" value="free" />
            <el-option label="online" value="online" />
          </el-select>
          <div class="headRight">
            <el-select v-model="whatEver" placeholder="please select">
              <el-option label="all" value="all" />
              <el-option label="free" value="free" />
              <el-option label="online" value="online" />
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="activeName = 'addDepartment'"
            >add department</el-button>
            <el-button icon="el-icon-search" circle />
            <el-button icon="el-icon-edit" circle />
            <el-button icon="el-icon-more" circle />
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="departmentName" label="department name" width="200" />
          <el-table-column prop="adder" label="adder" />
          <el-table-column prop="leader" label="leader" />
          <el-table-column prop="email" label="email" />
          <el-table-column prop="createDate" label="create date" sortable />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="add department" name="addDepartment">
        <el-form ref="form" :model="newDepartment">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Basic Information</span>
            </div>
            <el-form-item label="department name">
              <el-input v-model="newDepartment.departmentName" />
            </el-form-item>
            <el-form-item label="email">
              <el-input v-model="newDepartment.email" />
            </el-form-item>
            <el-form-item label="leader">
              <el-select v-model="newDepartment.leader" placeholder="select">
                <el-option
                  v-for="item in leader"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="parent department">
              <el-select v-model="newDepartment.parentDepartment" placeholder="select">
                <el-option
                  v-for="item in parentDepartment"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-card>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'department',
      newDepartment: {
        departmentName: '',
        adder: '',
        email: '',
        createDate: '',
        parentDepartment: '',
        leader: ''
      },
      leader: ['Adler', 'James', 'cxk'],
      parentDepartment: ['permanent', 'Contract workers', 'intern'],
      whatEver: '',
      tableData: [
        {
          departmentName: 'HR',
          adder: 'adler',
          email: '123123123@gmail.com',
          createDate: '2020-10-10',
          leader: 'adler'
        },
        {
          departmentName: 'CFO',
          adder: 'adler',
          email: '123123123@gmail.com',
          createDate: '2020-10-10',
          leader: 'adler'
        }
      ],
      multipleSelection: []
    }
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('eee')
    }
  }
}
</script>
<style lang="sass">
@import '../../../styles/employeeForm.scss'
</style>
