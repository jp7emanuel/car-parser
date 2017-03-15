import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
  external_id: Number,
  name: String
});

export default mongoose.model('version', versionSchema);
