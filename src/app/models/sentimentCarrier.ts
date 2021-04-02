import {sentimentMap} from './sentimentMap';

export class sentimentCarrier {
    //Made to match sentiment endpoint created by Brian, Greg, and Chris
    averages: sentimentMap;
    totals: sentimentMap;

    constructor(sentimentCarrierDTO:any) {
        this.averages = sentimentCarrierDTO.sentimentAverage;
        this.totals = sentimentCarrierDTO.sentimentTotals;
    }
}