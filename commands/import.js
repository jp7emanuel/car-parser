import handleImport from '../utils/import';
import db from '../utils/database';
import mongoose from '../utils/database/mongoose';

handleImport()
  .then(response => {
    mongoose.connection.close();
    console.info(response.message);
  })
  .catch(err => err);
