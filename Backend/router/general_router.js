let express = require("express");
let router = express.Router();
let UserController = require("../controller/user.controller.js");

router.get("/getAllUserDetails", UserController.getAllUserDetails);
router.post("/storeUserDetails", UserController.storeUserDetails);
router.put("/incrementNumOfTries", UserController.incrementNumOfTries);
module.exports = router;