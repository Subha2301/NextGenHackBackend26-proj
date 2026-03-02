const Complaint = require("../models/Complaint");
const User = require("../models/User"); // ✅ Import User for auto-fill

//  Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    // 🔹 Get logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Create complaint with required fields filled
    const complaint = await Complaint.create({
      ...req.body,                // title, description, location, image
      userId: user._id,           // required
      name: user.name,            // required
      email: user.email,          // required
      phone: user.phone || "N/A"  // optional fallback
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error(error); // 🔹 Helps debug in terminal
    res.status(500).json({ message: error.message });
  }
};

//  Get My Complaints (Logged in User)
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public Complaints (Limited Fields)
exports.getPublicComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .select("title description location name status createdAt")
      .sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Admin Update Status
exports.updateStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint Not Found" });
    }

    complaint.status = req.body.status;
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};