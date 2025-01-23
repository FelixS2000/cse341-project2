const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { swaggerDocs, swaggerUi } = require('./config/swagger');
const customerRoutes = require('./routes/customerRoutes');
const magazineRoutes = require('./routes/magazineRoutes');

const { connectToDatabase } = require('./database/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/customers', customerRoutes); // Changed from '/api/customers' to '/customers'
app.use('/api/magazines', magazineRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
