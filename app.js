var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require( 'express-handlebars');

// JSONWebToken
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');

var config = require('config');
const port = config.get('static.port');
const baseUrl = config.get('static.baseUrl'); //store the base URL

var app = express();

// Socket
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());  //CORS Enable for all route

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
//Set the fublic folder for external resources
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine( 'handlebars',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
      baseUrl: baseUrl  //Send the base URL
    }
  })
);
app.set('view engine', 'handlebars');

//index Base url call
app.get('/', function (req, res) {
  res.render('login', { layout: false } );
});

app.get('/login', function (req, res) {
  res.render('login', { layout: false } );
});

app.get('/register', function (req, res) {
  res.render('register', { layout: false } );
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/chat', function (req, res) {
  res.render('chat');
});

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).send({
    errorMessage: res.locals.message
  })
});

// Socket.IO events
// const io = socketIO(server);

io.use((socket, next) => {
  const { headers } = socket.handshake;  
  // Access the token from the request headers
  const userId = headers.authorization.split(' ')[1];
  console.log('Token:', userId);

  // const userId = socket?.handshake?.userId;
  // console.log('Socket User Id', userId);
  if (!userId) {
    return next(new Error('Unauthorized'));
  }
  socket.userId = userId;
  next();
});

io.on('connection', (socket) => {
  console.log('New user connected:', socket.userId);

  // Handle incoming messages
  socket.on('message', (data) => {
    const { toUserId, message } = data;
    socket.to(toUserId).emit('message', message);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
  });
});

//for run the server on port
server.listen(port, (req, res) => {
  console.log("server is running on " + port + " port");
});

module.exports = app;
