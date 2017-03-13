var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var connectionString = 'postgres://postgres:Thanks2016@localhost:5432/postgres';
var client = new pg.Client(connectionString);

var config = {
  user: 'postgres',
  database: 'postgres',
  password: 'Thanks2016',
  host: 'localhost',
  port: 5432,
  max: 100,
  idleTimeoutMillis: 30000
};


var pool = new pg.Pool(config);

app.use(bodyParser.json({extend: true}));
app.use(express.static(__dirname + '/Public'));

app.get('/lovedones', function(req, res, next) {
  var list = [];

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM lovedones');

    query.on('row', function(row) {
      list.push(row);
    });

    query.on('end', function() {
      console.log(list);
      client.end();
      return res.json(list);
    });
  });
});


app.post('/lovedones-add', function(req, res, next) {
  var list = [];
  var data = {
    name: req.body.name,
    weight: req.body.weight,
    age: req.body.age
  };

  pg.connect(connectionString, function(err, client, done) {

    client.query('INSERT INTO lovedones(name, weight, age) values($1, $2, $3)', [data.name, data.weight, data.age]);

    var query = client.query('SELECT * FROM lovedones');

    query.on('row', function(row) {
      list.push(row);
    });

    query.on('end', function() {
      console.log(list);
      client.end();
      return res.json(list);
    });
  });
});

app.delete('/lovedones-delete/:id', function(req, res, next) {
    var list = [];
    var id = req.params.id;

    pg.connect(connectionString, function(err, client, done) {

      client.query('DELETE FROM lovedones WHERE id=($1)', [id]);

      var query = client.query('SELECT * FROM lovedones');

      query.on('row', function(row) {
        list.push(row);
      });

      query.on('end', function() {
        console.log(list);
        client.end();
        return res.json(list);
      });
    });
});

app.put('/lovedones-edit/:id', function(req, res, next) {
  var list = [];
  var id = req.params.id;
  var data = {
    name: req.body.name,
    weight: req.body.weight,
    age: req.body.age
  };

  pg.connect(connectionString, function(err, client, done) {

    client.query('UPDATE lovedones SET name=($1), weight=($2), age=($3) WHERE id=($4)', [data.name, data.weight, data.age, id]);

    var query = client.query('SELECT * FROM lovedones');

    query.on('row', function(row) {
      list.push(row);
    });

    query.on('end', function() {
      console.log(list);
      client.end();
      return res.json(list);
    });
  });
});

app.get('/meds', function(req, res, next) {
  var medList = [];

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM medicine');

    query.on('row', function(row) {
      medList.push(row);
    });

    query.on('end', function() {
      console.log(medList);
      client.end();
      return res.json(medList);
    });
  });
});





var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('postgreSQL server running at http://localhost:%s', port);
});
