import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema({
  external_id: Number,
  name: String,
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'model'
  },
  make: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'make'
  }
});

export default mongoose.model('version', versionSchema);
