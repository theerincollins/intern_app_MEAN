var express = require('express');
var app = express();    //creat a new instance of express
var bodyParser = require('body-parser');

var mongojs = require('mongojs');
var db = mongojs('brew_pdx', ['brew_pdx']);

//finds the files in the public folder to user
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/breweries", function(request, response) {
  console.log("Node is werkin")
  db.brew_pdx.find(function(err, breweries) {
    console.log(breweries)
    response.json(breweries);
  });
});

app.get("/breweries/:id", function(request, response) {
  var brew_id = request.params.id;
  console.log(brew_id + "coming from app.get");
  db.brew_pdx.findOne({_id: mongojs.ObjectId(brew_id)}, function(err, brewery) {
    response.json(brewery)
  });
});

app.post('/breweries', function(request, response) {
  db.brew_pdx.insert(request.body, function(err, doc) {
    response.json(doc);
  });
});

app.delete('/breweries/:id', function(request, response) {
  var brew_id = request.params.id;
  db.brew_pdx.remove({_id: mongojs.ObjectId(brew_id)}, function(err, brewery) {
    response.json(brewery)
  });
});

app.put('/breweries/:id', function(request, response) {
  var brew_id = request.params.id;
  console.log(request.body.name);
  db.brew_pdx.findAndModify({
    query: {_id: mongojs.ObjectId(brew_id)},
    update: {$set: {name: request.body.name, location: request.body.location, rating: request.body.rating}},
    new: true}, function(err, doc) {
      response.json(doc);
  });
});

module.export = app;
//Start the server on port 3000
app.listen(3000);
console.log("Server is running on port 3000");
