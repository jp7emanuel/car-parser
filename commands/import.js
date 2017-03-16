import handleImport from '../utils/import';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

handleImport().then(response => console.log(response.message));
