//Initialize rethinkdbdash as `r`
var r = require("rethinkdbdash")();

//Initialize your database
require("rethink-config")({
  "r": r,
  "database": "superheroes",
  "tables": ["heroes", "villain"]
})

//Initialize express server
var express = require("express");
var server = express();

//Serve all content in the public folder
server.use(express.static("./public"));

//Add body parser to parse JSON and HTML forms
var bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//Send a hero to the server
server.post("/hero", function(req,res) {
  //Grab the body of the request (req)
  var hero = req.body.hero;
  var powers = req.body.powers;
  //Select the DB and table then insert the hero into it.
  r.db("superheroes").table("heroes").insert({
    "hero": hero,
    "powers": powers
  }).then(function() {
    //Return a confirmation message that the hero was added.
    return res.send("Super hero added!");
  })
});

//Grab all the heroes from the server
server.get("/hero", function(req,res) {
  //Select the DB and table, this automatically gets the full list of heroes
  r.db("superheroes").table("heroes").then(function(result) {
    //Send back the result which the array and objects of heroes.
    return res.send(result);
  })
})

//////////////////////////////////////////////////////////////////////////////

server.post("/villain", function(req,res) {
  //Grab the body of the request (req)
  var villain = req.body.villain;
  var powers = req.body.powers;
  //Select the DB and table then insert the hero into it.
  r.db("superheroes").table("villain").insert({
    "villain": villain,
    "powers": powers
  }).then(function() {
    //Return a confirmation message that the hero was added.
    return res.send("Villain added!");
  })
});

server.get("/villain", function(req,res) {
  //Select the DB and table, this automatically gets the full list of heroes
  r.db("superheroes").table("villain").then(function(result) {
    //Send back the result which the array and objects of heroes.
    return res.send(result);
  })
})

////////////////////////////////////////////////////////////////////////////////

//Listen to the server on PORT 3000.
server.listen(3000);
console.log("Super hero app running on port 3000");
/*
You'll want to install POSTMAN and start sending requests to the server.
You'll want to send a POST to http://localhost:3000/hero to send a hero
You'll want to send a GET to http://localhost:3000/hero to get all the heroes

You need to make sure you run the app with `node server.js` first.
*/
