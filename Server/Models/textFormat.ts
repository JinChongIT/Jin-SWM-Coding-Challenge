import { TextFormatKind } from "../Typescript/Utils/textFormatKind"

export class TextFormat { 

    private textKind: TextFormatKind //SELF NOTE: Why not include validation logic? Because not this class responsibility it is textFormatDatabase.ts. Doesn't even have reference to text to compare with
    private index: number;
    private length: number 


    constructor(textKind: TextFormatKind, index: number, length: number) { //SELF NOTE: Why not have setter? Because having an length with no index makes the object pointless and vice versa
        this.textKind = textKind;
        this.index = index;
        this.length = length;
    }

    get TextKind(): TextFormatKind {
        return this.textKind;
    }

    get Index(): number {
        return this.index;
    }

    get Length(): number {
        return this.length;
    }

} 