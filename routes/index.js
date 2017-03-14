import parseToJsonFile from '../utils/parser';

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

  // should run a function that import files and return 200 if ok

  return res.status(200).json({ message: 'collections imported to database!' });
}
