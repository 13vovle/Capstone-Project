let express = require("express");
let router = express.Router();
let TicketController = require("../controller/tickets.controller.js");

router.post("/createTicket", TicketController.addTicket);

module.exports = router;