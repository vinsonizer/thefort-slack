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

function addToken (headerMap, token) {
  headerMap.authorization = token
  return headerMap
}

function doGet (urlExtension, args, callback) {
  _login(function (err, token) {
    if (err) console.log(err)
    else {
      Request.get({
        'headers': addToken(HEADERS, token),
        'url': Config.wp.baseurl + urlExtension,
        'body': JSON.stringify(args)
      }, (err, response, body) => {
        if (debug) {
          console.log('url:', Config.wp.baseurl + urlExtension)
          console.log('error:', err)
          console.log('response:', response)
          console.log('body:', body)
        }
        if (err) callback(err)
        else callback(err, JSON.parse(body))
      })
    }
  })
}

// always start with login and return the token
function _login (callback) {
  var body = {
    'username': Config.wp.username,
    'password': Config.wp.password
  }

  Request.post({
    'headers': HEADERS,
    'url': Config.wp.baseurl + 'authentication/login',
    'body': JSON.stringify(body)
  }, (err, response, body) => {
    if (err) callback(err)
    else callback(err, JSON.parse(body).token)
  })
}

wp.getEvents = function (startDate, endDate, callback) {
  var body = {
    'start_date': startDate.toString(),
    'end_date': endDate.toString()
  }
  doGet('events', body, callback)
}
