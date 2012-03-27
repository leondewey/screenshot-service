var express = require('express');
var util = require('util');
var exec = require('child_process').exec;

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  // bin/phantomjs --version
  exec('./bin/phantom/bin/phantomjs --version', function (error, stdout, stderr) {
    response.send('Version: ' + stdout + '<br />Error: ' + error);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});