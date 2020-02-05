const express = require("express");
const formRoutes = express.Router();

// Require Project model in our routes module
let Form = require("./form.model");

//=============CRUD OPERATIONS=============

// Defined store route
formRoutes.route("/add").post(function(req, res) {
  let form = new Form(req.body);
  form
    .save()
    .then(form => {
      res.status(200).json({ form: "form in added successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
// projectRoutes.route("/").get(function(req, res) {
//   Project.find(function(err, projects) {
//     if (err) {
//       // console.log(err);
//     } else {
//       res.json(projects);
//     }
//   });
// });
// Defined singleelement route
// businessRoutes.route("/singleelement/:id").get(function(req, res) {
//   let id = req.params.id;
//   Business.findById(id, function(err, business) {
//     res.json(business);
//   });
// });
// Defined edit route
// businessRoutes.route("/edit/:id").get(function(req, res) {
//   let id = req.params.id;
//   Business.findById(id, function(err, business) {
//     res.json(business);
//   });
// });

//  Defined update route
// businessRoutes.route("/update/:id").post(function(req, res) {
//   Business.findById(req.params.id, function(err, business) {
//     if (!business) res.status(404).send("data is not found");
//     else {
//       business.person_name = req.body.person_name;
//       business.business_name = req.body.business_name;
//       business.business_gst_number = req.body.business_gst_number;

//       business
//         .save()
//         .then(business => {
//           res.json("Update complete");
//         })
//         .catch(err => {
//           res.status(400).send("unable to update the database");
//         });
//     }
//   });
// });

// Defined delete | remove | destroy route
// businessRoutes.route("/delete/:id").get(function(req, res) {
//   Business.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
//     if (err) res.json(err);
//     else res.json("Successfully removed");
//   });
// });

module.exports = formRoutes;
