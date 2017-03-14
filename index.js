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

function xmlToJsonOutput(url) {
  return axios.get(url)
  .then(response => {
    let filePath = path.join(__dirname, 'cars.json');

    return parser.parseString(response.data, function (err, result) {
        return fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    });
  });
}

xmlToJsonOutput(config.url);
