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

/**
 * 
 * 
 * create table assets(

	asset_id serial,
	asset_name varchar(256) not null,
	ticker varchar(25) not null,
	asset_image_url text,
	market_cap numeric,
	share_outstanding numeric,
	industry_category varchar(25) not null default 'Other',
	website_url text,
	last_touched_timestamp date not null default current_date,
	
	constraint assets_pk primary key(asset_id)
	
);
 */
