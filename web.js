var express = require('express');
var util = require('util');
var exec = require('child_process').exec;

var app = express.createServer(express.logger());

app.get('/', function(request, response) {

  exec('./bin/phantomjs/bin/phantomjs rasterize.js ./tmp/test.jpg http://www.google.com 200x200', function (error, stdout, stderr) {

    if(error) {
      response.send('Version: ' + stdout + '<br />Error: ' + error);
    } else {
      response.sendfile('./tmp/test.jpg');
    }
    //response.send('Version: ' + stdout + '<br />Error: ' + error);


  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});