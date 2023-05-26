const express = require('express');
const DB = require('./DB')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const nodemon = require('nodemon');

app.set('view engine', 'hbs');

const static_path = path.join(__dirname, '../Home/')
const template_path = path.join(__dirname, '../views/');
app.use(express.static(static_path));
app.path(express.static(path.join(__dirname, '../Backup/views/')));





console.log(path.join(__dirname, ''));




app.get('../Home', (req, res) => {
    req.render('index.html');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});