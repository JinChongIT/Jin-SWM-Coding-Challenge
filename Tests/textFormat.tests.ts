import { TextFormat } from "../Server/Models/textFormat"
import { TextFormatKind } from "../Server/Typescript/Utils/textFormatKind"

describe('---Test Cases: textFormat.ts----', () => {
    test('set important text format', () => {
        const testVariable = new TextFormat(TextFormatKind.IMPORTANT, 3, 5);
        expect(testVariable.TextKind).toBe(TextFormatKind.IMPORTANT);
    });

    test('set legnth', () => {
        const testVariable = new TextFormat(TextFormatKind.EMPHASIZED, 3, 5);
        expect(testVariable.Length).toBe(5);
    });

    test('set index greater than length', () => {
        const testVariable = new TextFormat(TextFormatKind.EMPHASIZED, 5, 3);
        expect(testVariable.Index).toBe(5);
    });
   

})