import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  getTimeInterval(scaleDate: number = 1, timeInterval: string): any {
    let currentTime = new Date();
    let previousDay = new Date(currentTime.valueOf() - 86400 * 1000 * scaleDate);

    previousDay.setUTCHours(12, 59, 59); // the day needs to start here in order to grab the asset data

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
