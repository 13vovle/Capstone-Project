const { static } = require("express");
let UserModel = require("../model/user.model.js");
let ProductModel = require("../model/product.model");
let OrderModel = require("../model/order.model");
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
    
    let product = new ProductModel({
        _id: req.body._id,
        name: req.body.name,
        price: req.body.price,
        quantity: 1,
        description: req.body.description

    });
    
    UserModel.updateOne({_id: i}, {$push: {cart: product}}, (err, result)=>{
        if(!err) res.send(product.name + " added to cart!")
        else res.send(roduct.name + " could not be added to cart!")
    });
}
let deleteFromCart = (req, res) =>{
    let i = req.params.id;
    let pid = req.body._id;
    console.log(pid);
    UserModel.updateOne({_id: i}, {$pull: {cart: {$pull: pid}}}, (err, result)=>{
        if(!err){
            if(result.deletedCount >0) res.send("record successfully deleted!")
            else res.send("record could not be deleted!")
        }
        else res.send(err);
    })
}
let updateQuantity = (req, res) =>{
    let i = req.params.id;
    let pid = req.body._id;
    UserModel.updateOne({_id:i, "cart._id": pid}, {$inc: {"cart.$.quantity": 1}}, (err, result) =>{
        if(!err){
            if(result.nModified > 0) res.send("quantity updated!")
            else res.send("quantity could not be updated!")
        }
        else res.send("error generated: " + err);
    });
}
let checkout = (req, res) =>{
    let cost = 0;
    for(let p of cart){
        cost += (p.quantity) * (p.price);
    }
    
    let order = new OrderModel({
        product: req.body,
        userId: req.params.id,
        status: "Getting it together!",
        sellDate: Date.now(),
        total: cost
    });

    
    order.save((err, result)=>{
        if(!err) res.send("Order placed successfully!");
        else res.send("Order could not be placed: " + err);
    });
}

let decreaseFunds = (req, res) =>{
    let id = req.params._id;
    let cart = req.body;
    let cost = 0;
    for(let p of cart)
        cost += (p.quantity) * (p.price);
    UserModel.updateOne({_id: id}, {$inc: {funds: (-1*cost)}});
}

let getOrderStatus = (req, res) =>{
   let id = req.params.cid;
   
   OrderModel.find({userId: id}, {status:1, _id:0}, (err, result) =>{
        if(!err){
            console.log(result);
            res.send(result);}
        else res.send("could not retrieve order status.")
   });
}

let emptyCart = (req, res) =>{
    let i = req.params.id;
    console.log(i);
    UserModel.updateOne({_id: i}, {$set: {cart: []}}, (err, result)=>{
        if(!err) res.send("cart was emptied!")
        else res.send("cart could not be emptied!")
    })
}
let loadUser = (req, res) =>{
    let i = req.params.id;

    UserModel.findOne(
        {_id: i},
        {cart: 1, _id: 0},
        (err, result) =>{
        if(!err) res.json(result);
        else res.send("user could not be loaded!");
    });
}

let updateQuantityN = (req, res) =>{
    let pid = req.body._id;
    let n = req.params.num;

    ProductModel.updateOne({_id: pid}, {$inc: {quantity: n}}, (err, result) =>{
        if(!err) res.send("store quanity was updated by: " + n);
    })
}
let updateProfile = async(id, profile)=>{
    if (!validators.isNonEmptyString(id)) throw 'Please provide an user Id';
        const existingProfile = await UserModel.findById(id).exec();
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
        return await saveSafely(existingProfile);
}

let transferFunds = (req, res) => {
    let id = req.body.id;
    let transfer = req.body.transfer;
    UserModel.updateOne({_id:id}, {$inc:{funds:transfer, "account.amount":-transfer}}, (err, result) => {
        if(!err) res.send("Transfer complete");
        else res.send("Funds not updated");
    });
};

let pushNewCart = (req, res) =>{
    let id = req.params.id;
    let newCart = req.body;

    UserModel.updateOne({_id: id}, {$push: {cart: newCart}}, (err, result) =>{
        if(!err) res.send("new cart has been pushed")
        else res.send("cart was not pushed");
    });
}

async function saveSafely(document) {
    try {
        await document.save();
      return 
    } catch (e) {
      throw e.message;
    }
  }

module.exports={decreaseFunds, getAllUserDetails, getUserDetailById, storeUserDetails, incrementNumOfTries, lockUserOut, resetNumOfTries, addToCart, updateProfile,
                loadUser, deleteFromCart, updateQuantity, checkout, emptyCart, transferFunds, pushNewCart, updateQuantityN, getOrderStatus}



