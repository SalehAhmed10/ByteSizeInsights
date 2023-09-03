const express = require("express");
const authController = require("../controller/authController");
const blogController = require("../controller/blogController");
const auth = require("../middlewares/auth");

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
router.post("/logout", auth, authController.logout);

// refresh
router.get("/refresh", authController.refresh);

// blog

// create
router.post("/blog", auth, blogController.create);

// get all
router.get("/blog/all", auth, blogController.getAll);

// get blog by id
router.get("/blog/:id", auth, blogController.getById);

// update
router.put("/blog", auth, blogController.update);

// delete
router.delete("/blog/:id", auth, blogController.delete);

// CRUD
// read all blogs
// read blog by id
// update
// delete

// comment
// create comment
// read comments by blog id

module.exports = router;
