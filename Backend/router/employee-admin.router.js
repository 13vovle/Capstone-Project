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
    let admin1 = {
        firstName: 'Jack',
        lastName:'Yang',
        email : 'jackyyjyang@gmailcom',
        hashedPassword: hashedPassword,
        isAdmin:true
    }
    const admin1 = await adminData.createAdmin(admin1);

    let admin2 = {
        firstName: 'Jacob',
        lastName:'Taylor',
        email : 'jacobtaylor3197@gmail.com',
        hashedPassword: hashedPassword,
        isAdmin:true
    }
    const admin2 = await adminData.createAdmin(admin2);
    // email == 'anku127@gmail.com' || email == 'chanukya.cheekati@gmail.com' || email == 'rahulkrishkampati@gmail.com'
    res.send('Admins successfully created!')
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!validatorData.isNonEmptyString(email)) throw 'Must provide email to login as admin'
    if(!validatorData.isNonEmptyString(password)) throw 'Must provide password to login as admin'
    const admin = await adminData.getAdminByEmail(email.toLowerCase());  
    if (admin && (await bcrypt.compare(password, admin.hashedPassword))){
        //req.session.user = {_id: admin._id, email:admin.email, firstName: admin.firstName, lastName: admin.lastName}
        res.redirect('/emp');
    }else{
        res.status(400).send('Admin login failed!')
    }
});



module.exports = router;