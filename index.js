'use strict';

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var nconf = require('nconf');

var app = express();

nconf.argv().env().file({file: './config/default.json'});

// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
var api = new ParseServer({
  databaseURI: nconf.get('databaseURI'),
  //cloud: nconf.get('cloud'),
  appId: nconf.get('appId'),
  masterKey: nconf.get('masterKey'),
  fileKey: nconf.get('fileKey')
});

// Serve the Parse API on the /parse URL prefix
app.use(nconf.get('parseAPIPrefix'), api);

// Hello world
app.get('/', function(req, res) {
  res.status(200).send('Express is running here.');
});

var port = nconf.get('port');
app.listen(port, function() {
  console.log('parse-server-example running on port %s', port);
});
