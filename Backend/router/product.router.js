let express = require("express");
const productController = require("../controller/product.controller");
let router = express.Router();

router.get("/getAllProductsDetails", productController.getAllProductDetails);
router.post("/sendProductsRequest", productController.productReqDetails);

module.exports = router;