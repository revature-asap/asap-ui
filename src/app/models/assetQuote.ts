export class assetQuote {
    //Pulled from finnhub API
    //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
    open: number; //open price of the day
    high: number; //High price of the day
    low: number; //Low price of the day
    current: number; //Current price
    previousClose: number; //Previous close price

    constructor(asset:any){
        this.open = asset.o;
        this.high = asset.h;
        this.low = asset.l;
        this.current = asset.c;
        this.previousClose = asset.pc;
    }

    updateQuote(asset:any) {
        this.open = asset.o;
        this.high = asset.h;
        this.low = asset.l;
        this.current = asset.c;
        this.previousClose= asset.pc;
    }
}