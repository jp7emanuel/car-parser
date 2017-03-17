import mongoose from '../utils/database/mongoose';

const packageSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

packageSchema.index({ name: 'text' });

export default mongoose.model('package', packageSchema);
