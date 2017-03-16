import handleImport from '../utils/import';

export const importAndPersistCollections = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  return handleImport();
}
