import mongoose from '../utils/database/mongoose';

const modelSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

modelSchema.index({ name: 'text' });

export default mongoose.model('model', modelSchema);
