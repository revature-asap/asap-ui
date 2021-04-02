export class sentimentMap {
    //Made to match sentiment endpoint created by Brian, Greg, and Chris
    POSITIVE: number;
    NEGATIVE: number;
    MIXED: number;
    NEUTRAL: number;

    constructor(sentimentMapDTO:any) {
        this.POSITIVE = sentimentMapDTO.POSITIVE;
        this.NEGATIVE = sentimentMapDTO.NEGATIVE;
        this.MIXED = sentimentMapDTO.MIXED;
        this.NEUTRAL = sentimentMapDTO.NEUTRAL;
    }
}