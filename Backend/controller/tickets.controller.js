const { static } = require("express");
let mongoose = require('mongoose');
const { db } = require("../model/tickets.model.js");
const ticketModel = require("../model/tickets.model.js");
let TicketModel = require("../model/tickets.model.js");

let id = 0;
let addTicket = (req, res) =>{
    let ticket = new TicketModel({
        userId: req.body._id, 
        description:"Too many unnsuccessful attempts to login.",
        isLockedOut:true
    });

    ticket.save((err, result)=>{
        if(!err) res.send("A ticket was created.");
        else res.send("Ticket not created: " + err);
    });
}

let getTickets = (req,res) =>{
    TicketModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}

let updateTicket = (req, res) => {
    let tid = req.body._id;
        TicketModel.updateOne({ _id: tid},{$set: {isLockedOut : false}}, (err, result) => {
        console.log(result)
        if (!err && result.nModified > 0) {
            res.send("user unlocked successfully")
        } else {
            console.log("user is not unlocked")
            res.send("user is not unlocked ")
        }
    })

}

module.exports={addTicket, getTickets, updateTicket}