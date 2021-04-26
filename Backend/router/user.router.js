let express = require("express");
let router = express.Router();
let UserController = require("../controller/user.controller.js");

router.get("/getAllUserDetails", UserController.getAllUserDetails);
router.post("/storeUserDetails", UserController.storeUserDetails);
router.put("/incrementNumOfTries", UserController.incrementNumOfTries);
router.put("/lockUserOut", UserController.lockUserOut);
router.put("/reset", UserController.resetNumOfTries);

module.exports = router;