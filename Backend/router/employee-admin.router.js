let express = require("express");
let router = express.Router();
const employeeController = require("../controller/employee.controller");
const controller = require('../controller');
const adminData = controller.Admin;
const validatorData = controller.Validators;
const bcrypt = require('bcrypt');


router.get("/getAllEmpDetails", employeeController.getAllEmpDetails);
router.post("/addEmployee", employeeController.addEmployee);
router.delete("/deleteEmployeeByID/:empID", employeeController.deleteEmployeeByID);
router.put("/updateEmpDetails",employeeController.updateEmployee);
router.get("/getEmpByID/:ID", employeeController.getEmpByID);

router.get('/create', async(req,res)=>{
    const hashedPassword = await bcrypt.hash('12345', 10);
    let adminA = {
        firstName: 'Jack',
        lastName:'Yang',
        email : 'jackyyjyang@gmail.com',
        hashedPassword: hashedPassword,
        isAdmin:true
    }

    try{
        const adminOne = await adminData.createAdmin(admin1);
    }catch(err){
        res.status(400).send(err)
    }
    let admin2 = {

        firstName: 'Jacob',
        lastName:'Taylor',
        email : 'jacobtaylor3197@gmail.com',
        hashedPassword: hashedPassword,
        isAdmin:true
    }
    try{
        const adminTwo = await adminData.createAdmin(admin2);
    }catch(err){
        res.status(400).send(err)
    }
    // email == 'anku127@gmail.com' || email == 'chanukya.cheekati@gmail.com' || email == 'rahulkrishkampati@gmail.com'
    res.send('Admins successfully created!')
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!validatorData.isNonEmptyString(email)) throw 'Must provide email to login as admin'
    if(!validatorData.isNonEmptyString(password)) throw 'Must provide password to login as admin'
    try{
        const admin = await adminData.getAdminByEmail(email.toLowerCase());  
        if (admin && (await bcrypt.compare(password, admin.hashedPassword))){
            //req.session.user = {_id: admin._id, email:admin.email, firstName: admin.firstName, lastName: admin.lastName}
            //res.redirect('/emp');
            res.send('Admin Login successul!')
        }else{
            res.status(400).send('Admin login failed!')
        }
    }catch(e){
        res.status(400).send(e)
    }  
});

router.post('/addProduct', async(req,res)=>{
    const {name, price, quantity, description } = req.body
    if(!validatorData.isNonEmptyString(name)) throw 'Product name must be non-empty string!'
    if(!validatorData.isPositiveNumber(price)) throw 'Product price must be a positive number!'
    if(!validatorData.isPositiveNumber(quantity)) throw 'Product quantity must be a positive number!'
    if(!validatorData.isNonEmptyString(description)) throw 'Product description must be non-empty string!'

    let newProd = {
        name, price, quantity, description 
    }
    try{
        await adminData.addProduct(newProd)
        res.send('Product added successfully!')
    }catch(e){
        res.sendStatus(500).send('Error adding product')
    }
    
});


module.exports = router;