import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getFormattedDate(date: number, month: number,  year: number, 
    hour: number, minutes: number, seconds: number): string {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    return months[month] + " " + date + " " + year + " " + 
        hours[hour % 12] + ":" + (minutes < 10 ? ("0" + minutes) : minutes) + ":" 
        + (seconds < 10 ? ("0" + seconds) : seconds)
        + (hour > 11 ? "pm" : "am"); 
  }

  getTimeInterval(scaleDate: number = 1, timeInterval: string): any {
    let ct = Math.floor(Date.now() / 1000 - 86400) * scaleDate;

    switch(timeInterval) {
      case '5m':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 5)
        }
      case '15m':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 15)
        }
      case '30m':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 30)
        }
      case '1h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60)
        }
      case '4h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60 * 4)
        }
      case '6h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60 * 6)
        }
      case '12h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60 * 12)
        }
      case '1d':
        return {
            currentTime: ct,
            pastTime: ct - (60 * 60 * 24)
        }
    }
  }
}
