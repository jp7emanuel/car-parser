import parseToJsonFile from '../utils/parser';
import importCollections from '../utils/import';

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
      return res.status(200).json(response);
    }, function(err) {
      return res.status(500);
    });
}
