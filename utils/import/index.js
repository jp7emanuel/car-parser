import parseToJson from '../parser';
import collectionsToBeImported from './handler';
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
import _ from 'lodash';

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

function outputMessage(code, message) {
  return {
    code: code,
    message: message
  }
}

/**
* @description Drops all collections based on models
* @return {Promise} Array of remove promises
*/
function dropCollections() {
  return _(documents).map((Model, collectionName) => {
      return Model.remove()
        .then(response => {
          console.log(`- ${collectionName} removed successfully!`)
          return true;
        })
        .catch(err => {
          const errorMessage = `- [Error] Could not remove ${collectionName}`;
          console.error(errorMessage);
          return outputMessage(400, errorMessage);
        });
    })
  .value();
}

/**
* @description Persist a Model
* @param {Array} [collection] Collection we should persist
* @return {Promise} Array of insertMany promises
*/
function persistCollections(collections) {
  return _(collections)
    .map((collection, name) => {
      let Model = documents[name];
      return Model.insertMany(collection)
        .then(response => {
          console.log(`+ ${name} inserted successfully!`);
          return true;
        })
        .catch(err => {
          const errorMessage = `+ [Error] Could not insert ${name}`;
          console.error(errorMessage);
          return outputMessage(400, errorMessage);
        });
    })
    .value();
}

export default function handleImport() {
  return parseToJson()
    .then(parseResponse => {
      if (!parseResponse) {
        return outputMessage(400, "XML has wrong structure!");
      }

      return collectionsToBeImported(parseResponse)
        .then(importResponse => {
          if (!importResponse) {
            return outputMessage(400, "No cars found to be imported!");
          }

          return Promise.all(dropCollections())
            .then(dropResponse => {
              return Promise.all(persistCollections(importResponse))
                .then(persisResponse => outputMessage(200, "Database imported!"))
                .catch(persistError => persistError);
            })
            .catch(dropError => dropError);

        })
        .catch((importError) => {
          console.log(importError);
          return outputMessage(500, "Import Collection Promise rejected!");
        });

    })
    .catch(parseError => {
      console.log(parseError);
      return outputMessage(500, "Parse JSON from XML Promise rejected!");
    });
}
