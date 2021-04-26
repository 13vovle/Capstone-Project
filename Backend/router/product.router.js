let express = require("express");
const productController = require("../controller/product.controller");
let router = express.Router();

router.get("/getAllProductsDetails", productController.getAllProductDetails);

module.exports = router;