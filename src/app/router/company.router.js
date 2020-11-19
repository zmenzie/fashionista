var express = require("express");
var router = express.Router();

var CompanyController = require("../controller/company.controller");

router.get("/companyFromDb", CompanyController.GetCompanyFromDb);
router.get("/companyInfoById/:id", CompanyController.GetCompanyById);


// Use chrome rest client:
// {"_id":104, "pname":"smart phone", "price":1000}
router.post("/addCompany", CompanyController.StoreCompanyInfo);

// db.Company.update({_id:104},{$set:{pname:"smart phone"}})
// {"_id":104, "pname":"smart phone", "price":7777}
router.put("/updateCompany", CompanyController.UpdateCompanyInfo);

// localhost:9090/deleteCompanyById/100
router.delete("/deleteCompanyById/:id", CompanyController.DeleteCompanyInfo);

module.exports = router;










