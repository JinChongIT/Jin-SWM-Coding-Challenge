import { ArticleQuote } from "../Server/Models/articleQuote"

describe('---Test Cases: articleQuote.ts----', () => {
    test('set valid attribution', () => {
        const testVariable = new ArticleQuote();
        testVariable.SetQuote("Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui.", "Michelanjelo Michael");
        expect(testVariable.Attribution).toBe("Michelanjelo Michael");
    });

    test('set valid quote', () => {
        const testVariable = new ArticleQuote();
        testVariable.SetQuote("Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui.", "Michelanjelo Michael");
        expect(testVariable.Quote).toBe("Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui.");
    });

    test('set empty attribution', () => {
        const testVariable = new ArticleQuote();
        expect(() => { 
            testVariable.SetQuote("", "Michelanjelo Michael");
          }).toThrow();
    });

    test('set empty quote', () => {
        const testVariable = new ArticleQuote();
        expect(() => { 
            testVariable.SetQuote("aa", "");
          }).toThrow();
    });
    
})