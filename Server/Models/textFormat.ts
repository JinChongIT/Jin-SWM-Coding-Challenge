import { TextFormatKind } from "../Typescript/Utils/textFormatKind"

export class TextFormat { //SELF NOTE: Why not include validation logic? Because not this class responsibility it is textFormatDatabase.ts. Doesn't have reference to text to compare with

    private textKind: TextFormatKind 
    private index: number;
    private length: number 


    constructor(textKind: TextFormatKind, index: number, length: number) { //SELF NOTE: Why not provide setters? Because having a length with no index makes the object pointless and vice versa
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
