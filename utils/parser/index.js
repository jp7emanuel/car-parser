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

function attrNameProcessors(name) {
  if (name === 'id') {
    return 'external_id';
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
  tagNameProcessors: [tagNameProcessors],
  attrNameProcessors: [attrNameProcessors]
});

function parseToJsonFile() {
  return axios.get(config.url)
  .then(response => {
    let filePath = path.join(__dirname, '../../generated', 'parsed_xml.json');
    parser.parseString(response.data, function (err, result) {
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    });

    return filePath;
  });
}

export default parseToJsonFile;
