var mongoose = require("mongoose");
mongoose.pluralize(null);       // avoids post fix for collection

var CompanySchema = mongoose.Schema;

var CompanySchemaRef = new CompanySchema({
    _id:String,
    name:String,
});

var CompanyModel = mongoose.model("Company",CompanySchemaRef);
module.exports = CompanyModel; // export for controller access











