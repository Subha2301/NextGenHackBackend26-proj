const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");

router.post("/", controller.createComplaint);
router.get("/my", controller.getMyComplaints);
router.put("/:id", controller.updateStatus);

module.exports = router;