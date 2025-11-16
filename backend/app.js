const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const profilesRoute = require('./routes/profiles');
const eventsRoute = require('./routes/events');
const logsRoute = require('./routes/logs');


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/api/profiles', profilesRoute);
app.use('/api/events', eventsRoute);
app.use('/api/events', logsRoute); 


app.get('/', (req, res) => res.json({ ok: true }));


module.exports = app;