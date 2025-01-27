const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { swaggerDocs, swaggerUi } = require('./config/swagger');
const customerRoutes = require('./routes/customerRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const { connectToDatabase } = require('./database/db');



passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    //User.findOrCreate({ githubId: profile.id }, function (err, user){
    return done(null, profile);    
    //});
    }
));

    



require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/customers', customerRoutes); // Register customer routes
app.use('/api/magazines', magazineRoutes); // Register magazine routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // This is the basic express session({...}) initialization.
    .use(passport.initialize())
    // init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session".
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authotization"
             );
             res.setHeader(
                "Access-Control-Allow-Methods",
                "POST, GET, PUT, PATCH, OPTIONS, DELETE"
            );
            next();
        })
        .use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
        .use(cors({origin: '*'}))
        .use("/", require("./routes/index.js"));
    

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
