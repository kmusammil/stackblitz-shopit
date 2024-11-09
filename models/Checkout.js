const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  personalInformation: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  shippingAddress: {
    streetAddress: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  shippingMethod: {
    type: String,
    required: true,
    enum: ['standard', 'express']
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Checkout', checkoutSchema);
