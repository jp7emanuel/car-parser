import mongoose from '../utils/database/mongoose';

const versionSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true,
    index: true
  }
});

versionSchema.index({ name: 'text' });

export default mongoose.model('version', versionSchema);
