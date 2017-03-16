import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  external_id: Number,
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('package', packageSchema);
