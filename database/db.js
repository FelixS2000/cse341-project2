const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        // Connect to Customer Database
        await mongoose.connect(process.env.MONGODB_CUSTOMER_URI);
        console.log('Connected to Customer Database');

        // Connect to Magazine Database
        await mongoose.createConnection(process.env.MONGODB_MAGAZINE_URI);
        console.log('Connected to Magazine Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = { connectToDatabase };