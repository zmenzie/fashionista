var ProductModel = require("../models/product.model");

// Retrieve Product Details from Db

var GetProductFromDb = (req, res) => {
    ProductModel.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
}

var GetProductById = (req, res) => {
    var idInfo = req.params.id;
    console.log(req.params);
    console.log("product.controller.js: ID = " + idInfo);
    ProductModel.find({ _id: idInfo }, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
}

var StoreProductInfo = (req, res) => {
    console.log(req.body.id);
    console.log(req.body.name);
    let product = new ProductModel({
        _id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        photo: req.body.photo
    });

    product.save((err, result) => {
        if (err) {
            res.json({ "msg": "Id must be unique" });
        }
        else {
            res.json({ "msg": "Product stored successfully" });
        }
    });

}

var UpdateProductInfo = (req, res) => {
    var updateId = req.body._id;
    var updateName = req.body.name;

    ProductModel.update({ _id: updateId }, { $set: { name: updateName } }, (err, result) => {
        if (err) res.json({"msg":"Invalid data"});
        if (result.nModified>0) {
            res.json({"msg":"Record updated successfully"});
        }
        else {
            res.json({"msg":"Record failed to update"});
        }
    });

}

var DeleteProductInfo = (req, res) => {
    var deleteId = req.params.id;
    if (deleteId == null) {
        res.json({ "msg": "Please enter Id" });
    }
    else {
        ProductModel.deleteOne({ _id: deleteId }, (err, result) => {
            if (err) res.json({ "msg": "Please enter a valid Id" });
            if (result.deletedCount > 0) {
                res.json({ "msg": "Record deleted successfully" });
            }
            else {
                res.json({ "msg": "Record does not exist" });
            }
        })
    }
}


module.exports = {
    GetProductFromDb,
    GetProductById,
    StoreProductInfo,
    UpdateProductInfo,
    DeleteProductInfo
};










