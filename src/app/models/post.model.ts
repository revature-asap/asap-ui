export class Post{
    id: number;
    userId: number;
    textContent: string;
    title: string;
    assetName!: string;
    assetId: number;
    parentPostId!: number;

    constructor(post:any){
        this.id = post.id;
        this.userId = post.authorId;
        this.textContent = post.textContent;
        this.title = post.title;
        this.assetId = post.assetId;
        this.parentPostId = post.parentPostId;
    }
    
}