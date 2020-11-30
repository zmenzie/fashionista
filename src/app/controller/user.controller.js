var UserModel = require("../models/user.model");
const jwt = require("jwt-simple");

// replaced config.jwtSecret
const secret = 'secret'


// Retrieve User Details from Database

var GetUserFromDb = (req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);

    })
}

// Compare input data to database
var LoginUser = (req, res) => {
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    UserModel.find({ email: userEmail }, (err, user) => {
        if (err) {
            console.log('ERROR: Invalid user');
            throw err;
        }
        else {
            console.log("Input: " + req.body.email);
            console.log("Type: " + typeof user);
            console.log("Data: " + user);
            console.log("Email: " + user[0].email);
            console.log('-------------------------');

            if (userPassword != user[0].password) {
                console.log('ERROR: Invalid password');

            }
            else {
                const token = jwt.encode({ _id: user[0]._id }, secret);
                console.log("Login Token: " + token);
                var decoded = jwt.decode(token, secret);
                console.log("Decoded: " + JSON.stringify(decoded));
                return res.send({ user, token });
                // return res.send(token);
            }
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
        _id: req.body._id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, result) => {
        console.log("Registered!");
        if (err) {
            res.json({ "msg": "Id must be unique" });
        }
        else {
            const token = jwt.encode({ _id: user._id }, secret);
            console.log("Register Token: " + token);
            var decoded = jwt.decode(token, secret);
            console.log("Decoded: " + JSON.stringify(decoded));
            return res.send({ user, token });
            // return res.send(token);
        }
    });

}

var UpdateUserInfo = (req, res) => {
    var updateId = req.body._id;
    var updateUsername = req.body.username;
    var updateEmail = req.body.email;
    var updatePassword = req.body.password;

    console.log("req.body: " + JSON.stringify(req.body));
    console.log("ID: " + JSON.stringify(updateId));
    console.log("Username: " + JSON.stringify(updateUsername));
    console.log("Email: " + JSON.stringify(updateEmail));
    console.log("Password: " + JSON.stringify(updatePassword));

    UserModel.update({ _id: updateId }, { $set: { username: updateUsername, email: updateEmail, password: updatePassword } }, (err, result) => {
        if (err) res.json({ "msg": "Invalid data" });
        if (result.nModified > 0) {
            console.log("success")
            res.json({ "msg": "User updated successfully" });
        }
        else {
            console.log("fail")
            res.json({ "msg": "User failed to update" });
        }
    });

}

var DeleteUserInfo = (req, res) => {
    var deleteId = req.params._id;
    console.log(req.params);
    console.log(deleteId);
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










