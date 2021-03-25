export class Asset {
    //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
    open: number;
    high: number;
    low: number;
    current: number;
    prevClose: number;

    constructor(open: number, high: number, low: number, current: number, prevClose: number) {
        this.open = open;
        this.high = high;
        this.low = low;
        this.current = current;
        this.prevClose = prevClose;
    }
}
// o
// Open price of the day

// h
// High price of the day

// l
// Low price of the day

// c
// Current price

// pc
// Previous close price