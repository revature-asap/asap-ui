import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { assetProfile } from '../models/assetProfile';
import { WatchListService } from './watch-list.service';

@Injectable({
  providedIn: 'root'
})
export class WatchListResolverService implements Resolve<assetProfile[]> {

  constructor(private watchlistService: WatchListService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const watchList = this.watchlistService.getAssetProfile();

    if (watchList == null) {
      return this.watchlistService.fetchUserWatchList();
    }
    else {
      return watchList;
    }
  }
}
