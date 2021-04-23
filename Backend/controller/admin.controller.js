const models = require('../model');
const validators = require('./validators')

module.exports = {
    async createAdmin(admin){
        if(!validators.isLettersOnly(admin.firstName))
        throw 'First name must be provided and contains only letters'
        if(!validators.isLettersOnly(admin.lastName))
        throw 'Last name must be provided and contains only letters'
        if (!validators.isValidEmail(admin.email)) 
        throw 'Email is not valid';
        if (!validators.isNonEmptyString(admin.hashedPassword))
        throw 'Please provide a password';
        const newAdmin = new models.Employee(admin);
        const createdAdmin = await saveSafely(newAdmin);
        return createdAdmin; 
    },
    async addProduct(product){
        if(!validators.isNonEmptyString(product.name)) throw 'You must provid a product name'
        if(!validators.isPositiveNumber(product.price)) throw 'You must provid a positive product price'
        if(!validators.isPositiveNumber(product.quantity)) throw 'You must provid a positive product quantity'
        if(!validators.isNonEmptyString(product.description)) throw 'You must provid a product description'
        const newProduct = new models.Product({
            name: product.name,
            price:product.price,
            quantity:product.quantity,
            description:product.description
        });
        const createdProduct = await saveSafely(newProduct);
        return createdProduct; 
    },  
    async updateProduct(id, product){

    }, 
    async deleteProduct(id){

    }, 
    async viewRequests(){
        return await models.Request.find({}).exec();
    }, 



};

async function saveSafely(document) {
    try {
      return await document.save();
    } catch (e) {
      throw e.message;
    }
  }