import { ArticleImage } from "../Server/Models/articleImage"

describe('---Test Cases: articleImage.ts----', () => {
    test('set image caption', () => {
        const testVariable = new ArticleImage("Cras mattis consectetur purus sit amet fermentum.", "https://example.com");
        expect(testVariable.Caption).toBe("Cras mattis consectetur purus sit amet fermentum.");
    });

    test('set valid image url', () => {
        let testVariable = new ArticleImage("Cras mattis consectetur purus sit amet fermentum.", "https://images.thewest.com.au/publication/B88945448Z/1536132433649_GKR1Q2DJF.2-1.jpg");
        expect(testVariable.Url).toBe("https://images.thewest.com.au/publication/B88945448Z/1536132433649_GKR1Q2DJF.2-1.jpg");
    });

    test('set empty image url', () => {
        expect(() => { 
            let testVariable = new ArticleImage("Cras mattis consectetur purus sit amet fermentum.", "");
          }).toThrow();
    });

    test('set invalid image url', () => {
        expect(() => { 
            let testVariable = new ArticleImage("Cras mattis consectetur purus sit amet fermentum.", "dwdwqdqw.");
          }).toThrow();
    });

})