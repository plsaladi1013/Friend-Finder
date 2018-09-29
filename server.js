var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var friends = require("./app/data/friends.js");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require(__dirname+"/app/routing/apiRoutes.js")(app);
require(__dirname+"/app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

