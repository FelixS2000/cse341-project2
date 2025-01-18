// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subscriptionPlan: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now },
  magazinesSubscribed: { type: [String], default: [] }
});

module.exports = mongoose.model('Customer', customerSchema);