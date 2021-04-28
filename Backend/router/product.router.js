let express = require("express");
const productController = require("../controller/product.controller");
let router = express.Router();

router.get("/getAllProductsDetails", productController.getAllProductDetails);
router.post("/sendProductsRequest", productController.productReqDetails);
router.put("/updateQuantity/:num", productController.updateQuantity)

module.exports = router;