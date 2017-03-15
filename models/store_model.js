import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  address: {
    street: String,
    number: Number,
    complement: String,
    district: String,
    city: String,
    state: String,
    zipcode: String
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contact',
  }
});

export default mongoose.model('store', storeSchema);
