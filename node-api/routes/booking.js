var express = require('express');
var router = express.Router();
var db=require('../database');


 // API for booking the seats
router.post('/bookingform', function(req, res, next) {

  var no_of_seats = req.body.no_of_seats; // Request input

  var result = [];

  var  getInformationFromDB = function(callback) {

      db.query('SELECT COUNT(*) as total FROM booking_table where booked=0', function(err, results, fields)
      { 
          available_seats = results[0].total; // Get the available seats

          // Check seats availability 
          if(no_of_seats>available_seats){

              callback(2, available_seats);           
            
              return; // Not available than return
          } 
          
          // Start code for book seat
          db.query('SELECT * FROM booking_table where booked=0 limit '+no_of_seats+'', function(err, res, fields)
          {
            if (err)  return callback(err);
            if(res.length){
              
                for(var i = 0; i<res.length; i++ ){  

                      let seat_no = res[i]['seat_no'];

                      var book_sql = "UPDATE booking_table set booked=1 where seat_no = '"+seat_no+"'"; // Update the booking status of seat
                      result.push(seat_no); // Push booked seat no in array           
                      db.query(book_sql, function (err, result1) {                    
                          if (err) {
                            return console.error(err.message);
                          } 
                                          
                      });
                 }
            }
            callback(1, result);
          });
          // End code for for book seat

      });
  }
  // Callback funcion
  getInformationFromDB(function (msg, result) {
     res.send({seat_nos:result,message:msg}); // Send response to client
  });

}); 

 // API for get all records from booking table
router.get('/bookings', function(req, res, next) {

  var sql='SELECT * FROM booking_table';   

  db.query(sql, [] ,function (err, results, fields) {
    if (err) {
      return console.error(err.message);
    } 
    res.send({results});
  });

});
module.exports = router;