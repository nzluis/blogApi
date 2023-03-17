const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const passport = require('passport');

const indexRouter = require('./routes/index')

const app = express()

require('./config/database')
require('./config/passport')(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)

// app.use((req, res, next) => {

// })

app.listen(8080, () => console.log('Server listening on 8080'))