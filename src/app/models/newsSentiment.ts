import { buzzObject } from "./buzzObject";
import { bearishBullishHolder } from "./bearishBullishHolder";

export class newsSentiment {
    buzz: buzzObject;
    companyNewsScore: number;
    sectorAverageBullishPercent: number;
    sectorAverageNewsScore: number;
    sentiment: bearishBullishHolder;
    symbol: string;

    constructor(sentimentResponse:any) {
        this.buzz = sentimentResponse.buzz;
        this.companyNewsScore = sentimentResponse.companyNewsScore;
        this.sectorAverageBullishPercent = sentimentResponse.sectorAverageBullishPercent;
        this.sectorAverageNewsScore = sentimentResponse.sectorAverageNewsScore;
        this.sentiment = sentimentResponse.sentiment;
        this.symbol = sentimentResponse.symbol;
    }
}