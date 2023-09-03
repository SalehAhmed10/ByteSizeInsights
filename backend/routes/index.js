const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

// testing
router.get("/", (req, res) => res.json({ message: "Test Route Working" }));

router.get("/test", (req, res) => res.json({ message: "Test Route Working" }));

// user

// register

// router.post("/register", authController.register);
router.post("/register", authController.register);

// router.post("/register", (req, res) => {
//   // Your code to handle the POST request goes here
// });

// login
router.post("/login", authController.login);
// logout
// refresh

// blog
// CRUD
// create
// read all blogs
// read blog by id
// update
// delete

// comment
// create comment
// read comments by blog id

module.exports = router;
