import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { companyProfile } from '../models/companyProfile';
import { WatchListService } from './watch-list.service';

@Injectable({
  providedIn: 'root'
})
export class WatchListResolverService implements Resolve<companyProfile[]> {

  constructor(private watchlistService: WatchListService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const watchList = this.watchlistService.getCompanyProfile();

    if (watchList == null) {
      return this.watchlistService.fetchUserWatchList();
    }
    else {
      return watchList;
    }
  }
}
