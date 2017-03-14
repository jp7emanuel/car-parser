import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  external_id: Number,
  zerokm: Boolean,
  plate: String,
  make: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'make',
  }
  model: String,
  version: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'version',
  }
  manufacturing_year: Number,
  model_year: Number,
  transmission_type:
  km: Number,
  doors: Number,
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'color',
  }
  fuel_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fuel_type',
  }
  price: Number,
  extra: String,
  created_at: Date,
  updated_at: Date,
  packages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'package',
  }
  features: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feature',
  }
  acessories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'acessory',
  }
  photos: [photoSchema]
});

export default mongoose.model('Store', storeSchema);
