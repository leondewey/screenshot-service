var page = require('webpage').create()
  , url = phantom.args[0]
  , size = phantom.args[1] || '';

if (!url) throw new Error('url required');

size = size.split('x');

page.viewportSize = {
    width: ~~size[0] || 1024
  , height: ~~size[1] || 600
};

page.open(url, function (status) {

  if (status == 'success') {
    path = './tmp/temp.jpg';

    page.render(path);
    console.log(path);

    phantom.exit();
  } else {
    throw new Error('failed to load ' + url);
  }
});

// phantomjs rasterize.js http://www.google.com 200x200