// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const produceNewsData = function() {
  const employee = []
  for (let i = 0; i < 40; i++) {
    const newNewsObject = {
      employeeId: 1234,
      firstName: Random.first(),
      secondName: Random.last(),
      nickName: Random.name(),
      email: Random.email(),
      location: Random.county(),
      department: 'none',
      reportTo: 'none',
      position: 'HR',
      recruitmentSource: 'website',
      entryDate: Random.date(),
      employeeStatus: 'free',
      employeeType: 'Active',
      phone: Random.ip(),
      age: 21,
      otherEmail: Random.email()
    }
    employee.push(newNewsObject)
  }

  return employee
}
// 请求该url，就可以返回newsList
Mock.mock('/mock/form', produceNewsData) // 后面讲这个api的使用细节
