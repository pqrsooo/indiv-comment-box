var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// GraphQL Client
var Lokka = require('lokka').Lokka;
var Transport = require('lokka-transport-http').Transport;

const headers = {
  'Accept': 'application/json'
};
const client = new Lokka({
  transport: new Transport('http://54.183.27.114:8080', {
    headers
  })
});

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (8080));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/comments', function(req, res) {
  client.query(`
    {
      comments {
        id,
        author,
        text
      }
    }
  `).then((query) => {
    res.json(query.comments);
    console.log(query.comments);
  });
});

app.post('/api/comments', function(req, res) {
  client.mutate(`{
    newComment: add(
      author: "${req.body.author}",
      text: "${req.body.text}"
    ) {
      id,
      author,
      text,
    }
  }`).then(mutation => {
    console.log(mutation.newComment);
    res.json(mutation.newComment);
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
