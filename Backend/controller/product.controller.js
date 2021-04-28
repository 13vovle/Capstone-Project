const { rmSync } = require("fs");
const productModel = require("../model/product.model.js");
const reqModel = require("../model/request.model.js");
const validator = require('./validators')

let getAllProductDetails = (req,res) =>{
    productModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}
 let productReqDetails = (req, res) => {
    let request = new reqModel({
        hashedPassword: req.body.pass,
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        isAdmin: false
    });

    req.save((err, result) => {
        if (!err) {
            res.send("Request sent successfully " + result);
        } else {
            res.send("Request not sent " + err);
        }
    });
};


let getProductById = async (id)=>{
    if(!validator.isNonEmptyString(id)) throw 'Can not get product with invalid Id!'
    const product = await productModel.findById(id).exec();
    if (!product) throw `There is no product with that ID: ${id}`;
    return product
}

let updateQuantity = (req, res) =>{
    let i = req.body._id;
    let n = req.params.num;
    productModel.updateOne({_id: i}, {$inc: {quantity: n}}, (err, result)=>{
        if(!err) res.send("store quantity updated");
        else res.send("could not be updated");
    });
}
module.exports = {getAllProductDetails, getProductById,productReqDetails, updateQuantity};
