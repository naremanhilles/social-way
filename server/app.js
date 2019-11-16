const express = require('express');
const cookieParser = require('cookie-parser');
const { join } = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const router = require('./controllers');

const app = express();
app.set('port', process.env.PORT || 5000);
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.use(express.static(join(__dirname, 'uploads')));
app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.log(req.path, err);
  res.status(500).send({ error: 'Internal Server Error', statusCode: 500 });
});

module.exports = app;
