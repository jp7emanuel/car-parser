import parseToJsonFile from '../utils/parser';

export const generateJson = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  return Promise.resolve(parseToJsonFile())
    .then(path => {
      return res.status(200).send({ message: `json file generated at: ${path}` });
    }, function(err) {
      return res.status(500);
    });
}
