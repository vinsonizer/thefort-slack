var wp = {}
var debug = false

// Running in Node
if (typeof module !== 'undefined') {
  var Config = require('./config')
  console.log(JSON.stringify(Config))
  var Request = require('request')
  module.exports = wp
}

var HEADERS = { 'content-type': 'application/json', 'key': Config.wp.apikey }

function doPost (urlExtension, callback) {
  console.log('url = ' + Config.wp.baseurl + urlExtension)
  Request.post({
    'headers': HEADERS,
    'url': Config.wp.baseurl + urlExtension,
    'body': JSON.stringify({
      'username': Config.wp.username,
      'password': Config.wp.password
    })
  }, (err, response, body) => {
    if (debug) {
      console.log('error:', err)
      console.log('response:', response)
      console.log('body:', body)
    }
    if (err) callback(err)
    else callback(err, JSON.parse(body))
  })
}

// always start with login and return the body, preferrably with the token
wp.login = function (callback) {
  doPost('authentication/login', callback)
}

wp.getEvents = function (token, startDate, endDate, callback) {

}
