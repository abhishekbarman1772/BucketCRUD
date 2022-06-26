const express = require('express');
const morgan = require('morgan');

const app = express();
const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('common'));

app.use('/api/V1', routes);

module.exports = app;
