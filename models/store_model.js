import mongoose from 'mongoose';
import addressSchema from '../schemas/address_schema';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true
  },
  cnpj: String,
  address: [addressSchema]
});

storeSchema.path('name').index({text : true});

export default mongoose.model('store', storeSchema);
