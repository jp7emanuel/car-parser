import parseToJsonFile from '../utils/parser';
import collectionsToBeImported from '../utils/import';
import carModel from '../models/car_model';
import versionModel from '../models/version_model';
import modelModel from '../models/model_model';
import makeModel from '../models/make_model';
import transmissionModel from '../models/transmission_model';
import colorModel from '../models/color_model';
import fuelModel from '../models/fuel_model';
import packageModel from '../models/package_model';
import featureModel from '../models/feature_model';
import acessoryModel from '../models/acessory_model';
import contactModel from '../models/contact_model';
import storeModel from '../models/store_model';
import _ from 'lodash';

const documents = {
  cars: carModel,
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

/**
* @description Persist a Model
* @param {Array} [cars] Array of cars from Json object
* @return {Array} Cars we should persist to database
*/
function persistToDatabase(Model, collection, name) {
  Model.remove({}, (err) => {
    console.log(`${name} removed!`);
  })
  .then(response => {
      Model.insertMany(collection, function (err, docs) {
      if (err) {
        console.log(`Error! Could not insert ${name}!`);
        return err;
      }

      console.log(`${name} inserted successfully!`);
    });
  });
}

export const generateJsonRoute = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  return Promise.resolve(parseToJsonFile())
    .then(response => {
      if (!response) {
        return res.status(400).json({ error: 'XML has wrong structure!' })
      }

      return res.status(200).json({ message: `JSON file generated!` });
    }, function(err) {
      return res.status(500);
    });
}

export const importToDbRoute = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  return Promise.resolve(collectionsToBeImported())
    .then(response => {
      if (!response) {
        return res.status(400).send({ error: 'No cars found to be imported!' });
      }

      _.map(response, (collection, name) => {
        persistToDatabase(documents[name], collection, name);
      });

      return res.status(200).json({ message: 'Database imported!' });
    }, function(err) {
      return res.status(500).json({ message: 'Import Collection Promise rejected!' });
    });
}
