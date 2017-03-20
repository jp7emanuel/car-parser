import handleImport from '../utils/import';
import db from '../utils/database';

handleImport()
  .then(response => console.info(response.message))
  .catch(err => err);
