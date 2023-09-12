export class ArticleImage {

    private url: string = "";

    constructor(private caption: string, url: string) { //SELF NOTE: Why not declare above? Adhere to Parameter properties of google typesript standard
        this.Url = url;

    } 
    
    set Caption(newCaption: string) {
        this.caption = newCaption;
    }

    get Caption(): string {
        return this.caption;
    }

    set Url(newUrlPath: string) {  //SELF NOTE: Why not let client pass URL obj as paramater? Want to promote abstraction hide underlying implementation 
        const tmpUrl = new URL(newUrlPath);
        this.url = tmpUrl.toJSON();
    }

    get Url(): string {
        return this.url.toString();
    }
}
