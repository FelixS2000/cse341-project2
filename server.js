const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { swaggerDocs, swaggerUi } = require('./config/swagger');
const customerRoutes = require('./routes/customerRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
//const passport = require('passport');
//const session = require('express-session');
//const GitHubStrategy = require('passport-github2').Strategy;
//const cors = require('cors');
//const { connectToDatabase } = require('./database/db');



require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/customers', customerRoutes); // Register customer routes
app.use('/api/magazines', magazineRoutes); // Register magazine routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
