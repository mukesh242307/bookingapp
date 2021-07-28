import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient,
  ) {}

  private async request(method: string, url: string, data?: any) {
  

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',      
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getBookings() {
    return this.request('GET', `${environment.serverUrl}/bookings`);
  }

  bookSeats(data) {
    return this.request('POST', `${environment.serverUrl}/bookingform`, data);
  }

}