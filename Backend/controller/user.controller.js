const { static } = require("express");
const userModel = require("../model/user.model.js");
let UserModel = require("../model/user.model.js");
const bcrypt = require('bcrypt');

let getAllUserDetails = (req,res) =>{
    UserModel.find({}, (err, result) =>{
        if(!err){ res.json(result); }
    });
}

let id = 0;
let storeUserDetails = async (req,res) =>{
    let user = new UserModel({
    _id: id++,
    firstName:  req.body.fname,
    lastName:   req.body.lname,
    birthday:   req.body.dob,
    Phone:      req.body.phone,
    address:    req.body.address,
    email:      req.body.email,
    hashedPassword:req.body.password,
    funds: 0,
    cart:       [],
    orders:     [],
    isLockedOut: false,
    numberOfTries:0 
    });

    user.hashedPassword = await bcrypt.hash(user.hashedPassword, 10);

    const userOne = await user.save((err,result)=>{
        if(!err){
            res.send(user.firstName + "'s information stored successfully");
        } 
        else res.send("information not stored: " + err);
    });

}

let n = 0;
let incrementNumOfTries = (req, res) =>{
    let id = req.body._id;
    UserModel.updateOne({_id: id}, {$inc: {numberOfTries: 1}}, (err1, result) =>{
        if(!err1){
            if(result.nModified > 0){
                UserModel.find({_id: id}, {numberOfTries:1, _id:0}, (err2, data)=>{
                    if(!err2) {
                        res.send((5 - data[0].numberOfTries) + " attempts remaining.");
                    }
                    else res.send("Error generated: " + err2)
                }); 
            }
            else res.send("Could not update number of tries.");
        }
        else res.send("Error generated: " + err1);
    })
}

let resetNumOfTries = (req, res) =>{
    let id = req.body._id;
    UserModel.updateOne({_id: id}, {$set: {numberOfTries: 0}}, (err, result) =>{
        if(!err) res.send("Number of attempts is reset to 0");
        else res.send("Could not reset user's count.")
    });
}

let lockUserOut = (req, res)=>{
    let id = req.body._id;
    UserModel.updateOne({_id: id}, {$set: {isLockedOut: true, numberOfTries:0}}, (err, result) =>{
        if(!err) res.send("You have been locked from the system. A ticket has been automatically raised. Please contact a store associate to resolve this ticket.");
        else res.send("Could not lock user out.")
    });
}
module.exports={getAllUserDetails, storeUserDetails, incrementNumOfTries, lockUserOut, resetNumOfTries}