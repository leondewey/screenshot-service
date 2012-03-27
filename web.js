var express = require('express');
var util = require('util');
var exec = require('child_process').exec;

var app = express.createServer(express.logger());

app.get('/', function(request, response) {

  exec('./bin/phantomjs/bin/phantomjs rasterize.js http://www.google.com ./tmp/test.jpg 200x200', function (error, stdout, stderr) {

    if(error) {
      response.send('Version: ' + stdout + '<br />Error: ' + error);
    } else {
      response.sendfile('./tmp/test.jpg');
    }
    //response.send('Version: ' + stdout + '<br />Error: ' + error);
    //phantomjs rasterize.js http://www.google.com ./tmp/test.jpg 200x200

  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});