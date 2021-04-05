export class buzzObject {
    articlesInLastWeek: number;
    buzz: number;
    weeklyAverage: number;

    constructor(buzzDTO:any){
        this.articlesInLastWeek = buzzDTO.articlesInLastWeek;
        this.buzz = buzzDTO.buzz;
        this.weeklyAverage = buzzDTO.weeklyAverage;
    }
}