import parseToJsonFile from '../utils/parser';
import importCollections from '../utils/import';
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

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.log('were successfully stored.');
    }
}

export const generateJsonRoute = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  return Promise.resolve(parseToJsonFile())
    .then(path => {
      return res.status(200).json({ message: `json file generated at: ${path}` });
    }, function(err) {
      return res.status(500);
    });
}

export const importToDbRoute = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  return Promise.resolve(importCollections())
    .then(response => {
      let messages = [];
      _.map(response, (collection, name) => {
        const Model = documents[name];

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
      });

      return res.status(200).json({ message: 'Database imported!' });
    }, function(err) {
      return res.status(500).json({ message: 'Import Collection Promise rejected!' });
    });
}
