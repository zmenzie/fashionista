var express = require("express");
var router = express.Router();

var UserController = require("../controller/user.controller");

router.get("/userFromDb", UserController.GetUserFromDb);
router.get("/userInfoByUsername/:username", UserController.GetUserByUsername);

// Use chrome rest client:
// {"_id":104, "username":"asdf", "email":"asdf@asdf.com", "password": "asdf"}
// router.post("/storeUser", UserController.StoreUserInfo);
router.post("/login", UserController.LoginUser);
router.post("/register", UserController.StoreUserInfo);


// db.User.update({_id:104},{$set:{pname:"smart phone"}})
// {"_id":104, "pname":"smart phone", "price":7777}
router.put("/updateUser", UserController.UpdateUserInfo);

// localhost:5000/users/deleteUserById/100
router.delete("/deleteUserById/:id", UserController.DeleteUserInfo);

module.exports = router;










