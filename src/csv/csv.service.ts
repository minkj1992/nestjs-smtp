import * as fs from 'fs';
import * as csv from 'csv-parser';

import { Injectable } from '@nestjs/common';
import { plainToClass, classToPlain } from 'class-transformer';
import { getCsvKey } from './csv.decorator';

export interface ParsedData<T> {
  list: T[];
  total: number;
  count: number | null;
  offset: number | null;
}

@Injectable()
export class CsvService {
  constructor() {}
  async readCsv(fileName: string) {
    const stream = fs.createReadStream(`${__dirname}/${fileName}`);
    return stream;
  }

  async parse(
    stream,
    Entity,
    count: number = null,
    offset: number = null,
    csvConfig: object = {},
  ): Promise<ParsedData<InstanceType<typeof Entity>>> {
    return new Promise((resolve, reject) => {
      let i = 0;
      let c = 0;
      const list = [];
      const errors = [];

      const pipedStream = stream.pipe(
        csv({
          strict: true,
          separator: ';',
          ...csvConfig,
        }),
      );

      pipedStream.on('error', e => {
        errors.push(e);

        reject({ errors });
      });

      pipedStream.on('data', line => {
        i++;

        if (count) {
          if (c >= count) {
            return;
          }

          if (offset && i - 1 < offset) {
            return;
          }

          c++;
        }

        list.push(this.processLine(line, Entity));
      });

      pipedStream.on('end', () =>
        errors.length > 0
          ? reject({ errors })
          : resolve({
              list,
              count,
              offset,
              total: i,
            }),
      );
    });
  }

  processLine(line: any, Entity): any {
    const entityInstance = new Entity();
    const plain = {};
    const plainLine = classToPlain(line);

    Object.keys(plainLine).forEach((key: string) => {
      const remapKey = getCsvKey(entityInstance, key);
      plain[remapKey || key] = plainLine[key];
    });

    return plainToClass(Entity, plain);
  }
}
