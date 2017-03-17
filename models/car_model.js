import mongoose from 'mongoose';
import photoSchema from '../schemas/photo_schema';

const carSchema = new mongoose.Schema({
  external_id: {
    type: Number,
    required: true
  },
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

carSchema.path('manufacturing_year').index(true);
carSchema.path('model_year').index(true);
carSchema.path('km').index(true);
carSchema.path('doors').index(true);
carSchema.path('price').index(true);

export default mongoose.model('car', carSchema);
