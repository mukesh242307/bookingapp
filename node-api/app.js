const express =  require("express");
const app = express();
var bodyparser = require('body-parser');
var cors = require('cors');
 
app.use(express.json());

//enables cors
app.use(cors({
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.use(bodyparser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

var bookingRouter = require('./routes/booking');

app.use('/', bookingRouter);  

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));