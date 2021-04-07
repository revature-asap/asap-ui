export class Post{
    postId: number;
    userId: number;
    textContent: string;
    title: string;
    assetTicker!: string;
    assetId: number;
    parentPostId!: number;
    creationTimestamp!: number;
    username: string;
    showReply = false;

    constructor(post:any){
        this.postId = post.postId;
        this.userId = post.authorId;
        this.textContent = post.textContent;
        this.title = post.title;
        this.assetId = post.assetId;
        this.parentPostId = post.parentPostId;
        this.creationTimestamp = post.creationTimestamp;
        this.username = post.username;
        this.showReply = false;
    }
    
}