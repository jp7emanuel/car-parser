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
import storeModel from '../../models/store_model';

const documents = {
  cars: carModel,
  version: versionModel,
  model: modelModel,
  make: makeModel,
  transmission: transmissionModel,
  color: colorModel,
  fuel: fuelModel,
  stores: storeModel,
  packages: packageModel,
  features: featureModel,
  acessories: acessoryModel
}

let savedCollections = {
  cars: [],
  version: [],
  model: [],
  make: [],
  transmission: [],
  color: [],
  fuel: [],
  stores: [],
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
  let savedObject = savedCollections[propName].find(item => item.external_id === obj.external_id);

  if (savedObject) {
    return savedObject;
  }

  const Model = documents[propName];
  const objToSave = new Model(obj);
  savedCollections[propName].push(objToSave);

  return objToSave;
}

/**
* @description Check if car is already stored using "plate" property and then put another {store} in car from savedCollection
* @param {Object} [car] Car object from json
* @return {Boolean} Car was previously stored in savedCollection or not
*/
function isStoredCar(car) {
  let storedCar = savedCollections.cars.find(item => item.plate === car.plate);

  if (!storedCar) {
    return false;
  }

  // add {store} inside the already previous saved car
  let store;
  if (car.stores) {
    store = getAssociatedModel('stores', car.stores);
    storedCar.stores.push(store);
  }

  return true;
}

/**
* @description Retrives a model collection from mongoose associated model
* @param {String} [collectionName] Name of Object property to be used
* @param {Object} [obj] Object to be used
* @return {Object} Car associated model
*/
function getAssociatedModel(collectionName, obj) {
  if (_.isArray(obj)) {
    if (_.isEmpty(obj)) {
      return [];
    }

    return _(obj)
      .map(item => {
        let savedItem = getObject(collectionName, item);

        return savedItem;
      })
      .value();
  }

  if (_.isEmpty(obj)) {
    return {};
  }

  return getObject(collectionName, obj);
}

/**
* @description Grab car properties and parse them based on collection properties
* @param {Array} [cars] Array of cars from Json object
* @return {Array} Cars we should persist to database
*/
function getCarsObject(cars) {
  for(let i=0; i < cars.length; i++) {
    let car = cars[i];

    if (isStoredCar(car)) {
      continue;
    }

    const version = getAssociatedModel('version', car.version);
    const make = getAssociatedModel('make', car.make);
    const model = getAssociatedModel('model', car.model);
    const transmission = getAssociatedModel('transmission', car.transmission);
    const color = getAssociatedModel('color', car.color);
    const fuel = getAssociatedModel('fuel', car.fuel);

    const packages = getAssociatedModel('packages', car.packages);
    const features = getAssociatedModel('features', car.features);
    const acessories = getAssociatedModel('acessories', car.acessories);

    let stores;
    if (car.stores) {
      stores = getAssociatedModel('stores', car.stores);
    }

    let photos = [];
    if (car.photos && car.photos.length > 1) {
      photos = _(car.photos).map(item => {
          return { url: item };
        })
        .value();
    }

    const newCar = {
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
      stores
    };

    const databaseCar = new carModel(newCar);
    savedCollections.cars.push(databaseCar);
  }

  return savedCollections;
}

/**
* @description Get the collections we have to persist to database
* @return {Object} Collection to be persisted
*/
export default function collectionsToBeImported(cars) {
  return Promise.resolve(getCarsObject(cars)).then(response => response);
}

