import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import carsJson from '../../generated/parsed_xml.json';
import carModel from '../../models/car_model';
import versionModel from '../../models/version_model';
import modelModel from '../../models/model_model';
import makeModel from '../../models/make_model';
import transmissionModel from '../../models/transmission_model';
import colorModel from '../../models/color_model';
import fuelModel from '../../models/fuel_model';
import packageModel from '../../models/package_model';
import featureModel from '../../models/feature_model';
import acessoryModel from '../../models/acessory_model';

const singleSubDocuments = {
  version: versionModel,
  model: modelModel,
  make: makeModel,
  transmission: transmissionModel,
  color: colorModel,
  fuel: fuelModel
}

const multipleSubDocuments = {
  packages: packageModel,
  features: featureModel,
  acessories: acessoryModel
}

const directProps = [
  'external_id',
  'zerokm',
  'plate',
  'manufacturing_year',
  'model_year',
  'km',
  'doors',
  'price',
  'extra',
  'created_at',
  'updated_at'
]

const savedItems = {
  version: [],
  model: [],
  make: [],
  transmission: [],
  color: [],
  fuel: [],
  packages: [],
  features: [],
  acessories: []
};


/**
* Objects are in format { prop: { value: '' } }
* we have to remove the prop "value"
*/
function filterValue(obj, prop) {
  if (obj[prop]) {
    if (obj[prop].value) {
      return { [prop]: obj[prop].value };
    }

    if (obj[prop].values) {
      if (prop === 'photos') {
        return obj[prop].values.map(item => {
          return { url: item.value }
        });
      }

      return obj[prop].values.map(list => list.value);
    }
  }

  return { [prop]: null };
}

function getPersistedObject(Model, propName, obj) {
  let saved = savedItems[propName].find(item => item.name === obj.name);

  if (saved) {
    return saved;
  }

  const objToPersist = new Model(obj);
  savedItems[propName].push(objToPersist);

  return objToPersist;
}

function persistObject(Model, name, obj) {
  let item = {
    name: obj.value,
    external_id: obj.external_id
  };

  let savedItem = getPersistedObject(Model, name, item);

  return savedItem;
}

function getDirectProps(obj) {
  return directProps.map(prop => filterValue(obj, prop));
}

function getAssociatedSchema(name, obj) {
  return filterValue(obj, name);
}

function getAssociatedModel(name, obj, type = 'single') {
  if (type === 'single') {
    return persistObject(singleSubDocuments[name], name, obj[name]);
  }

  if (!obj[name] || !obj[name].values) {
    return null;
  }

  return _(obj[name].values)
    .map(item => {
      if (item) {
        return persistObject(multipleSubDocuments[name], name, item);
      }

      return null;
    })
    .value();
}

function getCarObject(car) {
  const carProps = getDirectProps(car);

  const version = getAssociatedModel('version', car);
  const make = getAssociatedModel('make', car);
  const model = getAssociatedModel('model', car);
  const transmission = getAssociatedModel('transmission', car);
  const color = getAssociatedModel('color', car);
  const fuel = getAssociatedModel('fuel', car);

  const packages = getAssociatedModel('packages', car, 'multiple');
  const features = getAssociatedModel('features', car, 'multiple');
  const acessories = getAssociatedModel('acessories', car, 'multiple');

  const photos = getAssociatedSchema('photos', car);

  const newCar = new carModel({
    version,
    transmission,
    color,
    fuel,
    packages,
    features,
    acessories,
    photos
  });

  return Object.assign(newCar, ...carProps);
}

export default function importCollections() {
  if (!carsJson || carsJson.length < 1) {
    return false;
  }

  return carsJson.cars.map((car) => {
    return getCarObject(car);
  });
}

