import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ServerService } from '../server.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
	
    form: FormGroup = new FormGroup({});
   	seatBooked = false;
	notBooked = false;
	booked_seats: string = '';
	remaining_seats: '';
	booking_data: any[] = [];

	no_of_seats = new FormControl('');
      
  	
	constructor(private fb: FormBuilder,private server: ServerService, private elementRef: ElementRef) {

      this.form = fb.group({
         no_of_seat: ['', [Validators.required,  Validators.max(7),  Validators.min(1), Validators.pattern("^[0-9]*$")]] // Validation 
      })
    }
	
     // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
	
    onSubmit() {
		
          const data = {
		     no_of_seats: this.form.get('no_of_seat').value,
		  };
		  // Call API for book seat
		  this.server.bookSeats(data).then( 
		     (res) => this.showResponse(res),
             (err) => console.error(err)
		   );
    }
	
	ngOnInit() {
      
    }
	
	// Display the response after submit
	showResponse(res) {
      	
		if(res['message'] == 2){
			this.notBooked = true;
			this.seatBooked = false;
			this.remaining_seats = res['seat_nos'];
		}else{
			this.seatBooked = true;
			this.notBooked = false;
            this.booked_seats = res['seat_nos'];
			if(this.seatBooked==true){
			   this.getBookings(); 
			}
		}
    } 
	
	getBookings() {  // Call API for fetching all seats 
		this.server.getBookings().then((response: any) => {
		  //console.log('Response', response);
		  this.booking_data = response.results.map((ev) => {
			ev.seat_no = ev.seat_no;
			ev.booked = ev.booked;
			return ev;
		  });
		});
    }

}
