const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");
const auth = require("../middleware/authMiddleware");

// 🔥 Create Complaint (Logged-in user only)
router.post("/", auth, controller.createComplaint);

// 🔥 Get Logged-in User Complaints
router.get("/my", auth, controller.getMyComplaints);

// 🔥 Get All Complaints (Admin Page)
router.get("/", auth, controller.getPublicComplaints);

// 🔥 Update Status (Admin)
router.put("/:id", auth, controller.updateStatus);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/complaintController");

// router.post("/", controller.createComplaint);
// router.get("/my", controller.getMyComplaints);
// router.put("/:id", controller.updateStatus);

// module.exports = router;