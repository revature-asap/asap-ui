export class assetProfile {
    //Pulled from ASAP API
    id: number; //made by ASAP API
    name: string; //Asset's full name
    ticker: string; //Exchange abbreviation for asset
    imageUrl: string; //url on finn
    marketCap: number; //Specific to stocks: "Defnitions may vary"
    shareOutstanding: number; //Specific to Stocks
    industryCategory: string; //Potentially used for searching purposes
    websiteUrl: string;
    lastTouchedTimestamp: Date; //Not sure about this one 


    constructor(profile:any) {
        this.id = profile.asset_id;
        this.name = profile.asset_name;
        this.ticker = profile.ticker;
        this.imageUrl = profile.asset_image_url;
        this.marketCap= profile.market_cap;
        this.shareOutstanding = profile.share_outstanding;
        this.industryCategory = profile.industry_category;
        this.websiteUrl = profile.website_url;
        this.lastTouchedTimestamp = profile.last_touched_timestamp;
    }

}