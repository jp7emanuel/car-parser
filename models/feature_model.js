import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

featureSchema.index({ name: 'text' });

export default mongoose.model('feature', featureSchema);
