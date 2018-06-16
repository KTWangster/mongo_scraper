// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//var routes = require("./routes");

// Require all models
var db = require("./models");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");
var apiRoutes = require("./routing/apiRoutes");
var htmlRoutes = require("./routing/htmlRoutes");
//var methodOverride = require("method-override");

// Set up promises with mongoose
mongoose.Promise = global.Promise;

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
//app.use(methodOverride("_method"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// Add routes
app.use(apiRoutes);
app.use(htmlRoutes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongo_scraper");

// Show any Mongoose errors
db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

// Show success message once logged
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Start the server
app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});