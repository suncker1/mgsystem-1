<template>
  <div style="padding:10px;">
    <el-tabs v-model="activeName" style="width: 100%; height: 100%">
      <el-tab-pane label="employee" name="employee">
        <div class="head">
          <el-select v-model="employeeStatus" placeholder="please select">
            <el-option label="all" value="all" />
            <el-option label="free" value="free" />
            <el-option label="online" value="online" />
          </el-select>
          <div class="headRight">
            <el-select v-model="employeeStatus" placeholder="please select">
              <el-option label="all" value="all" />
              <el-option label="free" value="free" />
              <el-option label="online" value="online" />
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="activeName = 'addEmployee'"
            >add employee</el-button>
            <el-button icon="el-icon-search" circle />
            <el-button icon="el-icon-edit" circle />
            <el-button icon="el-icon-more" circle />
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="
            tableData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="employeeId" label="employeeId" width="100" />
          <el-table-column prop="firstName" label="first name" />
          <el-table-column prop="secondName" label="second name" />
          <el-table-column prop="nickName" label="nick Name" />
          <el-table-column prop="email" label="email" width="205" />
          <el-table-column prop="department" label="department" />
          <el-table-column prop="position" label="position" />
          <el-table-column
            prop="recruitmentSource"
            label="recruitment source"
            width="155"
          />
          <el-table-column prop="entryDate" label="entryDate" />
          <el-table-column
            prop="employeeStatus"
            label="employee status"
            width="155"
          />
          <el-table-column prop="employeeType" label="employee type" />
          <el-table-column prop="entryDate" label="entryDate" />
          <el-table-column prop="phone" label="phone" />
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="current_change"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="table of contents"
        name="tableOfContents"
      >table of contents</el-tab-pane>
      <el-tab-pane label="add employee" name="addEmployee">
        <el-form ref="form" :model="newEmployee">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Basic Information</span>
            </div>
            <el-form-item label="employeeId">
              <el-input v-model="newEmployee.employeeId" />
            </el-form-item>
            <el-form-item label="first name">
              <el-input v-model="newEmployee.firstName" />
            </el-form-item>
            <el-form-item label="second name">
              <el-input v-model="newEmployee.secondName" />
            </el-form-item>
            <el-form-item label="email">
              <el-input v-model="newEmployee.email" />
            </el-form-item>
            <el-form-item label="nickName">
              <el-input v-model="newEmployee.nickName" />
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Job</span>
            </div>
            <el-form-item label="department">
              <el-select v-model="newEmployee.department" placeholder="select">
                <el-option
                  v-for="item in department"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="location">
              <el-select v-model="newEmployee.location" placeholder="select">
                <el-option
                  v-for="item in location"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="report to">
              <el-select v-model="newEmployee.reportTo" placeholder="select">
                <el-option
                  v-for="item in department"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="position">
              <el-input v-model="newEmployee.position" />
            </el-form-item>
            <el-form-item label="Recruitment source">
              <el-select
                v-model="newEmployee.recruitmentSource"
                placeholder="select"
              >
                <el-option
                  v-for="item in recruitmentSource"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="entry date">
              <el-date-picker
                v-model="newEmployee.entryDate"
                type="date"
                placeholder="select date"
              />
            </el-form-item>
            <el-form-item label="employee status">
              <el-select
                v-model="newEmployee.employeeStatus"
                placeholder="select"
              >
                <el-option
                  v-for="item in employeeStatus"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="recruitment type">
              <el-select
                v-model="newEmployee.employeeType"
                placeholder="select"
              >
                <el-option
                  v-for="item in employeeType"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Personal</span>
            </div>
            <el-form-item label="phone">
              <el-input v-model="newEmployee.phone" />
            </el-form-item>
            <el-form-item label="home address">
              <el-input v-model="newEmployee.homeAddress" />
            </el-form-item>
            <el-form-item label="age">
              <el-input v-model="newEmployee.age" />
            </el-form-item>
            <el-form-item label="other email">
              <el-input v-model="newEmployee.otherEmail" />
            </el-form-item>
          </el-card>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">create now</el-button>
            <el-button>cancle</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeName: 'employee',
      total: 0,
      pagesize: 20,
      currentPage: 1,
      newEmployee: {
        employeeId: '',
        firstName: '',
        secondName: '',
        nickName: '',
        email: '',
        location: '',
        department: '',
        reportTo: '',
        position: '',
        recruitmentSource: '',
        entryDate: '',
        employeeStatus: '',
        employeeType: '',
        phone: '',
        age: '',
        otherEmail: ''
      },
      department: ['aa', 'bb', 'cc', 'dd'],
      location: ['guangzhou', 'zhanjiang', 'dongguan', 'aabc'],
      recruitmentSource: ['dirct', 'be introduced', 'website', 'advertisement'],
      employeeStatus: ['Active', 'Termainated', 'Deceased', 'Resigned'],
      employeeType: ['permanent', 'Contract workers', 'intern'],
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    axios({
      url: 'http://172.16.11.52:10086/global/user/login',
      method: 'post',
      params: { mobile: '13030237810',
        password: '123' },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(respanse => {
        console.log(respanse)
      })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      console.log('eee')
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
<style lang="sass">
@import '../../../styles/employeeForm.scss'
</style>
