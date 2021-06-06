// tslint:disable-next-line:no-var-requires
import * as fs from 'fs';
import { Test, TestingModule } from '@nestjs/testing';
import { CsvService } from './csv.service';
import { CsvEntity, RealCsvEntity } from './csv.entity';

describe('CsvParser', () => {
  let csvParser: CsvService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CsvService],
    }).compile();

    csvParser = app.get<CsvService>(CsvService);
  });

  describe('parse simple', () => {
    it('should return list of 2', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/simple.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity);

      expect(entities.list.length).toBe(2);
      expect(entities.total).toBe(2);
    });

    it('keys should be 2 on both entities', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/simple.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity);

      expect(Object.keys(entities.list[0]).length).toBe(2);
      expect(Object.keys(entities.list[1]).length).toBe(2);
    });

    it('entities should be instance of CsvEntity', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/simple.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity);

      expect(entities.list[0]).toBeInstanceOf(CsvEntity);
      expect(entities.list[1]).toBeInstanceOf(CsvEntity);
    });

    it('should return list of correct entities', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/simple.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity);
      const csv1 = new CsvEntity({ foo: '1', bar: 'a' });
      const csv2 = new CsvEntity({ foo: '2', bar: 'b' });

      expect(entities.list[0]).toStrictEqual(csv1);
      expect(entities.list[1]).toStrictEqual(csv2);
    });

    it('should return list of first entity', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/simple.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity, 1);
      const csv1 = new CsvEntity({ foo: '1', bar: 'a' });

      expect(entities.list[0]).toStrictEqual(csv1);
    });

    it('should return list of first entity', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/simple.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity, 1, 1);
      const csv2 = new CsvEntity({ foo: '2', bar: 'b' });

      expect(entities.list[0]).toStrictEqual(csv2);
    });

    it('should return list of 2 separated by commma', async () => {
      const csvStream = fs.createReadStream(
        __dirname + '/../tests/simple.comma-separated.csv',
      );
      const entities = await csvParser.parse(csvStream, CsvEntity, null, null, {
        separator: ',',
      });

      expect(entities.list.length).toBe(2);
      expect(entities.total).toBe(2);
    });
  });

  describe('parse invalid', () => {
    it('should reject an error', async () => {
      const csvStream = fs.createReadStream(
        __dirname + '/../tests/invalid.csv',
      );
      await expect(csvParser.parse(csvStream, CsvEntity)).rejects.toStrictEqual(
        {
          errors: [RangeError('Row length does not match headers')],
        },
      );
    });
  });

  describe('parse invalid multiple', () => {
    it('should reject 2 errors', async () => {
      const csvStream = fs.createReadStream(
        __dirname + '/../tests/invalid.multiple.csv',
      );
      await expect(csvParser.parse(csvStream, CsvEntity)).rejects.toStrictEqual(
        {
          errors: [
            RangeError('Row length does not match headers'),
            RangeError('Row length does not match headers'),
          ],
        },
      );
    });
  });

  describe('parse quoted', () => {
    it('should cleanup quotes', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/quoted.csv');
      const entities = await csvParser.parse(csvStream, CsvEntity);
      const csv1 = new CsvEntity({ foo: '1', bar: 'a' });
      const csv2 = new CsvEntity({ foo: '2', bar: 'b' });

      expect(entities.list[0]).toStrictEqual(csv1);
      expect(entities.list[1]).toStrictEqual(csv2);
    });
  });

  describe('parse real', () => {
    it('entities should be instance of CsvEntity', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/real.csv');
      const entities = await csvParser.parse(
        csvStream,
        RealCsvEntity,
        null,
        null,
        {
          separator: ',',
        },
      );
      expect(entities.list[0]).toBeInstanceOf(RealCsvEntity);
      expect(entities.list[1]).toBeInstanceOf(RealCsvEntity);
    });

    it('entities should contains name and email field', async () => {
      const csvStream = fs.createReadStream(__dirname + '/../tests/real.csv');
      const entities = await csvParser.parse(
        csvStream,
        RealCsvEntity,
        null,
        null,
        {
          separator: ',',
        },
      );

      expect(entities.list[0]).toHaveProperty('이름');
      expect(entities.list[0]).toHaveProperty('이메일');
      expect(entities.list[0]).toHaveProperty('핸드폰 번호');

      expect(entities.list[1]).toHaveProperty('이름');
      expect(entities.list[1]).toHaveProperty('이메일');
      expect(entities.list[1]).toHaveProperty('핸드폰 번호');
    });
  });
});
