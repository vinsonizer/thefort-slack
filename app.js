var Config = require('./config')
var Request = require('request')

Request.post({
  'headers': { 'content-type': 'application/json', 'key': Config.wp.apikey },
  'url': Config.wp.baseurl + '/authentication/login',
  'body': JSON.stringify({
    'username': Config.wp.username,
    'password': Config.wp.password
  })
}, (error, response, body) => {
  if (error) {
    return console.dir(error)
  }
  console.dir(body)
})
