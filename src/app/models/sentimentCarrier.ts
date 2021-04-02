import {sentimentMap} from './sentimentMap';

export class sentimentCarrier {
    //Made to match sentiment endpoint created by Brian, Greg, and Chris
    sentimentAverage: sentimentMap;
    sentimentTotals: sentimentMap;

    constructor(sentimentCarrierDTO:any) {
        console.log("I am in the sentimentCarrier constructor!");
        this.sentimentAverage = new sentimentMap(sentimentCarrierDTO.sentimentAverage);
        this.sentimentTotals = new sentimentMap(sentimentCarrierDTO.sentimentTotals);
        console.log(this.sentimentAverage);
    }
}