var wp = {}

// Running in Node
if (typeof module !== 'undefined') {
  var Config = require('./config')
  var Request = require('request')
  module.exports = wp
}

var debug = false
var HEADERS = { 'content-type': 'application/json', 'key': Config.wp.apikey }

/* Retrieve all high level events in a given time period */
wp.getEvents = function (startDate, endDate, callback) {
  var body = {
    'start_date': startDate.toJSON(),
    'end_date': endDate.toJSON()
  }
  doGet('events', body, callback)
}

wp.getEventDetail = function (event, callback) {
  doGet('events/' + event.id, {}, function (err, result) {
    if (err) console.log(err)
    else callback(err, result)
  })
}

/* ###################### START INTERNAL METHODS ####################### */

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

/* ######################  END INTERNAL METHODS  ####################### */
