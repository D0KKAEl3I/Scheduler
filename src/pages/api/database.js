// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const database = []
class Data {
  date
  todos

  constructor({ date = { year, month, date, day }, todos = [] }) {
    this.date = { year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), day: date.getDay() }
    this.todos = todos
  }
}

module.exports = {
  get() {
    return database
  },
  add(data) {
    database.push(new Data({ date: data.date, todos: data.todos }))
  },
  delete(data) {
    database.filter(datum => !(data === datum))
  }
}