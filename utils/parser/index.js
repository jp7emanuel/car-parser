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


function replaceKeysDeep(obj, keysMap) {
  return _.transform(obj, function(result, value, key) {

    var currentKey = keysMap[key] || key;

    result[currentKey] = _.isObject(value) ? replaceKeysDeep(value, keysMap) : value;
  });
}

function restructureNestedKeys(obj) {
  if (obj.features.opcional) {
    obj.features = obj.features.opcional;
  }

  if (obj.photos.foto) {
    obj.photos = obj.photos.foto;
  }

  if (obj.packages.complemento) {
    obj.packages = obj.packages.complemento;
  }

  if (obj.acessories.acessorio) {
    obj.acessories = obj.acessories.acessorio;
  }

  return obj;
}

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

function restructure(obj) {
  return obj.map(car => {
    let remappedCar = remapObj(car);
    return restructureNestedKeys(remappedCar);
  })
}

function parseToJsonFile() {
  return axios.get(config.url)
  .then(response => {
    const filePath = path.join(__dirname, '../../generated', 'parsed_xml.json');
    const converted = parser.toJson(response.data, options);

    const parsedFile = restructure(converted.estoque.veiculo);

    fs.writeFileSync(filePath, JSON.stringify(parsedFile, null, 2));

    return filePath;
  });
}

export default parseToJsonFile;
