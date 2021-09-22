var express = require("express");
var app = express();
require("dotenv").config();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL); 
var schemaDetails = new mongoose.Schema({
    mnumber: String,
    fname: String,
    mail: String,
    gender: String,  
    tId: String
});
var User = mongoose.model("User", schemaDetails);
app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
});
app.post("/details", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Data saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.listen(port, () => {
  console.log("Server listening on port " + port);
});