var CompanyModel = require("../models/company.model");

// Retrieve Company Details from Db

var GetCompanyFromDb = (req, res) => {
    CompanyModel.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
}

var GetCompanyById = (req, res) => {
    var idInfo = req.params.id;
    CompanyModel.find({ _id: idInfo }, (err, data) => {
        if (err) throw err;
        res.json(data);
    })
}

var StoreCompanyInfo = (req, res) => {
    console.log(req.body.id);
    console.log(req.body.name);
    let company = new CompanyModel({
        _id: req.body.id,
        name: req.body.name
    });

    company.save((err, result) => {
        if (err) {
            res.json({ "msg": "Id must be unique" });
        }
        else {
            res.json({ "msg": "Company stored successfully" });
        }
    });

}

var UpdateCompanyInfo = (req, res) => {
    var updateId = req.body._id;
    var updateName = req.body.name;

    CompanyModel.update({ _id: updateId }, { $set: { name: updateName } }, (err, result) => {
        if (err) res.json({"msg":"Invalid data"});
        if (result.nModified>0) {
            res.json({"msg":"Record updated successfully"});
        }
        else {
            res.json({"msg":"Record failed to update"});
        }
    });

}

var DeleteCompanyInfo = (req, res) => {
    var deleteId = req.params.id;
    if (deleteId == null) {
        res.json({ "msg": "Please enter Id" });
    }
    else {
        CompanyModel.deleteOne({ _id: deleteId }, (err, result) => {
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
    GetCompanyFromDb,
    GetCompanyById,
    StoreCompanyInfo,
    UpdateCompanyInfo,
    DeleteCompanyInfo
};










