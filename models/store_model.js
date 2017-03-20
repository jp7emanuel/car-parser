import mongoose from '../utils/database/mongoose';
import addressSchema from '../schemas/address_schema';
import contactSchema from '../schemas/contact_schema';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true,
    required: true
  },
  external_id: Number,
  cnpj: String,
  contact: contactSchema,
  address: addressSchema
});

export default mongoose.model('store', storeSchema);
