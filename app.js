// sample app to show usage
var wp = require('./worshipplanning')
var token

wp.login(function (err, body) {
  if (err) console.log('err => ' + err)
  else {
    this.token = body.token
  }
})

console.log(token)
