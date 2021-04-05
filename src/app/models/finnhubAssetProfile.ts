export class finnhubAssetProfile {
    //Pulled from ASAP API
    exchange!: string;
    industry!: string;
    ipo!: Date;
    logo!: string;
    marketCap!: number;
    name!: string;
    number!: number;
    outstandingShares: number;
    url!: string;
  


    constructor(profile:any) {
        this.exchange = profile.exchange;
        this.industry = profile.finnhubIndustry;
        this.ipo = profile.ipo;
        this.logo = profile.logo;
        this.marketCap = profile.marketCap;
        this.name = profile.name;
        this.number = profile.phone;
        this.outstandingShares = profile.shareOutstanding;
        this.url = profile.weburl;
    }

}