const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'); // Import express-session
const { swaggerDocs, swaggerUi } = require('./config/swagger');
const customerRoutes = require('./routes/customerRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
const {connectToDatabase} = require('./database/db')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Set up session management
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a secure secret
    resave: false,
    saveUninitialized: true,
}));

app.use('/api/customers', customerRoutes); // Register customer routes
app.use('/api/magazines', magazineRoutes); // Register magazine routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
