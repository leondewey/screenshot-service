express = require("express")
util = require("util")
exec = require("child_process").exec
app = express.createServer(express.logger())

v = require('validator').Validator
validator = new v()
validator.error = (msg) -> false

app.get '/', (request, response) ->
  screenshot = new Screenshot request.query.url, request.query.size
  screenshot.generate
    success: (path) -> response.sendfile path
    error: (message) -> response.send message


#Start server
port = process.env.PORT || 5000
app.listen port, -> console.log "Listening on #{port}"


class Screenshot

  constructor: (url, size) ->
    @url = require('url').parse(url).href
    @size = size || "1024x600"

  generate: (opts) ->
    return opts.error 'Invalid URL' unless validator.check(@url).isUrl()

    path = "./tmp/#{new Number(Math.random() * 10000000000000).toFixed(0)}.jpg"
    to_exec = if process.env.PORT then "./bin/phantomjs/bin/phantomjs" else "phantomjs"
    to_exec = "phantomjs"
    to_exec = "#{to_exec} rasterize.js #{@url} #{path} #{@size}"
    exec to_exec, (error, stdout, stderr) =>
      if error then opts.error stderr else opts.success path