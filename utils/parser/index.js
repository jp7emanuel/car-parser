import axios from 'axios';
import parser from 'xml2json';
import fs from 'fs';
import path from 'path';
import config from './config';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/pt-br';

const options = {
  object: true,
  alternateTextNode: "name"
}

/**
* @description Replace deep keys helper
* @param {Object} [obj] Object to be remapped
* @param {Object} [keysMap] Keys and values we wish to remap
* @return {Object} Transformed object
*/
function replaceKeysDeep(obj, keysMap) {
  return _.transform(obj, function(result, value, key) {

    var currentKey = keysMap[key] || key;

    result[currentKey] = _.isObject(value) ? replaceKeysDeep(value, keysMap) : value;
  });
}

/**
* @description Objects have a poor structure when come from the XML, so we have to simplify them
* @param {Object} [obj] Object to be restructured
* @return {Object} Restructured object
*/
function restructureNestedKeys(obj) {
  if (obj.opcionais.opcional) {
    obj.opcionais = obj.opcionais.opcional;
  }

  if (obj.fotos.foto) {
    obj.fotos = obj.fotos.foto;
  }

  if (obj.complementos.complemento) {
    obj.complementos = obj.complementos.complemento;
  }

  if (obj.acessorios.acessorio) {
    obj.acessorios = obj.acessorios.acessorio;
  }

  return obj;
}

/**
* @description Remaps object applying new keys from config.Attrs and remapping objects of interest
* @param {Object} [obj] Object to be remapped
* @return {Object} Remapped object
*/
function remapObj(obj) {
  let newObj = replaceKeysDeep(obj, config.carAttrs);

  return _.mapValues(newObj, function (value, prop) {
    if (prop === 'zerokm') {
      return value === 'N';
    }
    if (prop === 'price') {
      return value.replace(/\D/g, '');
    }
    if (prop === 'created_at' || prop === 'updated_at') {
      return moment(value, 'DD/MM/YYYY HH:mm').format();
    }

    return value;
  });
}

/**
* @description Restructure the entire object replacing some nested keys to deeper objects and remap applying translated keys
* @param {Object} [obj] Object to be remapped
* @return {Object} Restructured object
*/
function restructure(obj) {
  return obj.map(car => {
    let restructuredCar = restructureNestedKeys(car);
    return remapObj(restructuredCar);
  })
}

/**
* @description Parses a XML files from links restructuring its properties
* @return {Object} Collection of parsed cars
*/
export default function parseToJson() {
  const promiseArray = config.urls.map(url => axios.get(url));
  return axios.all(promiseArray)
    .then(function(results) {
      return _.flatMap(results, response => {
          let converted = parser.toJson(response.data, options);
          if (!converted.estoque) return;
          if (!converted.estoque.veiculo) return;
          let restructuredCollection = restructure(converted.estoque.veiculo);
          if (!restructuredCollection || !restructuredCollection.length) return;

          return restructuredCollection;
        });
    });

}
