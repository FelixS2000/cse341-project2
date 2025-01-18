// models/Magazine.js
const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  availableCopies: { type: Number, required: true }
});

module.exports = mongoose.model('Magazine', magazineSchema);