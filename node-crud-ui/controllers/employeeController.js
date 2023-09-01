const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/employee.model");
const Employee = mongoose.model("Employee");

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function updateRecord(req, res) {
  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("employee/addOrEdit", {
            viewTitle: "Update Employee",
            employee: req.body,
          });
        } else {
          console.log("Error updating employee :" + err);
        }
      }
    }
  );
}

function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullname = req.body.fullname;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;

  employee.save((err, result) => {
    if (!err) {
      // res.redirect("employee/addOrEdit");
      res.redirect("employee/list");
    } else {
      console.log("Error in inserting record : " + err);
    }
    // else {
    //   if (err.name == "ValidationError") {
    //     handleValidationError(err, req.body);
    //     res.render("employee/addOrEdit", {
    //       viewTitle: "Insert Employee",
    //       employee: req.body,
    //     });
    //   } else {
    //     console.log("Error in inserting record : " + err);
    //   }
    // }
  });
}

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving employee" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullname":
        body[fullnameError] = err.errors[field].message;
        break;
      case "email":
        body[emailError] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/addOrEdit", {
        viewTitle: "Update employee",
        employee: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      // console.log(doc);
      res.redirect("/employee/list");
    } else {
      console.log("Error deleting employee : " + err);
    }
  });
});

module.exports = router;
