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
      let localHour = '';

      if (hour >= 0) {
        localHour = this.hours[hour % 12];
      }
      else {
        hour *= -1;
        localHour = this.hours[this.hours.length - hour];
        console.log('new hours ' + hour);
      }

    return this.months[month] + " " + date + " " + year + " " +
        localHour + ":" + (minutes < 10 ? ("0" + minutes) : minutes) + ":"
        + (seconds < 10 ? ("0" + seconds) : seconds)
        + ((hour) > 11 ? "pm" : "am");
  }

  getTimeInterval(scaleDate: number = 1, timeInterval: string): any {
    let currentTime = new Date();
    let previousDay = new Date(currentTime.valueOf() - 86400 * 1000 * scaleDate);

    previousDay.setUTCHours(12, 59, 59);
    let ct = Math.floor(previousDay.valueOf() / 1000);
    let unitTime = timeInterval[timeInterval.length-1];
    let time = parseInt(timeInterval.slice(0, timeInterval.length-1));

    switch(unitTime) {
      case 'm':
        return {
          currentTime: ct,
          pastTime: ct - 60 * time
        }
      case 'h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60) * time
        }
      case 'd':
        return {
            currentTime: ct,
            pastTime: ct - (60 * 60 * 24) * time
        }
    }
  }
}
