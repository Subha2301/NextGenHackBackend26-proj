const Complaint = require("../models/Complaint");


//  Create Complaint
exports.createComplaint = async (req, res) => {
  try {
       console.log("REQ BODY:", req.body);
      console.log("USER ID:", req.user?.id);
      
    const complaint = await Complaint.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Get My Complaints (Logged in User)
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

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