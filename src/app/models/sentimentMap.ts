export class sentimentMap {
    //Made to match sentiment endpoint created by Brian, Greg, and Chris
    positive: number;
    negative: number;
    mixed: number;
    neutral: number;

    constructor(sentimentMapDTO:any) {
        this.positive = sentimentMapDTO.POSITIVE;
        this.negative = sentimentMapDTO.NEGATIVE;
        this.mixed = sentimentMapDTO.MIXED;
        this.neutral = sentimentMapDTO.NEUTRAL;
    }
}