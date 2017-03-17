import mongoose from 'mongoose';
import addressSchema from '../schemas/address_schema';
import contactSchema from '../schemas/contact_schema';

const storeSchema = new mongoose.Schema({
  name: String,
  external_id: Number,
  cnpj: String,
  contact: contactSchema,
  address: addressSchema
});

storeSchema.index({ name: 'text' });

export default mongoose.model('store', storeSchema);
