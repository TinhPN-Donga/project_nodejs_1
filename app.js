var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')

// ✅ THÊM DÒNG NÀY
const { saveUserLocal, requireLoginPage } = require('./middlewares/auth.middleware');

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log('connected to mongodb');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');
var productRouter = require('./routes/product.route');
var cameraRouter = require('./routes/camera.route');
var attendanceRouter = require('./routes/attendance.route');
var profileRouter = require('./routes/profile.route');
var apiLoginRouter = require('./routes/auth.api.routes');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ middleware luôn gắn user (nếu có) cho mọi request
app.use(saveUserLocal);

// ✅ ROUTE KHÔNG CẦN LOGIN: auth
app.use('/auth', authRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/login', apiLoginRouter);
// ✅ TỪ ĐÂY TRỞ XUỐNG BẮT BUỘC PHẢI LOGIN
// app.use(requireLoginPage);

// ✅ NẾU ĐÃ LOGIN THÌ MỚI ĐƯỢC VÀO CÁC ROUTE NÀY
app.use('/', indexRouter);
// app.use('/profile', profileRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/camera', cameraRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
