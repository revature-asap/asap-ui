export class assetCandle {
    //From finnhub API
    //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
    open: number[];// List of open prices for returned candles.
    high: number[];// List of high prices for returned candles.
    low: number[];// List of low prices for returned candles.
    close: number[];// List of close prices for returned candles.
    volume: number[];// List of volume data for returned candles.
    timestamp: number[];// List of timestamp for returned candles
    status: string;// Status of the response. This field can either be ok or no_data.

    // constructor(){
    //     this.open =[];
    //     this.high = [];
    //     this.low = [];
    //     this.close = [];
    //     this.volume = [];
    //     this.timestamp = [];
    //     this.status = "";
    // }

    constructor(candle:any) {
        this.open = candle.c;
        this.high = candle.h;
        this.low = candle.l;
        this.close = candle.c;
        this.volume = candle.v;
        this.timestamp = candle.t;
        this.status = candle.s;
    }
}
