var mongoose = require("mongoose");
mongoose.pluralize(null);       // avoids post fix for collection

var ProductSchema = mongoose.Schema;

var ProductSchemaRef = new ProductSchema({
    _id:String,
    name:String,
    price:String,
    photo:String
});

var ProductModel = mongoose.model("Product",ProductSchemaRef);
module.exports = ProductModel; // export for controller access











