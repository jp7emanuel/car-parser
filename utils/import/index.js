import fs from 'fs';
import path from 'path';
import _ from 'lodash';
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
import contactModel from '../../models/contact_model';
import storeModel from '../../models/store_model';

const subDocuments = {
  version: versionModel,
  model: modelModel,
  make: makeModel,
  transmission: transmissionModel,
  color: colorModel,
  fuel: fuelModel,
  contact: contactModel,
  store: storeModel,
  packages: packageModel,
  features: featureModel,
  acessories: acessoryModel
}

const savedCollections = {
  version: [],
  model: [],
  make: [],
  transmission: [],
  color: [],
  fuel: [],
  contact: [],
  store: [],
  packages: [],
  features: [],
  acessories: [],
};

/**
* @description Applying memoization of already seen objects, so we will only persist uniques
* @param {String} [propName] Name of property to be saved in {savedCollections}
* @param {Object} [obj] Object we wish to persist
* @param {String} [compareToProp] Used to compare property in object checking for uniques
* @return {Object} Object we wish to be persisted
*/
function getObject(propName, obj, compareToProp = null) {
  let savedObject;

  if (!compareToProp) {
    savedObject = savedCollections[propName].find(item => item === obj);
  }

  savedObject = savedCollections[propName].find(item => item[compareToProp] === obj[compareToProp]);

  if (savedObject) {
    return savedObject;
  }

  const Model = subDocuments[propName];
  const objToSave = new Model(obj);
  savedCollections[propName].push(objToSave);

  return objToSave;
}

/**
* @description Renames the key id to external_id in object
* @param {Object} [obj] Object to be renamed
* @return {Object} Mapped object with key renamed
*/
function renameIdKey(obj) {
  return _(obj).mapKeys((value, key) => {
    if (key === 'id') {
      return 'external_id';
    }

    return key;
  }).value();
}

/**
* @description Retrives a model collection from mongoose associated model
* @param {String} [collectionName] Name of Object property to be used
* @param {Object} [obj] Object to be used
* @return {Object} Car associated model
*/
function getAssociatedModel(collectionName, obj) {
  let compareToProp = 'name';

  if (_.isArray(obj)) {
    return _(obj)
      .map(item => {
        if (_.isEmpty(item)) {
          return null
        }

        let renamedItem = renameIdKey(item);

        let savedItem = getObject(collectionName, renamedItem, compareToProp);

        return savedItem;
      })
      .value();
  }

  if (_.isEmpty(obj)) {
    return null;
  }

  let renamedItem = renameIdKey(obj);

  if (collectionName === 'contact') {
    compareToProp = 'email';
  }

  return getObject(collectionName, renamedItem, compareToProp);
}

/**
* @description Grab car properties and parse them based on collection properties
* @param {Array} [cars] Array of cars from Json object
* @return {Array} Cars we should persist to database
*/
function getCarsObject(cars) {
  return _(cars).map(car => {
      const version = getAssociatedModel('version', car.version);
      const make = getAssociatedModel('make', car.make);
      const model = getAssociatedModel('model', car.model);
      const transmission = getAssociatedModel('transmission', car.transmission);
      const color = getAssociatedModel('color', car.color);
      const fuel = getAssociatedModel('fuel', car.fuel);

      const packages = getAssociatedModel('packages', car.packages);
      const features = getAssociatedModel('features', car.features);
      const acessories = getAssociatedModel('acessories', car.acessories);

      let store;
      let contact;
      if (car.store) {
        store = getAssociatedModel('store', car.store);
        if (car.store.contact) {
          contact = getAssociatedModel('contact', car.store.contact);
        }
      }

      let photos = {};
      if (car.photos && car.photos.length > 1) {
        photos = car.photos.map(item => {
          return { url: item };
        });
      }

      let newCar = {
        ...car,
        version,
        make,
        model,
        transmission,
        color,
        fuel,
        packages,
        features,
        acessories,
        photos,
        store,
        contact
      };

      return new carModel(newCar);
    })
    .value();
}

/**
* @description Get the collections we have to persist to database
* @return {Object} Collection to be persisted
*/
export default function collectionsToBeImported() {
  const filePath = path.join(__dirname, '../../generated', 'parsed_xml.json');

  if (!fs.existsSync(filePath)) {
    console.log(`No file found at ${filePath}!`);
    return false;
  }

  const fileData = fs.readFileSync(filePath);
  const carsJson = JSON.parse(fileData);

  return Promise.resolve(getCarsObject(carsJson))
    .then(response => {
      return {
        cars: response,
        ...savedCollections
      };
    });

}

