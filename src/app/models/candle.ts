export class Candle {
    //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
    o: number[];
    h: number[];
    l: number[];
    c: number[];
    v: number[];
    t: number[];
    s: string;

    constructor(opens: number[], highs: number[], lows: number[], closes: number[], volumes: number[], timestamps: number[], status: string) {
        this.o = opens;
        this.h = highs;
        this.l = lows;
        this.c = closes;
        this.v = volumes;
        this.t = timestamps;
        this.s = status;
    }
}
// o
// List of open prices for returned candles.

// h
// List of high prices for returned candles.

// l
// List of low prices for returned candles.

// c
// List of close prices for returned candles.

// v
// List of volume data for returned candles.

// t
// List of timestamp for returned candles.

// s
// Status of the response. This field can either be ok or no_data.

