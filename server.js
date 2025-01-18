// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// server.js
const customerRoutes = require('./routes/customers');
const magazineRoutes = require('./routes/magazines');

app.use('/api/customers', customerRoutes);
app.use('/api/magazines', magazineRoutes);