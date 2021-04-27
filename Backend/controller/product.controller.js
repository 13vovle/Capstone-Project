const productModel = require("../model/product.model.js");
const validator = require('./validators')

let getAllProductDetails = (req,res) =>{
    productModel.find({},(err, result) =>{
        if(!err)res.json(result);
    });
}

let getProductById = async (id)=>{
    if(!validator.isNonEmptyString(id)) throw 'Can not get product with invalid Id!'
    const product = await productModel.findById(id).exec();
    if (!product) throw `There is no product with that ID: ${id}`;
    return product
}


module.exports = {getAllProductDetails, getProductById};