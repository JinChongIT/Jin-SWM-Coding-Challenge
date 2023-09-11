import { ConvertToWADate, ConvertToWATime } from '../Server/Typescript/Utils/dateTimeUtils'

describe('---Test Cases: dateTimeUtils.ts----', () => {
    test('convert to wa time when date is valid', () => {
    const tmpDate = new Date("2020-09-01T01:00:00.000Z");
    const tmpTime = ConvertToWATime(tmpDate);
      expect(tmpTime).toBe("9:00:00 AM");
    });


    test('convert to wa date when date is valid', () => {
      const tmpDate = new Date("2020-11-30T01:00:00.000Z");
      const conTmpTime = ConvertToWADate(tmpDate);
        expect(conTmpTime).toBe("Mon, 30 Nov 2020");
      });

})