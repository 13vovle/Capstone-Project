const { static } = require("express");
// const userModel = require("../model/user.model.js");
let UserModel = require("../model/user.model.js");
const bcrypt = require('bcrypt');
const validators = require('./validators')

let getAllUserDetails = (req,res) =>{
    UserModel.find({}, (err, result) =>{
        if(!err){ res.json(result); }
    });
}

let getUserDetailById = async(userId)=>{
    if (!validators.isNonEmptyString(userId)) throw 'No User with that id found!';
    try{
        const user = await UserModel.findById(userId).exec();
        return user
    }catch(e){
        console.log(e); 
    }
}

// let id = 0;
let storeUserDetails = async (req,res) =>{
    let user = new UserModel({
    // _id: JSON.stringify(id),
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
    // id ++;
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

let addToCart = (req, res) =>{
    let i = req.params.id;
    console.log(i);
}

let updateProfile = async(id, profile)=>{
    console.log('profile is ', profile)

    if (!validators.isNonEmptyString(id)) throw 'Please provide an user Id';
        const existingProfile = await UserModel.findById(id).exec();
        console.log('existing profile is, ' ,existingProfile)

        addressObj = {
                      street1:existingProfile.address.street1,
                      street2:existingProfile.address.street2,
                      city:existingProfile.address.city,
                      state:existingProfile.address.state,
                      zip:existingProfile.address.zip
                    }
        if (!existingProfile) throw `There is no user with that given ID: ${id}`;
        if (profile.firstName){
            existingProfile.firstName = profile.firstName
        }
        if (profile.lastName){
            existingProfile.lastName = profile.lastName
        }
        if(profile.Phone){
            existingProfile.Phone = profile.Phone
        }
        if(profile.street1){
            addressObj.street1 = profile.street1
            existingProfile.address =  addressObj
        }
        if(profile.street2){
            addressObj.street2 = profile.street2
            existingProfile.address = addressObj
        }
        if(profile.city){
            addressObj.city = profile.city
            existingProfile.address = addressObj
        }
        if(profile.state){
            addressObj.state = profile.state
            existingProfile.address = addressObj
        }
        if(profile.zip){
            addressObj.zip = profile.zip
            existingProfile.address = addressObj
        }
        if(profile.email){
            existingProfile.email = profile.email
        }
        console.log('existing profile after is, ', existingProfile)
        return await saveSafely(existingProfile);
}

async function saveSafely(document) {
    try {
        await document.save();
      return 
    } catch (e) {
      throw e.message;
    }
  }

module.exports={getAllUserDetails, getUserDetailById, storeUserDetails, incrementNumOfTries, lockUserOut, resetNumOfTries, addToCart, updateProfile}