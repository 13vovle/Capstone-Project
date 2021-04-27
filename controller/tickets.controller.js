const { static } = require("express");
const ticketModel = require("../model/tickets.model.js");
let TicketModel = require("../model/tickets.model.js");

let id = 0;
let addTicket = (req, res) =>{
    let ticket = new TicketModel({
        _id: id++,
        userId: req.body._id, 
        description:"Too many unnsuccessful attempts to login.",
        isLockedOut:true
    });

    ticket.save((err, result)=>{
        if(!err) res.send("A ticket was created.");
        else res.send("Ticket not created: " + err);
    });
}
module.exports={addTicket}