import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('feature', featureSchema);
