const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

// get keys from config
const keys = require('./config/keys');

// import modules
require('./models/User');
require('./models/Node');
require('./services/passport');

// connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// initialize the app
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: 'session',
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
require('./routes/nodeRoutes')(app);

// start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT);
