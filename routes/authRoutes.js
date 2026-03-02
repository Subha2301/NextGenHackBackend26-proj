const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController"); // import function

router.post("/register", register); // second argument must be function

module.exports = router;