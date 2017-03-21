import axios from 'axios';
import parser from 'xml2json';
import config from './config';
import _ from 'lodash';
import { replaceKeysDeep } from '../helpers';
import moment from 'moment';
import 'moment/locale/pt-br';

const options = {
  object: true,
  alternateTextNode: "name"
}

/**
* @description Objects have a poor structure when come from the XML, so we have to simplify them
* @param {Object} [obj] Object to be restructured
* @return {Object} Restructured object
*/
function restructureNestedKeys(obj) {
  if (obj.opcionais) {
    if (obj.opcionais.opcional) {
      obj.opcionais = obj.opcionais.opcional;
    }
  }

  if (obj.fotos) {
    if (obj.fotos.foto) {
      obj.fotos = obj.fotos.foto;
    }
  }

  if (obj.complementos) {
    if (obj.complementos.complemento) {
      obj.complementos = obj.complementos.complemento;
    }
  }

  if (obj.acessorios) {
    if (obj.acessorios.acessorio) {
      obj.acessorios = obj.acessorios.acessorio;
    }
  }

  return obj;
}

/**
* @description Remaps object applying new keys from config.Attrs and remapping objects of interest
* @param {Object} [obj] Object to be remapped
* @return {Object} Remapped object
*/
function remapObj(obj) {
  let newObj = replaceKeysDeep(obj, config.keyTranslations);

  return _.mapValues(newObj, function (value, prop) {
    switch (prop) {
      case 'new': {
        return value === 'N';
      }
      case 'price': {
        return value.replace(/\D/g, '');
      }
      case 'created_at':
      case 'updated_at': {
        return moment(value, 'DD/MM/YYYY HH:mm').format();
      }
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
* @description Returns an array of promises from a list of urls
* @param {Array} urls List of urls
* @return {Array} Array of {Promises}
*/
function getPromiseArray(urls) {
  return urls.map(url => axios.get(url));
}

/**
* @description Transform XML in JSON and restructure it
* @param {String} xmlData File contents of a XML
* @return {Object} Restructured JSON collection
*/
export function getRestructuredCollection(xmlData) {
  const converted = parser.toJson(xmlData, options);
  if (!converted.estoque || !converted.estoque.veiculo) return;
  const veiculos = _.isArrayLikeObject(converted.estoque.veiculo) ? converted.estoque.veiculo : [converted.estoque.veiculo];
  const restructuredCollection = restructure(veiculos);
  if (!restructuredCollection || !restructuredCollection.length) return;

  return restructuredCollection;
}

/**
* @description Parses a XML files from links restructuring its properties
* @return {Object} Collection of parsed cars
*/
export function parseToJson() {
  return axios.all(getPromiseArray(config.urls))
    .then(function(results) {
      return _.flatMap(results, response => {
        return getRestructuredCollection(response.data);
      });
    });
}
