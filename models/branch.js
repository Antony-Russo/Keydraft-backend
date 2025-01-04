const mongoose = require("mongoose");

const bankDetailsSchema = new mongoose.Schema({
  accountNumber: { type: String },
  accountHolderName: { type: String },
  ifscCode: { type: String },
  bankName: { type: String },
  branchName: { type: String },
});

const branchDetailsSchema = new mongoose.Schema({
  branchCode: { type: String },
  branchName: { type: String },
  branchShortName: { type: String },
  doorNo: { type: String },
  street: { type: String },
  locality: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  panNo: { type: String },
  gstin: { type: String },
  vehicleType: { type: String },
  branchType: { type: String },
  contactNo: { type: String },
  alternateContactNo: { type: String },
  whatsappNumber: { type: String },
  emailId: { type: String },
  inchargeName: { type: String },
  inchargeContactNo: { type: String },
  inchargeWhatsappNumber: { type: String },
  inchargeEmailId: { type: String },
  personName: { type: String },
  personContactNo: { type: String },
  personWhatsappNumber: { type: String },
  personEmailId: { type: String },
  openingBalance: { type: String },
  openingDate: { type: Date },
  minAmount: { type: Number },
  maxAmount: { type: Number },
  monthlyMaxAmount: { type: Number },
  maxUnallocatedAmount: { type: Number },
  effectiveDate: { type: Date },
  bankDetails: [bankDetailsSchema],
  status: { type: Boolean, default: true },
});

const branchSchema = new mongoose.Schema({
  fileName: String,
  fileData: Buffer,
  rows: Array, // Stores individual rows of the uploaded Excel file
});

const UploadBranch = mongoose.model("uploadBranch", branchSchema);
const Branch = mongoose.model("Branch", branchDetailsSchema);

module.exports = { Branch, UploadBranch };
