var UserModel = require("../models/user.model");

// Retrieve User Details from Database

var GetUserFromDb = (req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);

    })
}

// Compare input data to database
var LoginUser = (req, res) => {
    var userInfo = req.body.email;
    UserModel.find({ email: userInfo }, (err, data) => {
        if (err) {
            console.log('ERROR: LoginUser()');
            throw err;
        }
        else {
            console.log("Input: " + req.body.email);
            console.log("Type: " + typeof data);
            console.log("Email: " + data[0].email);
            console.log('-------------------------');
            res.json(data)

            // CONTINUE HERE TO HANDLE TOKEN AUTHENTICATION

        }
    })
}

var GetUserByUsername = (req, res) => {
    var userInfo = req.params.username;
    UserModel.find({ username: userInfo }, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(data);
    })
}

var StoreUserInfo = (req, res) => {
    // console.log(req.body.username);
    // console.log(req.body.email);
    // console.log(req.body.password);

    let user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, result) => {
        if (err) {
            res.json({ "msg": "Id must be unique" });
        }
        else {
            res.json({ "msg": "User stored successfully" });
        }
    });

}

var UpdateUserInfo = (req, res) => {
    var updateId = req.body._id;
    var updateUsername = req.body.username;
    var updateEmail = req.body.email;
    var updatePassword = req.body.password;

    UserModel.update({ _id: updateId }, { $set: { username: updateUsername, email: updateEmail, password: updatePassword } }, (err, result) => {
        if (err) res.json({ "msg": "Invalid data" });
        if (result.nModified > 0) {
            res.json({ "msg": "User updated successfully" });
        }
        else {
            res.json({ "msg": "User failed to update" });
        }
    });

}

var DeleteUserInfo = (req, res) => {
    var deleteId = req.params.id;
    if (deleteId == null) {
        res.json({ "msg": "Please enter Id" });
    }
    else {
        UserModel.deleteOne({ _id: deleteId }, (err, result) => {
            if (err) res.json({ "msg": "Please enter a valid Id" });
            if (result.deletedCount > 0) {
                res.json({ "msg": "User deleted successfully" });
            }
            else {
                res.json({ "msg": "User does not exist" });
            }
        })
    }
}


module.exports = {
    GetUserFromDb,
    GetUserByUsername,
    StoreUserInfo,
    UpdateUserInfo,
    DeleteUserInfo,
    LoginUser
};










