
import { TextFormatDatabase } from "../Models/textFormatDatabase"
import { TextFormatKind } from "../Typescript/Utils/textFormatKind"
import { TextFormat } from "../Models/textFormat"

export class ArticleText {
    private text: string;
    private textFormatings: TextFormatDatabase;

    constructor(text: string) { //SELF NOTE: Why not empty constructor paramater? The text must be tied to TextFormatDatabase logically a new/changed article text means new formatting
        this.text = text;
        this.textFormatings = new TextFormatDatabase(text);
    }

    set Text(newText: string) {

        this.text = newText;
        this.textFormatings = new TextFormatDatabase(newText); //SELF NOTE: Doesn't that mean when article text is changed the formatting for original article is lost? Yes, that makes sense
    } 

    get Text(): string {
        return this.text;
    }

    AddFormat(newFormatKind: TextFormatKind, newStartIndex: number, newIndexLength: number) {
        
        try {
            this.textFormatings.addTextFormat(newFormatKind, newStartIndex, newIndexLength);
        } catch(error: unknown) { //SELF NOTE: Why not any? https://google.github.io/styleguide/tsguide.html#null-vs-undefined
            if(error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    get TextFormatings(): ReadonlyArray<TextFormat> { //SELF NOTE: Doesn't this violate encapsulation and make class useless? No, we need the class to provide controlled insertion and return is immutable
        return this.textFormatings.TextFormatArray; 
    }   
}
