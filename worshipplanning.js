var wp = {}

// Running in Node
if (typeof module !== 'undefined') {
  var Config = require('./config')
  var Request = require('request')
  // Request.debug = true
  module.exports = wp
}

var debug = false
var HEADERS = { 'content-type': 'application/json', 'key': Config.wp.apikey }

// always start with login and return the token
wp.login = function (callback) {
  var body = {
    'username': Config.wp.username,
    'password': Config.wp.password
  }

  Request.post({
    'headers': HEADERS,
    'url': Config.wp.baseurl + '/authentication/login',
    'body': JSON.stringify(body)
  }, (err, response, body) => {
    if (err) callback(err)
    else callback(err, JSON.parse(body).token)
  })
}

/* Retrieve all high level events in a given time period */
wp.getEvents = function (token, callback) {
  doGet('/events', token, callback)
}

wp.getEventDetail = function (token, event, callback) {
  doGet('/events/' + event.id, token, function (err, result) {
    if (err) console.log(err)
    else callback(err, result)
  })
}

/* ###################### START INTERNAL METHODS ####################### */

function addToken (headerMap, token) {
  headerMap.authorization = token
  return headerMap
}

function doGet (urlExtension, token, callback, options) {
  Request.get({
    'headers': addToken(HEADERS, token),
    'url': Config.wp.baseurl + urlExtension,
    'body': JSON.stringify(options)
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

/* ######################  END INTERNAL METHODS  ####################### */
