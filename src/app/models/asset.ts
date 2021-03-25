export class Asset {
    //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
    o: number;
    h: number;
    l: number;
    c: number;
    pc: number;

    constructor(open: number, high: number, low: number, current: number, prevClose: number) {
        this.o = open;
        this.h = high;
        this.l = low;
        this.c = current;
        this.pc = prevClose;
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