const { ObjectID } = require("bson");
const employeeModel = require("../model/employee.model.js");
const validator = require("./validators");
const bcrypt = require('bcrypt');

<<<<<<< HEAD
let getAllEmpDetails = (req,res) =>{
    employeeModel.find({}, (err, result) =>{
        if(!err){ 
            res.json(result); 
        }
=======
let getAllEmpDetails = (req, res) => {
    employeeModel.find({}, (err, result) => {
        if (!err) { res.json(result); }
>>>>>>> 2d6998079a21bfdcfeedd1e00456b7920a3eeb8f
    });
    
}

let addEmployee = async (req, res) => {
    let employee = new employeeModel({
        hashedPassword: req.body.pass,
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        isAdmin: false
    });
    employee.hashedPassword = await bcrypt.hash(employee.hashedPassword, 10);
    const employeeOne = await employee.save((err, result) => {
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

<<<<<<< HEAD
let updateEmployee = async(req, res) => {

        let empID = req.body._id;
        console.log(typeof(req.body.empID));
        let newPassword = req.body.hashedPassword;
        let isValidPassword = validator.isValidPassword(newPassword);
        if(isValidPassword){
            await employeeModel.updateOne({_id: empID},{$set:{hashedPassword : newPassword}},(err,result)=> { 
                console.log(result)
                if(!err && result.nModified > 0){
                    res.send("password updated successfully")
                }else {
                    console.log(err)
                    res.send("password not updated ")
                }
            })
        }
        else
        {
            res.send("Invalid Password")
        }
      
=======
let updateEmployee = async (req, res) => {

    let empID = req.body.empID;
    let newPassword = req.body.pass;
    let isValidPassword = validator.isValidPassword(newPassword);
    if (isValidPassword) {
        newPassword = await bcrypt.hash(newPassword, 10);
        const employeeOne = await employeeModel.updateOne({ _id: empID }, { $set: { hashedPassword: newPassword } }, (err, result) => {
            if (!err && result.nModified > 0) {
                res.send("password updated successfully")
            } else {
                res.send("password not updated ")
            }

        })
    }
    else {
        res.send("Invalid Password")
    }

>>>>>>> 2d6998079a21bfdcfeedd1e00456b7920a3eeb8f
};

let getEmpByID = (req, res) => {
    let empID = req.params.ID;
<<<<<<< HEAD
     employeeModel.findOne({_id : empID}, (err, result) =>{
        if(!err)
        {
             res.json(result);
=======
    employeeModel.find({ _id: empID }, (err, result) => {
        if (!err) {
            res.json(result);
>>>>>>> 2d6998079a21bfdcfeedd1e00456b7920a3eeb8f
        }
        else {
            res.send("Employee not found")
        }
    });
}

module.exports = { getAllEmpDetails, addEmployee, deleteEmployeeByID, updateEmployee, getEmpByID };