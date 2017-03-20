import _ from 'lodash';
import { deepMap } from '../../utils/helpers';
import { getRestructuredCollection } from '../../utils/parser';
import getCollectionsToImport from '../../utils/import/handler';
import carJson from './data/car.json';
import collectionsJson from './data/collections.json';
import fs from 'fs';

test('Parsing of a XML file restructuring its properties to accepted ones', () => {
  const carXml = fs.readFileSync(__dirname + '/data/car.xml', 'utf-8');
  const restructuredCar = getRestructuredCollection(carXml);
  expect(restructuredCar).toEqual(carJson);
});

test('Receive the collections we have to persist to database', async () => {
  const data = await getCollectionsToImport(carJson);

  expect(data.cars[0].plate).toEqual(collectionsJson.cars[0].plate);
  expect(data.color[0].name).toEqual(collectionsJson.color[0].name);
  expect(data.features[0].name).toEqual(collectionsJson.features[0].name);
  expect(data.stores[0].name).toEqual(collectionsJson.stores[0].name);
  expect(data.transmission[0].name).toEqual(collectionsJson.transmission[0].name);
  expect(data.version[0].name).toEqual(collectionsJson.version[0].name);
  expect(data.make[0].name).toEqual(collectionsJson.make[0].name);
  expect(data.model[0].name).toEqual(collectionsJson.model[0].name);
});
