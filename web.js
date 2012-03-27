var express = require('express');
var util = require('util');
var exec = require('child_process').exec;

var app = express.createServer(express.logger());

app.get('/', function(request, response) {

  exec('./bin/phantomjs/bin/phantomjs phantomjs rasterize.js ./tmp/test http://www.google.com 200x200', function (error, stdout, stderr) {

    //response.send('Version: ' + stdout + '<br />Error: ' + error);
    response.sendfile('./tmp/test');

  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});