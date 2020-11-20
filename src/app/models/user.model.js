var mongoose = require("mongoose");
mongoose.pluralize(null);       // avoids post fix for collection

var UserSchema = mongoose.Schema;

var UserSchemaRef = new UserSchema({
    _id:String,
    username:String,
    email:String,
    password:String
});

var UserModel = mongoose.model("User",UserSchemaRef);
module.exports = UserModel; // export for controller access











