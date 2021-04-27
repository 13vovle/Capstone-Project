let express = require("express");
const employeeController = require("../controller/employee.controller");
let router = express.Router();

router.get("/getAllEmpDetails", employeeController.getAllEmpDetails);
router.post("/addEmployee", employeeController.addEmployee);
router.delete("/deleteEmployeeByID/:empID", employeeController.deleteEmployeeByID);
router.put("/updateEmpDetails",employeeController.updateEmployee);
router.get("/getEmpByID/:ID", employeeController.getEmpByID);

module.exports = router;