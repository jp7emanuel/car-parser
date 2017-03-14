import axios from 'axios';
import xml2js from 'xml2js';
import fs from 'fs';
import path from 'path';
import config from './config';

function tagNameProcessors(name) {
  let attrFromConfig = config.carAttrs.find(attr => attr.value === name);
  if (attrFromConfig) {
    return attrFromConfig.key;
  }

  return name;
}

let parser = new xml2js.Parser({
  explicitArray: false,
  explicitRoot: false,
  explicitCharkey: true,
  emptyTag: null,
  charkey: 'value',
  trim: true,
  normalize: true,
  mergeAttrs: true,
  tagNameProcessors: [tagNameProcessors]
});

function parseToJsonFile() {
  return axios.get(config.url)
  .then(response => {
    let filePath = path.join(__dirname, '../../generated', 'cars.json');
    parser.parseString(response.data, function (err, result) {
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    });

    return filePath;
  });
}

export default parseToJsonFile;
