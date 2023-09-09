import { ArticleText } from "../Server/Models/articleText"
import { TextFormatKind } from "../Server/Typescript/Utils/textFormatKind"

describe('---Test Cases: articleText.ts----', () => {
    test('set article text', () => {
        const testVariable = new ArticleText("Cras mattis consectetur purus sit amet fermentum.");
        expect(testVariable.Text).toBe("Cras mattis consectetur purus sit amet fermentum.");
    });

    test('set empty article text', () => {
        const testVariable = new ArticleText("");
        expect(testVariable.Text).toBe("");
    });

    /*Valid test that are to output error message that is expected and occurs
    test('set valid textformat for given text but index and length is non whole number', () => {
        const testVariable = new ArticleText("This is a sentence");
        const consoleErrorSpy = jest.spyOn(console, 'error');
        testVariable.AddFormat(TextFormatKind.EMPHASIZED, -1, -1);
        expect(consoleErrorSpy).toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });

    test('set empty article and add format', () => {
        const testVariable = new ArticleText("");  
        const consoleErrorSpy = jest.spyOn(console, 'error');
        testVariable.AddFormat(TextFormatKind.EMPHASIZED, 0, 1);
        expect(consoleErrorSpy).toHaveBeenCalled();
        consoleErrorSpy.mockRestore();
    });
    */
    
})