const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        // Connect to the MongoDB instance
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to Database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = { connectToDatabase };
