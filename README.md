# thefort-slack

Slack Integrations for The Fort

## Pre-Requisites
Node

## Initial Setup

Run ```node install```

Create a file named config.js in this directory with the following contents, but with accurate values:

```
var config = {}
config.wp = {}

config.wp.username = ''
config.wp.password = ''
config.wp.apikey   = ''
config.wp.baseurl  = ''

module.exports = config
```
Now run node app.js for the test
