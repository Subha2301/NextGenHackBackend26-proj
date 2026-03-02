const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");
const auth = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorize"); // import authorize

// Create Complaint (User)
router.post("/", auth, controller.createComplaint);

// Get My Complaints (User)
router.get("/my", auth, controller.getMyComplaints);

// Get All Complaints (Admin)
router.get("/", auth, authorize("ADMIN"), controller.getPublicComplaints);

// Update Status (Admin)
router.put("/:id", auth, authorize("ADMIN"), controller.updateStatus);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/complaintController");

// router.post("/", controller.createComplaint);
// router.get("/my", controller.getMyComplaints);
// router.put("/:id", controller.updateStatus);

// module.exports = router;