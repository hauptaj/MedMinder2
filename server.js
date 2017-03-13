var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');


app.use(bodyParser.json({extend: true}));
app.use(express.static(__dirname + '/Public'));














var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('postgreSQL server running at http://localhost:%s', port)
});
