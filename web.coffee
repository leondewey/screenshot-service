express = require("express")
util = require("util")
exec = require("child_process").exec
app = express.createServer(express.logger())

app.get "/", (request, response) ->
  response.send "Try: <a href=\"/key/12356789/http://codeascraft.etsy.com/2011/06/06/optimizing-for-developer-happiness\">/key/12356789/http://codeascraft.etsy.com/2011/06/06/optimizing-for-developer-happiness</a>"

app.get /key\/(.*)\/(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/, (request, response) ->

  key = request.params[0]
  url = require('url').parse(request.params[1]).href
  path = "./tmp/#{new Number(Math.random() * 10000000000000).toFixed(0)}.jpg"

  #to_exec = "phantomjs rasterize.js #{url} #{path}"
  to_exec = "./bin/phantomjs/bin/phantomjs rasterize.js #{url} #{path}"

  exec to_exec, (error, stdout, stderr) ->
    if error then response.send stderr else response.sendfile path

#Start server
port = process.env.PORT or 3000
app.listen port, ->
  console.log "Listening on " + port

# http://stormy-rain-7874.herokuapp.com/key/12356789/http://codeascraft.etsy.com/2011/06/06/optimizing-for-developer-happiness