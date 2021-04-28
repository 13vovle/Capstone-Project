let express = require("express");
let router = express.Router();
let UserController = require("../controller/user.controller.js");

router.get("/getAllUserDetails", UserController.getAllUserDetails);
router.post("/storeUserDetails", UserController.storeUserDetails);
router.put("/incrementNumOfTries", UserController.incrementNumOfTries);
router.put("/lockUserOut", UserController.lockUserOut);
router.put("/reset", UserController.resetNumOfTries);
router.put("/addToCart/:id", UserController.addToCart);
router.get("/loadUser/:id", UserController.loadUser)
router.put("/delete/:id", UserController.deleteFromCart);
router.post("/checkout/:id", UserController.checkout);
router.put("/emptyCart/:id", UserController.emptyCart);
router.put("/updateQuantity/:id", UserController.updateQuantity);
router.put("/pushNewCart/:id", UserController.pushNewCart);

module.exports = router;