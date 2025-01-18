const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CUSTOMER_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to Customer Database');
        await mongoose.connect(process.env.MONGODB_MAGAZINE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to Magazine Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = { connectToDatabase };