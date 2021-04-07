export class companyProfile {
    //Pulled from ASAP API
    id: number; //made by ASAP API
    name: string; //Asset's full name
    ticker: string; //Exchange abbreviation for asset
    imageUrl: string; //url on finn
    marketCapitalization: number; //Specific to stocks: "Defnitions may vary"
    shareOutstanding: number; //Specific to Stocks
    finnhubIndustry: string; //Potentially used for searching purposes
    weburl: string;
    lastTouchedTimestamp: Date; //Not sure about this one 

    constructor(profile:any) {
        this.id = profile.assetId;
        this.name = profile.name;
        this.ticker = profile.ticker;
        this.imageUrl = profile.logo;
        this.marketCapitalization= profile.marketCapitalization;
        this.shareOutstanding = profile.shareOutstanding;
        this.finnhubIndustry = profile.finnhubIndustry;
        this.weburl = profile.weburl;
        this.lastTouchedTimestamp = profile.lastTouchedTimestamp;
    }

}