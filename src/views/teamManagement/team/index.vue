<template>
  <div style="padding:10px;">
    <el-tabs v-model="activeName" style="width: 100%; height: 100%">
      <el-tab-pane label="team" name="team">
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
              @click="activeName = 'addTeam'"
            >add team</el-button>
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
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="teamName" label="team name" width="200" />
          <el-table-column
            prop="centerPoint"
            label="center point"
            width="260"
          />
          <el-table-column label="area" min-width="50" width="100">
            <template slot-scope="scope">
              <a
                :href="'http://localhost:8000/dist/#/area?coordinates=' + scope.row.area.coordinates"
                class="buttonText"
                style="color: #409EFF"
              >{{ scope.row.area.label }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="adder" label="adder" />
          <el-table-column prop="leader" label="leader" />
          <el-table-column prop="email" label="email" />
          <el-table-column prop="createDate" label="create date" sortable />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="add team" name="addTeam">
        <el-form ref="form" :model="newTeam">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Basic Information</span>
            </div>
            <el-form-item label="team name">
              <el-input v-model="newTeam.teamName" />
            </el-form-item>
            <el-form-item label="email">
              <el-input v-model="newTeam.email" />
            </el-form-item>
            <el-form-item label="team area center point">
              <el-input v-model="newTeam.centerPoint" />
            </el-form-item>
            <el-form-item label="leader">
              <el-select v-model="newTeam.leader" placeholder="select">
                <el-option
                  v-for="item in leader"
                  :key="item.value"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="parent team">
              <el-select v-model="newTeam.parentTeam" placeholder="select">
                <el-option
                  v-for="item in parentTeam"
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
      activeName: 'team',
      newTeam: {
        teamName: '',
        adder: '',
        email: '',
        createDate: '',
        parentTeam: '',
        leader: '',
        centerPoint: '',
        area: []
      },
      leader: ['Adler', 'James', 'cxk'],
      parentTeam: ['permanent', 'Contract workers', 'intern'],
      whatEver: '',
      tableData: [
        {
          teamName: 'original',
          adder: 'adler',
          email: '123123123@gmail.com',
          createDate: '2020-10-10',
          leader: 'adler',
          centerPoint: '7.123123123, 6.123123123',
          area: {
            label: 'on map',
            coordinates: []
          }
        },
        {
          teamName: 'outsourcing',
          adder: 'adler',
          email: '123123123@gmail.com',
          createDate: '2020-10-10',
          leader: 'adler',
          centerPoint: '7.123123123, 6.123123123',
          area: {
            label: 'on map',
            coordinates: []
          }
        }
      ],
      multipleSelection: []
    }
  },
  mounted() {},
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
