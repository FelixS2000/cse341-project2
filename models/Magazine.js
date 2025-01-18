const mongoose = require('mongoose');

const MagazineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    publisher: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    availableCopies: { type: Number, default: 0 }
});

module.exports = mongoose.model('Magazine', MagazineSchema);
