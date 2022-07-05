export class Review {
    constructor({author,author_details,content,created_at}){
        this.author =author;
        this.avatar_path = author_details.avatar_path;
        this.content=content;
        this.created_at = created_at;
    }
}