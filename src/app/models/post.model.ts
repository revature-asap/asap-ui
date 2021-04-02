export class Post{
    id: number;
    userId: number;
    content: string;
    title: string;
    assetName!: string;
    assetId: number;

    constructor(post:any){
        this.id = post.id;
        this.userId = post.authorId;
        this.content = post.textContent;
        this.title = post.title;
        this.assetId = post.assetId;
    }
    
}