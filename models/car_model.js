import mongoose from 'mongoose';
import photoSchema from '../schemas/photo_schema';

const carSchema = new mongoose.Schema({
  external_id: Number,
  zerokm: Boolean,
  plate: String,
  manufacturing_year: Number,
  model_year: Number,
  km: Number,
  doors: Number,
  price: Number,
  extra: String,
  created_at: Date,
  updated_at: Date,
  photos: [photoSchema],
  version: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'version',
  },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'model',
  },
  make: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'make',
  },
  transmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'transmission'
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'color',
  },
  fuel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fuel',
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contact',
  },
  packages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'package',
  }],
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'feature',
  }],
  acessories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'acessory',
  }],
});

export default mongoose.model('car', carSchema);
