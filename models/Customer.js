const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subscriptionPlan: { type: String, enum: ['Monthly', 'Annual'], required: true },
    joinedDate: { type: Date, default: Date.now },
    magazinesSubscribed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Magazine' }]
});

module.exports = mongoose.model('Customer', CustomerSchema);
