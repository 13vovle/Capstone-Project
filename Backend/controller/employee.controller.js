const employeeModel = require("../model/employee.model.js");
const validator = require("./validators");

let getAllEmpDetails = (req,res) =>{
    employeeModel.find({}, (err, result) =>{
        if(!err){ res.json(result); }
    });
}

let addEmployee = (req, res) => {
    let employee = new employeeModel({
        hashedPassword: req.body.pass,
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        isAdmin: false
    });
    employee.save((err, result) => {
        if (!err) {
            res.send("Employee info stored successfully " + result);
        } else {
            res.send("Employee not added " + err);
        }
    });
};

let deleteEmployeeByID = (req, res) => {
    let empID = req.params.empID;
    employeeModel.deleteOne({ _id: empID }, (err, result) => {
        if (!err) {
            if (result.deletedCount > 0) {
                res.send("Employee deleted successfully");
            } else {
                res.send("Employee not present");
            }
        } else {
            res.send("Error " + err);
        }
    });
};

let updateEmployee = (req, res) => {
    
        let empID = req.body.empID;
        let newPassword = req.body.pass;
        let isValidPassword = validator.isValidPassword(newPassword);
        if(isValidPassword){
            employeeModel.updateOne({_id: empID},{$set:{hashedPassword:newPassword}},(err,result)=> { 
                if(!err && result.modifiedCount > 0){
                    res.send("password updated successfully")
                }else {
                    res.send("password not updated ")
                }
            
            })
        }
        else
        {
            res.send("Invalid Password")
        }
      
};

let getEmpByID = (req,res) =>{
    let empID = req.params.ID;
    employeeModel.find({_id: empID}, (err, result) =>{
        if(!err)
        {
             res.json(result);
        }
        else{
            res.send("Employee not found")
        }
    });
}

module.exports = {getAllEmpDetails, addEmployee, deleteEmployeeByID, updateEmployee, getEmpByID};