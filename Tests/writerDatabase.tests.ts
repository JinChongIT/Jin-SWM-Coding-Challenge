import { WriterDatabase } from '../Server/Models/writerDatabase'



describe('---Test Cases: writerDatabase.ts----', () => {
    test('add a writer to writerDatabase', () => {
      let testVariable = new WriterDatabase();
      testVariable.AddWriter("Tom");
      testVariable.AddWriter("luKE");
      expect(testVariable.WritersList).toStrictEqual(["Tom", "luKE"]);
    });

    test('add a empty string to writerDatabase', () => {
        let testVariable = new WriterDatabase();
        expect(() => { 
            testVariable.AddWriter(""); 
          }).toThrow();
    });

    test('get writers from writerDatabase', () => {
        let testVariable = new WriterDatabase();
        testVariable.AddWriter("Tom");
        testVariable.AddWriter("luke");
        expect(testVariable.WritersList).toStrictEqual(["Tom", "luke"]);
      });
  
   
  });