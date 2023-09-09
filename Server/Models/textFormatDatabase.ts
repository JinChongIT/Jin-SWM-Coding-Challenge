
import { TextFormat } from "../Models/textFormat"
import { TextFormatKind } from "../Typescript/Utils/textFormatKind"


export class TextFormatDatabase { //SELF NOTE: What happens if two different formats apply to same section of text? Thats fine since a text can be bold and underline

    private primaryText: string; 
    private textFormatArray: Array<TextFormat> = [];

    constructor(text: string) { //SELF NOTE: Why not provide setters? Because when client adds format to a text changing the text means you need to recheck whether formats are still valid
        this.primaryText = text; 
    }

    addTextFormat(newKind: TextFormatKind, newStartIndex: number, newIndexLength: number) {
       
        if(!this.commonNumberValid(newStartIndex,newIndexLength)) {
            throw new Error("error: numbers must be whole and not negative and index most be greater then 0");
        }
        
        const currentTextLength = this.primaryText.length;
        if(newIndexLength > currentTextLength) { 
            throw new Error("error: unable to add text format for that text");
        }
        if(newStartIndex >= this.primaryText.length) { //SELF NOTE: Why not newIndexInLengthFormat > this.primaryText.length? Because index could be 1 and length could be 2 is fine but 2 index 2 length is not and makese no sense
            throw new Error("error: unable to add text format for that text");
        }


            //Compares the primaryText, newStartIndex, newIndexLength logic (i.e index starting in middle -->)
        const remainingLength = currentTextLength - newStartIndex; //SELF NOTE: Why not + newIndexInLengthFormat
        if(newIndexLength > remainingLength) { 
            throw new Error("error: unable to add text format for that text");
        }

        const textFormatCreation = new TextFormat(newKind, newStartIndex, newIndexLength);
        this.textFormatArray.push(textFormatCreation);
    }
    

    private commonNumberValid(newStartIndex: number, newIndexLength: number): boolean {

        if(!Number.isInteger(newStartIndex) || !Number.isInteger(newIndexLength)) {
            return false;
        }
        if(newStartIndex < 0 || newIndexLength <= 0) { //SELF NOTE: Why not  newIndexLength < 0? Length can't be 0
            return false;
        }

        return true;
    }

    get TextFormatArray(): ReadonlyArray<TextFormat> { //SELF NOTE: Doesn't this violate encapsulation and make class useless? No, we need the class to provide controlled insertion and return is immutable
        return this.textFormatArray; 
    }
    
}
