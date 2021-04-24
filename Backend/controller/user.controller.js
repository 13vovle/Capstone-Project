const { static } = require("express");
const userModel = require("../model/user.model.js");
let UserModel = require("../model/user.model.js");

let getAllUserDetails = (req,res) =>{
    UserModel.find({}, (err, result) =>{
        if(!err){ res.json(result); }
    });
}

let id = 0;
let storeUserDetails = (req,res) =>{
    let user = new UserModel({
    _id: id,
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

    user.save((err,result)=>{
        if(!err){
            res.send(user.firstName + "'s information stored successfully");
            id++;
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
                // display the number of attempts made/remaining
                UserModel.find({_id: id}, {numberOfTries:1, _id:0}, (err2, data)=>{
                    if(!err2) res.send((5 - data[0].numberOfTries) + " attempts remaing.");
                    else res.send("error")
                }); 
            }
            else res.send("did not update numberOfTries.");
        }
        else res.send("Error generated: ");
    })
}


module.exports={getAllUserDetails, storeUserDetails, incrementNumOfTries}