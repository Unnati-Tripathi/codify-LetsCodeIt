
require('dotenv').config(); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var compilerRouter = require('./routes/compiler'); 

const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

const userModel = require('./models/userModels');
const bcrypt = require('bcryptjs');

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("🚀 Connected to MongoDB!");
    const adminExists = await userModel.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin', salt);
      await userModel.create({
        username: 'admin',
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hash,
        isAdmin: true
      });
      console.log("👑 Default admin user created (admin@gmail.com / admin)");
    }
  })
  .catch((err) => console.error("❌ Connection error:", err));

var app = express();

console.log("Database URI:", mongoURI ? "Loaded" : "Missing");
console.log("RapidAPI Host:", process.env.RAPIDAPI_HOST);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/compiler', compilerRouter); 
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
