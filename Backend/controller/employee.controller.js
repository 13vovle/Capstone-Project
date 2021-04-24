const employeeModel = require("../model/employee.model.js");

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

module.exports = {getAllEmpDetails, addEmployee, deleteEmployeeByID};