// sample app to show usage
var wp = require('./worshipplanning')

wp.login(function (err, token) {
  if (err) console.log('Error in Login: ' + err)
  else {
    checkEvents(token)
  }
})

function checkEvents (token) {
  wp.getEvents(token, function (err, results) {
    if (err) console.log(err)
    else {
      console.log('found ' + results.data.length + ' events')
      results.data.forEach(function (currentValue) {
        if (currentValue.id === 663790) {
          getEventDetails(token, currentValue)
        }
      })
    }
  })
}

function getEventDetails (token, theEvent) {
  wp.getEventDetail(token, theEvent, function (err, eventDetail) {
    if (err) console.log(err)
    else console.log(eventDetail)
  })
}
