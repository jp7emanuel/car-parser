import mongoose from 'mongoose';
import photoSchema from './photo_schema';

const carSchema = new mongoose.Schema({
  external_id: Number,
  zerokm: Boolean,
  plate: String,
  version: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'version',
  },
  manufacturing_year: Number,
  model_year: Number,
  transmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'transmission'
  },
  km: Number,
  doors: Number,
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'color',
  },
  fuel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fuel',
  },
  price: Number,
  extra: String,
  created_at: Date,
  updated_at: Date,
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
  photos: [photoSchema]
});

export default mongoose.model('car', carSchema);
