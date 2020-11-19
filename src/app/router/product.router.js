var express = require("express");
var router = express.Router();

var ProductController = require("../controller/product.controller");

router.get("/productFromDb", ProductController.GetProductFromDb);
router.get("/productInfoById/:id", ProductController.GetProductById);


// Use chrome rest client:
// {"_id":104, "pname":"smart phone", "price":1000}
router.post("/addProduct", ProductController.StoreProductInfo);

// db.Product.update({_id:104},{$set:{pname:"smart phone"}})
// {"_id":104, "pname":"smart phone", "price":7777}
router.put("/updateProduct", ProductController.UpdateProductInfo);

// localhost:9090/deleteProductById/100
router.delete("/deleteProductById/:id", ProductController.DeleteProductInfo);

module.exports = router;










