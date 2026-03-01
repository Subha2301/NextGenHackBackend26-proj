const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Counter = require("./Counter");

const complaintSchema = new mongoose.Schema({

  serialNumber: {
    type: Number,
    unique: true
  },

  problemId: {
    type: String,
    unique: true,
    default: () => uuidv4()
  },

  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },

  status: {
    type: String,
    enum: ["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"],
    default: "PENDING"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

complaintSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "complaintSerial" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.serialNumber = counter.value;
  }
  next();
});

complaintSchema.index({ serialNumber: 1 });
complaintSchema.index({ problemId: 1 });
complaintSchema.index({ userId: 1 });
complaintSchema.index({ status: 1 });

module.exports = mongoose.model("Complaint", complaintSchema);