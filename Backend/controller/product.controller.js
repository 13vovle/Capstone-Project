const productModel = require("../model/product.model.js");

let getAllProductDetails = (req,res) =>{
    productModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}

module.exports = {getAllProductDetails};