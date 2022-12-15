// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://185.86.180.173:27017/puzhledb', //'mongodb://puzhledbuser:chch726726@185.86.180.173:27017/puzhledb',
  cloud: __dirname + '/cloud/main.js',
  appId: 'eeHlybxAQT1qA90RhUpxmuodb9pSSoDanwRF9SSA',
  masterKey: 'w723ovkNXH50PZevpH8e7ICKd70YEHqNrp6Ll6RQ',
  clientKey: '43zYlAQ5MNuD2CeVVzUPkMvW4J3PCDvjODPFz3u4',
  javascriptKey: 'EJ578GFF7bwQSzqusNdX1QRBfwRU2az5H7r3xA2B',
  restAPIKey: 'vwmWdiIdvtcsC78p40avTpH5MgGjyKrmYMjBFPeC',
  dotNetKey: 'UOoelCtzbtpspsGZohJSbCypAzlLUQbTSJBgdfCP',
  fileKey: '665892bb-e0d7-4b81-87e7-e869619ed1b8'
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/puzhle';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 80;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
