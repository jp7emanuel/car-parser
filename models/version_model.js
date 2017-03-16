import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('version', versionSchema);
