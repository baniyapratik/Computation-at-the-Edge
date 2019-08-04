const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// get keys from config
const keys = require('./config/keys');

// import modules
require('./models/User');
require('./services/passport');

// connect to the database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// initialize the app
const app = express();

app.use(
  cookieSession({
    // one day
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// tell passport to use cookie to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// import routes
require('./routes/authRoutes')(app);
require('./routes/tokenRoutes')(app);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
