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
        productName: req.body.productName,
        productId : req.body.productId,
        quantity: req.body.quantity,
        
    });

    request.save((err, result) => {
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


module.exports = {getAllProductDetails, getProductById, productReqDetails};
