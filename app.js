// sample app to show usage
var wp = require('./worshipplanning')

var startDate = new Date()
// ms in a week
var endDate = new Date(startDate.getTime() + 604800000)

wp.getEvents(startDate, endDate, function (err, results) {
  if (err) console.log(err)
  else {
    console.log(results)
  }
})
