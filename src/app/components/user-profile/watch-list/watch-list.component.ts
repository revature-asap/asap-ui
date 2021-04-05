import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { assetProfile } from 'src/app/models/assetProfile';
import { WatchListService } from 'src/app/services/watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  currentAssetProfile!: assetProfile[];
  subscription: Subscription | undefined;
  panelOpenState = false;
  constructor(public watchListService: WatchListService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this.route.data.subscribe(
      (data: Data) =>{
        this.currentAssetProfile = data['asset'];
        console.log(this.currentAssetProfile);

      }
    )


  }

}
