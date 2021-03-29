import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  constructor() { }

  computeChange(cur: number, prevClosed: number): number {
    let change = ((cur - prevClosed)/prevClosed);
    console.log(change);

    return change;
  }

}
