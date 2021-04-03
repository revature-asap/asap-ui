import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  months : string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  hours : string[] = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  days : string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() { }

  getFormattedDate(date: number, month: number,  year: number, 
    hour: number, minutes: number, seconds: number): string {
    return this.months[month] + " " + date + " " + year + " " + 
        this.hours[hour % 12] + ":" + (minutes < 10 ? ("0" + minutes) : minutes) + ":" 
        + (seconds < 10 ? ("0" + seconds) : seconds)
        + (hour > 11 ? "pm" : "am"); 
  }

  getTimeInterval(scaleDate: number = 1, timeInterval: string): any {
    let currentTime = new Date();
    let previousDay = new Date(currentTime.valueOf() - 86400 * 1000 * scaleDate);

    previousDay.setUTCHours(12, 59, 59);
    let ct = Math.floor(previousDay.valueOf() / 1000);

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
