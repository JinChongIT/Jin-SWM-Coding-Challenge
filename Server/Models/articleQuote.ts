export class ArticleQuote {
    private quote: string;
    private attribution: string;

    constructor() { 
        this.quote = "";
        this.attribution = "";
    }

    SetQuote(newQuote: string, newAttribution: string) { //SELF NOTE: Why not allow setting for quote and attribution individually? Because for articles a quote with no attribution is not useful
        if(newQuote.trim() === "" || newAttribution.trim() === "") {
            throw new Error("Error: must ensure there is a quote and attribution");
        }

        this.quote = newQuote;
        this.attribution = newAttribution;
    }

    get Quote(): string {
        return this.quote;
    }

    get Attribution(): string {
        return this.attribution;
    }
      
}