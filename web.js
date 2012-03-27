var express = require('express');
var util = require('util');
var exec = require('child_process').exec;

var app = express.createServer(express.logger());

app.get('/*', function(request, response) {

  var url = request.params;
  var path = new Number(Math.random() * 100000000000).toFixed(0) + '.jpg';
  var size = '1024x768';

  var to_exec = './bin/phantomjs/bin/phantomjs rasterize.js '+ url +' '+ path + ' ' + size;
  //var to_exec = 'phantomjs rasterize.js '+ url +' '+ path + ' ' + size;

  exec(to_exec, function (error, stdout, stderr) {
    if(error) {
      response.send(error + " <br />params: " + request.params + '<br />' + to_exec);
    }
    else response.sendfile(path);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});