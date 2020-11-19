// Run node app.js and ng serve to continue working!

// Load All Modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// npm install cors
var cors = require("cors");
var port = 5000;

// Database URL Details
var url = "mongodb://localhost:27017/mydb";

// Creating reference of express
var app = express();

// Middleware modules setup
app.use(bodyParser.json()); // converting json req data. post method
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());    // enable CORS Features

// Database Connection
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});

// Connect to database
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Declare variables to access router.js files:
var User = require("./src/app/router/user.router");
var Company = require("./src/app/router/company.router");
var Product = require("./src/app/router/product.router");

// Middleware
app.use("/api/users", User)
app.use("/api/companies", Company);
app.use("/api/products", Product);

app.listen(port,()=>console.log(`Server is running on port ${port}`));










