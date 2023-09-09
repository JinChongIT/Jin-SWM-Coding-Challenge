import { TextFormatKind } from "../Server/Typescript/Utils/textFormatKind"
import { TextFormatDatabase } from "../Server/Models/textFormatDatabase"

describe('---Test Cases: textFormatDatabase.ts----', () => {
    test('set valid textformat for given text', () => {
        const testVariable = new TextFormatDatabase("This is a sentence");
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 3, 4);
        expect(testVariable.TextFormatArray).toEqual([{"index": 3, "length": 4, "textKind": 0}]);
    });

    test('set two valid textformat for given text', () => {
        const testVariable = new TextFormatDatabase("This is a sentence");
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 3, 4);
        testVariable.addTextFormat(TextFormatKind.IMPORTANT, 3, 4);
        expect(testVariable.TextFormatArray).toEqual([{"index": 3, "length": 4, "textKind": 0}, {"index": 3, "length": 4, "textKind": 1}]);
    });

    test('set valid textformat for given text but index and length is non whole number', () => {
        const testVariable = new TextFormatDatabase("This is a sentence");
        expect(() => { 
            testVariable.addTextFormat(TextFormatKind.EMPHASIZED, -1, -1);
          }).toThrow();
    });

    test('set valid textformat for given text but length is greater then given text length', () => {
        const testVariable = new TextFormatDatabase("This is a sentence");
        expect(() => { 
            testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 3, 19);
          }).toThrow();
    });

    test('set valid textformat for given text given length is equal to given text length edge', () => {
        const testVariable = new TextFormatDatabase("This is");
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 0, 7);
        expect(testVariable.TextFormatArray).toEqual([{"index": 0, "length": 7, "textKind": 0}]);
    });

    
    test('set valid textformat for given text but index is equal then given text length', () => {
        const testVariable = new TextFormatDatabase("This is");
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 6, 1);
        expect(testVariable.TextFormatArray).toEqual([{"index": 6, "length": 1, "textKind": 0}]);
    });

    test('set valid textformat for given text but index is less then given text length edge', () => {
       
        const testVariable = new TextFormatDatabase("This is");
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 5, 1);
        expect(testVariable.TextFormatArray).toEqual([{"index": 5, "length": 1, "textKind": 0}]); 
    });

    test('set valid textformat for given text but index starts in the middle', () => {
       
        const testVariable = new TextFormatDatabase("This"); //STARTING FROM index 'h' 
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 1, 3);
        expect(testVariable.TextFormatArray).toEqual([{"index": 1, "length": 3, "textKind": 0}]); 
    });

    test('set valid textformat for given text but index starts in the middle and length is greater then remaining indexes edge', () => {
       
        const testVariable = new TextFormatDatabase("This"); //STARTING FROM index 'h' 
        expect(() => { 
            testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 1, 4);
          }).toThrow();
    });

    test('set valid textformat for given text given length is equal to given text length edge', () => {
        const testVariable = new TextFormatDatabase("a"); 
        testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 0, 1);
        expect(testVariable.TextFormatArray).toEqual([{"index": 0, "length": 1, "textKind": 0}]); 
    });

    test('set empty timeformat', () => {
        const testVariable = new TextFormatDatabase("");  
        expect(() => { 
            testVariable.addTextFormat(TextFormatKind.EMPHASIZED, 0, 1);
          }).toThrow();
    });

})