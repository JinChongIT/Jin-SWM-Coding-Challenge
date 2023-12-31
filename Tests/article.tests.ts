import { Article } from '../Server/Models/article'
import { ArticleImage } from "../Server/Models/articleImage"


describe('---Test Cases: article.ts----', () => {
  test('headline is string', () => {
    let testVariable = new Article();
    testVariable.Headline = "bob"
    expect(testVariable.Headline).toBe("bob");
  });

  test('headline is empty', () => {
    let testVariable = new Article();
    testVariable.Headline;
    expect(testVariable.Headline).toBe("");
  });

  test('source is string', () => {
    let testVariable = new Article();
    testVariable.Source = 'The West Australian'
    expect(testVariable.Source).toBe("The West Australian");
  });

  test('source is empty', () => {
    let testVariable = new Article();
    testVariable.Source;
    expect(testVariable.Headline).toBe("");
  });

  
  test('add a writer to writerDatabase', () => {
    let testVariable = new Article();
    testVariable.addArticleWriter("Tom");
    expect(testVariable.Writers).toStrictEqual(["Tom"]);
  });

  test('publicationOn set to valid string', () => {
    let testVariable = new Article();
    testVariable.PublicationOn = "2020-09-01T01:00:00.000Z";
    expect(testVariable.PublicationOn).toBe("Tue, 1 Sept 2020 9:00:00AM");
  });
  

  test('publicationOn set to empty string', () => {
    let testVariable = new Article();
    expect(() => { 
        testVariable.PublicationOn = "";
      }).toThrow();
  });

  
  test('publicationOn set to invalid string', () => {
    let testVariable = new Article();
    expect(() => { 
        testVariable.PublicationOn = "dwdwAA";
      }).toThrow();
  });

  test('publicationOn is not set', () => {
    let testVariable = new Article();
    expect(testVariable.PublicationOn).toBe("");
  });

  test('publicationOn is valid format as json', () => {
    let testVariable = new Article();
    testVariable.PublicationOn = "2020-09-01T01:00:00.000Z";
    expect(testVariable.PublicationOn).toBe("Tue, 1 Sept 2020 9:00:00AM");
  });
  
  /*
  test('add article image section', () => {
    let testVariable = new Article();
    let testVariable2 = new ArticleImage("Cras mattis consectetur purus sit amet fermentum.", "https://images.thewest.com.au/publication/B88945448Z/1536132433649_GKR1Q2DJF.2-1.jpg");
    testVariable.AddSection(testVariable2);
    expect(testVariable.Url).toBe("https://images.thewest.com.au/publication/B88945448Z/1536132433649_GKR1Q2DJF.2-1.jpg");
  });
  */
  
});