const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use('/api/customers', require('./routes/customers'));
app.use('/api/magazines', require('./routes/magazines'));

// Swagger
app.use('/api-docs', require('./routes/swagger'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));