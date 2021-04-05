export class bearishBullishHolder{
    bearishPercent: number;
    bullishPercent: number;

    constructor(sentimentDTO: any){
        this.bearishPercent = sentimentDTO.bearishPercent;
        this.bullishPercent = sentimentDTO.bullishPercent;
    }
}