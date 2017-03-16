var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var password = require('./password.js');
var connectionString = 'postgres://frytujbxbeiurr:' + password + '@ec2-54-83-25-217.compute-1.amazonaws.com:5432/dftsp1o7v96h4p?ssl=true';
var client = new pg.Client(connectionString);

var config = {
  user: 'frytujbxbeiurr',
  database: 'dftsp1o7v96h4p',
  password: password,
  host: 'ec2-54-83-25-217.compute-1.amazonaws.com',
  port: 5432,
  max: 100,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

app.use(bodyParser.json({extend: true}));
app.use(express.static(__dirname + '/Public'));

//This function is how the server handles a GET request from /lovedones view
app.get('/lovedones', function(req, res, next) {
  var list = [];

//This function is querying the data from the lovedones database the pushing to the "list" variable
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

//This function is how the server deals with a post request for new loved ones
app.post('/lovedones-add', function(req, res, next) {
  var list = [];
  var data = {
    name: req.body.name,
    weight: req.body.weight,
    age: req.body.age
  };

//connect with database
  pg.connect(connectionString, function(err, client, done) {
//insert into the table
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

//This function is how the server deals with a delete request for a loved one
app.delete('/lovedones-delete/:id', function(req, res, next) {
    var list = [];
    var id = req.params.id;

//connect with database
    pg.connect(connectionString, function(err, client, done) {
      //DELETE from the table at specific Id
      client.query('DELETE FROM medicine WHERE personid=($1)',[id]);
      client.query('DELETE FROM lovedones WHERE personid=($1)', [id]);

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

//This function is how the server deals with a put request for a loved one
app.put('/lovedones-edit/:id', function(req, res, next) {
  var list = [];
  var id = req.params.id;
  var data = {
    name: req.body.name,
    weight: req.body.weight,
    age: req.body.age
  };

  pg.connect(connectionString, function(err, client, done) {

    client.query('UPDATE lovedones SET name=($1), weight=($2), age=($3) WHERE personid=($4)', [data.name, data.weight, data.age, id]);

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


app.get('/meds/:personid', function(req, res, next) {
  var medList = [];
  var personid = req.query.personid;
  console.log(personid);
  // var data = {
  //   personid: req.query.personid
  // };

  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [personid]);

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

app.post('/meds-add', function(req, res, next) {
  var medList = [];
  data = {
    name: req.body.name,
    dosage: req.body.dosage,
    time: req.body.time,
    rxnumber: req.body.rxnumber,
    personid: req.body.personid
  }
  console.log(data);

  pg.connect(connectionString, function(err, client, done) {
    client.query('INSERT INTO medicine(name, dosage, time, rxnumber, personid) values($1, $2, $3, $4, $5)', [data.name, data.dosage, data.time, data.rxnumber, data.personid]);
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [data.personid]);

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

app.delete('/meds-delete/:id/:personid', function(req, res, next) {
  var medList = [];
  var id = req.params.id;
  var personid = req.params.personid;

  pg.connect(connectionString, function(err, client, done) {
    client.query('DELETE FROM medicine WHERE id=($1)', [id]);
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [personid]);

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

app.put('/meds-update/:id', function(req, res, next) {
  var medList = [];
  var id = req.params.id;
  var data = {
    name: req.body.name,
    dosage: req.body.dosage,
    time: req.body.time,
    rxnumber: req.body.rxnumber,
    personid: req.body.personid
  };

  pg.connect(connectionString, function(err, client, done) {
    client.query('UPDATE medicine SET name=($1), dosage=($2), time=($3), rxnumber=($4) WHERE id=($5)', [data.name, data.dosage, data.time, data.rxnumber, id]);
    var query = client.query('SELECT * FROM medicine WHERE personid=($1)', [data.personid]);

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


app.put('/rx-add', function(req, res, next) {
  var medList = [];

  var data = {
    name: req.body.name,
    rxnumber: req.body.rxnumber
  };

  pg.connect(connectionString, function(err, client, done) {
    client.query('UPDATE medicine SET rxnumber=($1) WHERE name=($2)', [data.rxnumber, data.name]);
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
