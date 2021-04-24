let UserModel = require("../model/user.model.js");

let getAllUserDetails = (req,res) =>{
    UserModel.find({}, (err, result) =>{
        if(!err){ res.json(result); }
    })
}

let storeUserDetails = (req,res) =>{
    let user = new UserModel({
    _id: 0,
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
        if(!err) res.send(user.firstName + "'s information stored successfully");
        else res.send("information not stored");
    })
}
module.exports={getAllUserDetails, storeUserDetails}