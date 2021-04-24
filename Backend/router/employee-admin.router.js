let express = require("express");
const employeeController = require("../controller/employee.controller");
let router = express.Router();

router.post("/addEmployee", employeeController.addEmployee);
router.delete("/deleteEmployeeByID/:empID", employeeController.deleteEmployeeByID);

module.exports = router;