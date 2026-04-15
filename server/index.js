const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mqttClient = require('./MqttHandler');

const app = express();

dotenv.config();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected'))
    .catch(console.log);

// Public folder setup
app.use(express.static('public')); //No need of public folder for html
// Bodyparser
//parse url-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//parse JSON bodies (as sent by API clients)
app.use(express.json());

// for cross origin request
app.use(cors())

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// MqttHandler

mqttClient.use(require('./mqttRoutes'));
mqttClient.connect(process.env.MQTT_BROKER, process.env.MQTT_PREFIX);

//Routes
app.use(require('./routes'))

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))