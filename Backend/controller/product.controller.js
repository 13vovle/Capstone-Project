const productModel = require("../model/product.model.js");

let getAllProductDetails = (req,res) =>{
    productModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}

let addProduct = (req, res) =>{
    
    let product = new productModel({
        _id: req.body.pid,
        name: req.body.name,
        price: req.body.p,
        quantity: req.body.q,
        description: req.body.desc
    });

    product.save((err, result) =>{
        if(!err) res.send("Product successfully stored.");
        else res.send("Product could not be stored.");
    });
}
module.exports = {getAllProductDetails, addProduct};