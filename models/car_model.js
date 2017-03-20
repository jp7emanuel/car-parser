import mongoose from '../utils/database/mongoose';
import photoSchema from '../schemas/photo_schema';

const carSchema = new mongoose.Schema({
  external_id: {
    type: Number,
    required: true
  },
  new: Boolean,
  plate: String,
  manufacturing_year: {
    type: Number,
    index: true
  },
  model_year: {
    type: Number,
    index: true
  },
  km: {
    type: Number,
    index: true
  },
  doors: {
    type: Number,
    index: true
  },
  price: {
    type: Number,
    index: true
  },
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
  stores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'store',
  }],
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
