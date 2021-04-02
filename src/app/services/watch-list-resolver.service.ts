import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { assetProfile } from '../models/assetProfile';
import { WatchListService } from './watch-list.service';

@Injectable({
  providedIn: 'root'
})
export class WatchListResolverService implements Resolve<assetProfile[]> {

  constructor(private watchlistService: WatchListService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){

    console.log("I am in the resolve");
    const watchList = this.watchlistService.getUserWatchList();
    console.log("I got the resolve. The data is " + watchList);

    if (watchList.length == 0) {
      console.log("The data was null");
      this.watchlistService.setUserWatchList();
      return this.watchlistService.getUserWatchList();
      
    }
    else {
      console.log("The data was NOT null");
      return watchList;
    }
  }
}
