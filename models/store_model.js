import mongoose from 'mongoose';
import addressSchema from '../schemas/address_schema';

const storeSchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  address: [addressSchema],
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contact',
  }
});

export default mongoose.model('store', storeSchema);
